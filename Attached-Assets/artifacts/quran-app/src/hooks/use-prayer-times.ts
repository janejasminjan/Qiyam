/**
 * use-prayer-times.ts
 * TanStack Query wrapper around the AlAdhan API.
 * Refetches whenever location, madhab, or calculation method changes.
 * Stale time: 55 min (prayer times rarely change within a day).
 */
import { useQuery } from "@tanstack/react-query";
import {
  fetchPrayerTimes,
  fetchPrayerTimesByCity,
  computeLivePrayerState,
  type DailyPrayerTimes,
} from "@/lib/prayer-times";
import { usePrayerSettings } from "@/hooks/use-prayer-settings";
import { useEffect, useState } from "react";

export function usePrayerTimes() {
  const { settings, locationStatus } = usePrayerSettings();

  const enabled =
    locationStatus === "granted" &&
    (settings.locationMode === "manual"
      ? Boolean(settings.cityName)
      : settings.latitude !== undefined && settings.longitude !== undefined);

  const queryKey = [
    "prayer-times",
    settings.latitude,
    settings.longitude,
    settings.cityName,
    settings.countryName,
    settings.madhab,
    settings.calculationMethod,
    new Date().toDateString(),
  ];

  const query = useQuery<DailyPrayerTimes>({
    queryKey,
    enabled,
    staleTime: 1000 * 60 * 55,
    retry: 2,
    queryFn: async () => {
      const today = new Date();
      if (settings.locationMode === "manual" && settings.cityName) {
        return fetchPrayerTimesByCity(today, settings.cityName, settings.countryName ?? "", settings);
      }
      return fetchPrayerTimes(today, settings.latitude!, settings.longitude!, settings);
    },
  });

  return { ...query, settings, locationStatus };
}

/**
 * useLivePrayerTimes
 * Re-evaluates current/next prayer every 30 seconds
 * without re-fetching the API.
 */
export function useLivePrayerTimes() {
  const base = usePrayerTimes();
  const [live, setLive] = useState<DailyPrayerTimes | undefined>(base.data);

  useEffect(() => {
    if (!base.data) { setLive(undefined); return; }
    const refresh = () => {
      if (!base.data) return;
      const { current, next, nextTime, minutesUntil } = computeLivePrayerState(base.data);
      setLive({ ...base.data, currentPrayer: current, nextPrayer: next, nextPrayerTime: nextTime, minutesUntilNext: minutesUntil });
    };
    refresh();
    const id = setInterval(refresh, 30_000);
    return () => clearInterval(id);
  }, [base.data]);

  return { ...base, live };
}

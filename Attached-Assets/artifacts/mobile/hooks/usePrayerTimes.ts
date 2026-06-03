/**
 * usePrayerTimes.ts (Mobile)
 * TanStack Query wrapper for the AlAdhan API.
 */
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  fetchPrayerTimes,
  fetchPrayerTimesByCity,
  computeLivePrayerState,
  type DailyPrayerTimes,
} from "@/lib/prayer-times";
import { usePrayerSettings } from "@/hooks/usePrayerSettings";

export function usePrayerTimes() {
  const { settings, locationStatus, loaded } = usePrayerSettings();

  const enabled =
    loaded &&
    locationStatus === "granted" &&
    (settings.locationMode === "manual"
      ? Boolean(settings.cityName)
      : settings.latitude !== undefined);

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

  return useQuery<DailyPrayerTimes>({
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
}

export function useLivePrayerTimes() {
  const base = usePrayerTimes();
  const { settings, locationStatus, fetchLocation } = usePrayerSettings();
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

  return { ...base, live, settings, locationStatus, fetchLocation };
}

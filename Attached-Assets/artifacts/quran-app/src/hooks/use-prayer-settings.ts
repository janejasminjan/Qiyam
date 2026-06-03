/**
 * use-prayer-settings.ts
 * Persists PrayerSettings to localStorage and handles location acquisition.
 * Storage key: qiyam_prayer_settings_v1
 */
import { useState, useEffect, useCallback } from "react";
import { type PrayerSettings, DEFAULT_PRAYER_SETTINGS } from "@/lib/prayer-times";

const STORAGE_KEY = "qiyam_prayer_settings_v1";

export type LocationStatus =
  | "idle"
  | "requesting"
  | "granted"
  | "denied"
  | "unavailable"
  | "error";

function load(): PrayerSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PRAYER_SETTINGS;
    return { ...DEFAULT_PRAYER_SETTINGS, ...JSON.parse(raw) } as PrayerSettings;
  } catch {
    return DEFAULT_PRAYER_SETTINGS;
  }
}

function save(s: PrayerSettings) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch { /* quota */ }
}

export function usePrayerSettings() {
  const [settings, _setSettings] = useState<PrayerSettings>(load);
  const [locationStatus, setLocationStatus] = useState<LocationStatus>("idle");

  const setSettings = useCallback((patch: Partial<PrayerSettings>) => {
    _setSettings(prev => {
      const next = { ...prev, ...patch };
      save(next);
      return next;
    });
  }, []);

  /** Request automatic location via Geolocation API. */
  const fetchLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationStatus("unavailable");
      return;
    }
    setLocationStatus("requesting");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setSettings({
          locationMode: "auto",
          latitude: parseFloat(pos.coords.latitude.toFixed(4)),
          longitude: parseFloat(pos.coords.longitude.toFixed(4)),
        });
        setLocationStatus("granted");
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setLocationStatus("denied");
        } else {
          setLocationStatus("error");
        }
      },
      { enableHighAccuracy: false, timeout: 10_000, maximumAge: 3_600_000 },
    );
  }, [setSettings]);

  /** Restore status from existing coordinates on mount. */
  useEffect(() => {
    const s = load();
    if (s.latitude !== undefined && s.longitude !== undefined) {
      setLocationStatus("granted");
    } else if (s.locationMode === "manual" && s.cityName) {
      setLocationStatus("granted");
    }
  }, []);

  return { settings, setSettings, locationStatus, fetchLocation };
}

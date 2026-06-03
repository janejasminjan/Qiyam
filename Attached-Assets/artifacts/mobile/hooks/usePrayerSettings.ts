/**
 * usePrayerSettings.ts (Mobile)
 * Persists PrayerSettings to AsyncStorage and handles location via expo-location.
 */
import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { type PrayerSettings, DEFAULT_PRAYER_SETTINGS } from "@/lib/prayer-times";

const STORAGE_KEY = "qiyam_prayer_settings_v1";

export type LocationStatus =
  | "idle" | "requesting" | "granted" | "denied" | "unavailable" | "error";

async function loadSettings(): Promise<PrayerSettings> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PRAYER_SETTINGS;
    return { ...DEFAULT_PRAYER_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PRAYER_SETTINGS;
  }
}

async function saveSettings(s: PrayerSettings) {
  try { await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {}
}

export function usePrayerSettings() {
  const [settings, _setSettings] = useState<PrayerSettings>(DEFAULT_PRAYER_SETTINGS);
  const [locationStatus, setLocationStatus] = useState<LocationStatus>("idle");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadSettings().then(s => {
      _setSettings(s);
      setLoaded(true);
      if (s.latitude !== undefined) setLocationStatus("granted");
      else if (s.locationMode === "manual" && s.cityName) setLocationStatus("granted");
    });
  }, []);

  const setSettings = useCallback((patch: Partial<PrayerSettings>) => {
    _setSettings(prev => {
      const next = { ...prev, ...patch };
      saveSettings(next);
      return next;
    });
  }, []);

  const fetchLocation = useCallback(async () => {
    setLocationStatus("requesting");
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") { setLocationStatus("denied"); return; }
      const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      setSettings({
        locationMode: "auto",
        latitude: parseFloat(pos.coords.latitude.toFixed(4)),
        longitude: parseFloat(pos.coords.longitude.toFixed(4)),
      });
      setLocationStatus("granted");
    } catch {
      setLocationStatus("error");
    }
  }, [setSettings]);

  return { settings, setSettings, locationStatus, fetchLocation, loaded };
}

/**
 * prayer-settings-section.tsx
 * Prayer-time settings card for the web Settings page.
 * Handles location mode, madhab, calculation method, and notifications.
 */
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Check, MapPin, Navigation, Bell, BellOff, Loader2, AlertCircle } from "lucide-react";
import { usePrayerSettings } from "@/hooks/use-prayer-settings";
import { usePrayerNotifications } from "@/hooks/use-prayer-notifications";
import { CALCULATION_METHODS, type CalculationMethodKey, type Madhab } from "@/lib/prayer-times";

const MADHABS: { id: Madhab; label: string; desc: string }[] = [
  { id: "hanafi",  label: "Hanafi",  desc: "Later Asr (shadow factor 2)" },
  { id: "shafi",   label: "Shafi'i", desc: "Standard Asr (shadow factor 1)" },
  { id: "maliki",  label: "Maliki",  desc: "Standard Asr (shadow factor 1)" },
  { id: "hanbali", label: "Hanbali", desc: "Standard Asr (shadow factor 1)" },
  { id: "jafari",  label: "Jafari",  desc: "Tehran method, distinct Fajr/Isha" },
];

const METHODS = Object.entries(CALCULATION_METHODS).map(([key, val]) => ({
  id: key as CalculationMethodKey,
  label: val.label,
  region: val.region,
}));

const LEAD_OPTIONS = [
  { value: 0,  label: "At prayer time" },
  { value: 5,  label: "5 min before"  },
  { value: 10, label: "10 min before" },
  { value: 15, label: "15 min before" },
];

const FIVE_PRAYERS = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

export function PrayerSettingsSection() {
  const { settings, setSettings, locationStatus, fetchLocation } = usePrayerSettings();
  const { requestPermission } = usePrayerNotifications();

  const [cityInput, setCityInput] = useState(settings.cityName ?? "");
  const [countryInput, setCountryInput] = useState(settings.countryName ?? "");

  const handleSaveManualLocation = () => {
    setSettings({
      locationMode: "manual",
      cityName: cityInput.trim(),
      countryName: countryInput.trim(),
      latitude: undefined,
      longitude: undefined,
    });
  };

  const handleEnableNotifications = async () => {
    if (!settings.notificationsEnabled) {
      const perm = await requestPermission();
      if (perm !== "granted") {
        alert("Notification permission denied. Please allow notifications in your browser settings.");
        return;
      }
    }
    setSettings({ notificationsEnabled: !settings.notificationsEnabled });
  };

  const togglePrayer = (prayer: string, val: boolean) => {
    setSettings({
      notificationPerPrayer: { ...settings.notificationPerPrayer, [prayer]: val },
    });
  };

  const statusBadge = () => {
    if (locationStatus === "granted") return <Badge variant="outline" className="text-emerald-600 border-emerald-500/50 text-[10px]">✓ Location set</Badge>;
    if (locationStatus === "denied") return <Badge variant="outline" className="text-destructive border-destructive/50 text-[10px]">Denied</Badge>;
    if (locationStatus === "requesting") return <Badge variant="outline" className="text-[10px]">Requesting…</Badge>;
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          Prayer Times
        </CardTitle>
        <CardDescription>
          Configure your location, school of thought, and prayer notification preferences.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-7">

        {/* ── Location ─────────────────────────────────────────── */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold">Location</Label>
            {statusBadge()}
          </div>

          {/* Mode toggle */}
          <div className="flex gap-2">
            {(["auto", "manual"] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setSettings({ locationMode: mode })}
                className={`flex-1 rounded-lg border py-2 text-sm font-medium transition-all ${
                  settings.locationMode === mode
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/40"
                }`}
              >
                {mode === "auto" ? "Automatic" : "Manual (City)"}
              </button>
            ))}
          </div>

          {settings.locationMode === "auto" ? (
            <div className="space-y-2">
              <Button
                size="sm"
                variant="outline"
                className="w-full gap-2"
                onClick={fetchLocation}
                disabled={locationStatus === "requesting"}
              >
                {locationStatus === "requesting"
                  ? <><Loader2 className="h-4 w-4 animate-spin" />Requesting…</>
                  : <><Navigation className="h-4 w-4" />Detect My Location</>}
              </Button>
              {locationStatus === "denied" && (
                <div className="flex items-center gap-2 text-xs text-destructive">
                  <AlertCircle className="h-3.5 w-3.5" />
                  Location denied. Try Manual mode and enter your city.
                </div>
              )}
              {settings.latitude !== undefined && (
                <p className="text-xs text-muted-foreground">
                  Coordinates: {settings.latitude}°, {settings.longitude}°
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label className="text-xs">City</Label>
                  <Input
                    placeholder="e.g. London"
                    value={cityInput}
                    onChange={e => setCityInput(e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Country</Label>
                  <Input
                    placeholder="e.g. UK"
                    value={countryInput}
                    onChange={e => setCountryInput(e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="w-full"
                onClick={handleSaveManualLocation}
                disabled={!cityInput.trim()}
              >
                Save Location
              </Button>
              {settings.cityName && (
                <p className="text-xs text-muted-foreground">
                  Current: {settings.cityName}{settings.countryName ? `, ${settings.countryName}` : ""}
                </p>
              )}
            </div>
          )}
        </div>

        {/* ── Madhab ───────────────────────────────────────────── */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">School of Thought (Madhab)</Label>
          <p className="text-xs text-muted-foreground">
            Affects Asr prayer time. Jafari also uses the Tehran calculation method.
          </p>
          <div className="space-y-1.5">
            {MADHABS.map(m => (
              <button
                key={m.id}
                onClick={() => setSettings({ madhab: m.id })}
                className={`w-full flex items-center justify-between rounded-lg border px-4 py-2.5 text-left transition-all ${
                  settings.madhab === m.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/40 hover:bg-muted/40"
                }`}
              >
                <div>
                  <span className={`text-sm font-medium ${settings.madhab === m.id ? "text-primary" : "text-foreground"}`}>
                    {m.label}
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">{m.desc}</span>
                </div>
                {settings.madhab === m.id && <Check className="h-4 w-4 text-primary flex-shrink-0" />}
              </button>
            ))}
          </div>
        </div>

        {/* ── Calculation Method ────────────────────────────────── */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Calculation Method</Label>
          <p className="text-xs text-muted-foreground">
            Sets Fajr and Isha angle parameters. Jafari overrides this to Tehran.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {METHODS.map(m => (
              <button
                key={m.id}
                onClick={() => setSettings({ calculationMethod: m.id })}
                className={`flex items-center justify-between rounded-lg border px-3 py-2 text-left transition-all ${
                  settings.calculationMethod === m.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/40 hover:bg-muted/40"
                }`}
              >
                <div>
                  <div className={`text-xs font-medium ${settings.calculationMethod === m.id ? "text-primary" : "text-foreground"}`}>
                    {m.label}
                  </div>
                  <div className="text-[10px] text-muted-foreground">{m.region}</div>
                </div>
                {settings.calculationMethod === m.id && <Check className="h-3.5 w-3.5 text-primary flex-shrink-0" />}
              </button>
            ))}
          </div>
        </div>

        {/* ── Suhoor rule ───────────────────────────────────────── */}
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-sm font-semibold">Suhoor cutoff</Label>
            <p className="text-xs text-muted-foreground mt-0.5">
              {settings.suhoorUsesImsak ? "Uses Imsak (≈10 min before Fajr)" : "Uses Fajr time"}
            </p>
          </div>
          <Switch
            checked={settings.suhoorUsesImsak}
            onCheckedChange={v => setSettings({ suhoorUsesImsak: v })}
          />
        </div>

        {/* ── Notifications ─────────────────────────────────────── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {settings.notificationsEnabled
                ? <Bell className="h-4 w-4 text-primary" />
                : <BellOff className="h-4 w-4 text-muted-foreground" />}
              <Label className="text-sm font-semibold cursor-pointer">Prayer Notifications</Label>
            </div>
            <Switch
              checked={settings.notificationsEnabled}
              onCheckedChange={handleEnableNotifications}
            />
          </div>

          {settings.notificationsEnabled && (
            <div className="pl-6 space-y-4 border-l-2 border-primary/20">
              {/* Lead time */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Notify me…</Label>
                <div className="flex flex-wrap gap-2">
                  {LEAD_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setSettings({ notificationLeadMinutes: opt.value })}
                      className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                        settings.notificationLeadMinutes === opt.value
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Per-prayer toggles */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Individual prayers</Label>
                <div className="space-y-1.5">
                  {FIVE_PRAYERS.map(prayer => (
                    <div key={prayer} className="flex items-center justify-between">
                      <span className="text-sm text-foreground">{prayer}</span>
                      <Switch
                        checked={settings.notificationPerPrayer?.[prayer] !== false}
                        onCheckedChange={v => togglePrayer(prayer, v)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

      </CardContent>
    </Card>
  );
}

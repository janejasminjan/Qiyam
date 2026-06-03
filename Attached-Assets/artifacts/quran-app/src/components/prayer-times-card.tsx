/**
 * prayer-times-card.tsx
 * Dashboard card that shows all prayer times, extra Islamic windows,
 * the current/next prayer, and a live countdown.
 */
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  MapPin, Clock, ChevronDown, ChevronUp, Loader2,
  AlertCircle, Navigation, Settings2,
} from "lucide-react";
import { useLivePrayerTimes } from "@/hooks/use-prayer-times";
import { usePrayerSettings } from "@/hooks/use-prayer-settings";
import { usePrayerNotifications } from "@/hooks/use-prayer-notifications";
import {
  formatTime12h, formatCountdown,
  type CalculationMethodKey, CALCULATION_METHODS,
} from "@/lib/prayer-times";

/* ── Prayer rows ─────────────────────────────────────────────── */
const FIVE_PRAYERS = [
  { key: "Fajr",    field: "fajr"    as const, color: "text-sky-500"    },
  { key: "Dhuhr",   field: "dhuhr"   as const, color: "text-amber-500"  },
  { key: "Asr",     field: "asr"     as const, color: "text-orange-500" },
  { key: "Maghrib", field: "maghrib" as const, color: "text-rose-500"   },
  { key: "Isha",    field: "isha"    as const, color: "text-indigo-500" },
];

const EXTRA_TIMES = [
  { label: "Ishraq",      startF: "ishraqStart"   as const, endF: "ishraqEnd"   as const, emoji: "🌅" },
  { label: "Chasht",      startF: "chashtStart"   as const, endF: "chashtEnd"   as const, emoji: "☀️" },
  { label: "Zawal",       startF: "zawalStart"    as const, endF: "zawalEnd"    as const, emoji: "⚠️" },
  { label: "Tahajjud",    startF: "tahajjudStart" as const, endF: "tahajjudEnd" as const, emoji: "🌙" },
  { label: "Suhoor ends", startF: "suhoorTime"    as const, endF: null,                   emoji: "🌄" },
  { label: "Iftar",       startF: "iftarTime"     as const, endF: null,                   emoji: "🍽️" },
] as const;

const MADHAB_LABELS: Record<string, string> = {
  hanafi: "Hanafi", shafi: "Shafi'i", maliki: "Maliki",
  hanbali: "Hanbali", jafari: "Jafari",
};

/* ── Sub-components ──────────────────────────────────────────── */

function Skeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-6 bg-muted/60 rounded w-1/3" />
      <div className="h-14 bg-muted/40 rounded-lg w-full" />
      {[0,1,2,3,4].map(i => (
        <div key={i} className="h-8 bg-muted/30 rounded w-full" />
      ))}
    </div>
  );
}

function SetupPrompt({ onFetch, locationStatus, locationMode }: {
  onFetch: () => void;
  locationStatus: string;
  locationMode: "auto" | "manual";
}) {
  return (
    <div className="flex flex-col items-center gap-3 py-8 text-center">
      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
        <MapPin className="h-6 w-6 text-primary" />
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">Prayer times need your location</p>
        <p className="text-xs text-muted-foreground mt-1">
          {locationStatus === "denied"
            ? "Location was denied. Enable it in your browser, or set a city in Settings."
            : locationMode === "manual"
            ? "Set your city in Settings → Prayer Times."
            : "Allow location access to calculate accurate prayer times."}
        </p>
      </div>
      {locationStatus !== "denied" && locationMode === "auto" && (
        <Button size="sm" onClick={onFetch} disabled={locationStatus === "requesting"} className="gap-2">
          {locationStatus === "requesting"
            ? <><Loader2 className="h-4 w-4 animate-spin" />Requesting…</>
            : <><Navigation className="h-4 w-4" />Allow Location</>}
        </Button>
      )}
      <Button asChild variant="ghost" size="sm" className="text-xs text-muted-foreground gap-1">
        <Link href="/settings"><Settings2 className="h-3.5 w-3.5" />Open Settings</Link>
      </Button>
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────── */

export function PrayerTimesCard() {
  const { settings, fetchLocation, locationStatus } = usePrayerSettings();
  const { live, isLoading, isError, refetch } = useLivePrayerTimes();
  const [showExtra, setShowExtra] = useState(false);

  usePrayerNotifications();

  const isSetup = locationStatus === "granted" || (settings.locationMode === "manual" && settings.cityName);
  const methodLabel = CALCULATION_METHODS[settings.calculationMethod as CalculationMethodKey]?.label ?? settings.calculationMethod;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-card to-muted/30">
        <div className="h-[3px] bg-gradient-to-r from-sky-500 via-indigo-500 to-primary" />

        <CardHeader className="pb-2 pt-4 px-5 md:px-7">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Prayer Times
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px] font-normal text-muted-foreground border-border/60 hidden sm:inline-flex">
                {MADHAB_LABELS[settings.madhab]} · {methodLabel}
              </Badge>
              <Button asChild variant="ghost" size="icon" className="h-7 w-7">
                <Link href="/settings"><Settings2 className="h-3.5 w-3.5 text-muted-foreground/60" /></Link>
              </Button>
            </div>
          </div>
          {live?.locationLabel && (
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
              <MapPin className="h-3 w-3" />{live.locationLabel}
            </div>
          )}
        </CardHeader>

        <CardContent className="px-5 md:px-7 pb-5 space-y-4">
          {!isSetup ? (
            <SetupPrompt
              onFetch={fetchLocation}
              locationStatus={locationStatus}
              locationMode={settings.locationMode}
            />
          ) : isLoading ? (
            <Skeleton />
          ) : isError ? (
            <div className="flex flex-col items-center gap-2 py-4 text-center">
              <AlertCircle className="h-6 w-6 text-destructive/60" />
              <p className="text-sm text-muted-foreground">Could not load prayer times</p>
              <Button variant="ghost" size="sm" className="text-xs" onClick={() => refetch()}>Retry</Button>
            </div>
          ) : live ? (
            <>
              {/* Current / Next prayer banner */}
              <div className="rounded-xl bg-primary/5 border border-primary/15 p-3.5 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium mb-0.5">Current prayer</div>
                  <div className="text-xl font-bold text-primary">{live.currentPrayer}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium mb-0.5">
                    Next · {live.nextPrayer}
                  </div>
                  <div className="text-sm font-semibold text-foreground">
                    {formatTime12h(live.nextPrayerTime)}
                  </div>
                  <div className="text-xs text-primary font-medium">
                    in {formatCountdown(live.minutesUntilNext)}
                  </div>
                </div>
              </div>

              {/* Five prayers */}
              <div className="space-y-1">
                {FIVE_PRAYERS.map(({ key, field, color }) => {
                  const isCurrent = live.currentPrayer === key;
                  return (
                    <div
                      key={key}
                      className={`flex items-center justify-between rounded-lg px-3 py-2 transition-colors ${
                        isCurrent
                          ? "bg-primary/10 border border-primary/20"
                          : "hover:bg-muted/40"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isCurrent && (
                          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                        )}
                        <span className={`text-sm font-medium ${isCurrent ? "text-primary" : "text-foreground"}`}>
                          {key}
                        </span>
                      </div>
                      <span className={`text-sm font-mono tabular-nums ${isCurrent ? "text-primary font-semibold" : "text-muted-foreground"}`}>
                        {formatTime12h(live[field])}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Sunrise row */}
              <div className="flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-muted/40 transition-colors">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <span>🌅</span> Sunrise
                </span>
                <span className="text-sm text-muted-foreground font-mono tabular-nums">{formatTime12h(live.sunrise)}</span>
              </div>

              {/* Extra times toggle */}
              <button
                onClick={() => setShowExtra(v => !v)}
                className="w-full flex items-center justify-between text-xs text-muted-foreground hover:text-foreground transition-colors py-1.5 px-1"
              >
                <span className="font-medium">Additional Islamic Times</span>
                {showExtra ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              </button>

              {showExtra && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-1 pt-1"
                >
                  {EXTRA_TIMES.map(({ label, startF, endF, emoji }) => {
                    const start = live[startF];
                    const end = endF ? live[endF] : undefined;
                    return (
                      <div key={label} className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-muted/30 transition-colors">
                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                          <span>{emoji}</span> {label}
                        </span>
                        <span className="text-xs text-muted-foreground font-mono tabular-nums">
                          {formatTime12h(start)}{end ? ` – ${formatTime12h(end)}` : ""}
                        </span>
                      </div>
                    );
                  })}

                  <div className="mt-2 pt-2 border-t border-border/40">
                    <p className="text-[10px] text-muted-foreground/70 leading-relaxed px-1">
                      Ishraq: 15–45 min after sunrise · Chasht: 45 min after sunrise to 15 min before Dhuhr ·
                      Zawal: 15 min before to 5 min after Dhuhr (avoid optional prayers) ·
                      Tahajjud: last third of night · Iftar = Maghrib · Suhoor = Imsak
                    </p>
                  </div>
                </motion.div>
              )}
            </>
          ) : null}
        </CardContent>
      </Card>
    </motion.div>
  );
}

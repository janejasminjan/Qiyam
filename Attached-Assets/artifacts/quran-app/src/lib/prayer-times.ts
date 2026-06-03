/**
 * prayer-times.ts
 * ═══════════════════════════════════════════════════════════════════
 * Core Islamic prayer-time library for Qiyam.
 *
 * Data source  : AlAdhan API  (aladhan.com) — free, no API key needed.
 * Docs         : https://aladhan.com/prayer-times-api
 *
 * Architecture
 * ────────────
 * 1. fetchPrayerTimes / fetchPrayerTimesByCity   → calls AlAdhan
 * 2. derivePrayerTimes                           → adds extra windows
 * 3. getCurrentPrayer / getNextPrayer            → live state helpers
 * 4. buildSmartSuggestions                       → contextual suggestions
 *
 * Extra-time derivation formulas (all documented inline):
 *   Iftar       = Maghrib time
 *   Suhoor      = Imsak time (AlAdhan provides this — ~10 min before Fajr)
 *   Ishraq      = Sunrise + 15 min → Sunrise + 45 min
 *   Chasht/Duha = Sunrise + 45 min → Dhuhr − 15 min
 *   Zawal       = Dhuhr − 15 min  → Dhuhr + 5 min
 *   Tahajjud    = Night last-third start → Fajr − 10 min
 *                 where last-third start = Maghrib + ⌊(FajrNight − Maghrib) × 2/3⌋
 * ═══════════════════════════════════════════════════════════════════
 */

/* ── Types ──────────────────────────────────────────────────────── */

export type Madhab = "hanafi" | "shafi" | "maliki" | "hanbali" | "jafari";

export type CalculationMethodKey =
  | "isna"      // 2  — Islamic Society of North America
  | "mwl"       // 3  — Muslim World League
  | "mecca"     // 4  — Umm al-Qura, Mecca
  | "karachi"   // 1  — University of Islamic Sciences, Karachi
  | "egyptian"  // 5  — Egyptian General Authority of Survey
  | "diyanet"   // 13 — Diyanet İşleri Başkanlığı, Turkey
  | "tehran"    // 7  — Institute of Geophysics, University of Tehran (Jafari)
  | "gulf"      // 8  — Gulf Region
  | "qatar"     // 10 — Qatar
  | "singapore"; // 11 — Majlis Ugama Islam Singapura

export const CALCULATION_METHODS: Record<CalculationMethodKey, { id: number; label: string; region: string }> = {
  isna:      { id: 2,  label: "ISNA",                region: "North America" },
  mwl:       { id: 3,  label: "Muslim World League",  region: "Europe / Africa" },
  mecca:     { id: 4,  label: "Umm al-Qura",          region: "Saudi Arabia" },
  karachi:   { id: 1,  label: "Karachi",               region: "South Asia" },
  egyptian:  { id: 5,  label: "Egyptian Authority",    region: "Egypt" },
  diyanet:   { id: 13, label: "Diyanet",               region: "Turkey" },
  tehran:    { id: 7,  label: "Tehran",                region: "Iran / Jafari" },
  gulf:      { id: 8,  label: "Gulf Region",           region: "Gulf States" },
  qatar:     { id: 10, label: "Qatar",                 region: "Qatar" },
  singapore: { id: 11, label: "Singapore MUIS",        region: "Southeast Asia" },
};

export interface PrayerSettings {
  locationMode: "auto" | "manual";
  latitude?: number;
  longitude?: number;
  cityName?: string;
  countryName?: string;
  timezone?: string;
  madhab: Madhab;
  calculationMethod: CalculationMethodKey;
  notificationsEnabled: boolean;
  notificationPerPrayer: Record<string, boolean>;
  notificationLeadMinutes: number;
  suhoorUsesImsak: boolean;
  ishraqOffsetMinutes: number;
}

export interface DailyPrayerTimes {
  date: string;
  locationLabel: string;
  // Core 5 + sunrise
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  imsak: string;
  midnight: string;
  // ─── Derived extra windows ───────────────────────────────
  // Ishraq:  Sunrise + 15 min → Sunrise + 45 min
  ishraqStart: string;
  ishraqEnd: string;
  // Chasht (Duha): Sunrise + 45 min → Dhuhr − 15 min
  chashtStart: string;
  chashtEnd: string;
  // Zawal (prohibited zone at solar noon): Dhuhr − 15 min → Dhuhr + 5 min
  zawalStart: string;
  zawalEnd: string;
  // Tahajjud: last-third of night → Fajr − 10 min
  tahajjudStart: string;
  tahajjudEnd: string;
  // Iftar = Maghrib; Suhoor = Imsak (or Fajr)
  iftarTime: string;
  suhoorTime: string;
  // ─── Live state (recomputed by helpers, not stored) ──────
  currentPrayer: string;
  nextPrayer: string;
  nextPrayerTime: string;
  minutesUntilNext: number;
}

/* ── Default settings ───────────────────────────────────────────── */

export const DEFAULT_PRAYER_SETTINGS: PrayerSettings = {
  locationMode: "auto",
  madhab: "shafi",
  calculationMethod: "mwl",
  notificationsEnabled: false,
  notificationPerPrayer: {
    Fajr: true, Dhuhr: true, Asr: true, Maghrib: true, Isha: true,
  },
  notificationLeadMinutes: 0,
  suhoorUsesImsak: true,
  ishraqOffsetMinutes: 15,
};

/* ── Internal time-arithmetic helpers ──────────────────────────── */

/** Parse "HH:MM" → minutes since midnight (handles "HH:MM (EDT)" suffix). */
export function parseTime(raw: string): number {
  const clean = raw.split(" ")[0].trim();
  const [hh, mm] = clean.split(":").map(Number);
  return hh * 60 + mm;
}

/** Format minutes since midnight → "HH:MM" (wraps at 1440). */
export function formatTime(totalMinutes: number): string {
  const safe = ((totalMinutes % 1440) + 1440) % 1440;
  const h = Math.floor(safe / 60);
  const m = safe % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

/** Format "HH:MM" (24h) → "h:mm AM/PM". */
export function formatTime12h(time24: string): string {
  const [hh, mm] = time24.split(":").map(Number);
  const period = hh < 12 ? "AM" : "PM";
  const h = hh % 12 || 12;
  return `${h}:${mm.toString().padStart(2, "0")} ${period}`;
}

/** Minutes since midnight for the current local time. */
function nowMinutes(): number {
  const d = new Date();
  return d.getHours() * 60 + d.getMinutes();
}

/* ── AlAdhan → school / method mapping ─────────────────────────── */

/**
 * Convert user-facing madhab + calculation-method selections into the
 * AlAdhan query params `method` and `school`.
 *
 * school=0  → Shafi / Maliki / Hanbali Asr rule (shadow factor 1)
 * school=1  → Hanafi Asr rule (shadow factor 2, later Asr)
 * method=7  → Tehran method (used for Jafari, includes distinct Fajr/Isha angles)
 */
function toAlAdhanParams(settings: PrayerSettings): { method: number; school: number } {
  const school = settings.madhab === "hanafi" ? 1 : 0;
  let method = CALCULATION_METHODS[settings.calculationMethod].id;
  // Jafari overrides the method to Tehran regardless of user method selection
  if (settings.madhab === "jafari") method = 7;
  return { method, school };
}

/* ── Raw AlAdhan fetch ──────────────────────────────────────────── */

interface AlAdhanTimings {
  Fajr: string; Sunrise: string; Dhuhr: string; Asr: string;
  Sunset: string; Maghrib: string; Isha: string; Imsak: string; Midnight: string;
}

async function fetchAlAdhan(url: string): Promise<AlAdhanTimings> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`AlAdhan API error: ${res.status}`);
  const json = await res.json();
  if (json.code !== 200) throw new Error(`AlAdhan: ${json.status}`);
  return json.data.timings as AlAdhanTimings;
}

/** Fetch prayer times for a specific date by lat/lon. */
export async function fetchPrayerTimes(
  date: Date,
  lat: number,
  lon: number,
  settings: PrayerSettings,
): Promise<DailyPrayerTimes> {
  const { method, school } = toAlAdhanParams(settings);
  const dd = date.getDate().toString().padStart(2, "0");
  const mm = (date.getMonth() + 1).toString().padStart(2, "0");
  const yyyy = date.getFullYear();
  const dateStr = `${dd}-${mm}-${yyyy}`;

  const url =
    `https://api.aladhan.com/v1/timings/${dateStr}` +
    `?latitude=${lat}&longitude=${lon}&method=${method}&school=${school}`;

  const timings = await fetchAlAdhan(url);
  const locationLabel = `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`;
  return derivePrayerTimes(timings, locationLabel, settings);
}

/** Fetch prayer times for a specific date by city + country name. */
export async function fetchPrayerTimesByCity(
  date: Date,
  city: string,
  country: string,
  settings: PrayerSettings,
): Promise<DailyPrayerTimes> {
  const { method, school } = toAlAdhanParams(settings);
  const dd = date.getDate().toString().padStart(2, "0");
  const mm = (date.getMonth() + 1).toString().padStart(2, "0");
  const yyyy = date.getFullYear();
  const dateStr = `${dd}-${mm}-${yyyy}`;

  const url =
    `https://api.aladhan.com/v1/timingsByCity/${dateStr}` +
    `?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}` +
    `&method=${method}&school=${school}`;

  const timings = await fetchAlAdhan(url);
  const locationLabel = `${city}, ${country}`;
  return derivePrayerTimes(timings, locationLabel, settings);
}

/* ── Extra-time derivation ──────────────────────────────────────── */

/**
 * Derives all extra Islamic time windows from the core AlAdhan timings.
 *
 * ─── Ishraq (Shuruq prayer) ─────────────────────────────────────
 * Start: Sunrise + 15 min  (sun needs to rise sufficiently above horizon)
 * End  : Sunrise + 45 min
 * Source: Majority of scholars place ishraq ~15–20 min after sunrise.
 *
 * ─── Chasht / Duha ──────────────────────────────────────────────
 * Start: Sunrise + 45 min  (after Ishraq window ends)
 * End  : Dhuhr − 15 min    (must finish before Zawal begins)
 * Source: Duha continues until the sun declines from its zenith.
 *
 * ─── Zawal (prohibited time) ────────────────────────────────────
 * Start: Dhuhr − 15 min   (sun approaching zenith, prayer discouraged)
 * End  : Dhuhr + 5 min    (Dhuhr prayer becomes valid after zenith)
 * Source: "Prayer is forbidden when the sun is at its zenith." (Hadith)
 *
 * ─── Tahajjud (night prayer) ────────────────────────────────────
 * The preferred time is the last third of the night:
 *   Night = Maghrib → Fajr (next day)
 *   LastThirdStart = Maghrib + floor(NightDuration × 2/3)
 * Start: LastThirdStart
 * End  : Fajr − 10 min
 * Source: "Our Lord descends to the lowest heaven in the last third of
 *          the night." (Sahih Bukhari 1145)
 *
 * ─── Iftar ──────────────────────────────────────────────────────
 * Iftar = Maghrib time exactly (breaking fast at sunset).
 *
 * ─── Suhoor ─────────────────────────────────────────────────────
 * Default: Imsak time (AlAdhan: ~10 min before Fajr — recommended cutoff)
 * Alternate: Fajr time (some scholars allow until Fajr adhan)
 * Controlled by settings.suhoorUsesImsak.
 */
export function derivePrayerTimes(
  raw: AlAdhanTimings,
  locationLabel: string,
  settings: PrayerSettings,
): DailyPrayerTimes {
  const fajrM    = parseTime(raw.Fajr);
  const sunriseM = parseTime(raw.Sunrise);
  const dhuhrM   = parseTime(raw.Dhuhr);
  const asrM     = parseTime(raw.Asr);
  const maghribM = parseTime(raw.Maghrib);
  const ishaM    = parseTime(raw.Isha);

  // Ishraq
  const ishraqStartM = sunriseM + (settings.ishraqOffsetMinutes ?? 15);
  const ishraqEndM   = sunriseM + 45;

  // Chasht / Duha
  const chashtStartM = sunriseM + 45;
  const chashtEndM   = dhuhrM - 15;

  // Zawal
  const zawalStartM = dhuhrM - 15;
  const zawalEndM   = dhuhrM + 5;

  // Tahajjud — last third of night (Maghrib → Fajr next day)
  const fajrNightM      = fajrM + 1440;            // Fajr expressed as next-day minutes
  const nightDuration   = fajrNightM - maghribM;
  const lastThirdStartM = maghribM + Math.floor(nightDuration * 2 / 3);
  const tahajjudStartM  = lastThirdStartM;
  const tahajjudEndM    = fajrNightM - 10;

  const base: Omit<DailyPrayerTimes, "currentPrayer" | "nextPrayer" | "nextPrayerTime" | "minutesUntilNext"> = {
    date: new Date().toISOString().slice(0, 10),
    locationLabel,
    fajr:    raw.Fajr.split(" ")[0],
    sunrise: raw.Sunrise.split(" ")[0],
    dhuhr:   raw.Dhuhr.split(" ")[0],
    asr:     raw.Asr.split(" ")[0],
    maghrib: raw.Maghrib.split(" ")[0],
    isha:    raw.Isha.split(" ")[0],
    imsak:   raw.Imsak.split(" ")[0],
    midnight: raw.Midnight.split(" ")[0],
    ishraqStart: formatTime(ishraqStartM),
    ishraqEnd:   formatTime(ishraqEndM),
    chashtStart:  formatTime(chashtStartM),
    chashtEnd:    formatTime(chashtEndM),
    zawalStart:  formatTime(zawalStartM),
    zawalEnd:    formatTime(zawalEndM),
    tahajjudStart: formatTime(tahajjudStartM),
    tahajjudEnd:   formatTime(tahajjudEndM),
    iftarTime:  raw.Maghrib.split(" ")[0],
    suhoorTime: settings.suhoorUsesImsak ? raw.Imsak.split(" ")[0] : raw.Fajr.split(" ")[0],
  };

  const { current, next, nextTime, minutesUntil } = computeLivePrayerState(base as DailyPrayerTimes);

  return {
    ...base,
    currentPrayer: current,
    nextPrayer: next,
    nextPrayerTime: nextTime,
    minutesUntilNext: minutesUntil,
  } as DailyPrayerTimes;
}

/* ── Live prayer-state helpers ──────────────────────────────────── */

const FIVE_PRAYERS = [
  { key: "Fajr",    field: "fajr" },
  { key: "Dhuhr",   field: "dhuhr" },
  { key: "Asr",     field: "asr" },
  { key: "Maghrib", field: "maghrib" },
  { key: "Isha",    field: "isha" },
] as const;

export function computeLivePrayerState(times: DailyPrayerTimes): {
  current: string;
  next: string;
  nextTime: string;
  minutesUntil: number;
} {
  const now = nowMinutes();

  // Walk prayers in order; current = last one that has already passed
  let current = "Isha"; // default: if before Fajr it's still Isha from yesterday
  for (const p of FIVE_PRAYERS) {
    if (now >= parseTime(times[p.field])) current = p.key;
  }

  // Next prayer = first one that hasn't started yet
  for (const p of FIVE_PRAYERS) {
    const pMins = parseTime(times[p.field]);
    if (now < pMins) {
      return {
        current,
        next: p.key,
        nextTime: times[p.field],
        minutesUntil: pMins - now,
      };
    }
  }

  // After Isha → next is tomorrow's Fajr
  const fajrMins = parseTime(times.fajr);
  return {
    current: "Isha",
    next: "Fajr",
    nextTime: times.fajr,
    minutesUntil: (1440 - now) + fajrMins,
  };
}

/** Format a minute count as "2h 15m" or "45m". */
export function formatCountdown(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

/* ── Smart contextual suggestions ──────────────────────────────── */

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  route: string;
  type: "quran" | "hadith" | "dhikr" | "prayer" | "info";
  emoji: string;
  priority: number;
}

/**
 * Build a ranked list of smart suggestions based on:
 * • Day of week (Friday → Al-Kahf)
 * • Current prayer window (Ishraq, Chasht, Zawal, Tahajjud, etc.)
 * • Time of day (morning adhkar, evening adhkar)
 * • Available extra-time windows
 *
 * Returns at most 3 suggestions, highest-priority first.
 */
export function buildSmartSuggestions(times?: DailyPrayerTimes): Suggestion[] {
  const suggestions: Suggestion[] = [];
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0=Sun … 5=Fri … 6=Sat
  const nowM = nowMinutes();

  /* ── Friday special ── */
  if (dayOfWeek === 5) {
    suggestions.push({
      id: "friday-kahf",
      title: "Read Surah Al-Kahf",
      description: "Reciting Al-Kahf on Friday brings light shining until the next Friday",
      route: "/quran/18",
      type: "quran",
      emoji: "🕌",
      priority: 10,
    });
  }

  if (times) {
    const fajrM    = parseTime(times.fajr);
    const sunriseM = parseTime(times.sunrise);
    const asrM     = parseTime(times.asr);
    const maghribM = parseTime(times.maghrib);
    const ishaM    = parseTime(times.isha);
    const ishraqSM = parseTime(times.ishraqStart);
    const ishraqEM = parseTime(times.ishraqEnd);
    const chashtSM = parseTime(times.chashtStart);
    const chashtEM = parseTime(times.chashtEnd);
    const zawalSM  = parseTime(times.zawalStart);
    const zawalEM  = parseTime(times.zawalEnd);
    const tahajSM  = parseTime(times.tahajjudStart);

    /* Tahajjud window (last third of night — wraps past midnight) */
    const inTahajjud =
      (tahajSM > 720 && (nowM >= tahajSM || nowM < fajrM)) ||
      (tahajSM <= 720 && nowM >= tahajSM && nowM < fajrM);

    if (inTahajjud) {
      suggestions.push({
        id: "tahajjud",
        title: "Tahajjud — Last Third of Night",
        description: "Rise for Tahajjud prayer — the best time to draw near to Allah",
        route: "/dhikr",
        type: "prayer",
        emoji: "🌙",
        priority: 9,
      });
    }

    /* Before Fajr / Suhoor window */
    if (nowM >= fajrM - 30 && nowM < fajrM) {
      suggestions.push({
        id: "suhoor",
        title: "Suhoor Time",
        description: `Suhoor ends at ${formatTime12h(times.suhoorTime)} — eat Suhoor for its blessing`,
        route: "/dhikr",
        type: "info",
        emoji: "🌄",
        priority: 9,
      });
    }

    /* After Fajr → Sunrise: morning adhkar */
    if (nowM >= fajrM && nowM < sunriseM) {
      suggestions.push({
        id: "morning-adhkar",
        title: "Morning Adhkar",
        description: "Recite your morning remembrances — do not miss this blessed time",
        route: "/dhikr",
        type: "dhikr",
        emoji: "🌤",
        priority: 8,
      });
      suggestions.push({
        id: "yasin-morning",
        title: "Read Surah Ya-Sin",
        description: "Heart of the Quran — especially blessed to read in the morning",
        route: "/quran/36",
        type: "quran",
        emoji: "✨",
        priority: 7,
      });
    }

    /* Ishraq window */
    if (nowM >= ishraqSM && nowM <= ishraqEM) {
      suggestions.push({
        id: "ishraq",
        title: "Ishraq Prayer",
        description: "Offer 2 rak'ahs of Ishraq — reward like a complete Hajj and Umrah",
        route: "/dhikr",
        type: "prayer",
        emoji: "🌅",
        priority: 9,
      });
    }

    /* Chasht / Duha window */
    if (nowM >= chashtSM && nowM <= chashtEM) {
      suggestions.push({
        id: "chasht",
        title: "Chasht / Duha Prayer",
        description: "Pray Duha now (2–12 rak'ahs) — sadaqa for every joint in your body",
        route: "/dhikr",
        type: "prayer",
        emoji: "☀️",
        priority: 8,
      });
    }

    /* Zawal — makruh (prohibited) prayer time */
    if (nowM >= zawalSM && nowM <= zawalEM) {
      suggestions.push({
        id: "zawal-notice",
        title: "Zawal — Avoid Optional Prayer",
        description: "The sun is at its zenith. Optional prayers are prohibited until Dhuhr is confirmed",
        route: "/dhikr",
        type: "info",
        emoji: "⚠️",
        priority: 10,
      });
    }

    /* Evening adhkar (Asr → Maghrib) */
    if (nowM >= asrM && nowM < maghribM) {
      suggestions.push({
        id: "evening-adhkar",
        title: "Evening Adhkar",
        description: "Recite your evening remembrances before Maghrib",
        route: "/dhikr",
        type: "dhikr",
        emoji: "🌆",
        priority: 8,
      });
    }

    /* After Maghrib → Isha: Al-Mulk */
    if (nowM >= maghribM && nowM < ishaM) {
      suggestions.push({
        id: "mulk-evening",
        title: "Read Surah Al-Mulk",
        description: "Recite Al-Mulk tonight — it intercedes for its reader in the grave",
        route: "/quran/67",
        type: "quran",
        emoji: "⭐",
        priority: 8,
      });
    }

    /* After Isha: Al-Waqi'ah */
    if (nowM >= ishaM || nowM < fajrM) {
      if (!inTahajjud) {
        suggestions.push({
          id: "waqiah-night",
          title: "Read Surah Al-Waqi'ah",
          description: "Recite Al-Waqi'ah every night — protection from poverty",
          route: "/quran/56",
          type: "quran",
          emoji: "🌙",
          priority: 6,
        });
      }
    }
  }

  /* ── Fallback when no prayer times loaded ── */
  if (suggestions.length === 0) {
    const h = new Date().getHours();
    if (h >= 5 && h < 12) {
      suggestions.push({
        id: "default-morning",
        title: "Morning Reading",
        description: "Start your day with Surah Ya-Sin — the heart of the Quran",
        route: "/quran/36",
        type: "quran",
        emoji: "🌅",
        priority: 5,
      });
    } else if (h >= 12 && h < 17) {
      suggestions.push({
        id: "default-afternoon",
        title: "Read Surah Al-Kahf",
        description: "One of the most blessed surahs to read",
        route: "/quran/18",
        type: "quran",
        emoji: "📖",
        priority: 5,
      });
    } else {
      suggestions.push({
        id: "default-evening",
        title: "Read Surah Al-Mulk",
        description: "Protect yourself with Al-Mulk before sleep",
        route: "/quran/67",
        type: "quran",
        emoji: "🌙",
        priority: 5,
      });
    }
  }

  return suggestions
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 3);
}

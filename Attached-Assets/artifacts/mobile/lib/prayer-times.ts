/**
 * prayer-times.ts (Mobile)
 * Same core logic as the web app — pure TypeScript, no browser APIs.
 * Uses AlAdhan API (free, no key).
 */

export type Madhab = "hanafi" | "shafi" | "maliki" | "hanbali" | "jafari";

export type CalculationMethodKey =
  | "isna" | "mwl" | "mecca" | "karachi" | "egyptian"
  | "diyanet" | "tehran" | "gulf" | "qatar" | "singapore";

export const CALCULATION_METHODS: Record<CalculationMethodKey, { id: number; label: string; region: string }> = {
  isna:      { id: 2,  label: "ISNA",               region: "North America"   },
  mwl:       { id: 3,  label: "Muslim World League", region: "Europe / Africa" },
  mecca:     { id: 4,  label: "Umm al-Qura",         region: "Saudi Arabia"    },
  karachi:   { id: 1,  label: "Karachi",              region: "South Asia"     },
  egyptian:  { id: 5,  label: "Egyptian Authority",   region: "Egypt"          },
  diyanet:   { id: 13, label: "Diyanet",              region: "Turkey"         },
  tehran:    { id: 7,  label: "Tehran",               region: "Iran / Jafari"  },
  gulf:      { id: 8,  label: "Gulf Region",          region: "Gulf States"    },
  qatar:     { id: 10, label: "Qatar",                region: "Qatar"          },
  singapore: { id: 11, label: "Singapore MUIS",       region: "SE Asia"        },
};

export interface PrayerSettings {
  locationMode: "auto" | "manual";
  latitude?: number;
  longitude?: number;
  cityName?: string;
  countryName?: string;
  madhab: Madhab;
  calculationMethod: CalculationMethodKey;
  notificationsEnabled: boolean;
  notificationPerPrayer: Record<string, boolean>;
  notificationLeadMinutes: number;
  suhoorUsesImsak: boolean;
  ishraqOffsetMinutes: number;
}

export const DEFAULT_PRAYER_SETTINGS: PrayerSettings = {
  locationMode: "auto",
  madhab: "shafi",
  calculationMethod: "mwl",
  notificationsEnabled: false,
  notificationPerPrayer: { Fajr: true, Dhuhr: true, Asr: true, Maghrib: true, Isha: true },
  notificationLeadMinutes: 0,
  suhoorUsesImsak: true,
  ishraqOffsetMinutes: 15,
};

export interface DailyPrayerTimes {
  date: string;
  locationLabel: string;
  fajr: string; sunrise: string; dhuhr: string; asr: string; maghrib: string; isha: string;
  imsak: string; midnight: string;
  ishraqStart: string; ishraqEnd: string;
  chashtStart: string; chashtEnd: string;
  zawalStart: string; zawalEnd: string;
  tahajjudStart: string; tahajjudEnd: string;
  iftarTime: string; suhoorTime: string;
  currentPrayer: string; nextPrayer: string; nextPrayerTime: string; minutesUntilNext: number;
}

export function parseTime(raw: string): number {
  const clean = raw.split(" ")[0].trim();
  const [hh, mm] = clean.split(":").map(Number);
  return hh * 60 + mm;
}

export function formatTime(totalMinutes: number): string {
  const safe = ((totalMinutes % 1440) + 1440) % 1440;
  const h = Math.floor(safe / 60);
  const m = safe % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

export function formatTime12h(time24: string): string {
  if (!time24) return "";
  const [hh, mm] = time24.split(":").map(Number);
  const period = hh < 12 ? "AM" : "PM";
  const h = hh % 12 || 12;
  return `${h}:${mm.toString().padStart(2, "0")} ${period}`;
}

export function formatCountdown(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function nowMinutes(): number {
  const d = new Date();
  return d.getHours() * 60 + d.getMinutes();
}

function toAlAdhanParams(s: PrayerSettings): { method: number; school: number } {
  const school = s.madhab === "hanafi" ? 1 : 0;
  let method = CALCULATION_METHODS[s.calculationMethod].id;
  if (s.madhab === "jafari") method = 7;
  return { method, school };
}

interface AlAdhanTimings {
  Fajr: string; Sunrise: string; Dhuhr: string; Asr: string;
  Sunset: string; Maghrib: string; Isha: string; Imsak: string; Midnight: string;
}

async function fetchAlAdhan(url: string): Promise<AlAdhanTimings> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`AlAdhan: ${res.status}`);
  const json = await res.json();
  if (json.code !== 200) throw new Error(`AlAdhan: ${json.status}`);
  return json.data.timings as AlAdhanTimings;
}

export async function fetchPrayerTimes(
  date: Date, lat: number, lon: number, settings: PrayerSettings,
): Promise<DailyPrayerTimes> {
  const { method, school } = toAlAdhanParams(settings);
  const dd   = date.getDate().toString().padStart(2, "0");
  const mm   = (date.getMonth() + 1).toString().padStart(2, "0");
  const yyyy = date.getFullYear();
  const url  =
    `https://api.aladhan.com/v1/timings/${dd}-${mm}-${yyyy}` +
    `?latitude=${lat}&longitude=${lon}&method=${method}&school=${school}`;
  const timings = await fetchAlAdhan(url);
  return derivePrayerTimes(timings, `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`, settings);
}

export async function fetchPrayerTimesByCity(
  date: Date, city: string, country: string, settings: PrayerSettings,
): Promise<DailyPrayerTimes> {
  const { method, school } = toAlAdhanParams(settings);
  const dd   = date.getDate().toString().padStart(2, "0");
  const mm   = (date.getMonth() + 1).toString().padStart(2, "0");
  const yyyy = date.getFullYear();
  const url  =
    `https://api.aladhan.com/v1/timingsByCity/${dd}-${mm}-${yyyy}` +
    `?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}` +
    `&method=${method}&school=${school}`;
  const timings = await fetchAlAdhan(url);
  return derivePrayerTimes(timings, `${city}, ${country}`, settings);
}

export function derivePrayerTimes(
  raw: AlAdhanTimings, locationLabel: string, settings: PrayerSettings,
): DailyPrayerTimes {
  const fajrM    = parseTime(raw.Fajr);
  const sunriseM = parseTime(raw.Sunrise);
  const dhuhrM   = parseTime(raw.Dhuhr);
  const maghribM = parseTime(raw.Maghrib);

  const ishraqOffset = settings.ishraqOffsetMinutes ?? 15;
  const ishraqStartM = sunriseM + ishraqOffset;
  const ishraqEndM   = sunriseM + 45;
  const chashtStartM = sunriseM + 45;
  const chashtEndM   = dhuhrM - 15;
  const zawalStartM  = dhuhrM - 15;
  const zawalEndM    = dhuhrM + 5;

  const fajrNightM      = fajrM + 1440;
  const nightDuration   = fajrNightM - maghribM;
  const lastThirdStartM = maghribM + Math.floor(nightDuration * 2 / 3);
  const tahajjudEndM    = fajrNightM - 10;

  const base = {
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
    ishraqStart: formatTime(ishraqStartM), ishraqEnd: formatTime(ishraqEndM),
    chashtStart:  formatTime(chashtStartM), chashtEnd:  formatTime(chashtEndM),
    zawalStart:  formatTime(zawalStartM),  zawalEnd:  formatTime(zawalEndM),
    tahajjudStart: formatTime(lastThirdStartM), tahajjudEnd: formatTime(tahajjudEndM),
    iftarTime:  raw.Maghrib.split(" ")[0],
    suhoorTime: settings.suhoorUsesImsak ? raw.Imsak.split(" ")[0] : raw.Fajr.split(" ")[0],
  } as Omit<DailyPrayerTimes, "currentPrayer" | "nextPrayer" | "nextPrayerTime" | "minutesUntilNext">;

  const { current, next, nextTime, minutesUntil } = computeLivePrayerState(base as DailyPrayerTimes);
  return { ...base, currentPrayer: current, nextPrayer: next, nextPrayerTime: nextTime, minutesUntilNext: minutesUntil } as DailyPrayerTimes;
}

export function computeLivePrayerState(times: DailyPrayerTimes) {
  const now = nowMinutes();
  const prayers = [
    { key: "Fajr",    mins: parseTime(times.fajr)    },
    { key: "Dhuhr",   mins: parseTime(times.dhuhr)   },
    { key: "Asr",     mins: parseTime(times.asr)     },
    { key: "Maghrib", mins: parseTime(times.maghrib) },
    { key: "Isha",    mins: parseTime(times.isha)    },
  ];

  let current = "Isha";
  for (const p of prayers) { if (now >= p.mins) current = p.key; }

  for (const p of prayers) {
    if (now < p.mins) {
      return { current, next: p.key, nextTime: (times as any)[p.key.toLowerCase()], minutesUntil: p.mins - now };
    }
  }
  const fajrMins = parseTime(times.fajr);
  return { current: "Isha", next: "Fajr", nextTime: times.fajr, minutesUntil: (1440 - now) + fajrMins };
}

export interface Suggestion {
  id: string; title: string; description: string;
  route: string; type: "quran" | "hadith" | "dhikr" | "prayer" | "info";
  emoji: string; priority: number;
}

export function buildSmartSuggestions(times?: DailyPrayerTimes): Suggestion[] {
  const suggestions: Suggestion[] = [];
  const now = new Date();
  const dayOfWeek = now.getDay();
  const nowM = now.getHours() * 60 + now.getMinutes();

  if (dayOfWeek === 5) {
    suggestions.push({ id: "friday-kahf", title: "Read Surah Al-Kahf", description: "Reciting Al-Kahf on Friday brings light until the next Friday", route: "/quran/18", type: "quran", emoji: "🕌", priority: 10 });
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
    const inTahajjud = (tahajSM > 720 && (nowM >= tahajSM || nowM < fajrM)) || (tahajSM <= 720 && nowM >= tahajSM && nowM < fajrM);

    if (inTahajjud) suggestions.push({ id: "tahajjud", title: "Tahajjud — Last Third of Night", description: "Rise for Tahajjud prayer — the best time to draw near to Allah", route: "/dhikr", type: "prayer", emoji: "🌙", priority: 9 });
    if (nowM >= fajrM - 30 && nowM < fajrM) suggestions.push({ id: "suhoor", title: "Suhoor Time", description: `Suhoor ends at ${formatTime12h(times.suhoorTime)} — eat Suhoor for its blessing`, route: "/dhikr", type: "info", emoji: "🌄", priority: 9 });
    if (nowM >= fajrM && nowM < sunriseM) {
      suggestions.push({ id: "morning-adhkar", title: "Morning Adhkar", description: "Recite your morning remembrances after Fajr", route: "/dhikr", type: "dhikr", emoji: "🌤", priority: 8 });
      suggestions.push({ id: "yasin-morning", title: "Read Surah Ya-Sin", description: "Heart of the Quran — especially blessed in the morning", route: "/quran/36", type: "quran", emoji: "✨", priority: 7 });
    }
    if (nowM >= ishraqSM && nowM <= ishraqEM) suggestions.push({ id: "ishraq", title: "Ishraq Prayer", description: "Offer 2 rak'ahs of Ishraq — reward like a complete Hajj and Umrah", route: "/dhikr", type: "prayer", emoji: "🌅", priority: 9 });
    if (nowM >= chashtSM && nowM <= chashtEM) suggestions.push({ id: "chasht", title: "Chasht / Duha Prayer", description: "Pray Duha now (2–12 rak'ahs) — sadaqa for every joint in your body", route: "/dhikr", type: "prayer", emoji: "☀️", priority: 8 });
    if (nowM >= zawalSM && nowM <= zawalEM) suggestions.push({ id: "zawal-notice", title: "Zawal — Avoid Optional Prayer", description: "The sun is at its zenith. Optional prayers are prohibited until Dhuhr", route: "/dhikr", type: "info", emoji: "⚠️", priority: 10 });
    if (nowM >= asrM && nowM < maghribM) suggestions.push({ id: "evening-adhkar", title: "Evening Adhkar", description: "Recite your evening remembrances before Maghrib", route: "/dhikr", type: "dhikr", emoji: "🌆", priority: 8 });
    if (nowM >= maghribM && nowM < ishaM) suggestions.push({ id: "mulk-evening", title: "Read Surah Al-Mulk", description: "Recite Al-Mulk tonight — it intercedes for its reader in the grave", route: "/quran/67", type: "quran", emoji: "⭐", priority: 8 });
    if ((nowM >= ishaM || nowM < fajrM) && !inTahajjud) suggestions.push({ id: "waqiah-night", title: "Read Surah Al-Waqi'ah", description: "Recite Al-Waqi'ah every night — protection from poverty", route: "/quran/56", type: "quran", emoji: "🌙", priority: 6 });
  }

  if (suggestions.length === 0) {
    const h = new Date().getHours();
    if (h >= 5 && h < 12) suggestions.push({ id: "default-morning", title: "Read Surah Ya-Sin", description: "Start your day with the heart of the Quran", route: "/quran/36", type: "quran", emoji: "🌅", priority: 5 });
    else if (h >= 12 && h < 17) suggestions.push({ id: "default-afternoon", title: "Read Surah Al-Kahf", description: "One of the most blessed surahs to read", route: "/quran/18", type: "quran", emoji: "📖", priority: 5 });
    else suggestions.push({ id: "default-evening", title: "Read Surah Al-Mulk", description: "Protect yourself with Al-Mulk before sleep", route: "/quran/67", type: "quran", emoji: "🌙", priority: 5 });
  }

  return suggestions.sort((a, b) => b.priority - a.priority).slice(0, 3);
}

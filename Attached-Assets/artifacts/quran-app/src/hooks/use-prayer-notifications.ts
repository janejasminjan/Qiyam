/**
 * use-prayer-notifications.ts
 * Polls every 30 s and fires browser notifications for upcoming prayers.
 *
 * Strategy (mirrors use-reminders.ts):
 * • Check if current time is within [prayerTime − leadMin, prayerTime − leadMin + 2].
 * • Track shown notifications in sessionStorage so we don't double-fire.
 * • Respects notificationsEnabled + per-prayer toggles.
 */
import { useEffect } from "react";
import { usePrayerSettings } from "@/hooks/use-prayer-settings";
import { usePrayerTimes } from "@/hooks/use-prayer-times";
import { parseTime } from "@/lib/prayer-times";

const SESSION_KEY_PREFIX = "qiyam_prayer_notif";

function alreadyShown(dateStr: string, prayer: string, lead: number): boolean {
  return sessionStorage.getItem(`${SESSION_KEY_PREFIX}_${dateStr}_${prayer}_${lead}`) === "1";
}

function markShown(dateStr: string, prayer: string, lead: number) {
  sessionStorage.setItem(`${SESSION_KEY_PREFIX}_${dateStr}_${prayer}_${lead}`, "1");
}

export function usePrayerNotifications() {
  const { settings } = usePrayerSettings();
  const { data: times } = usePrayerTimes();

  useEffect(() => {
    if (!settings.notificationsEnabled || !times) return;
    if (Notification.permission !== "granted") return;

    const PRAYERS = [
      { name: "Fajr",    time: times.fajr    },
      { name: "Dhuhr",   time: times.dhuhr   },
      { name: "Asr",     time: times.asr     },
      { name: "Maghrib", time: times.maghrib },
      { name: "Isha",    time: times.isha    },
    ];

    const checkAndNotify = () => {
      const now = new Date();
      const nowM = now.getHours() * 60 + now.getMinutes();
      const dateStr = now.toISOString().slice(0, 10);
      const lead = settings.notificationLeadMinutes ?? 0;

      for (const p of PRAYERS) {
        const perPrayer = settings.notificationPerPrayer?.[p.name];
        if (perPrayer === false) continue;

        const pMins = parseTime(p.time);
        const triggerMins = pMins - lead;

        // Fire in a 2-minute window so we don't miss it between polls
        if (nowM >= triggerMins && nowM < triggerMins + 2) {
          if (!alreadyShown(dateStr, p.name, lead)) {
            const title = lead > 0
              ? `${p.name} in ${lead} minute${lead > 1 ? "s" : ""}`
              : `${p.name} — Time to Pray`;
            new Notification(title, {
              body: lead > 0
                ? `${p.name} prayer starts at ${p.time}. Prepare yourself.`
                : `It is time for ${p.name} prayer. Allahu Akbar.`,
              icon: "/favicon.ico",
              tag: `prayer-${p.name}-${dateStr}`,
            });
            markShown(dateStr, p.name, lead);
          }
        }
      }
    };

    checkAndNotify();
    const id = setInterval(checkAndNotify, 30_000);
    return () => clearInterval(id);
  }, [settings, times]);

  /** Request notification permission. */
  const requestPermission = async (): Promise<NotificationPermission> => {
    if (!("Notification" in window)) return "denied";
    return Notification.requestPermission();
  };

  return { requestPermission };
}

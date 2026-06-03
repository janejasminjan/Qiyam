/**
 * usePrayerNotifications.ts (Mobile)
 * Schedules local expo-notifications for each prayer time.
 * Cancels and reschedules whenever prayer times or settings change.
 */
import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { parseTime, formatTime12h, type DailyPrayerTimes, type PrayerSettings } from "@/lib/prayer-times";
import { usePrayerSettings } from "./usePrayerSettings";
import { usePrayerTimes } from "./usePrayerTimes";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function requestPrayerNotificationPermission(): Promise<boolean> {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
}

async function schedulePrayerNotifications(
  times: DailyPrayerTimes,
  settings: PrayerSettings,
) {
  await Notifications.cancelAllScheduledNotificationsAsync();

  if (!settings.notificationsEnabled) return;

  const prayers = [
    { name: "Fajr",    time: times.fajr    },
    { name: "Dhuhr",   time: times.dhuhr   },
    { name: "Asr",     time: times.asr     },
    { name: "Maghrib", time: times.maghrib },
    { name: "Isha",    time: times.isha    },
  ];

  const now = new Date();
  const lead = settings.notificationLeadMinutes ?? 0;

  for (const p of prayers) {
    if (settings.notificationPerPrayer?.[p.name] === false) continue;

    const pMins = parseTime(p.time);
    const triggerMins = pMins - lead;

    const triggerDate = new Date();
    triggerDate.setHours(Math.floor(triggerMins / 60), triggerMins % 60, 0, 0);

    if (triggerDate > now) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: lead > 0
            ? `${p.name} in ${lead} minute${lead > 1 ? "s" : ""}`
            : `${p.name} — Time to Pray`,
          body: lead > 0
            ? `${p.name} prayer begins at ${formatTime12h(p.time)}. Prepare yourself.`
            : `It is time for ${p.name} prayer. Allahu Akbar.`,
        },
        trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: triggerDate },
      });
    }
  }
}

export function usePrayerNotifications() {
  const { settings } = usePrayerSettings();
  const { data: times } = usePrayerTimes();

  useEffect(() => {
    if (!times) return;
    schedulePrayerNotifications(times, settings).catch(() => {});
  }, [settings.notificationsEnabled, settings.notificationPerPrayer, settings.notificationLeadMinutes, times?.date]);
}

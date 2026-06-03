/**
 * PrayerTimesCard.tsx (Mobile)
 * Dashboard card showing prayer times, extra Islamic windows, and live countdown.
 */
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator, Pressable, StyleSheet, Text, View,
} from "react-native";
import { useRouter } from "expo-router";
import { useColors } from "@/hooks/useColors";
import { useLivePrayerTimes } from "@/hooks/usePrayerTimes";
import { formatTime12h, formatCountdown } from "@/lib/prayer-times";

const FIVE_PRAYERS = [
  { key: "Fajr",    field: "fajr"    as const, color: "#38BDF8" },
  { key: "Dhuhr",   field: "dhuhr"   as const, color: "#F59E0B" },
  { key: "Asr",     field: "asr"     as const, color: "#F97316" },
  { key: "Maghrib", field: "maghrib" as const, color: "#F43F5E" },
  { key: "Isha",    field: "isha"    as const, color: "#818CF8" },
];

const EXTRA_TIMES = [
  { label: "Ishraq",      startF: "ishraqStart"   as const, endF: "ishraqEnd"   as const, emoji: "🌅" },
  { label: "Chasht",      startF: "chashtStart"   as const, endF: "chashtEnd"   as const, emoji: "☀️" },
  { label: "Zawal",       startF: "zawalStart"    as const, endF: "zawalEnd"    as const, emoji: "⚠️" },
  { label: "Tahajjud",    startF: "tahajjudStart" as const, endF: "tahajjudEnd" as const, emoji: "🌙" },
  { label: "Suhoor ends", startF: "suhoorTime"    as const, endF: null,                   emoji: "🌄" },
  { label: "Iftar",       startF: "iftarTime"     as const, endF: null,                   emoji: "🍽️" },
] as const;

export function PrayerTimesCard() {
  const colors = useColors();
  const router = useRouter();
  const { live, isLoading, isError, settings, locationStatus, fetchLocation } = useLivePrayerTimes();
  const [showExtra, setShowExtra] = useState(false);

  const isSetup = locationStatus === "granted" || (settings.locationMode === "manual" && settings.cityName);

  /* ── Setup prompt ── */
  if (!isSetup) {
    return (
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.cardHeader}>
          <Ionicons name="time-outline" size={18} color={colors.primary} />
          <Text style={[styles.cardTitle, { color: colors.foreground }]}>Prayer Times</Text>
        </View>
        <View style={styles.setupPrompt}>
          <View style={[styles.setupIcon, { backgroundColor: colors.primary + "1A" }]}>
            <Ionicons name="location-outline" size={28} color={colors.primary} />
          </View>
          <Text style={[styles.setupTitle, { color: colors.foreground }]}>Location needed</Text>
          <Text style={[styles.setupSub, { color: colors.mutedForeground }]}>
            {locationStatus === "denied"
              ? "Location was denied. Set your city in Settings → Prayer Times."
              : "Allow location access for accurate prayer times."}
          </Text>
          {locationStatus !== "denied" && settings.locationMode === "auto" && (
            <Pressable
              style={({ pressed }) => [styles.setupBtn, { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 }]}
              onPress={fetchLocation}
            >
              <Ionicons name="navigate-outline" size={16} color={colors.primaryForeground} />
              <Text style={[styles.setupBtnText, { color: colors.primaryForeground }]}>Allow Location</Text>
            </Pressable>
          )}
          <Pressable onPress={() => router.push("/(tabs)/more")}>
            <Text style={[styles.settingsLink, { color: colors.primary }]}>Open Settings →</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  /* ── Loading ── */
  if (isLoading) {
    return (
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.cardHeader}>
          <Ionicons name="time-outline" size={18} color={colors.primary} />
          <Text style={[styles.cardTitle, { color: colors.foreground }]}>Prayer Times</Text>
        </View>
        <ActivityIndicator color={colors.primary} style={{ marginVertical: 24 }} />
      </View>
    );
  }

  /* ── Error ── */
  if (isError || !live) {
    return (
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.cardHeader}>
          <Ionicons name="time-outline" size={18} color={colors.primary} />
          <Text style={[styles.cardTitle, { color: colors.foreground }]}>Prayer Times</Text>
        </View>
        <Text style={[styles.errorText, { color: colors.mutedForeground }]}>
          Could not load prayer times. Check your connection.
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <Ionicons name="time-outline" size={18} color={colors.primary} />
        <Text style={[styles.cardTitle, { color: colors.foreground }]}>Prayer Times</Text>
        {live.locationLabel ? (
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={12} color={colors.mutedForeground} />
            <Text style={[styles.locationText, { color: colors.mutedForeground }]} numberOfLines={1}>
              {live.locationLabel}
            </Text>
          </View>
        ) : null}
      </View>

      {/* Current / Next banner */}
      <View style={[styles.banner, { backgroundColor: colors.primary + "12", borderColor: colors.primary + "30" }]}>
        <View>
          <Text style={[styles.bannerLabel, { color: colors.mutedForeground }]}>CURRENT PRAYER</Text>
          <Text style={[styles.bannerPrayer, { color: colors.primary }]}>{live.currentPrayer}</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={[styles.bannerLabel, { color: colors.mutedForeground }]}>NEXT · {live.nextPrayer}</Text>
          <Text style={[styles.bannerNextTime, { color: colors.foreground }]}>{formatTime12h(live.nextPrayerTime)}</Text>
          <Text style={[styles.bannerCountdown, { color: colors.primary }]}>in {formatCountdown(live.minutesUntilNext)}</Text>
        </View>
      </View>

      {/* Five prayers */}
      {FIVE_PRAYERS.map(({ key, field, color }) => {
        const isCurrent = live.currentPrayer === key;
        return (
          <View
            key={key}
            style={[
              styles.prayerRow,
              { borderBottomColor: colors.border },
              isCurrent && { backgroundColor: colors.primary + "0E" },
            ]}
          >
            <View style={styles.prayerLeft}>
              {isCurrent && <View style={[styles.activeDot, { backgroundColor: colors.primary }]} />}
              <Text style={[styles.prayerName, { color: isCurrent ? colors.primary : colors.foreground, fontWeight: isCurrent ? "700" : "500" }]}>
                {key}
              </Text>
            </View>
            <Text style={[styles.prayerTime, { color: isCurrent ? colors.primary : color }]}>
              {formatTime12h(live[field])}
            </Text>
          </View>
        );
      })}

      {/* Sunrise */}
      <View style={[styles.prayerRow, { borderBottomColor: colors.border }]}>
        <Text style={[styles.extraLabel, { color: colors.mutedForeground }]}>🌅 Sunrise</Text>
        <Text style={[styles.extraTime, { color: colors.mutedForeground }]}>{formatTime12h(live.sunrise)}</Text>
      </View>

      {/* Extra times toggle */}
      <Pressable
        style={styles.extraToggle}
        onPress={() => setShowExtra(v => !v)}
      >
        <Text style={[styles.extraToggleText, { color: colors.mutedForeground }]}>
          Additional Islamic Times
        </Text>
        <Ionicons name={showExtra ? "chevron-up" : "chevron-down"} size={14} color={colors.mutedForeground} />
      </Pressable>

      {showExtra && (
        <>
          {EXTRA_TIMES.map(({ label, startF, endF, emoji }) => {
            const start = live[startF];
            const end = endF ? live[endF] : undefined;
            return (
              <View key={label} style={[styles.prayerRow, { borderBottomColor: colors.border }]}>
                <Text style={[styles.extraLabel, { color: colors.mutedForeground }]}>{emoji} {label}</Text>
                <Text style={[styles.extraTime, { color: colors.mutedForeground }]}>
                  {formatTime12h(start)}{end ? ` – ${formatTime12h(end)}` : ""}
                </Text>
              </View>
            );
          })}
          <Text style={[styles.formulaNote, { color: colors.mutedForeground + "99" }]}>
            Ishraq: 15–45 min after sunrise · Chasht: 45 min – Dhuhr − 15 min ·
            Zawal: Dhuhr ±15 min · Tahajjud: last third of night
          </Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 16, borderWidth: 1, overflow: "hidden", marginBottom: 4 },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 16, paddingTop: 14, paddingBottom: 10 },
  cardTitle: { fontSize: 15, fontWeight: "700", flex: 1 },
  locationRow: { flexDirection: "row", alignItems: "center", gap: 3 },
  locationText: { fontSize: 11, maxWidth: 120 },
  banner: { marginHorizontal: 12, marginBottom: 10, borderRadius: 12, borderWidth: 1, padding: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  bannerLabel: { fontSize: 9, fontWeight: "700", letterSpacing: 0.6, marginBottom: 2 },
  bannerPrayer: { fontSize: 22, fontWeight: "800" },
  bannerNextTime: { fontSize: 14, fontWeight: "600" },
  bannerCountdown: { fontSize: 12, fontWeight: "600", marginTop: 1 },
  prayerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, paddingVertical: 11, borderBottomWidth: StyleSheet.hairlineWidth },
  prayerLeft: { flexDirection: "row", alignItems: "center", gap: 6 },
  activeDot: { width: 6, height: 6, borderRadius: 3 },
  prayerName: { fontSize: 14 },
  prayerTime: { fontSize: 14, fontWeight: "600" },
  extraLabel: { fontSize: 13 },
  extraTime: { fontSize: 12 },
  extraToggle: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, paddingVertical: 12 },
  extraToggleText: { fontSize: 12, fontWeight: "600" },
  formulaNote: { paddingHorizontal: 16, paddingBottom: 12, fontSize: 10, lineHeight: 16 },
  setupPrompt: { alignItems: "center", paddingHorizontal: 20, paddingBottom: 20, gap: 8 },
  setupIcon: { width: 56, height: 56, borderRadius: 28, alignItems: "center", justifyContent: "center", marginBottom: 4 },
  setupTitle: { fontSize: 15, fontWeight: "700" },
  setupSub: { fontSize: 12, textAlign: "center", lineHeight: 18 },
  setupBtn: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 18, paddingVertical: 10, borderRadius: 20, marginTop: 4 },
  setupBtnText: { fontSize: 14, fontWeight: "600" },
  settingsLink: { fontSize: 13, fontWeight: "600", marginTop: 4 },
  errorText: { textAlign: "center", padding: 24, fontSize: 13 },
});

/**
 * SmartSuggestionsCard.tsx (Mobile)
 * Contextual Islamic suggestions based on current time, day, and prayer window.
 */
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useColors } from "@/hooks/useColors";
import { buildSmartSuggestions } from "@/lib/prayer-times";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";

const TYPE_BG: Record<string, string> = {
  quran:  "0A2540",
  hadith: "1A3A1A",
  dhikr:  "0A2A1A",
  prayer: "1A1A3A",
  info:   "2A2000",
};

export function SmartSuggestionsCard() {
  const colors = useColors();
  const router = useRouter();
  const { data: times } = usePrayerTimes();
  const suggestions = buildSmartSuggestions(times);

  if (suggestions.length === 0) return null;

  const now = new Date();
  const timeLabel = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 12, marginRight: 4 }}>✨</Text>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>Smart Suggestions</Text>
        <Text style={[styles.timeLabel, { color: colors.mutedForeground }]}>{timeLabel}</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {suggestions.map((s, i) => (
          <Pressable
            key={s.id}
            style={({ pressed }) => [
              styles.chip,
              { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.8 : 1 },
            ]}
            onPress={() => {
              if (s.route.startsWith("/quran/")) {
                const surahId = s.route.split("/quran/")[1];
                router.push(`/quran/${surahId}` as any);
              } else {
                router.push("/(tabs)/dhikr" as any);
              }
            }}
          >
            <Text style={styles.chipEmoji}>{s.emoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={[styles.chipTitle, { color: colors.foreground }]} numberOfLines={1}>
                {s.title}
              </Text>
              <Text style={[styles.chipDesc, { color: colors.mutedForeground }]} numberOfLines={2}>
                {s.description}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 8 },
  header: { flexDirection: "row", alignItems: "center", gap: 4 },
  headerTitle: { fontSize: 15, fontWeight: "700", flex: 1 },
  timeLabel: { fontSize: 11 },
  row: { gap: 10, paddingRight: 4 },
  chip: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
    width: 220,
  },
  chipEmoji: { fontSize: 24, lineHeight: 30 },
  chipTitle: { fontSize: 13, fontWeight: "700", marginBottom: 3 },
  chipDesc: { fontSize: 11, lineHeight: 16 },
});

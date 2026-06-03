import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";
import { HADITH_BOOKS, type HadithBook } from "@/lib/hadith-api";

function BookCard({ book, onPress }: { book: HadithBook; onPress: () => void }) {
  const colors = useColors();
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.85 : 1 },
      ]}
      onPress={onPress}
    >
      <View style={[styles.colorBar, { backgroundColor: book.color }]} />
      <View style={styles.cardBody}>
        <View style={styles.cardHeader}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.bookName, { color: colors.foreground }]}>{book.name}</Text>
            <Text style={[styles.bookArabic, { color: book.color }]}>{book.arabicName}</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.mutedForeground} />
        </View>
        <Text style={[styles.compiler, { color: colors.mutedForeground }]}>{book.compiler}</Text>
        <Text style={[styles.description, { color: colors.mutedForeground }]} numberOfLines={2}>
          {book.description}
        </Text>
        <View style={styles.meta}>
          <View style={[styles.metaBadge, { backgroundColor: colors.muted }]}>
            <Text style={[styles.metaText, { color: colors.mutedForeground }]}>
              {book.hadithCount.toLocaleString()} hadiths
            </Text>
          </View>
          <View style={[styles.metaBadge, { backgroundColor: colors.muted }]}>
            <Text style={[styles.metaText, { color: colors.mutedForeground }]}>
              {book.sectionCount} chapters
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default function HadithHomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : 0;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[
        styles.content,
        { paddingTop: topPad + 12, paddingBottom: bottomPad + 40 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <Pressable
        onPress={() => router.back()}
        style={({ pressed }) => [styles.backBtn, { opacity: pressed ? 0.6 : 1 }]}
      >
        <Ionicons name="chevron-back" size={22} color={colors.foreground} />
        <Text style={[styles.backText, { color: colors.foreground }]}>Back</Text>
      </Pressable>

      <Text style={[styles.title, { color: colors.foreground }]}>Hadith</Text>
      <Text style={[styles.arabicTitle, { color: colors.primary }]}>كتب الحديث</Text>
      <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
        Narrations of the Prophet ﷺ from the major collections
      </Text>

      <View style={styles.list}>
        {HADITH_BOOKS.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onPress={() => router.push(`/hadith/${book.id}`)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 16 },
  backBtn: { flexDirection: "row", alignItems: "center", gap: 4, marginBottom: 16 },
  backText: { fontSize: 16 },
  title: { fontSize: 28, fontWeight: "700" },
  arabicTitle: { fontSize: 20, fontWeight: "700", marginTop: 2 },
  subtitle: { fontSize: 14, marginTop: 4, marginBottom: 20, lineHeight: 20 },
  list: { gap: 12 },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
    flexDirection: "row",
  },
  colorBar: { width: 5 },
  cardBody: { flex: 1, padding: 16, gap: 6 },
  cardHeader: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  bookName: { fontSize: 16, fontWeight: "700" },
  bookArabic: { fontSize: 14, fontWeight: "600", marginTop: 2 },
  compiler: { fontSize: 12 },
  description: { fontSize: 12, lineHeight: 18 },
  meta: { flexDirection: "row", gap: 6, marginTop: 4 },
  metaBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  metaText: { fontSize: 11, fontWeight: "600" },
});

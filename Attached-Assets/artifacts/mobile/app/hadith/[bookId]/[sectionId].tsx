import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";
import {
  bookById,
  fetchBilingualSection,
  gradeColor,
  type HadithBook,
  type HadithItem,
  type SectionResponse,
} from "@/lib/hadith-api";

function GradeBadge({ grade }: { grade: string }) {
  const color = gradeColor(grade);
  return (
    <View style={[styles.gradeBadge, { backgroundColor: color + "22", borderColor: color + "66" }]}>
      <Text style={[styles.gradeText, { color }]}>{grade}</Text>
    </View>
  );
}

function HadithCard({
  item,
  showArabic,
  bookColor,
}: {
  item: HadithItem;
  showArabic: boolean;
  bookColor: string;
}) {
  const colors = useColors();
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const text = `${item.text}${item.arabicText ? `\n\n${item.arabicText}` : ""}`;
    await Clipboard.setStringAsync(text);
    if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <View style={[styles.hadithCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.hadithHeader}>
        <View style={[styles.hadithNum, { backgroundColor: bookColor + "1A" }]}>
          <Text style={[styles.hadithNumText, { color: bookColor }]}>{item.hadithnumber}</Text>
        </View>
        <View style={styles.gradesRow}>
          {item.grades.slice(0, 2).map((g, i) => (
            <GradeBadge key={i} grade={g.grade} />
          ))}
        </View>
        <Pressable
          onPress={handleCopy}
          style={({ pressed }) => [styles.copyBtn, { opacity: pressed ? 0.6 : 1 }]}
          hitSlop={8}
        >
          <Ionicons
            name={copied ? "checkmark-circle-outline" : "copy-outline"}
            size={16}
            color={copied ? colors.success : colors.mutedForeground}
          />
        </Pressable>
      </View>

      {showArabic && item.arabicText && (
        <Text style={[styles.arabicText, { color: colors.foreground }]}>
          {item.arabicText}
        </Text>
      )}

      <Text style={[styles.hadithText, { color: colors.foreground }]}>{item.text}</Text>
    </View>
  );
}

export default function HadithReaderScreen() {
  const { bookId, sectionId } = useLocalSearchParams<{ bookId: string; sectionId: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const book: HadithBook | undefined = bookById(bookId ?? "");
  const currentSection = parseInt(sectionId ?? "1", 10);

  const [engData, setEngData] = useState<SectionResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showArabic, setShowArabic] = useState(false);
  const [sectionName, setSectionName] = useState(`Chapter ${currentSection}`);

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  useEffect(() => {
    if (!book) return;
    setLoading(true);
    setError(null);
    setEngData(null);

    fetchBilingualSection(book, currentSection)
      .then(({ eng }) => {
        setEngData(eng);
        const name = eng.metadata.section[String(currentSection)];
        if (name) setSectionName(name);
      })
      .catch((e: any) => setError(e.message ?? "Failed to load hadiths"))
      .finally(() => setLoading(false));
  }, [book?.id, currentSection]);

  const canGoPrev = currentSection > 1;
  const canGoNext = book ? currentSection < book.sectionCount : false;

  function navigateSection(dir: -1 | 1) {
    const next = currentSection + dir;
    router.replace(`/hadith/${bookId}/${next}`);
  }

  if (!book) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.foreground }]}>Book not found.</Text>
      </View>
    );
  }

  const hadiths: HadithItem[] = engData?.hadiths ?? [];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View
        style={[
          styles.header,
          { paddingTop: topPad + 8, backgroundColor: colors.background, borderBottomColor: colors.border },
        ]}
      >
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.headerBtn, { opacity: pressed ? 0.6 : 1 }]}
        >
          <Ionicons name="chevron-back" size={22} color={colors.foreground} />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerBook, { color: colors.mutedForeground }]} numberOfLines={1}>
            {book.name}
          </Text>
          <Text style={[styles.headerChapter, { color: colors.foreground }]} numberOfLines={1}>
            {sectionName}
          </Text>
        </View>
        <Pressable
          onPress={() => setShowArabic((v) => !v)}
          style={({ pressed }) => [styles.headerBtn, { opacity: pressed ? 0.6 : 1 }]}
        >
          <Ionicons
            name="text-outline"
            size={20}
            color={showArabic ? book.color : colors.mutedForeground}
          />
        </Pressable>
      </View>

      {/* Chapter nav strip */}
      <View style={[styles.navStrip, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <Pressable
          onPress={() => canGoPrev && navigateSection(-1)}
          style={({ pressed }) => [
            styles.navBtn,
            { opacity: !canGoPrev ? 0.35 : pressed ? 0.6 : 1 },
          ]}
          disabled={!canGoPrev}
        >
          <Ionicons name="chevron-back" size={16} color={colors.foreground} />
          <Text style={[styles.navBtnText, { color: colors.foreground }]}>Prev</Text>
        </Pressable>

        <View style={[styles.chapterPill, { backgroundColor: book.color + "1A" }]}>
          <Text style={[styles.chapterPillText, { color: book.color }]}>
            Chapter {currentSection} / {book.sectionCount}
          </Text>
        </View>

        <Pressable
          onPress={() => canGoNext && navigateSection(1)}
          style={({ pressed }) => [
            styles.navBtn,
            { opacity: !canGoNext ? 0.35 : pressed ? 0.6 : 1 },
          ]}
          disabled={!canGoNext}
        >
          <Text style={[styles.navBtnText, { color: colors.foreground }]}>Next</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.foreground} />
        </Pressable>
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator color={book.color} size="large" />
          <Text style={[styles.loadingText, { color: colors.mutedForeground }]}>Loading hadiths…</Text>
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Ionicons name="cloud-offline-outline" size={40} color={colors.mutedForeground} />
          <Text style={[styles.errorText, { color: colors.foreground, marginTop: 12 }]}>
            Could not load this chapter
          </Text>
          <Text style={[styles.errorSub, { color: colors.mutedForeground }]}>{error}</Text>
          <Pressable
            onPress={() => {
              setLoading(true);
              fetchBilingualSection(book, currentSection)
                .then(({ eng }) => { setEngData(eng); const n = eng.metadata.section[String(currentSection)]; if (n) setSectionName(n); })
                .catch((e: any) => setError(e.message))
                .finally(() => setLoading(false));
            }}
            style={[styles.retryBtn, { backgroundColor: book.color }]}
          >
            <Text style={styles.retryText}>Retry</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={hadiths}
          keyExtractor={(item) => String(item.hadithnumber)}
          contentContainerStyle={[
            styles.listContent,
            { paddingBottom: bottomPad + 40 },
          ]}
          renderItem={({ item }) => (
            <HadithCard item={item} showArabic={showArabic} bookColor={book.color} />
          )}
          ListHeaderComponent={
            hadiths.length > 0 ? (
              <Text style={[styles.hadithCount, { color: colors.mutedForeground }]}>
                {hadiths.length} hadith{hadiths.length !== 1 ? "s" : ""} in this chapter
              </Text>
            ) : null
          }
          ListEmptyComponent={
            <View style={styles.centered}>
              <Text style={[styles.errorText, { color: colors.mutedForeground }]}>
                No hadiths found in this chapter.
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  centered: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 24 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerBtn: { padding: 8, minWidth: 38, alignItems: "center" },
  headerCenter: { flex: 1, alignItems: "center" },
  headerBook: { fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 },
  headerChapter: { fontSize: 14, fontWeight: "700", marginTop: 1 },
  navStrip: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  navBtn: { flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 8, paddingVertical: 6 },
  navBtnText: { fontSize: 13, fontWeight: "600" },
  chapterPill: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  chapterPillText: { fontSize: 12, fontWeight: "700" },
  listContent: { padding: 16, gap: 12 },
  hadithCount: { fontSize: 12, marginBottom: 4 },
  hadithCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    gap: 10,
  },
  hadithHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  hadithNum: {
    minWidth: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  hadithNumText: { fontSize: 13, fontWeight: "700" },
  gradesRow: { flex: 1, flexDirection: "row", flexWrap: "wrap", gap: 4 },
  gradeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
  },
  gradeText: { fontSize: 10, fontWeight: "600" },
  copyBtn: { padding: 4 },
  arabicText: {
    fontSize: 20,
    lineHeight: 38,
    textAlign: "right",
    writingDirection: "rtl",
    fontWeight: "500",
    paddingBottom: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(128,128,128,0.2)",
  },
  hadithText: { fontSize: 14, lineHeight: 22 },
  loadingText: { marginTop: 12, fontSize: 13 },
  errorText: { fontSize: 16, fontWeight: "600", textAlign: "center" },
  errorSub: { fontSize: 12, textAlign: "center", marginTop: 4 },
  retryBtn: { marginTop: 16, paddingHorizontal: 24, paddingVertical: 10, borderRadius: 10 },
  retryText: { color: "#fff", fontSize: 14, fontWeight: "700" },
});

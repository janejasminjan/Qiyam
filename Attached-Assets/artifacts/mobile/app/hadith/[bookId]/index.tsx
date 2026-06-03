import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
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
  fetchSectionsBatch,
  type HadithBook,
} from "@/lib/hadith-api";

interface SectionRow {
  sectionId: number;
  name: string;
  first?: number;
  last?: number;
}

const BATCH = 15;

export default function HadithBookScreen() {
  const { bookId } = useLocalSearchParams<{ bookId: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const book: HadithBook | undefined = bookById(bookId ?? "");

  const [sections, setSections] = useState<SectionRow[]>([]);
  const [loadedUpTo, setLoadedUpTo] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const topPad = Platform.OS === "web" ? 67 : insets.top;

  useEffect(() => {
    if (!book) return;
    loadBatch(1, Math.min(BATCH, book.sectionCount));
  }, [book?.id]);

  async function loadBatch(from: number, to: number) {
    if (!book) return;
    const isFirst = from === 1;
    if (isFirst) { setLoading(true); setError(null); }
    else setLoadingMore(true);

    try {
      const batch = await fetchSectionsBatch(book.engEdition, from, to, book);
      const rows: SectionRow[] = batch.map((b) => ({
        sectionId: b.sectionId,
        name: b.name,
        first: b.meta?.hadithnumber_first,
        last: b.meta?.hadithnumber_last,
      }));
      setSections((prev) => isFirst ? rows : [...prev, ...rows]);
      setLoadedUpTo(to);
    } catch (e: any) {
      if (isFirst) setError(e.message ?? "Failed to load chapters");
    } finally {
      if (isFirst) setLoading(false);
      else setLoadingMore(false);
    }
  }

  function loadNextBatch() {
    if (!book || loadingMore || loadedUpTo >= book.sectionCount) return;
    const from = loadedUpTo + 1;
    const to = Math.min(loadedUpTo + BATCH, book.sectionCount);
    loadBatch(from, to);
  }

  if (!book) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.foreground }]}>Book not found.</Text>
      </View>
    );
  }

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
          <Text style={[styles.headerTitle, { color: colors.foreground }]} numberOfLines={1}>
            {book.name}
          </Text>
          <Text style={[styles.headerArabic, { color: book.color }]}>{book.arabicName}</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      {/* Book stats bar */}
      <View style={[styles.statsBar, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={styles.statItem}>
          <Text style={[styles.statVal, { color: colors.foreground }]}>{book.hadithCount.toLocaleString()}</Text>
          <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>Hadiths</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statVal, { color: colors.foreground }]}>{book.sectionCount}</Text>
          <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>Chapters</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statVal, { color: colors.foreground }]} numberOfLines={1}>{book.compiler}</Text>
          <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>Compiled by</Text>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator color={colors.primary} style={{ marginTop: 40 }} />
      ) : error ? (
        <View style={styles.centered}>
          <Ionicons name="cloud-offline-outline" size={40} color={colors.mutedForeground} />
          <Text style={[styles.errorText, { color: colors.foreground, marginTop: 12 }]}>Failed to load chapters</Text>
          <Text style={[styles.errorSub, { color: colors.mutedForeground }]}>{error}</Text>
          <Pressable
            onPress={() => loadBatch(1, Math.min(BATCH, book.sectionCount))}
            style={[styles.retryBtn, { backgroundColor: colors.primary }]}
          >
            <Text style={[styles.retryText, { color: colors.primaryForeground }]}>Retry</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={sections}
          keyExtractor={(item) => String(item.sectionId)}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => (
            <View style={[styles.separator, { backgroundColor: colors.border }]} />
          )}
          onEndReached={loadNextBatch}
          onEndReachedThreshold={0.3}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator color={colors.primary} style={{ marginVertical: 16 }} />
            ) : loadedUpTo < book.sectionCount ? (
              <Pressable
                onPress={loadNextBatch}
                style={[styles.loadMoreBtn, { borderColor: colors.border }]}
              >
                <Text style={[styles.loadMoreText, { color: colors.primary }]}>Load more chapters</Text>
              </Pressable>
            ) : (
              <Text style={[styles.endText, { color: colors.mutedForeground }]}>
                All {book.sectionCount} chapters loaded
              </Text>
            )
          }
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => [
                styles.sectionRow,
                { backgroundColor: pressed ? colors.muted : colors.background },
              ]}
              onPress={() => router.push(`/hadith/${bookId}/${item.sectionId}`)}
            >
              <View style={[styles.sectionNum, { backgroundColor: book.color + "1A" }]}>
                <Text style={[styles.sectionNumText, { color: book.color }]}>{item.sectionId}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.sectionName, { color: colors.foreground }]}>{item.name}</Text>
                {item.first !== undefined && item.last !== undefined && (
                  <Text style={[styles.sectionRange, { color: colors.mutedForeground }]}>
                    Hadith {item.first}–{item.last}
                  </Text>
                )}
              </View>
              <Ionicons name="chevron-forward" size={16} color={colors.mutedForeground} />
            </Pressable>
          )}
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
  headerBtn: { padding: 8 },
  headerCenter: { flex: 1, alignItems: "center" },
  headerTitle: { fontSize: 15, fontWeight: "700" },
  headerArabic: { fontSize: 13, fontWeight: "600" },
  headerSpacer: { width: 38 },
  statsBar: {
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 10,
  },
  statItem: { flex: 1, alignItems: "center", paddingHorizontal: 8 },
  statVal: { fontSize: 14, fontWeight: "700" },
  statLabel: { fontSize: 10, marginTop: 2 },
  statDivider: { width: StyleSheet.hairlineWidth, marginVertical: 4 },
  listContent: { paddingBottom: 40 },
  separator: { height: StyleSheet.hairlineWidth, marginLeft: 72 },
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  sectionNum: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionNumText: { fontSize: 13, fontWeight: "700" },
  sectionName: { fontSize: 14, fontWeight: "600", lineHeight: 20 },
  sectionRange: { fontSize: 12, marginTop: 2 },
  errorText: { fontSize: 16, fontWeight: "600", textAlign: "center" },
  errorSub: { fontSize: 13, textAlign: "center", marginTop: 4 },
  retryBtn: { marginTop: 16, paddingHorizontal: 24, paddingVertical: 10, borderRadius: 10 },
  retryText: { fontSize: 14, fontWeight: "700" },
  loadMoreBtn: { margin: 16, padding: 14, borderRadius: 10, borderWidth: 1, alignItems: "center" },
  loadMoreText: { fontSize: 14, fontWeight: "600" },
  endText: { textAlign: "center", fontSize: 12, marginVertical: 16 },
});

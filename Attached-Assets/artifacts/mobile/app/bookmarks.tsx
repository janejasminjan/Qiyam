import { Ionicons } from "@expo/vector-icons";
import { useGetBookmarks, useDeleteBookmark } from "@workspace/api-client-react";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";
import { SURAH_LIST } from "@/lib/surah-list";

export default function BookmarksScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { data: bookmarks, isLoading, refetch } = useGetBookmarks();
  const deleteBookmark = useDeleteBookmark();

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : 0;

  function handleDelete(id: number, surahId: number, ayahNumber: number) {
    const surah = SURAH_LIST.find((s) => s.id === surahId);
    Alert.alert(
      "Remove Bookmark",
      `Remove bookmark for ${surah?.transliteration ?? `Surah ${surahId}`} ${surahId}:${ayahNumber}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => deleteBookmark.mutate({ id }, { onSuccess: () => refetch() }),
        },
      ]
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[
        styles.content,
        { paddingTop: topPad + 12, paddingBottom: bottomPad + 40 },
      ]}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={refetch} tintColor={colors.primary} />
      }
      showsVerticalScrollIndicator={false}
    >
      <Pressable
        onPress={() => router.back()}
        style={({ pressed }) => [styles.backBtn, { opacity: pressed ? 0.6 : 1 }]}
      >
        <Ionicons name="chevron-back" size={22} color={colors.foreground} />
        <Text style={[styles.backText, { color: colors.foreground }]}>Back</Text>
      </Pressable>

      <Text style={[styles.title, { color: colors.foreground }]}>Bookmarks</Text>
      <Text style={[styles.arabicTitle, { color: colors.primary }]}>الإشارات المرجعية</Text>

      {isLoading ? (
        <ActivityIndicator color={colors.primary} style={{ marginTop: 40 }} />
      ) : !bookmarks || bookmarks.length === 0 ? (
        <View style={[styles.emptyCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Ionicons name="bookmark-outline" size={40} color={colors.mutedForeground} />
          <Text style={[styles.emptyTitle, { color: colors.foreground }]}>No bookmarks yet</Text>
          <Text style={[styles.emptySubtitle, { color: colors.mutedForeground }]}>
            Bookmark ayahs from the Quran reader to save them here.
          </Text>
        </View>
      ) : (
        <View style={styles.list}>
          <Text style={[styles.count, { color: colors.mutedForeground }]}>
            {bookmarks.length} saved {bookmarks.length === 1 ? "ayah" : "ayahs"}
          </Text>
          {bookmarks.map((bookmark: any) => {
            const surah = SURAH_LIST.find((s) => s.id === bookmark.surahId);
            return (
              <Pressable
                key={bookmark.id}
                style={({ pressed }) => [
                  styles.card,
                  { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.85 : 1 },
                ]}
                onPress={() => router.push(`/quran/${bookmark.surahId}`)}
              >
                <View style={[styles.surahBadge, { backgroundColor: colors.primary + "1A" }]}>
                  <Text style={[styles.surahNum, { color: colors.primary }]}>{bookmark.surahId}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.surahName, { color: colors.foreground }]}>
                    {surah?.transliteration ?? `Surah ${bookmark.surahId}`}
                  </Text>
                  <Text style={[styles.surahArabic, { color: colors.primary }]}>
                    {surah?.name ?? ""}
                  </Text>
                  <Text style={[styles.ayahRef, { color: colors.mutedForeground }]}>
                    Ayah {bookmark.ayahNumber} · {surah?.translation ?? ""}
                  </Text>
                </View>
                <Pressable
                  onPress={() => handleDelete(bookmark.id, bookmark.surahId, bookmark.ayahNumber)}
                  style={({ pressed }) => [styles.deleteBtn, { opacity: pressed ? 0.6 : 1 }]}
                  hitSlop={8}
                >
                  <Ionicons name="trash-outline" size={18} color={colors.mutedForeground} />
                </Pressable>
              </Pressable>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 16 },
  backBtn: { flexDirection: "row", alignItems: "center", gap: 4, marginBottom: 16 },
  backText: { fontSize: 16 },
  title: { fontSize: 28, fontWeight: "700" },
  arabicTitle: { fontSize: 20, fontWeight: "700", marginTop: 2, marginBottom: 20 },
  count: { fontSize: 12, marginBottom: 8 },
  list: { gap: 10 },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  surahBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  surahNum: { fontSize: 16, fontWeight: "700" },
  surahName: { fontSize: 15, fontWeight: "600" },
  surahArabic: { fontSize: 13, fontWeight: "600", marginTop: 1 },
  ayahRef: { fontSize: 12, marginTop: 2 },
  deleteBtn: { padding: 4 },
  emptyCard: {
    marginTop: 20,
    borderRadius: 16,
    borderWidth: 1,
    padding: 32,
    alignItems: "center",
    gap: 8,
  },
  emptyTitle: { fontSize: 16, fontWeight: "700", marginTop: 4 },
  emptySubtitle: { fontSize: 13, textAlign: "center", lineHeight: 20 },
});

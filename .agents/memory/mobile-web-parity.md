---
name: Mobile-Web Parity
description: Changes made to bring the Expo mobile app to parity with the quran-app web reference.
---

## What was implemented

### Navigation
- Tab label: "Dhikr" → "Dhikr & Dua" in both NativeTabLayout and ClassicTabLayout in `app/(tabs)/_layout.tsx`
- Root Stack (`app/_layout.tsx`) extended with: `hadith/index`, `hadith/[bookId]/index`, `hadith/[bookId]/[sectionId]`, `bookmarks`

### New lib file
- `lib/hadith-api.ts` — ported from `quran-app/src/lib/hadith-api.ts`. Uses fawazahmed0 CDN for all books; Riyad as-Salihin routes through the backend proxy at `https://${EXPO_PUBLIC_DOMAIN}/api/hadith-proxy`.

### New screens
- `app/hadith/index.tsx` — 8 book cards with color bars, stats, taps to book index
- `app/hadith/[bookId]/index.tsx` — chapter list loaded in batches of 15 via `fetchSectionsBatch`
- `app/hadith/[bookId]/[sectionId].tsx` — reader with Arabic toggle, prev/next nav, grade badges
- `app/bookmarks.tsx` — lists bookmarked ayahs using `useGetBookmarks`; delete uses `useDeleteBookmark`

### Home screen (index.tsx)
- Added `FEATURED_AYAHS` list (14 curated ayahs); picks daily rotating entry with `dayOfYear % length`
- Fetches ayah data with `fetchAyah` from `lib/quran-api.ts`; shows Arabic + translation card
- Added `TRENDING_SURAHS` (6 popular surahs) as a responsive wrap grid linking to the Quran reader

### More screen (more.tsx)
- Added "SECTIONS" navigation block with rows for Hadith (`/hadith`) and Bookmarks (`/bookmarks`)
- Used `useRouter` from expo-router for push navigation

## What was NOT implemented (web-only features)
- Canvas ayah sharing (web Canvas API)
- OKLCH reading profiles (Kobo/BOOX/Kindle — web CSS only)
- Tajweed coloring (needs separate library, complex)
- Full Progress screen (the memorize tab already covers this adequately)

**Why:** These features rely on browser APIs or complex libraries that don't translate to React Native without significant extra work.

/* ── Hadith API — fawazahmed0 CDN (no key required) ─────────────
   Base: https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/
   For Riyad as-Salihin: routed through the backend proxy
────────────────────────────────────────────────────────────────── */

export const CDN_BASE =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions";

function getSunnahProxyBase(): string {
  const domain = process.env.EXPO_PUBLIC_DOMAIN;
  if (domain) return `https://${domain}/api/hadith-proxy`;
  return "http://localhost:3001/api/hadith-proxy";
}

/* ── Book metadata ──────────────────────────────────────────────── */
export interface HadithBook {
  id: string;
  engEdition: string;
  araEdition: string;
  name: string;
  arabicName: string;
  compiler: string;
  description: string;
  hadithCount: number;
  sectionCount: number;
  color: string;
  sunnahCollection?: string;
}

export const HADITH_BOOKS: HadithBook[] = [
  {
    id: "bukhari",
    engEdition: "eng-bukhari",
    araEdition: "ara-bukhari",
    name: "Sahih al-Bukhari",
    arabicName: "صحيح البخاري",
    compiler: "Imam al-Bukhari",
    description:
      "The most authentic hadith collection, compiled by Imam Muhammad al-Bukhari (d. 256 AH).",
    hadithCount: 7563,
    sectionCount: 97,
    color: "#173F4B",
  },
  {
    id: "muslim",
    engEdition: "eng-muslim",
    araEdition: "ara-muslim",
    name: "Sahih Muslim",
    arabicName: "صحيح مسلم",
    compiler: "Imam Muslim",
    description:
      "The second most authentic collection by Imam Muslim ibn al-Hajjaj (d. 261 AH).",
    hadithCount: 7470,
    sectionCount: 56,
    color: "#C9A139",
  },
  {
    id: "abudawud",
    engEdition: "eng-abudawud",
    araEdition: "ara-abudawud",
    name: "Sunan Abu Dawud",
    arabicName: "سنن أبي داود",
    compiler: "Imam Abu Dawud",
    description:
      "Compiled by Imam Abu Dawud al-Sijistani (d. 275 AH). Emphasises legal rulings.",
    hadithCount: 5274,
    sectionCount: 43,
    color: "#D97706",
  },
  {
    id: "tirmidhi",
    engEdition: "eng-tirmidhi",
    araEdition: "ara-tirmidhi",
    name: "Jami at-Tirmidhi",
    arabicName: "جامع الترمذي",
    compiler: "Imam al-Tirmidhi",
    description:
      "Compiled by Imam al-Tirmidhi (d. 279 AH). Unique for including juristic consensus.",
    hadithCount: 3956,
    sectionCount: 49,
    color: "#16A34A",
  },
  {
    id: "ibnmajah",
    engEdition: "eng-ibnmajah",
    araEdition: "ara-ibnmajah",
    name: "Sunan Ibn Majah",
    arabicName: "سنن ابن ماجه",
    compiler: "Imam Ibn Majah",
    description:
      "Compiled by Imam Ibn Majah (d. 273 AH). The sixth of the Kutub al-Sittah.",
    hadithCount: 4341,
    sectionCount: 37,
    color: "#7C3AED",
  },
  {
    id: "nasai",
    engEdition: "eng-nasai",
    araEdition: "ara-nasai",
    name: "Sunan an-Nasai",
    arabicName: "سنن النسائي",
    compiler: "Imam al-Nasai",
    description:
      "Compiled by Imam al-Nasai (d. 303 AH). Renowned for strict chain criticism.",
    hadithCount: 5765,
    sectionCount: 51,
    color: "#0284C7",
  },
  {
    id: "malik",
    engEdition: "eng-malik",
    araEdition: "ara-malik",
    name: "Muwatta Malik",
    arabicName: "موطأ مالك",
    compiler: "Imam Malik",
    description:
      "The earliest systematic hadith compilation by Imam Malik ibn Anas (d. 179 AH).",
    hadithCount: 1857,
    sectionCount: 61,
    color: "#E11D48",
  },
  {
    id: "riyadussalihin",
    engEdition: "eng-riyadussalihin",
    araEdition: "ara-riyadussalihin",
    name: "Riyad as-Salihin",
    arabicName: "رياض الصالحين",
    compiler: "Imam al-Nawawi",
    description:
      "A beloved collection of ethical hadiths compiled by Imam al-Nawawi (d. 676 AH).",
    hadithCount: 1903,
    sectionCount: 20,
    color: "#0D9488",
    sunnahCollection: "riyadussalihin",
  },
];

/* ── Types ──────────────────────────────────────────────────────── */
export interface HadithGrade {
  name: string;
  grade: string;
}

export interface HadithItem {
  hadithnumber: number;
  arabicnumber: number;
  text: string;
  arabicText?: string;
  grades: HadithGrade[];
  reference: { book: number; hadith: number };
}

export interface SectionMeta {
  hadithnumber_first: number;
  hadithnumber_last: number;
}

export interface SectionResponse {
  metadata: {
    name: string;
    section: Record<string, string>;
    section_detail: Record<string, SectionMeta>;
  };
  hadiths: HadithItem[];
}

/* ── Core fetchers ──────────────────────────────────────────────── */
export function bookById(id: string): HadithBook | undefined {
  return HADITH_BOOKS.find((b) => b.id === id);
}

export async function fetchSection(
  edition: string,
  sectionId: number,
): Promise<SectionResponse> {
  const url = `${CDN_BASE}/${edition}/sections/${sectionId}.min.json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Section ${sectionId} not found (${res.status})`);
  return res.json();
}

/* ── sunnah.com proxy helpers (Riyad as-Salihin) ───────────────── */
function sunnahBookId(sectionId: number): string {
  if (sectionId === 1) return "introduction";
  return String(sectionId - 1);
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

interface SunnahHadithRaw {
  hadithNumber: string;
  bookNumber: string;
  hadith: Array<{
    lang: string;
    body: string;
    grades?: Array<{ grade: string; graded_by?: string }>;
  }>;
}

async function fetchSunnahHadiths(
  collection: string,
  bookNumber: string,
): Promise<SunnahHadithRaw[]> {
  const base = getSunnahProxyBase();
  const url = `${base}/collections/${collection}/books/${bookNumber}/hadiths?limit=1000`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sunnah proxy hadiths failed (${res.status})`);
  const json = await res.json();
  return (json.data ?? []) as SunnahHadithRaw[];
}

async function fetchSunnahBooksData(collection: string): Promise<any[]> {
  const base = getSunnahProxyBase();
  const url = `${base}/collections/${collection}/books?limit=50`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sunnah proxy books failed (${res.status})`);
  const json = await res.json();
  return json.data ?? [];
}

function transformSunnahToSection(
  raw: SunnahHadithRaw[],
  sectionId: number,
  sectionName: string,
  hadithFirst: number,
  hadithLast: number,
  lang: "en" | "ar",
): SectionResponse {
  const hadiths: HadithItem[] = raw.map((h) => {
    const langData = h.hadith.find((x) => x.lang === lang);
    const enData   = h.hadith.find((x) => x.lang === "en");
    const arData   = h.hadith.find((x) => x.lang === "ar");
    const num      = parseInt(h.hadithNumber, 10) || 0;
    const rawGrades = enData?.grades ?? langData?.grades ?? [];
    return {
      hadithnumber:  num,
      arabicnumber:  num,
      text:          stripHtml(langData?.body ?? ""),
      arabicText:    arData ? stripHtml(arData.body) : undefined,
      grades:        rawGrades.map((g) => ({ name: g.graded_by ?? "Unknown", grade: g.grade })),
      reference:     { book: sectionId - 1, hadith: num },
    };
  });

  return {
    metadata: {
      name: "Riyad as-Salihin",
      section:        { [String(sectionId)]: sectionName },
      section_detail: { [String(sectionId)]: { hadithnumber_first: hadithFirst, hadithnumber_last: hadithLast } },
    },
    hadiths,
  };
}

async function fetchSunnahSection(
  collection: string,
  sectionId: number,
): Promise<{ eng: SectionResponse; ara: SectionResponse }> {
  const bookNum  = sunnahBookId(sectionId);
  const [booksData, hadiths] = await Promise.all([
    fetchSunnahBooksData(collection),
    fetchSunnahHadiths(collection, bookNum),
  ]);
  const bookMeta = booksData.find((b: any) => b.bookNumber === bookNum);
  const enName   = bookMeta?.book?.find((x: any) => x.lang === "en")?.name ?? `Chapter ${sectionId}`;
  const first    = bookMeta?.hadithStartNumber ?? (hadiths[0] ? parseInt(hadiths[0].hadithNumber, 10) : sectionId);
  const last     = bookMeta?.hadithEndNumber   ?? (hadiths[hadiths.length - 1] ? parseInt(hadiths[hadiths.length - 1].hadithNumber, 10) : sectionId);

  return {
    eng: transformSunnahToSection(hadiths, sectionId, enName, first, last, "en"),
    ara: transformSunnahToSection(hadiths, sectionId, enName, first, last, "ar"),
  };
}

export async function fetchBilingualSection(
  book: HadithBook,
  sectionId: number,
): Promise<{ eng: SectionResponse; ara: SectionResponse | null }> {
  if (book.sunnahCollection) {
    return fetchSunnahSection(book.sunnahCollection, sectionId);
  }

  const [eng, ara] = await Promise.allSettled([
    fetchSection(book.engEdition, sectionId),
    fetchSection(book.araEdition, sectionId),
  ]);
  return {
    eng: eng.status === "fulfilled" ? eng.value : (() => { throw (eng as PromiseRejectedResult).reason; })(),
    ara: ara.status === "fulfilled" ? ara.value : null,
  };
}

export async function fetchSectionsBatch(
  edition: string,
  from: number,
  to: number,
  book?: HadithBook,
): Promise<Array<{ sectionId: number; name: string; meta: SectionMeta | null }>> {
  if (book?.sunnahCollection) {
    const booksData = await fetchSunnahBooksData(book.sunnahCollection);
    const ids = Array.from({ length: to - from + 1 }, (_, i) => from + i);
    return ids.map((sectionId) => {
      const bookNum  = sunnahBookId(sectionId);
      const bookMeta = booksData.find((b: any) => b.bookNumber === bookNum);
      if (!bookMeta) return { sectionId, name: `Chapter ${sectionId}`, meta: null };
      const enName = bookMeta.book?.find((x: any) => x.lang === "en")?.name ?? `Chapter ${sectionId}`;
      return {
        sectionId,
        name: enName,
        meta: { hadithnumber_first: bookMeta.hadithStartNumber, hadithnumber_last: bookMeta.hadithEndNumber },
      };
    });
  }

  const ids = Array.from({ length: to - from + 1 }, (_, i) => from + i);
  const results = await Promise.allSettled(ids.map((id) => fetchSection(edition, id)));
  return results.map((r, i) => {
    const sectionId = ids[i];
    if (r.status === "rejected") return { sectionId, name: `Chapter ${sectionId}`, meta: null };
    const { metadata } = r.value;
    const name = metadata.section[String(sectionId)] ?? `Chapter ${sectionId}`;
    const meta = metadata.section_detail[String(sectionId)] ?? null;
    return { sectionId, name, meta };
  });
}

export function gradeColor(grade: string): string {
  const g = grade.toLowerCase();
  if (g.includes("sahih") || g.includes("authentic")) return "#16A34A";
  if (g.includes("hasan") || g.includes("good")) return "#0284C7";
  if (g.includes("da'if") || g.includes("daif") || g.includes("weak")) return "#D97706";
  if (g.includes("mawdu") || g.includes("fabricated")) return "#EF4444";
  return "#6B7280";
}

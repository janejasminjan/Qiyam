import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Languages, ZoomIn, ZoomOut, BookOpen, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AURAD_FATHIYA_SECTIONS, type AuradFathiyaSection, type AuradFathiyaPage } from "@/lib/aurad-fathiya-data";
import { useSwipePage } from "@/hooks/use-swipe-page";

/* ── Font size steps (mirrors dhikr-reader) ──────────────────── */
const FONT_SIZES = [
  { label: "S", arabic: "text-2xl", lineHeight: "leading-[2.8]" },
  { label: "M", arabic: "text-3xl", lineHeight: "leading-[3.2]" },
  { label: "L", arabic: "text-4xl", lineHeight: "leading-[3.6]" },
];

type TranslationLang = "urdu" | "english";

/* ── Storage keys ─────────────────────────────────────────────── */
const FONT_KEY   = "qiyam_aurad_fontsize";
const LANG_KEY   = "qiyam_aurad_lang";
const TRANS_KEY  = "qiyam_aurad_show_trans";

/* ══════════════════════════════════════════════════════════════ */
/*  Page display component                                         */
/* ══════════════════════════════════════════════════════════════ */
interface PageViewProps {
  page: AuradFathiyaPage;
  fontSizeIdx: number;
  lang: TranslationLang;
  showTranslation: boolean;
  direction: 1 | -1;
}

function PageView({ page, fontSizeIdx, lang, showTranslation, direction }: PageViewProps) {
  const sz = FONT_SIZES[fontSizeIdx];
  const [footnoteOpen, setFootnoteOpen] = useState(false);

  const arabicLines = page.arabic.split("\n").filter(Boolean);
  const translation = lang === "urdu" ? page.urduTranslation : page.englishTranslation;
  const isUrdu = lang === "urdu";

  return (
    <motion.div
      key={page.pageNumber}
      initial={{ opacity: 0, x: direction * 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction * -40 }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      className="flex flex-col gap-6"
    >
      {/* ── Arabic text block ─────────────────────────────── */}
      <div className="rounded-2xl border border-border bg-card p-5 md:p-7">
        <div
          dir="rtl"
          className={`font-arabic text-right text-foreground ${sz.arabic} ${sz.lineHeight} whitespace-pre-line`}
        >
          {arabicLines.map((line, i) => (
            <p key={i} className="mb-2 last:mb-0">
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* ── Translation block ─────────────────────────────── */}
      <AnimatePresence>
        {showTranslation && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl border border-primary/20 bg-primary/[0.03] p-5"
          >
            <p className="text-[10px] font-semibold uppercase tracking-widest text-primary/60 mb-3">
              {lang === "urdu" ? "ترجمہ — Translation" : "Translation"}
            </p>
            <p
              dir={isUrdu ? "rtl" : "ltr"}
              className={`text-sm leading-relaxed text-foreground/80 whitespace-pre-line ${
                isUrdu ? "font-arabic text-right text-base" : "text-left"
              }`}
            >
              {translation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Footnote ──────────────────────────────────────── */}
      {page.footnote && (
        <div>
          <button
            onClick={() => setFootnoteOpen((v) => !v)}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Info className="h-3.5 w-3.5" />
            <span>{footnoteOpen ? "Hide" : "Show"} note</span>
          </button>
          <AnimatePresence>
            {footnoteOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="mt-2 rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-50/60 dark:bg-amber-950/20 p-4">
                  <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                    {page.footnote}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/*  Main Aurad Text Reader                                         */
/* ══════════════════════════════════════════════════════════════ */
export function AuradTextReader() {
  /* Settings — persisted */
  const [fontSizeIdx, setFontSizeIdx] = useState<number>(() => {
    const n = Number(localStorage.getItem(FONT_KEY));
    return isNaN(n) || n < 0 || n >= FONT_SIZES.length ? 1 : n;
  });
  const [lang, setLang] = useState<TranslationLang>(() => {
    return (localStorage.getItem(LANG_KEY) as TranslationLang) ?? "urdu";
  });
  const [showTranslation, setShowTranslation] = useState<boolean>(() => {
    return localStorage.getItem(TRANS_KEY) !== "false";
  });

  /* Navigation state */
  const [sectionIdx, setSectionIdx] = useState(0);
  const [pageIdx, setPageIdx]       = useState(0);
  const [direction, setDirection]   = useState<1 | -1>(1);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const section: AuradFathiyaSection = AURAD_FATHIYA_SECTIONS[sectionIdx];
  const page: AuradFathiyaPage       = section.pages[pageIdx];

  /* Computed totals */
  const totalPagesInSection = section.pages.length;
  const isFirstPage = sectionIdx === 0 && pageIdx === 0;
  const isLastPage  = sectionIdx === AURAD_FATHIYA_SECTIONS.length - 1 && pageIdx === totalPagesInSection - 1;

  /* Navigation helpers */
  const goNext = useCallback(() => {
    if (pageIdx < totalPagesInSection - 1) {
      setDirection(1);
      setPageIdx((p) => p + 1);
    } else if (sectionIdx < AURAD_FATHIYA_SECTIONS.length - 1) {
      setDirection(1);
      setSectionIdx((s) => s + 1);
      setPageIdx(0);
    }
  }, [pageIdx, sectionIdx, totalPagesInSection]);

  const goPrev = useCallback(() => {
    if (pageIdx > 0) {
      setDirection(-1);
      setPageIdx((p) => p - 1);
    } else if (sectionIdx > 0) {
      setDirection(-1);
      const prevSection = AURAD_FATHIYA_SECTIONS[sectionIdx - 1];
      setSectionIdx((s) => s - 1);
      setPageIdx(prevSection.pages.length - 1);
    }
  }, [pageIdx, sectionIdx]);

  const jumpToSection = useCallback((idx: number) => {
    if (idx !== sectionIdx) {
      setDirection(idx > sectionIdx ? 1 : -1);
      setSectionIdx(idx);
      setPageIdx(0);
    }
  }, [sectionIdx]);

  const swipe = useSwipePage({ onNext: goNext, onPrev: goPrev });

  /* Persist settings */
  const handleFontSize = (delta: number) => {
    const n = Math.max(0, Math.min(FONT_SIZES.length - 1, fontSizeIdx + delta));
    setFontSizeIdx(n);
    localStorage.setItem(FONT_KEY, String(n));
  };
  const handleLang = (l: TranslationLang) => {
    setLang(l);
    localStorage.setItem(LANG_KEY, l);
    setLangMenuOpen(false);
  };
  const handleToggleTrans = () => {
    const next = !showTranslation;
    setShowTranslation(next);
    localStorage.setItem(TRANS_KEY, String(next));
  };

  return (
    <div className="flex flex-col min-h-full">

      {/* ── Top controls bar ─────────────────────────────── */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border px-4 py-2 flex items-center justify-between gap-2 flex-shrink-0">
        {/* Font controls */}
        <div className="flex items-center gap-0.5">
          <Button
            variant="ghost" size="icon" className="h-7 w-7"
            disabled={fontSizeIdx === 0}
            onClick={() => handleFontSize(-1)}
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </Button>
          <span className="text-[11px] font-medium text-muted-foreground w-5 text-center">
            {FONT_SIZES[fontSizeIdx].label}
          </span>
          <Button
            variant="ghost" size="icon" className="h-7 w-7"
            disabled={fontSizeIdx === FONT_SIZES.length - 1}
            onClick={() => handleFontSize(1)}
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* Section pills */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
          {AURAD_FATHIYA_SECTIONS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => jumpToSection(i)}
              className={`flex-shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium transition-all ${
                sectionIdx === i
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* Translation controls */}
        <div className="flex items-center gap-0.5 flex-shrink-0 relative">
          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen((v) => !v)}
              className={`rounded-lg px-2 py-1 text-[11px] font-medium transition-colors ${
                showTranslation
                  ? "bg-primary/15 text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {lang === "urdu" ? "اردو" : "EN"}
            </button>
            <AnimatePresence>
              {langMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -4 }}
                  transition={{ duration: 0.12 }}
                  className="absolute right-0 top-full mt-1 z-50 bg-popover border border-border rounded-xl shadow-lg overflow-hidden min-w-[120px]"
                >
                  {([["urdu", "اردو — Urdu"], ["english", "English"]] as const).map(([l, label]) => (
                    <button
                      key={l}
                      onClick={() => handleLang(l)}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-xs text-left hover:bg-muted transition-colors ${
                        lang === l ? "text-primary font-medium" : "text-foreground"
                      }`}
                    >
                      {lang === l && <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />}
                      {label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Show/hide translation */}
          <button
            onClick={handleToggleTrans}
            title={showTranslation ? "Hide translation" : "Show translation"}
            className={`rounded-lg p-1.5 transition-colors ${
              showTranslation
                ? "bg-primary/15 text-primary"
                : "bg-muted text-muted-foreground"
            }`}
          >
            <Languages className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* ── Section header ───────────────────────────────── */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-primary/80">{section.title}</p>
            <p className="font-arabic text-base text-muted-foreground" dir="rtl">{section.arabicTitle}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground tabular-nums">
              Page {pageIdx + 1} / {totalPagesInSection}
            </p>
          </div>
        </div>
        {/* Page progress bar */}
        <div className="mt-2 h-1 bg-border/40 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary/40 rounded-full"
            animate={{ width: `${((pageIdx + 1) / totalPagesInSection) * 100}%` }}
            transition={{ type: "spring", stiffness: 180, damping: 26 }}
          />
        </div>
      </div>

      {/* ── Page content ─────────────────────────────────── */}
      <div {...swipe} className="flex-1 px-4 py-4 max-w-2xl mx-auto w-full pb-28">
        <AnimatePresence mode="wait" initial={false}>
          <PageView
            key={`${sectionIdx}-${pageIdx}`}
            page={page}
            fontSizeIdx={fontSizeIdx}
            lang={lang}
            showTranslation={showTranslation}
            direction={direction}
          />
        </AnimatePresence>
      </div>

      {/* ── Bottom navigation ─────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-background/95 backdrop-blur-sm border-t border-border px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
          {/* Previous */}
          <Button
            variant="outline"
            size="sm"
            disabled={isFirstPage}
            onClick={goPrev}
            className="flex items-center gap-1.5 min-w-[90px]"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>

          {/* Page dots / indicator */}
          <div className="flex items-center gap-1 overflow-hidden max-w-[160px]">
            {totalPagesInSection <= 12 ? (
              section.pages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > pageIdx ? 1 : -1);
                    setPageIdx(i);
                  }}
                  className={`rounded-full transition-all flex-shrink-0 ${
                    i === pageIdx
                      ? "h-2 w-4 bg-primary"
                      : "h-1.5 w-1.5 bg-border hover:bg-primary/40"
                  }`}
                />
              ))
            ) : (
              <span className="text-xs text-muted-foreground tabular-nums">
                {pageIdx + 1} / {totalPagesInSection}
              </span>
            )}
          </div>

          {/* Next */}
          <Button
            variant={isLastPage ? "outline" : "default"}
            size="sm"
            disabled={isLastPage}
            onClick={goNext}
            className="flex items-center gap-1.5 min-w-[90px]"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Backdrop for lang menu */}
      {langMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setLangMenuOpen(false)}
        />
      )}
    </div>
  );
}

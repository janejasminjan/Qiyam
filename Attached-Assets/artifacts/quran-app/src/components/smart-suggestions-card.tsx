/**
 * smart-suggestions-card.tsx
 * Shows contextual Islamic suggestions based on the current prayer window,
 * day of week, and time of day.
 */
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronRight } from "lucide-react";
import { buildSmartSuggestions, type Suggestion } from "@/lib/prayer-times";
import { usePrayerTimes } from "@/hooks/use-prayer-times";

const TYPE_COLORS: Record<Suggestion["type"], string> = {
  quran:  "from-primary/10 to-primary/5 border-primary/20",
  hadith: "from-secondary/10 to-secondary/5 border-secondary/20",
  dhikr:  "from-emerald-500/10 to-emerald-500/5 border-emerald-500/20",
  prayer: "from-indigo-500/10 to-indigo-500/5 border-indigo-500/20",
  info:   "from-amber-500/10 to-amber-500/5 border-amber-500/20",
};

export function SmartSuggestionsCard() {
  const { data: times } = usePrayerTimes();
  const suggestions = buildSmartSuggestions(times);

  if (suggestions.length === 0) return null;

  const now = new Date();
  const timeLabel = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05 }}
      className="space-y-3"
    >
      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
        <Sparkles className="h-4 w-4 text-primary" />
        Smart Suggestions
        <span className="text-[11px] text-muted-foreground font-normal ml-auto">{timeLabel}</span>
      </div>

      <div className={`grid gap-3 ${suggestions.length === 1 ? "" : suggestions.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
        <AnimatePresence>
          {suggestions.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Link href={s.route}>
                <div className={`rounded-2xl border bg-gradient-to-br ${TYPE_COLORS[s.type]} hover:shadow-sm transition-all cursor-pointer group p-4 h-full flex flex-col gap-2`}>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-2xl leading-none">{s.emoji}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors mt-0.5 flex-shrink-0" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground leading-tight">{s.title}</div>
                    <div className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{s.description}</div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

import { useRef, useCallback } from "react";

export interface SwipeHandlers {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchEnd:   (e: React.TouchEvent) => void;
}

interface SwipePageOptions {
  onNext: () => void;
  onPrev: () => void;
  /** Minimum horizontal distance (px) to count as a swipe. Default: 50 */
  threshold?: number;
  /** Max ratio dy/dx before treating as a vertical scroll. Default: 1.2 */
  maxVerticalRatio?: number;
  /** Ignore touches within this many px of screen edge (iOS back). Default: 20 */
  edgeGuard?: number;
  /** Disable without removing from the component tree. Default: true */
  enabled?: boolean;
}

/**
 * Attaches to any touch container and fires onNext / onPrev on a clear
 * horizontal swipe. Vertical scrolls and iOS edge-back gestures are ignored
 * so normal scroll behaviour is fully preserved.
 */
export function useSwipePage({
  onNext,
  onPrev,
  threshold        = 50,
  maxVerticalRatio = 1.2,
  edgeGuard        = 20,
  enabled          = true,
}: SwipePageOptions): SwipeHandlers {
  const start = useRef<{ x: number; y: number } | null>(null);

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!enabled) return;
      const t = e.changedTouches[0];
      if (t.clientX < edgeGuard || t.clientX > window.innerWidth - edgeGuard) {
        start.current = null;
        return;
      }
      start.current = { x: t.clientX, y: t.clientY };
    },
    [enabled, edgeGuard],
  );

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!enabled || !start.current) return;
      const t  = e.changedTouches[0];
      const dx = t.clientX - start.current.x;
      const dy = t.clientY - start.current.y;
      start.current = null;

      if (Math.abs(dx) < threshold) return;
      if (Math.abs(dy) / Math.abs(dx) > maxVerticalRatio) return;

      if (dx < 0) onNext();
      else         onPrev();
    },
    [enabled, threshold, maxVerticalRatio, onNext, onPrev],
  );

  return { onTouchStart, onTouchEnd };
}

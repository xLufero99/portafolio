import { useEffect, useRef } from "react";
import type { RefObject } from "react";

const SWIPE_DISTANCE_THRESHOLD = 24;
const FLICK_VELOCITY_THRESHOLD = 0.5;
const FLICK_MAX_DURATION = 250;

export function useStrictTouchSnap(
  containerRef: RefObject<HTMLDivElement | null>,
  scrollTo: (idx: number) => void
) {
  const scrollToRef = useRef(scrollTo);

  useEffect(() => {
    scrollToRef.current = scrollTo;
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let startY = 0;
    let startTime = 0;

    const currentIndexOf = () => {
      const el = containerRef.current;
      if (!el) return 0;
      const total = el.querySelectorAll("[data-section-index]").length;
      return Math.max(
        0,
        Math.min(Math.round(el.scrollTop / el.clientHeight), total - 1)
      );
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      startY = e.touches[0].clientY;
      startTime = performance.now();
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      e.preventDefault();
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (e.changedTouches.length !== 1) return;
      const endY = e.changedTouches[0].clientY;
      const duration = performance.now() - startTime;
      const deltaY = startY - endY;
      if (deltaY === 0) return;

      const enoughDistance = Math.abs(deltaY) >= SWIPE_DISTANCE_THRESHOLD;
      const fastFlick =
        Math.abs(deltaY) / Math.max(duration, 1) >= FLICK_VELOCITY_THRESHOLD &&
        duration <= FLICK_MAX_DURATION;
      if (!enoughDistance && !fastFlick) return;

      scrollToRef.current(currentIndexOf() + (deltaY > 0 ? 1 : -1));
    };

    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    container.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, [containerRef]);
}
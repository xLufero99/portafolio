import { useEffect, useRef } from "react";
import type { RefObject } from "react";

const WHEEL_IDLE_MS = 140;
const WHEEL_THRESHOLD = 40;
const SCROLL_SETTLE_MS = 120;
const DESKTOP_MIN_WIDTH = 768;

export function useWheelSnap(
  containerRef: RefObject<HTMLDivElement | null>,
  scrollTo: (idx: number) => void
) {
  const scrollToRef = useRef(scrollTo);
  const lockedRef = useRef(false);
  const accumulatedRef = useRef(0);
  const idleTimerRef = useRef(0);
  const settleTimerRef = useRef(0);

  useEffect(() => {
    scrollToRef.current = scrollTo;
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.innerWidth <= DESKTOP_MIN_WIDTH) return;

    const sectionCount = () =>
      container.querySelectorAll("[data-section-index]").length;

    const currentIndexOf = () =>
      Math.max(
        0,
        Math.min(
          Math.round(container.scrollTop / container.clientHeight),
          sectionCount() - 1
        )
      );

    const jump = (direction: 1 | -1) => {
      const next = currentIndexOf() + direction;
      accumulatedRef.current = 0;
      if (next < 0 || next >= sectionCount()) return;
      lockedRef.current = true;
      scrollToRef.current(next);
    };

    const onScroll = () => {
      window.clearTimeout(settleTimerRef.current);
      settleTimerRef.current = window.setTimeout(() => {
        lockedRef.current = false;
      }, SCROLL_SETTLE_MS);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return;
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();

      const unit =
        e.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? 16
          : e.deltaMode === WheelEvent.DOM_DELTA_PAGE
            ? container.clientHeight
            : 1;
      accumulatedRef.current += e.deltaY * unit;

      window.clearTimeout(idleTimerRef.current);
      idleTimerRef.current = window.setTimeout(() => {
        if (Math.abs(accumulatedRef.current) < WHEEL_THRESHOLD) {
          accumulatedRef.current = 0;
          return;
        }
        if (lockedRef.current) {
          accumulatedRef.current = 0;
          return;
        }
        jump(accumulatedRef.current > 0 ? 1 : -1);
      }, WHEEL_IDLE_MS);
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("scroll", onScroll);
      window.clearTimeout(idleTimerRef.current);
      window.clearTimeout(settleTimerRef.current);
    };
  }, [containerRef]);
}

import { useEffect, useRef, type RefObject } from "react";

export function useCustomCursor(
  cursorDivRef: RefObject<HTMLDivElement | null>,
  isOnProjectRef: RefObject<boolean>,
  cursorTargetRef: RefObject<{ x: number; y: number }>
) {
  const cursorCurrentRef = useRef({ x: -200, y: -200 });

  useEffect(() => {
    let raf = 0;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      cursorCurrentRef.current.x = lerp(
        cursorCurrentRef.current.x,
        cursorTargetRef.current.x,
        0.12
      );
      cursorCurrentRef.current.y = lerp(
        cursorCurrentRef.current.y,
        cursorTargetRef.current.y,
        0.12
      );

      if (cursorDivRef.current) {
        const offset = isOnProjectRef.current ? 40 : 4;
        cursorDivRef.current.style.transform = `translate(${cursorCurrentRef.current.x - offset}px, ${cursorCurrentRef.current.y - offset}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [cursorDivRef, isOnProjectRef, cursorTargetRef]);
}
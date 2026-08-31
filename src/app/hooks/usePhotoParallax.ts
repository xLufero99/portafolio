import { useEffect, type RefObject } from "react";

export function usePhotoParallax(
  photoWrapRef: RefObject<HTMLDivElement | null>,
  mouseMxRef: RefObject<number>,
  mouseMyRef: RefObject<number>
) {
  useEffect(() => {
    let raf = 0;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const photoTarget = { x: 0, y: 0 };
    const photoCurrent = { x: 0, y: 0 };

    const tick = () => {
      const nx = mouseMxRef.current;
      const ny = mouseMyRef.current;

      photoTarget.x = (0.5 - nx) * 30;
      photoTarget.y = (0.5 - ny) * 30;

      photoCurrent.x = lerp(photoCurrent.x, photoTarget.x, 0.08);
      photoCurrent.y = lerp(photoCurrent.y, photoTarget.y, 0.08);

      if (photoWrapRef.current) {
        photoWrapRef.current.style.transform = `translate(${photoCurrent.x}px, ${photoCurrent.y}px)`;
      }

      raf = requestAnimationFrame(tick);
    };

    const isMobile = window.innerWidth <= 768;
    if (!isMobile) {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [mouseMxRef, mouseMyRef, photoWrapRef]);
}
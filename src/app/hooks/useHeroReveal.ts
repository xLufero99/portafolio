import { useEffect, type RefObject } from "react";

export function useHeroReveal(
  heroRef: RefObject<HTMLElement | null>,
  heroContentRef: RefObject<HTMLDivElement | null>,
  heroPhotoRef: RefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    if (!heroRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (heroContentRef.current) {
              const el = heroContentRef.current;
              el.style.transition = "none";
              el.style.opacity = "0";
              el.style.transform = "translateY(40px)";
              void el.offsetHeight;
              el.style.transition =
                "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s";
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }

            if (heroPhotoRef.current) {
              const el = heroPhotoRef.current;
              el.style.transition = "none";
              el.style.opacity = "0";
              el.style.transform = "translateY(60px)";
              void el.offsetHeight;
              el.style.transition =
                "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s";
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, [heroRef, heroContentRef, heroPhotoRef]);
}
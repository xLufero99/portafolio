import { useEffect, useState } from "react";

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const els = document.querySelectorAll("[data-section-index]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(
              entry.target.getAttribute("data-section-index") ?? "0"
            );
            setActiveSection(idx);
          }
        });
      },
      { threshold: 0.5 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return activeSection;
}
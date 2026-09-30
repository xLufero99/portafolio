import { useState, useRef } from "react";
import GlobalStyles from "./components/layout/GlobalStyles";
import PortfolioChrome from "./components/layout/PortfolioChrome";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Work from "./components/sections/Work";
import Services from "./components/sections/Services";
import Contact from "./components/sections/Contact";
import { useMousePosition } from "./hooks/useMousePosition";
import { useActiveSection } from "./hooks/useActiveSection";
import { useStrictTouchSnap } from "./hooks/useStrictTouchSnap";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { mouseMxRef, mouseMyRef } = useMousePosition();
  const activeSection = useActiveSection();

  const scrollTo = (idx: number) => {
    document
      .querySelector(`[data-section-index="${idx}"]`)
      ?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useStrictTouchSnap(scrollRef, scrollTo);

  return (
    <div
      className="bg-background text-foreground"
      style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}
    >
      <GlobalStyles />
      <PortfolioChrome
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        activeSection={activeSection}
        scrollTo={scrollTo}
      />

      <div
        ref={scrollRef}
        className="h-screen overflow-y-scroll h-viewport snap-y snap-mandatory touch-none"
      >
        <Hero mouseMxRef={mouseMxRef} mouseMyRef={mouseMyRef} />
        <About />
        <Work />
        <Services />
        <Contact />
      </div>
    </div>
  );
}
import { useState, useRef } from "react";
import CustomCursor from "./components/layout/CustomCursor";
import GlobalStyles from "./components/layout/GlobalStyles";
import PortfolioChrome from "./components/layout/PortfolioChrome";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Work from "./components/sections/Work";
import Services from "./components/sections/Services";
import Contact from "./components/sections/Contact";
import { useMousePosition } from "./hooks/useMousePosition";
import { useActiveSection } from "./hooks/useActiveSection";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOnProject, setIsOnProject] = useState(false);

  const { mouseNorm, mouseMxRef, mouseMyRef, cursorTargetRef } = useMousePosition();
  const activeSection = useActiveSection();

  const isOnProjectRef = useRef(false);

  const scrollTo = (idx: number) => {
    document
      .querySelector(`[data-section-index="${idx}"]`)
      ?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const parallax = (intensity: number) => ({
    transform: `translate(${(mouseNorm.x - 0.5) * intensity}px, ${(mouseNorm.y - 0.5) * intensity}px)`,
    transition: "transform 0.08s linear",
  });

  const setOnProject = (val: boolean) => {
    isOnProjectRef.current = val;
    setIsOnProject(val);
  };

  return (
    <div
      className="bg-background text-foreground"
      style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}
    >
      <GlobalStyles />
      <CustomCursor
        isOnProject={isOnProject}
        isOnProjectRef={isOnProjectRef}
        cursorTargetRef={cursorTargetRef}
      />
      <PortfolioChrome
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        activeSection={activeSection}
        scrollTo={scrollTo}
      />

      <div
        className="h-screen overflow-y-scroll h-viewport"
        style={{ scrollSnapType: "y mandatory" }}
      >
        <Hero mouseMxRef={mouseMxRef} mouseMyRef={mouseMyRef} />
        <About />
        <Work parallax={parallax} onProjectHover={setOnProject} />
        <Services />
        <Contact />
      </div>
    </div>
  );
}
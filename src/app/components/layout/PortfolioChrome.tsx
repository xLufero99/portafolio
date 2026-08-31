import type { Dispatch, SetStateAction } from "react";
import { SECTION_NAMES } from "../../data";

interface PortfolioChromeProps {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  activeSection: number;
  scrollTo: (idx: number) => void;
}

export default function PortfolioChrome({
  menuOpen,
  setMenuOpen,
  activeSection,
  scrollTo,
}: PortfolioChromeProps) {
  return (
    <>
      <div className="fixed top-7 left-8 z-50 select-none">
        <span
          className="font-bold text-sm text-white logo-text tracking-[0.15em] text-[clamp(16px,2vw,24px)]"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          LUFERO
        </span>
      </div>

      <button
        className="fixed top-6 right-8 z-50 flex flex-col gap-[5px] p-2 group menu-button"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Menu"
      >
        <span
          className="block h-px bg-white transition-all duration-400 menu-line w-[28px]"
          style={{
            transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
          }}
        />
        <span
          className="block h-px bg-white transition-all duration-200 menu-line w-[20px]"
          style={{
            opacity: menuOpen ? 0 : 1,
            transform: menuOpen ? "scaleX(0)" : "none",
          }}
        />
        <span
          className="block h-px bg-white transition-all duration-400 menu-line w-[28px]"
          style={{
            transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
          }}
        />
      </button>

      <div className="fixed left-7 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 mobile-hidden">
        {SECTION_NAMES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollTo(idx)}
            aria-label={SECTION_NAMES[idx]}
            className={`rounded-full border border-white transition-all duration-300 ${
              activeSection === idx
                ? "bg-white w-3 h-3"
                : "bg-transparent w-3 h-3 opacity-40 hover:opacity-80"
            }`}
          />
        ))}
      </div>

      <div className="fixed bottom-8 left-8 z-50 mix-blend-difference mobile-hidden">
        <span
          className="text-white/70 font-medium tracking-[0.25em] uppercase text-[14px]"
          style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}
        >
          Scroll
        </span>
      </div>

      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 mix-blend-difference mobile-hidden">
        <span
          className="text-white/70 font-medium tracking-[0.25em] uppercase text-[14px]"
          style={{ writingMode: "vertical-lr" }}
        >
          Portfolio
        </span>
      </div>

      <div
        className="fixed right-16 z-40 w-px mobile-hidden top-[22%] bottom-[22%] bg-[rgba(255,255,255,0.08)]"
      />

      <div
        className="fixed inset-0 z-40 flex items-center justify-center transition-all duration-600 bg-[#0A0A0A]"
        style={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        <nav className="flex flex-col items-center gap-4">
          {SECTION_NAMES.map((name, idx) => (
            <button
              key={name}
              onClick={() => scrollTo(idx)}
              className="text-white font-bold uppercase transition-colors duration-200 hover:text-primary text-[clamp(36px,7vw,80px)] tracking-[0.06em] leading-[1.1]"
            >
              {name}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-8">
          {["Behance", "LinkedIn"].map((s) => (
            <a
              key={s}
              href="#"
              className="text-white/40 hover:text-white text-xs transition-colors duration-200 tracking-[0.15em] uppercase"
            >
              {s}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
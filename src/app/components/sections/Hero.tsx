import { useRef } from "react";
import type { RefObject } from "react";
import fotoMia from "../../../assets/foto_mia.png";
import { useWaveCanvas } from "../../hooks/useWaveCanvas";
import { usePhotoParallax } from "../../hooks/usePhotoParallax";
import { useHeroReveal } from "../../hooks/useHeroReveal";

const CONTENT_TRANSITION =
  "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s";
const PHOTO_TRANSITION =
  "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s";

interface HeroProps {
  mouseMxRef: RefObject<number>;
  mouseMyRef: RefObject<number>;
}

export default function Hero({ mouseMxRef, mouseMyRef }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroPhotoRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const photoWrapRef = useRef<HTMLDivElement>(null);

  useWaveCanvas(canvasRef, mouseMxRef, mouseMyRef);
  usePhotoParallax(photoWrapRef, mouseMxRef, mouseMyRef);
  useHeroReveal(heroRef, heroContentRef, heroPhotoRef);

  return (
    <section
      ref={heroRef}
      data-section-index="0"
      className="hero-section relative bg-[#0A0A0A] overflow-visible snap-start"
    >
      <div
        className="hero-container absolute overflow-visible opacity-100 left-[14vw] right-[12vw] top-[22vh] bottom-0"
        style={{ transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s" }}
      >
        <div className="absolute inset-0 bg-[#3DCFC4] overflow-hidden z-0">
          <canvas
            ref={canvasRef}
            className="absolute bottom-0 left-0 w-full h-[48%] block"
          />
        </div>

        <div
          ref={heroContentRef}
          className="hero-content absolute bottom-[30%] left-[17%] z-[15] opacity-100 translate-y-0"
          style={{ transition: CONTENT_TRANSITION }}
        >
          <span
            className="hero-subtitle block text-[clamp(24px,4vw,50px)] font-normal text-[rgba(0,0,0,0.6)] mb-[clamp(20px,5vh,60px)] ml-[15px] tracking-[0.09em]"
            style={{ fontFamily: "'Charm´" }}
          >
            FullStack DV
          </span>
          <h1
            className="hero-title text-white font-bold leading-[0.85] text-[clamp(60px,15vw,200px)] m-0"
            style={{ fontFamily: "'Charm´" }}
          >
            Daniel
            <br />
            Gómez
          </h1>
        </div>

        <div className="hero-info-box absolute right-0 bottom-0 z-20 bg-[#0A0A0A] p-[32px_40px] w-[min(480px,32vw)] max-w-none">
          <p className="text-[rgba(255,255,255,0.75)] text-[14px] leading-[1.5] m-[0_0_12px_0]">
            Desarrollador FullStack creando experiencias digitales con atención al
            detalle.
          </p>
          <a
            href="https://linktr.ee/xLufero99"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-medium text-[11px] tracking-[0.15em] uppercase border-b border-[rgba(255,255,255,0.4)] pb-[4px]"
          >
            Contáctame
          </a>
        </div>
      </div>

      <div className="hero-photo-clip absolute top-0 left-0 right-0 overflow-hidden z-[1] pointer-events-none">
        <div
          ref={heroPhotoRef}
          className="hero-photo absolute right-[12vw] bottom-0 w-[min(782px,62vw)] z-[1] overflow-visible pointer-events-none opacity-100 translate-y-0 will-change-transform"
          style={{ transition: PHOTO_TRANSITION }}
        >
          <div
            ref={photoWrapRef}
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${fotoMia})` }}
          />
        </div>
      </div>
    </section>
  );
}
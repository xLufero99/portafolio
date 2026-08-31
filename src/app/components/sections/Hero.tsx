import { useRef } from "react";
import type { RefObject } from "react";
import fotoMia from "../../../assets/foto_mia.png";
import { useWaveCanvas } from "../../hooks/useWaveCanvas";
import { usePhotoParallax } from "../../hooks/usePhotoParallax";
import { useHeroReveal } from "../../hooks/useHeroReveal";

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
      className="hero-section"
      style={{
        position: "relative",
        backgroundColor: "#0A0A0A",
        overflow: "visible",
        scrollSnapAlign: "start",
      }}
    >
      <div
        className="hero-container"
        style={{
          position: "absolute",
          left: "14vw",
          right: "12vw",
          top: "22vh",
          bottom: "0",
          overflow: "visible",
          opacity: 1,
          transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#3DCFC4",
            overflow: "hidden",
            zIndex: 0,
          }}
        >
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "48%",
              display: "block",
            }}
          />
        </div>

        <div
          ref={heroContentRef}
          className="hero-content"
          style={{
            position: "absolute",
            bottom: "30%",
            left: "17%",
            zIndex: 15,
            opacity: 1,
            transform: "translateY(0)",
            transition:
              "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
          }}
        >
          <span
            className="hero-subtitle"
            style={{
              display: "block",
              fontSize: "clamp(24px, 4vw, 50px)",
              fontWeight: 400,
              color: "rgba(0,0,0,0.6)",
              marginBottom: "clamp(20px, 5vh, 60px)",
              marginLeft: "15px",
              letterSpacing: "0.09em",
              fontFamily: "'Charm´",
            }}
          >
            FullStack DV
          </span>
          <h1
            className="hero-title "
            style={{
              margin: 0,
              fontSize: "clamp(60px, 15vw, 200px)",
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 0.85,
              letterSpacing: "-0.0em",
              fontFamily: "'Charm´",
            }}
          >
            Daniel
            <br />
            Gómez
          </h1>
        </div>

        <div
          className="hero-info-box"
          style={{
            position: "absolute",
            right: "0",
            bottom: "0",
            zIndex: 20,
            backgroundColor: "#0A0A0A",
            padding: "32px 40px",
            width: "min(480px, 32vw)",
            maxWidth: "none",
          }}
        >
          <p
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: "14px",
              lineHeight: 1.5,
              margin: "0 0 12px 0",
            }}
          >
            Desarrollador FullStack creando experiencias digitales con atención al detalle.
          </p>
          <a
            href="https://linktr.ee/xLufero99"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-medium"
            style={{
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              borderBottom: "1px solid rgba(255,255,255,0.4)",
              paddingBottom: "4px",
            }}
          >
            Contáctame
          </a>
        </div>
      </div>

      <div
        className="hero-photo-clip"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          overflow: "hidden",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <div
          ref={heroPhotoRef}
          className="hero-photo"
          style={{
            position: "absolute",
            right: "12vw",
            bottom: 0,
            width: "min(782px, 62vw)",
            zIndex: 1,
            overflow: "visible",
            pointerEvents: "none",
            opacity: 1,
            transform: "translateY(0)",
            transition:
              "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s",
            willChange: "transform",
          }}
        >
          <div
            ref={photoWrapRef}
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: `url(${fotoMia})`,
              backgroundSize: "cover",
              backgroundPosition: "center 50%",
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>
      </div>
    </section>
  );
}
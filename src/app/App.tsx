import { useState, useRef } from "react";
import fotoMia from '../assets/foto_mia.png';
import { PROJECTS, SERVICES, SECTION_NAMES, MIS_TECNOLOGIAS } from "./data";
import { useMousePosition } from "./hooks/useMousePosition";
import { useCustomCursor } from "./hooks/useCustomCursor";
import { usePhotoParallax } from "./hooks/usePhotoParallax";
import { useWaveCanvas } from "./hooks/useWaveCanvas";
import { useActiveSection } from "./hooks/useActiveSection";
import { useHeroReveal } from "./hooks/useHeroReveal";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOnProject, setIsOnProject] = useState(false);

  const { mouseNorm, mouseMxRef, mouseMyRef, cursorTargetRef } = useMousePosition();
  const activeSection = useActiveSection();

  const cursorDivRef = useRef<HTMLDivElement>(null);
  const isOnProjectRef = useRef(false);
  const photoWrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const heroRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroPhotoRef = useRef<HTMLDivElement>(null);

  useCustomCursor(cursorDivRef, isOnProjectRef, cursorTargetRef);
  usePhotoParallax(photoWrapRef, mouseMxRef, mouseMyRef);
  useWaveCanvas(canvasRef, mouseMxRef, mouseMyRef);
  useHeroReveal(heroRef, heroContentRef, heroPhotoRef);

  // ─── Funciones globales ────────────────────────────────────
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

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 3. RENDER
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  return (
  <div className="bg-background text-foreground" style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>
    
    {/* ─── ESTILOS GLOBALES ──────────────────────────────── */}
  
<style>{`
  * { cursor: none !important; }
  ::-webkit-scrollbar { display: none; }
  html, body { scrollbar-width: none; overflow: hidden; }

  .hero-section,
  .hero-photo-clip {
    height: 100vh;
    height: 100dvh;
  }

  .hero-photo {
    height: min(820px, 96vh);
    height: min(820px, 96dvh);
  }

  .h-viewport {
    height: 100vh;
    height: 100dvh;
  }

  @media (max-width: 768px) {
  .mobile-hidden {
    display: none !important;
  }
  
  .fixed.top-0.left-0.z-\\[9999\\] {
    display: none !important;
  }
  
  * {
    cursor: auto !important;
  }
  
  .hero-container {
    left: 0 !important;
    right: 0 !important;
    width: 100% !important;
    border-radius: 0 !important;
  }
  
  .hero-container canvas {
    height: 54% !important;
    bottom: -4% !important;
  }
  
  .hero-content {
    left: 8% !important;
    bottom: 60% !important;
  }
  
  .hero-photo {
    right: -12% !important;
    width: min(440px, 85vw) !important;
    height: min(500px, 96vh) !important;
    height: min(500px, 96dvh) !important;
    bottom: -9px !important;
  }
  
  /* 🔥 ESTA ES LA CLAVE - REPOSICIONAR LA IMAGEN */
  .hero-photo div {
    background-position: 55% center !important;
  }
  
  .hero-info-box {
    right: 0 !important;
    bottom: 0 !important;
    width: min(210px, 52vw) !important;
    padding: 16px !important;
  }
  
  .hero-title {
    font-size: clamp(40px, 12vw, 80px) !important;
  }
  
  .hero-subtitle {
    font-size: clamp(16px, 3vw, 30px) !important;
    margin-bottom: clamp(10px, 3vh, 40px) !important;
    margin-left: 5px !important;
  }
  
  .logo-text {
    font-size: 22px !important;
    letter-spacing: 0.2em !important;
  }
  
  .menu-button {
    top: 20px !important;
    right: 20px !important;
    gap: 8px !important;
    padding: 4px !important;
  }
  
  .menu-line {
    height: 2.5px !important;
  }
  
  .menu-line:first-child,
  .menu-line:last-child {
    width: 32px !important;
  }
  
  .menu-line:nth-child(2) {
    width: 24px !important;
  }
}
`}</style>























      {/* ─── CURSOR PERSONALIZADO ──────────────────────────── */}
      <div
        ref={cursorDivRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ willChange: "transform" }}
      >
        <div
          className={`flex items-center justify-center rounded-full transition-all duration-300 ease-out ${
            isOnProject
              ? "w-20 h-20 border border-white/50 bg-black/10 backdrop-blur-[2px]"
              : "w-2 h-2 bg-white"
          }`}
        >
          {isOnProject && (
            <span
              className="text-white font-semibold"
              style={{ fontSize: "9px", letterSpacing: "0.2em" }}
            >
              VIEW
            </span>
          )}
        </div>
      </div>

  {/* ─── LOGO ────────────────────────────────────────── */}
<div className="fixed top-7 left-8 z-50 select-none">
  <span 
    className="font-bold text-sm logo-text" 
    style={{ 
      letterSpacing: "0.15em",
      fontFamily: "'Manrope', sans-serif", // <--- Fuente Manrope
      fontSize: "clamp(16px, 2vw, 24px)",
      color: "#FFFFFF"
    }}
  >
    LUFERO
  </span>
</div>

      {/* ─── MENÚ HAMBURGUESA ────────────────────────────── */}
<button
  className="fixed top-6 right-8 z-50 flex flex-col gap-[5px] p-2 group menu-button"
  onClick={() => setMenuOpen((v) => !v)}
  aria-label="Menu"
>
  <span
    className="block h-px bg-white transition-all duration-400 menu-line"
    style={{
      width: "28px",
      transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
    }}
  />
  <span
    className="block h-px bg-white transition-all duration-200 menu-line"
    style={{
      width: "20px",
      opacity: menuOpen ? 0 : 1,
      transform: menuOpen ? "scaleX(0)" : "none",
    }}
  />
  <span
    className="block h-px bg-white transition-all duration-400 menu-line"
    style={{
      width: "28px",
      transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
    }}
  />
</button>

      {/* ─── NAVEGACIÓN DE PUNTITOS (oculto en móvil) ────────── */}
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

      {/* ─── TEXTO "SCROLL" (oculto en móvil) ──────────────────── */}
      <div className="fixed bottom-8 left-8 z-50 mix-blend-difference mobile-hidden">
        <span
          className="text-white/70 font-medium"
          style={{
            writingMode: "vertical-lr",
            transform: "rotate(180deg)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            fontSize: "14px",
          }}
        >
          Scroll
        </span>
      </div>

      {/* ─── TEXTO "PORTFOLIO" (oculto en móvil) ──────────────── */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 mix-blend-difference mobile-hidden">
        <span
          className="text-white/70 font-medium"
          style={{
            writingMode: "vertical-lr",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            fontSize: "14px",
          }}
        >
          Portfolio
        </span>
      </div>

      {/* ─── LÍNEA DECORATIVA DERECHA (oculto en móvil) ────── */}
      <div
        className="fixed right-16 z-40 w-px mobile-hidden"
        style={{
          top: "22%",
          bottom: "22%",
          background: "rgba(255,255,255,0.08)",
        }}
      />

      {/* ─── MENÚ DE PANTALLA COMPLETA ──────────────────────── */}
      <div
        className="fixed inset-0 z-40 flex items-center justify-center transition-all duration-600"
        style={{
          backgroundColor: "#0A0A0A",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        <nav className="flex flex-col items-center gap-4">
          {SECTION_NAMES.map((name, idx) => (
            <button
              key={name}
              onClick={() => scrollTo(idx)}
              className="text-white font-bold uppercase transition-colors duration-200 hover:text-primary"
              style={{
                fontSize: "clamp(36px, 7vw, 80px)",
                letterSpacing: "0.06em",
                lineHeight: 1.1,
              }}
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
              className="text-white/40 hover:text-white text-xs transition-colors duration-200"
              style={{ letterSpacing: "0.15em", textTransform: "uppercase" }}
            >
              {s}
            </a>
          ))}
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. CONTENEDOR SCROLL
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        className="h-screen overflow-y-scroll h-viewport"
        style={{ scrollSnapType: "y mandatory" }}
      >
        
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            5. SECCIÓN HERO (index 0) - CON ANIMACIONES AL SCROLL
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
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
  {/* Capa interna: fondo teal + canvas de olas, con recorte propio */}
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

  {/* Contenido textual (FullStack DV + Daniel Gomez) */}
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
      transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
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

  {/* Cuadro negro de descripción estilo Phoenix */}
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
    <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "14px", lineHeight: 1.5, margin: "0 0 12px 0" }}>
      Desarrollador FullStack creando experiencias digitales con atención al detalle.
    </p>
    <a
      href="https://linktr.ee/xLufero99"
      target="_blank"
      rel="noopener noreferrer"
      className="text-white font-medium"
      style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", borderBottom: "1px solid rgba(255,255,255,0.4)", paddingBottom: "4px" }}
    >
      Contáctame
    </a>
  </div>
</div>

  {/* Foto */}
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
        transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s",
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

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECCIÓN ABOUT ME (index 1)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
<section
  data-section-index="1"
  className="relative flex items-center h-viewport"
  style={{ 
    backgroundColor: "#0A0A0A", 
    scrollSnapAlign: "start",
    padding: "10px 0",
    overflow: "hidden" // Evita scroll interno
  }}
>
  {/* Fondo decorativo - más sutil en móvil */}
  <div className="absolute inset-0 opacity-3 md:opacity-5 pointer-events-none">
    <div className="absolute top-10 right-10 w-40 h-40 md:w-96 md:h-96 bg-[#3DCFC4] rounded-full blur-2xl md:blur-3xl" />
    <div className="absolute bottom-10 left-10 w-32 h-32 md:w-80 md:h-80 bg-blue-500 rounded-full blur-2xl md:blur-3xl" />
  </div>

  <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-12">
    {/* Título - más compacto */}
    <div className="mb-3 md:mb-8">
      <span
        className="font-medium text-[10px] md:text-sm"
        style={{ 
          letterSpacing: "0.12em", 
          textTransform: "uppercase", 
          color: "#3DCFC4" 
        }}
      >
        Sobre Mí
      </span>
      <h2
        className="text-white font-bold mt-1 md:mt-3"
        style={{ 
          fontSize: "clamp(20px, 3.5vw, 64px)", 
          lineHeight: 1.1,
          letterSpacing: "-0.02em"
        }}
      >
        FullStack DV
        <br />
        <span style={{ color: "#3DCFC4", fontSize: "clamp(18px, 3vw, 50px)" }}>
          Creativo & Versátil
        </span>
      </h2>
    </div>

    {/* Grid - una columna en móvil */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-8 items-start">
      {/* Columna izquierda - texto */}
      <div>
        <p
          className="text-white/70 leading-snug mb-2 md:mb-4"
          style={{ fontSize: "clamp(11px, 1.1vw, 18px)", lineHeight: 1.4 }}
        >
          Soy <span className="text-white font-semibold">Daniel Gomez</span>, 
          Estudiante de Ingeniería de Sistemas de 10mo semestre con enfoque backend especialmente en Java/Spring Boot, arquitectura y despliegue en la nube,
          Manejo el ecosistema frontend (HTML/CSS/JS) y estoy potenciando mis proyectos con React, 
          Busco oportunidades para consolidarme como desarrollador full-stack.
        </p>




    {/* <p
  className="text-white/50 leading-snug mb-3 md:mb-6"
  style={{ fontSize: "clamp(10px, 0.9vw, 16px)", lineHeight: 1.4 }}
>
  Especializado en JavaScript/TypeScript, aplicaciones escalables 
  e interfaces intuitivas.
</p> */}




        {/* Stats - más compactos */}
        <div className="grid grid-cols-3 gap-1.5 md:gap-3">
          {[
            { n: "1+", l: "Años" },
            { n: "7+", l: "Proyectos" },
            { n: "5+", l: "Clientes" },
          ].map((stat) => (
            <div key={stat.l} className="bg-white/5 rounded-lg p-1.5 md:p-3 text-center border border-white/5">
              <span className="block text-[#3DCFC4] font-bold text-sm md:text-2xl">
                {stat.n}
              </span>
              <span className="text-white/40 text-[8px] md:text-xs uppercase tracking-wider">
                {stat.l}
              </span>
            </div>
          ))}
        </div>
      </div>
 </div>



{/* Columna derecha - tecnologías */}
<div>
  <h3
    className="text-white font-semibold mb-1.5 md:mb-4"
    style={{ fontSize: "clamp(9px, 0.8vw, 18px)", letterSpacing: "0.1em", textTransform: "uppercase" }}
  >
    <br />
    <span className="text-[#3DCFC4]"></span> Tecnologías
  </h3>
  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 gap-1.5 md:gap-3">
    {MIS_TECNOLOGIAS.slice(0, 6).map((skill) => (
      <div
        key={skill.name}
        className="group bg-white/5 hover:bg-white/10 rounded-lg p-1.5 md:p-3 transition-all duration-300 hover:scale-105 border border-white/5"
      >
        <div className="flex flex-col items-center text-center">
          <img 
            src={skill.icon} 
            alt={skill.name}
            className="w-5 h-5 md:w-8 md:h-8 mb-0.5 md:mb-1.5 opacity-70 group-hover:opacity-100 transition-all duration-300"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <span className="text-white/70 text-[7px] md:text-xs font-medium leading-tight">
            {skill.name}
          </span>
          <div className="w-full h-0.5 bg-white/10 rounded-full overflow-hidden mt-0.5">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${skill.level}%`,
                backgroundColor: "#3DCFC4",
                opacity: 0.5,
              }}
            />
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

    {/* Footer - más compacto */}
    <div className="mt-2 md:mt-8 pt-2 md:pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-1.5 md:gap-4">
      <div className="flex flex-wrap items-center gap-1.5 md:gap-4">
        <span className="text-white/30 text-[8px] md:text-sm uppercase tracking-wider">
          Disponible
        </span>
        <span className="text-[#3DCFC4] font-semibold text-[10px] md:text-lg">
          Freelance
        </span>
        <div className="flex items-center gap-1">
          <span className="w-1 h-1 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-green-500 text-[7px] md:text-xs">Activo</span>
        </div>
      </div>
      <div className="flex gap-2 md:gap-4">
        {[
          { name: "GitHub", url: "https://github.com/xLufero99" },
          { name: "LinkedIn", url: "https://www.linkedin.com/in/daniel-felipe-gomez-miranda-29348625a/" },
        ].map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-[#3DCFC4] transition-colors duration-200 text-[8px] md:text-sm uppercase tracking-wider hover:scale-105 transform"
          >
            {social.name}
          </a>
        ))}
      </div>
    </div>
  </div>
</section>






        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECCIÓN WORK (index 2)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section
          data-section-index="2"
          className="relative h-screen overflow-hidden h-viewport"
          style={{ backgroundColor: "#0A0A0A", scrollSnapAlign: "start" }}
        >
          <div
            className="absolute top-7 left-16 z-10 font-medium"
            style={{ fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#3DCFC4" }}
          >
           
          </div>
          <div
            className="absolute top-7 right-20 z-10 text-white/25 font-medium"
            style={{ fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase" }}
          >
          
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 h-full">
            {PROJECTS.map((project) => (
              <div
                key={project.id}
                className="relative overflow-hidden group"
                onMouseEnter={() => setOnProject(true)}
                onMouseLeave={() => setOnProject(false)}
              >
                <div className="w-full h-full bg-card overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    style={parallax(10)}
                  />
                </div>
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
                    opacity: 1,
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <span
                    className="block mb-2 font-medium"
                    style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#3DCFC4" }}
                  >
                    {project.category} — {project.year}
                  </span>
                  <div className="flex items-end justify-between">
                    <h3
                      className="text-white font-bold uppercase"
                      style={{ fontSize: "clamp(18px, 2vw, 28px)", letterSpacing: "0.05em" }}
                    >
                      {project.title}
                    </h3>
                    <span
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-4 font-bold"
                      style={{ color: "#00E5D1", fontSize: "22px" }}
                    >
                      ↘
                    </span>
                  </div>
                </div>
                <div className="absolute inset-0 border border-white/[0.05] pointer-events-none" />
              </div>
            ))}
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECCIÓN SERVICES (index 3)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section
          data-section-index="3"
          className="relative h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 h-viewport"
          style={{ backgroundColor: "#0A0A0A", scrollSnapAlign: "start" }}
        >
          <div className="mb-14">
            <span
              className="font-medium"
              style={{ fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#3DCFC4" }}
            >
            
            </span>
          </div>

          <div className="flex flex-col">
            {SERVICES.map((service, idx) => (
              <div
                key={service.number}
                className={`group flex flex-wrap items-center gap-6 md:gap-10 py-7 transition-colors duration-200 hover:bg-white/[0.025] ${
                  idx !== SERVICES.length - 1 ? "border-b border-white/10" : ""
                }`}
              >
                <span
                  className="w-10 flex-shrink-0 font-medium"
                  style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#3DCFC4" }}
                >
                  {service.number}
                </span>
                <h3
                  className="text-white font-bold uppercase flex-1 min-w-[200px]"
                  style={{ fontSize: "clamp(18px, 3.2vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.01em" }}
                >
                  {service.title}
                </h3>
                <p
                  className="flex-shrink-0 leading-relaxed w-full md:w-auto"
                  style={{ maxWidth: "300px", fontSize: "14px", color: "rgba(255,255,255,0.45)", lineHeight: 1.65 }}
                >
                  {service.description}
                </p>
                <span
                  className="flex-shrink-0 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ color: "#00E5D1", fontSize: "20px" }}
                >
                  ↘
                </span>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-8 md:gap-12 border-t border-white/10 pt-10">
            {[
              { n: "120+", l: "Projects" },
              { n: "6", l: "Years" },
              { n: "48", l: "Awards" },
              { n: "32", l: "Clients" },
            ].map(({ n, l }) => (
              <div key={l}>
                <span className="block text-white font-black" style={{ fontSize: "clamp(28px, 3vw, 44px)" }}>
                  {n}
                </span>
                <span
                  className="block font-medium mt-1"
                  style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}
                >
                  {l}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECCIÓN CONTACT (index 4)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section
          data-section-index="4"
          className="relative h-screen flex flex-col justify-between px-8 md:px-16 lg:px-24 py-12 md:py-24 overflow-hidden h-viewport"
          style={{ backgroundColor: "#3DCFC4", scrollSnapAlign: "start" }}
        >
          <div
            className="absolute -bottom-4 -left-4 text-black/[0.06] font-black uppercase leading-none select-none pointer-events-none"
            style={{ fontSize: "clamp(80px, 20vw, 280px)" }}
          >
            Hello.
          </div>

          <div className="relative z-10">
            <span
              className="block mb-8 font-medium text-black/50"
              style={{ fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase" }}
            >
              Get In Touch
            </span>
            <h2
              className="text-white font-black uppercase"
              style={{ fontSize: "clamp(40px, 9vw, 128px)", lineHeight: 0.91, letterSpacing: "-0.02em" }}
            >
              Ready to
              <br />
              Make
              <br />
              Something
              <br />
              Great?
            </h2>
          </div>

          <div className="relative z-10 flex flex-wrap items-end justify-between gap-8">
            <div className="flex flex-col gap-3">
              <a
                href="mailto:hello@phoenixstudio.co"
                className="text-black/80 hover:text-black transition-colors duration-200 font-medium"
                style={{ fontSize: "17px", letterSpacing: "0.01em" }}
              >
                hello@phoenixstudio.co
              </a>
              <a
                href="tel:+12125550199"
                className="text-black/50 hover:text-black transition-colors duration-200"
                style={{ fontSize: "15px" }}
              >
                +1 (212) 555-0199
              </a>
            </div>

            <a
              href="https://linktr.ee/xLufero99"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 border-2 border-black/70 px-8 py-4 text-black font-semibold transition-all duration-300 hover:bg-black hover:text-primary hover:border-black"
            >
              <span style={{ fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                Start a Project
              </span>
              <span style={{ color: "#00E5D1", fontSize: "18px" }}>↘</span>
            </a>

            <div className="flex flex-col items-start md:items-end gap-3">
              <span
                className="text-black/40 font-medium"
                style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" }}
              >
                Follow Us
              </span>
              <div className="flex gap-5 flex-wrap">
                {["Instagram", "Behance", "LinkedIn"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="text-black/60 hover:text-black transition-colors duration-200 font-medium"
                    style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase" }}
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
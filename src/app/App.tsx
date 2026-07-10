import { useState, useEffect, useRef } from "react";
import fotoMia from '../assets/foto_mia.png';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. DATOS GLOBALES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
}

interface Service {
  number: string;
  title: string;
  description: string;
}

interface TechSkill {
  name: string;
  icon: string;
  level: number;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Noir Editorial",
    category: "Photography",
    year: "2024",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=900&h=700&fit=crop&auto=format",
  },
  {
    id: 2,
    title: "Flux Identity",
    category: "Branding",
    year: "2024",
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=900&h=700&fit=crop&auto=format",
  },
  {
    id: 3,
    title: "Obsidian Campaign",
    category: "Art Direction",
    year: "2023",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=900&h=700&fit=crop&auto=format",
  },
  {
    id: 4,
    title: "Luminary Film",
    category: "Film & Motion",
    year: "2023",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&h=700&fit=crop&auto=format",
  },
];

const SERVICES: Service[] = [
  {
    number: "01",
    title: "Art Direction",
    description:
      "Visual storytelling that commands attention and drives emotional resonance across every medium.",
  },
  {
    number: "02",
    title: "Brand Identity",
    description:
      "Distinctive systems built from first principles — mark, palette, type, and voice unified into a singular presence.",
  },
  {
    number: "03",
    title: "Editorial Photography",
    description:
      "High-contrast, cinematic imagery for campaigns, editorial features, and luxury product launches.",
  },
  {
    number: "04",
    title: "Film & Motion",
    description:
      "Narrative-driven video production from concept through final color grade, scored and sound-designed.",
  },
];

const TECH_SKILLS: TechSkill[] = [
  { 
    name: "React", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", 
    level: 95 
  },
  { 
    name: "TypeScript", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", 
    level: 90 
  },
  { 
    name: "Next.js", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", 
    level: 88 
  },
  { 
    name: "Node.js", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", 
    level: 85 
  },
  { 
    name: "Python", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", 
    level: 80 
  },
  { 
    name: "Tailwind CSS", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", 
    level: 92 
  },
  { 
    name: "GraphQL", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg", 
    level: 78 
  },
  { 
    name: "Docker", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", 
    level: 75 
  },
  { 
    name: "PostgreSQL", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", 
    level: 82 
  },
  { 
    name: "MongoDB", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", 
    level: 80 
  },
  { 
    name: "Figma", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", 
    level: 85 
  },
  { 
    name: "AWS", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg", 
    level: 70 
  },
  { 
    name: "Git", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", 
    level: 88 
  },
  { 
    name: "JavaScript", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", 
    level: 92 
  },
  { 
    name: "HTML5", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", 
    level: 90 
  },
  { 
    name: "CSS3", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", 
    level: 88 
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION_NAMES actualizado (Home, About, Work, Services, Contact)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const SECTION_NAMES = ["Home", "About", "Work", "Services", "Contact"];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. COMPONENTE PRINCIPAL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function App() {
  // ─── Estados globales ──────────────────────────────────────
  const [activeSection, setActiveSection] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -200, y: -200 });
  const [isOnProject, setIsOnProject] = useState(false);
  const [mouseNorm, setMouseNorm] = useState({ x: 0.5, y: 0.5 });

  // ─── Refs globales ─────────────────────────────────────────
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseMxRef = useRef(0.5);
  const mouseMyRef = useRef(0.5);
  const cursorTargetRef = useRef({ x: -200, y: -200 });
  const cursorCurrentRef = useRef({ x: -200, y: -200 });
  const cursorDivRef = useRef<HTMLDivElement>(null);
  const isOnProjectRef = useRef(false);
  const photoWrapRef = useRef<HTMLDivElement>(null);

  // ─── Refs para animaciones de la sección Hero ─────────────
  const heroRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroPhotoRef = useRef<HTMLDivElement>(null);

  // ─── Efecto: Cursor suave ─────────────────────────────────
  useEffect(() => {
    let raf: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      cursorCurrentRef.current.x = lerp(cursorCurrentRef.current.x, cursorTargetRef.current.x, 0.12);
      cursorCurrentRef.current.y = lerp(cursorCurrentRef.current.y, cursorTargetRef.current.y, 0.12);

      if (cursorDivRef.current) {
        const offset = isOnProjectRef.current ? 40 : 4;
        cursorDivRef.current.style.transform = `translate(${cursorCurrentRef.current.x - offset}px, ${cursorCurrentRef.current.y - offset}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // ─── Efecto Parallax en la foto ────────────────────────────
  useEffect(() => {
    let raf: number;
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
    
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // ─── Efecto: Seguimiento del mouse ────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorTargetRef.current = { x: e.clientX, y: e.clientY };
      setCursorPos({ x: e.clientX, y: e.clientY });
      const nx = e.clientX / window.innerWidth;
      const ny = e.clientY / window.innerHeight;
      mouseMxRef.current = nx;
      mouseMyRef.current = ny;
      setMouseNorm({ x: nx, y: ny });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // ─── Efecto: Animación de olas (canvas) ───────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let t = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const mx = mouseMxRef.current;
      const my = mouseMyRef.current;

      // Wave layer 1 — tealDark bleed
      ctx.beginPath();
      ctx.moveTo(0, h * 0.45);
      for (let x = 0; x <= w; x += 2) {
        const y =
          h * 0.45 +
          Math.sin((x / w) * Math.PI * 5 + t + mx * 2.5) * (28 + my * 18);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fillStyle = "rgba(29,168,158,0.45)";
      ctx.fill();

      // Wave layer 2 — deep black
      ctx.beginPath();
      ctx.moveTo(0, h * 0.6);
      for (let x = 0; x <= w; x += 2) {
        const y =
          h * 0.6 +
          Math.sin((x / w) * Math.PI * 4 + t * 1.4 + mx) * (20 + my * 12);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fillStyle = "rgba(10,10,10,0.65)";
      ctx.fill();

      t += 0.014;
      animRef.current = requestAnimationFrame(draw);
    };
    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // ─── Efecto: Detectar sección activa ──────────────────────
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

  // ─── 👇 NUEVO: Efecto para reiniciar animaciones de Hero al hacer scroll ──
  useEffect(() => {
    if (!heroRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reiniciar animación del contenido textual (FullStack DV + Daniel Gomez)
            if (heroContentRef.current) {
              const el = heroContentRef.current;
              // Quitar transiciones temporalmente para resetear
              el.style.transition = 'none';
              el.style.opacity = '0';
              el.style.transform = 'translateY(40px)';
              // Forzar reflow
              void el.offsetHeight;
              // Restaurar transición y valores finales
              el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s';
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            }

            // Reiniciar animación de la foto
            if (heroPhotoRef.current) {
              const el = heroPhotoRef.current;
              el.style.transition = 'none';
              el.style.opacity = '0';
              el.style.transform = 'translateY(60px)';
              void el.offsetHeight;
              el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s';
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            }
          }
        });
      },
      { threshold: 0.3 } // Se activa cuando el 30% de la sección es visible
    );

    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

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
  
  @media (max-width: 768px) {
    .mobile-hidden {
      display: none !important;
    }
    
    .hero-container {
      left: 0 !important;
      right: 0 !important;
      width: 100% !important;
      border-radius: 0 !important;
      /* top se mantiene: 20vh */
      /* bottom se mantiene: 1vh */
    }
    
    /* SOLO EXTENDER EL CANVAS */
    .hero-container canvas {
      height: 54% !important;
      bottom: -4% !important;
    }
    
    .hero-content {
      left: 8% !important;
      bottom: 30% !important;
    }
    
    .hero-photo {
      right: 2% !important;
      width: min(280px, 40vw) !important;
      height: min(420px, 65vh) !important;
      bottom: 0 !important;
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
      <div className="fixed top-7 left-8 z-50 mix-blend-difference select-none">
        <span className="text-white font-bold text-sm logo-text" style={{ letterSpacing: "0.15em" }}>
          LUFERO
        </span>
      </div>

      {/* ─── MENÚ HAMBURGUESA ────────────────────────────── */}
      <button
        className="fixed top-6 right-8 z-50 mix-blend-difference flex flex-col gap-[5px] p-2 group menu-button"
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
          {["Instagram", "Behance", "LinkedIn"].map((s) => (
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
        className="h-screen overflow-y-scroll"
        style={{ scrollSnapType: "y mandatory" }}
      >
        
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            5. SECCIÓN HERO (index 0) - CON ANIMACIONES AL SCROLL
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section
          ref={heroRef}
          data-section-index="0"
          style={{
            height: "100vh",
            position: "relative",
            backgroundColor: "#0A0A0A",
            overflow: "hidden",
            scrollSnapAlign: "start",
          }}
        >
          <div
            className="hero-container"
            style={{
              position: "absolute",
              left: "14vw",
              right: "12vw",
              top: "20vh",
              bottom: "0",
              backgroundColor: "#3DCFC4",
              overflow: "hidden",
              opacity: 1,
              transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
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
                zIndex: 1,
              }}
            />

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
                }}
              >
                FullStack DV
              </span>
              <h1
                className="hero-title"
                style={{
                  margin: 0,
                  fontSize: "clamp(60px, 15vw, 200px)",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  lineHeight: 0.85,
                  letterSpacing: "-0.0em",
                }}
              >
                Daniel
                <br />
                Gomez
              </h1>
            </div>

            {/* Foto */}
            <div
              ref={heroPhotoRef}
              className="hero-photo"
              style={{
                position: "absolute",
                right: "10%",
                bottom: "0",
                width: "min(455px, 60vw)",
                height: "min(698px, 90vh)",
                zIndex: 10,
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
                  backgroundPosition: "center bottom",
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
          className="relative min-h-screen flex items-center overflow-hidden"
          style={{ 
            backgroundColor: "#0A0A0A", 
            scrollSnapAlign: "start",
            padding: "80px 0"
          }}
        >
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 right-20 w-96 h-96 bg-[#3DCFC4] rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-500 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
            <div className="mb-16">
              <span
                className="font-medium"
                style={{ 
                  fontSize: "13px", 
                  letterSpacing: "0.12em", 
                  textTransform: "uppercase", 
                  color: "#3DCFC4" 
                }}
              >
                Sobre Mí
              </span>
              <h2
                className="text-white font-bold mt-3"
                style={{ 
                  fontSize: "clamp(36px, 5vw, 64px)", 
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em"
                }}
              >
                FullStack Developer
                <br />
                <span style={{ color: "#3DCFC4" }}>Creativo & Versátil</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <p
                  className="text-white/70 leading-relaxed mb-6"
                  style={{ fontSize: "18px", lineHeight: 1.8 }}
                >
                  Soy <span className="text-white font-semibold">Daniel Gomez</span>, 
                  un desarrollador fullstack apasionado por crear experiencias digitales 
                  únicas y funcionales. Con más de 6 años de experiencia, 
                  combino la <span className="text-[#3DCFC4]">precisión técnica</span> 
                  con un enfoque <span className="text-[#3DCFC4]">creativo</span> 
                  para construir soluciones que realmente conectan con los usuarios.
                </p>
                <p
                  className="text-white/50 leading-relaxed mb-8"
                  style={{ fontSize: "16px", lineHeight: 1.8 }}
                >
                  Especializado en el ecosistema JavaScript/TypeScript, 
                  desarrollo de aplicaciones escalables y diseño de interfaces 
                  intuitivas. Siempre explorando nuevas tecnologías y 
                  metodologías para mantenerse a la vanguardia.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { n: "6+", l: "Años de experiencia" },
                    { n: "50+", l: "Proyectos completados" },
                    { n: "30+", l: "Clientes satisfechos" },
                  ].map((stat) => (
                    <div key={stat.l} className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
                      <span className="block text-[#3DCFC4] font-bold text-2xl">
                        {stat.n}
                      </span>
                      <span className="text-white/40 text-xs uppercase tracking-wider">
                        {stat.l}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3
                  className="text-white font-semibold mb-6"
                  style={{ fontSize: "18px", letterSpacing: "0.1em", textTransform: "uppercase" }}
                >
                  <span className="text-[#3DCFC4]">//</span> Tecnologías que domino
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {TECH_SKILLS.map((skill) => (
                    <div
                      key={skill.name}
                      className="group bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#3DCFC4]/10 border border-white/5 hover:border-[#3DCFC4]/30"
                    >
                      <div className="flex flex-col items-center text-center">
                        <img 
                          src={skill.icon} 
                          alt={skill.name}
                          className="w-10 h-10 mb-2 opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                          style={{ filter: "brightness(0) invert(1)" }}
                        />
                        <span className="text-white/80 text-xs font-medium mb-1">
                          {skill.name}
                        </span>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                              width: `${skill.level}%`,
                              backgroundColor: "#3DCFC4",
                              opacity: 0.6,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-16 pt-12 border-t border-white/10 flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <span className="text-white/30 text-sm uppercase tracking-wider">
                  Disponible para
                </span>
                <span className="text-[#3DCFC4] font-semibold text-lg">
                  Freelance & Full-time
                </span>
                <div className="flex gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-green-500 text-xs">Disponible</span>
                </div>
              </div>
              <div className="flex gap-6">
                {[
                  { name: "GitHub", url: "https://github.com" },
                  { name: "LinkedIn", url: "https://linkedin.com" },
                  { name: "Twitter", url: "https://twitter.com" }
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-[#3DCFC4] transition-colors duration-200 text-sm uppercase tracking-wider hover:scale-105 transform"
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
          className="relative h-screen overflow-hidden"
          style={{ backgroundColor: "#0A0A0A", scrollSnapAlign: "start" }}
        >
          <div
            className="absolute top-7 left-16 z-10 font-medium"
            style={{ fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#3DCFC4" }}
          >
            Selected Work
          </div>
          <div
            className="absolute top-7 right-20 z-10 text-white/25 font-medium"
            style={{ fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase" }}
          >
            2023 – 2024
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
          className="relative h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24"
          style={{ backgroundColor: "#0A0A0A", scrollSnapAlign: "start" }}
        >
          <div className="mb-14">
            <span
              className="font-medium"
              style={{ fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#3DCFC4" }}
            >
              What We Do
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
          className="relative h-screen flex flex-col justify-between px-8 md:px-16 lg:px-24 py-12 md:py-24 overflow-hidden"
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

            <button className="flex items-center gap-4 border-2 border-black/70 px-8 py-4 text-black font-semibold transition-all duration-300 hover:bg-black hover:text-primary hover:border-black">
              <span style={{ fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                Start a Project
              </span>
              <span style={{ color: "#00E5D1", fontSize: "18px" }}>↘</span>
            </button>

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
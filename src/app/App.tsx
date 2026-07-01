import { useState, useEffect, useRef } from "react";
import fotoMia from '../assets/foto_mia.png';
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. DATOS GLOBALES (se usan en varias secciones)
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

const SECTION_NAMES = ["Home", "Work", "Services", "About", "Contact"];

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

// ─── 👇 NUEVO: Efecto Parallax en la foto ──────────────────
useEffect(() => {
  let raf: number;
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  
  const photoTarget = { x: 0, y: 0 };
  const photoCurrent = { x: 0, y: 0 };

  const tick = () => {
    const nx = mouseMxRef.current;
    const ny = mouseMyRef.current;
    
    // Movimiento en dirección OPUESTA al mouse
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
// ─── Fin del nuevo efecto ──────────────────────────────────





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
  // 3. RENDER: ELEMENTOS GLOBALES (aparecen en TODAS las páginas)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  return (
    <div className="bg-background text-foreground" style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>
      
      {/* ─── ESTILOS GLOBALES ──────────────────────────────── */}
      <style>{`
        * { cursor: none !important; }
        ::-webkit-scrollbar { display: none; }
        html, body { scrollbar-width: none; overflow: hidden; }
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

      {/* ─── LOGO (siempre visible) ────────────────────────── */}
      <div className="fixed top-7 left-8 z-50 mix-blend-difference select-none">
        <span className="text-white font-bold text-sm" style={{ letterSpacing: "0.15em" }}>
          LUFERO
        </span>
      </div>

      {/* ─── MENÚ HAMBURGUESA (siempre visible) ────────────── */}
      <button
        className="fixed top-6 right-8 z-50 mix-blend-difference flex flex-col gap-[5px] p-2 group"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Menu"
      >
        <span
          className="block h-px bg-white transition-all duration-400"
          style={{
            width: "28px",
            transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
          }}
        />
        <span
          className="block h-px bg-white transition-all duration-200"
          style={{
            width: "20px",
            opacity: menuOpen ? 0 : 1,
            transform: menuOpen ? "scaleX(0)" : "none",
          }}
        />
        <span
          className="block h-px bg-white transition-all duration-400"
          style={{
            width: "28px",
            transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
          }}
        />
      </button>

      {/* ─── NAVEGACIÓN DE PUNTITOS (siempre visible) ──────── */}
      <div className="fixed left-7 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {SECTION_NAMES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollTo(idx)}
            aria-label={SECTION_NAMES[idx]}
            className={`rounded-full border border-white transition-all duration-300 ${
              activeSection === idx ? "bg-white w-2 h-2" : "bg-transparent w-2 h-2 opacity-40 hover:opacity-80"
            }`}
          />
        ))}
      </div>

      {/* ─── TEXTO "SCROLL" (siempre visible) ──────────────── */}
      <div className="fixed bottom-8 left-8 z-50 mix-blend-difference">
        <span
          className="text-white/70 text-[10px] font-medium"
          style={{
            writingMode: "vertical-lr",
            transform: "rotate(180deg)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
      </div>

      {/* ─── TEXTO "PORTFOLIO" (siempre visible) ───────────── */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 mix-blend-difference">
        <span
          className="text-white/70 text-[10px] font-medium"
          style={{
            writingMode: "vertical-lr",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          Portfolio
        </span>
      </div>

      {/* ─── LÍNEA DECORATIVA DERECHA (siempre visible) ────── */}
      <div
        className="fixed right-16 z-40 w-px"
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

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // 4. CONTENEDOR SCROLL (todas las secciones)
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

      <div
        className="h-screen overflow-y-scroll"
        style={{ scrollSnapType: "y mandatory" }}
      >

        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // 5. SECCIÓN HERO (página 1)
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECCIÓN HERO (página 1) - VERSIÓN CORREGIDA
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{/* ══════════════════════ HERO ══════════════════════════════════════ */}
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECCIÓN HERO (página 1) - VERSIÓN CORREGIDA
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{/* ══════════════════════ HERO ══════════════════════════════════════ */}
<section
  data-si="0"
  style={{
    height: "100vh",
    position: "relative",
    backgroundColor: "#0A0A0A",
    overflow: "hidden",
    scrollSnapAlign: "start",
  }}
>

{/* Inset teal card — leaves black visible on all sides */}
<div
  style={{
    position: "absolute",
    left: "14vw",
    right: "12vw",
    top: "20vh",
    bottom: "1vh",
    backgroundColor: "#3DCFC4",
    overflow: "visible",
    opacity: 1,
    transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
  }}
>
  {/* Animated wave canvas — sits at bottom of card */}
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

  {/* Role label + name — bottom-left of card */}
  <div
    style={{
      position: "absolute",
      bottom: "30%",
      left: "17%",
      zIndex: 15,
      opacity: 1,
      transform: "translateY(0)",
      transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
    }}
  >
    <span
      style={{
        display: "block",
        fontSize: "50px",
        fontWeight: 400,
        color: "rgba(0,0,0,0.6)",
        marginBottom: "60px",
        marginLeft: "15px",
        letterSpacing: "0.09em",
      }}
    >
      FullStack DV
    </span>
    <h1
      style={{
        margin: 0,
        fontSize: "clamp(120px, 15vw, 200px)",
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

  {/* ─── 👇 FOTO DENTRO DEL DIV VERDE ─── */}
 {/* ─── FOTO DENTRO DEL DIV VERDE ─── */}

{/* ─── FOTO DENTRO DEL DIV VERDE ─── */}
<div
  style={{
    position: "absolute",
    right: "10%",
    bottom: "0",              // ← ANCLADA ABAJO
    width: "455px",
    height: "698px",
    zIndex: 10,
    overflow: "visible",
    pointerEvents: "none",
    opacity: 1,
    transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.25s",
    backgroundImage: `url(${fotoMia})`,
    backgroundSize: "cover",
    backgroundPosition: " center",   // ← ANCLADA ABAJO
    backgroundRepeat: "no-repeat",
  }}
/>












</div>









</section>

        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // 6. SECCIÓN WORK (página 2)
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

        <section
          data-section-index="1"
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

          <div className="grid grid-cols-2 h-full">
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
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
                    opacity: 1,
                  }}
                />
                {/* Card info */}
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
                {/* Thin border between cells */}
                <div className="absolute inset-0 border border-white/[0.05] pointer-events-none" />
              </div>
            ))}
          </div>
        </section>

        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // 7. SECCIÓN SERVICES (página 3)
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

        <section
          data-section-index="2"
          className="relative h-screen flex flex-col justify-center px-16 md:px-24"
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
                className={`group flex items-center gap-10 py-7 transition-colors duration-200 hover:bg-white/[0.025] ${
                  idx !== SERVICES.length - 1 ? "border-b border-white/10" : ""
                } ${idx % 2 === 1 ? "flex-row-reverse" : ""}`}
              >
                <span
                  className="w-10 flex-shrink-0 font-medium"
                  style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#3DCFC4" }}
                >
                  {service.number}
                </span>
                <h3
                  className="text-white font-bold uppercase flex-1 min-w-0"
                  style={{ fontSize: "clamp(22px, 3.2vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.01em" }}
                >
                  {service.title}
                </h3>
                <p
                  className="flex-shrink-0 leading-relaxed"
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

          {/* Stats bar */}
          <div className="mt-14 flex items-center gap-12 border-t border-white/10 pt-10">
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

        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // 8. SECCIÓN ABOUT (página 4)
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

        <section
          data-section-index="3"
          className="relative h-screen flex items-stretch overflow-hidden"
          style={{ backgroundColor: "#111111", scrollSnapAlign: "start" }}
        >
          {/* Image column */}
          <div className="relative w-1/2 overflow-hidden bg-card">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=1080&fit=crop&auto=format"
              alt="Creative studio at work"
              className="w-full h-full object-cover"
              style={parallax(14)}
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(135deg, rgba(61,207,196,0.08) 0%, rgba(0,0,0,0.4) 100%)" }}
            />
          </div>

          {/* Text column */}
          <div className="w-1/2 flex flex-col justify-center px-16 py-24">
            <span
              className="block mb-8 font-medium"
              style={{ fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#3DCFC4" }}
            >
              About Phoenix
            </span>
            <h2
              className="text-white font-black uppercase mb-8"
              style={{ fontSize: "clamp(38px, 4.5vw, 68px)", lineHeight: 0.95, letterSpacing: "-0.02em" }}
            >
              Studio for
              <br />
              the Bold &
              <br />
              <span style={{ color: "#3DCFC4" }}>Unexpected.</span>
            </h2>
            <p
              className="mb-10 leading-relaxed"
              style={{ fontSize: "15px", color: "rgba(255,255,255,0.55)", maxWidth: "380px", lineHeight: 1.75 }}
            >
              We partner with brands that refuse the ordinary. From concept through final delivery, we bring cinematic precision and editorial clarity to every project we touch.
            </p>
            <p
              className="mb-12 leading-relaxed"
              style={{ fontSize: "15px", color: "rgba(255,255,255,0.35)", maxWidth: "380px", lineHeight: 1.75 }}
            >
              Founded in New York, operating globally. Our team of directors, designers, and strategists treats every brief as an opportunity to make something that earns its place in culture.
            </p>
            <button
              onClick={() => scrollTo(4)}
              className="self-start flex items-center gap-3 font-semibold transition-colors duration-200"
              style={{ fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#3DCFC4" }}
            >
              Work with Us
              <span style={{ color: "#00E5D1", fontSize: "18px" }}>↘</span>
            </button>
          </div>
        </section>

        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // 9. SECCIÓN CONTACT (página 5)
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

        <section
          data-section-index="4"
          className="relative h-screen flex flex-col justify-between px-16 md:px-24 py-24 overflow-hidden"
          style={{ backgroundColor: "#3DCFC4", scrollSnapAlign: "start" }}
        >
          {/* Ghost text */}
          <div
            className="absolute -bottom-4 -left-4 text-black/[0.06] font-black uppercase leading-none select-none pointer-events-none"
            style={{ fontSize: "clamp(110px, 20vw, 280px)" }}
          >
            Hello.
          </div>

          {/* Heading */}
          <div className="relative z-10">
            <span
              className="block mb-8 font-medium text-black/50"
              style={{ fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase" }}
            >
              Get In Touch
            </span>
            <h2
              className="text-white font-black uppercase"
              style={{ fontSize: "clamp(52px, 9vw, 128px)", lineHeight: 0.91, letterSpacing: "-0.02em" }}
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

          {/* Footer row */}
          <div className="relative z-10 flex items-end justify-between flex-wrap gap-8">
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

            <div className="flex flex-col items-end gap-3">
              <span
                className="text-black/40 font-medium"
                style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" }}
              >
                Follow Us
              </span>
              <div className="flex gap-5">
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
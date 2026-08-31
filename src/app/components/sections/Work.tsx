import type { CSSProperties } from "react";
import { PROJECTS } from "../../data";

interface WorkProps {
  parallax: (intensity: number) => CSSProperties;
  onProjectHover: (hovered: boolean) => void;
}

export default function Work({ parallax, onProjectHover }: WorkProps) {
  return (
    <section
      data-section-index="2"
      className="relative h-screen overflow-hidden h-viewport bg-[#0A0A0A] snap-start"
    >
      <div className="w-full max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-2 h-full">
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            className="relative overflow-hidden group"
            onMouseEnter={() => onProjectHover(true)}
            onMouseLeave={() => onProjectHover(false)}
          >
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10"
                aria-label={`Ver ${project.title}`}
              />
            )}
            <div className="w-full h-full bg-card overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                style={parallax(10)}
              />
            </div>
            <div className="absolute inset-0 transition-opacity duration-500 bg-gradient-to-t from-[rgba(0,0,0,0.75)] via-[rgba(0,0,0,0.2)] to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
              <span className="block mb-2 font-medium text-[11px] tracking-[0.2em] uppercase text-[#3DCFC4]">
                {project.category} — {project.year}
              </span>
              <div className="flex items-end justify-between">
                <h3 className="text-white font-bold uppercase text-[clamp(18px,2vw,28px)] tracking-[0.05em]">
                  {project.title}
                </h3>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-4 font-bold text-[#00E5D1] text-[22px]">
                  ↘
                </span>
              </div>
            </div>
            <div className="absolute inset-0 border border-white/[0.05] pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  );
}
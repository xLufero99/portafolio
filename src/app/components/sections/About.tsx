import { MIS_TECNOLOGIAS } from "../../data";

const STATS = [
  { n: "1+", l: "Años" },
  { n: "7+", l: "Proyectos" },
  { n: "5+", l: "Clientes" },
];

const SOCIALS = [
  { name: "GitHub", url: "https://github.com/xLufero99" },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/daniel-felipe-gomez-miranda-29348625a/",
  },
];

export default function About() {
  return (
    <section
      data-section-index="1"
      className="relative flex items-center h-viewport bg-[#0A0A0A] snap-start py-[10px] overflow-hidden"
    >
      <div className="absolute inset-0 opacity-3 md:opacity-5 pointer-events-none">
        <div className="absolute top-10 right-10 w-40 h-40 md:w-96 md:h-96 bg-[#3DCFC4] rounded-full blur-2xl md:blur-3xl" />
        <div className="absolute bottom-10 left-10 w-32 h-32 md:w-80 md:h-80 bg-blue-500 rounded-full blur-2xl md:blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-12">
        <div className="mb-3 md:mb-8">
          <span className="font-medium text-[10px] md:text-sm tracking-[0.12em] uppercase text-[#3DCFC4]">
            Sobre Mí
          </span>
          <h2 className="text-white font-bold mt-1 md:mt-3 text-[clamp(20px,3.5vw,64px)] leading-[1.1] tracking-[-0.02em]">
            FullStack DV
            <br />
            <span className="text-[#3DCFC4] text-[clamp(18px,3vw,50px)]">
              Creativo & Versátil
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-8 items-start">
          <div>
            <p className="text-white/70 mb-2 md:mb-4 text-[clamp(11px,1.1vw,18px)] leading-[1.4]">
              Soy <span className="text-white font-semibold">Daniel Gomez</span>,
              Estudiante de Ingeniería de Sistemas de 10mo semestre con enfoque backend
              especialmente en Java/Spring Boot, arquitectura y despliegue en la nube,
              Manejo el ecosistema frontend (HTML/CSS/JS) y estoy potenciando mis
              proyectos con React, Busco oportunidades para consolidarme como
              desarrollador full-stack.
            </p>

            <div className="grid grid-cols-3 gap-1.5 md:gap-3">
              {STATS.map((stat) => (
                <div
                  key={stat.l}
                  className="bg-white/5 rounded-lg p-1.5 md:p-3 text-center border border-white/5"
                >
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

        <div>
          <h3 className="text-white font-semibold mb-1.5 md:mb-4 text-[clamp(9px,0.8vw,18px)] tracking-[0.1em] uppercase">
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
                      className="h-full rounded-full transition-all duration-1000 bg-[#3DCFC4] opacity-50"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

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
            {SOCIALS.map((social) => (
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
  );
}
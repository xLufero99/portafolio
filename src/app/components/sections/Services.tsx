import { SERVICES } from "../../data";

const STATS = [
  { n: "120+", l: "Projects" },
  { n: "6", l: "Years" },
  { n: "48", l: "Awards" },
  { n: "32", l: "Clients" },
];

export default function Services() {
  return (
    <section
      data-section-index="3"
      className="relative h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 h-viewport bg-[#0A0A0A] snap-start"
    >
      <div className="mb-14">
        <span className="font-medium text-[13px] tracking-[0.12em] uppercase text-[#3DCFC4]" />
      </div>

      <div className="flex flex-col">
        {SERVICES.map((service, idx) => (
          <div
            key={service.number}
            className={`group flex flex-wrap items-center gap-6 md:gap-10 py-7 transition-colors duration-200 hover:bg-white/[0.025] ${
              idx !== SERVICES.length - 1 ? "border-b border-white/10" : ""
            }`}
          >
            <span className="w-10 flex-shrink-0 font-medium text-[11px] tracking-[0.2em] uppercase text-[#3DCFC4]">
              {service.number}
            </span>
            <h3 className="text-white font-bold uppercase flex-1 min-w-[200px] text-[clamp(18px,3.2vw,52px)] leading-[1.05] tracking-[-0.01em]">
              {service.title}
            </h3>
            <p className="flex-shrink-0 w-full md:w-auto max-w-[300px] text-[14px] text-[rgba(255,255,255,0.45)] leading-[1.65]">
              {service.description}
            </p>
            <span className="flex-shrink-0 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[#00E5D1] text-[20px]">
              ↘
            </span>
          </div>
        ))}
      </div>

      <div className="mt-14 flex flex-wrap items-center gap-8 md:gap-12 border-t border-white/10 pt-10">
        {STATS.map(({ n, l }) => (
          <div key={l}>
            <span className="block text-white font-black text-[clamp(28px,3vw,44px)]">
              {n}
            </span>
            <span className="block font-medium mt-1 text-[10px] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.35)]">
              {l}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
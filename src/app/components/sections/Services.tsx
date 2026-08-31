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
      className="relative h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 h-viewport"
      style={{ backgroundColor: "#0A0A0A", scrollSnapAlign: "start" }}
    >
      <div className="mb-14">
        <span
          className="font-medium"
          style={{
            fontSize: "13px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#3DCFC4",
          }}
        />
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
              style={{
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#3DCFC4",
              }}
            >
              {service.number}
            </span>
            <h3
              className="text-white font-bold uppercase flex-1 min-w-[200px]"
              style={{
                fontSize: "clamp(18px, 3.2vw, 52px)",
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
              }}
            >
              {service.title}
            </h3>
            <p
              className="flex-shrink-0 leading-relaxed w-full md:w-auto"
              style={{
                maxWidth: "300px",
                fontSize: "14px",
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.65,
              }}
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
        {STATS.map(({ n, l }) => (
          <div key={l}>
            <span
              className="block text-white font-black"
              style={{ fontSize: "clamp(28px, 3vw, 44px)" }}
            >
              {n}
            </span>
            <span
              className="block font-medium mt-1"
              style={{
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              {l}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
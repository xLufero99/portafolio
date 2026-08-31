const SOCIALS = ["Instagram", "Behance", "LinkedIn"];

export default function Contact() {
  return (
    <section
      data-section-index="4"
      className="relative h-screen flex flex-col justify-between px-8 md:px-16 lg:px-24 py-12 md:py-24 overflow-hidden h-viewport bg-[#3DCFC4] snap-start"
    >
      <div className="absolute -bottom-4 -left-4 text-black/[0.06] font-black uppercase leading-none select-none pointer-events-none text-[clamp(80px,20vw,280px)]">
        Hello.
      </div>

      <div className="relative z-10">
        <span className="block mb-8 font-medium text-black/50 text-[13px] tracking-[0.12em] uppercase">
          Get In Touch
        </span>
        <h2 className="text-white font-black uppercase text-[clamp(40px,9vw,128px)] leading-[0.91] tracking-[-0.02em]">
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
            className="text-black/80 hover:text-black transition-colors duration-200 font-medium text-[17px] tracking-[0.01em]"
          >
            hello@phoenixstudio.co
          </a>
          <a
            href="tel:+12125550199"
            className="text-black/50 hover:text-black transition-colors duration-200 text-[15px]"
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
          <span className="text-[12px] tracking-[0.15em] uppercase">
            Start a Project
          </span>
          <span className="text-[#00E5D1] text-[18px]">↘</span>
        </a>

        <div className="flex flex-col items-start md:items-end gap-3">
          <span className="text-black/40 font-medium text-[10px] tracking-[0.2em] uppercase">
            Follow Us
          </span>
          <div className="flex gap-5 flex-wrap">
            {SOCIALS.map((s) => (
              <a
                key={s}
                href="#"
                className="text-black/60 hover:text-black transition-colors duration-200 font-medium text-[12px] tracking-[0.1em] uppercase"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
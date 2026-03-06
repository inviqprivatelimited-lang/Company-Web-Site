import { Search, PenTool, Code2, Rocket } from "lucide-react";
import { useGSAP } from "@/hooks/useGSAP";

const steps = [
  {
    icon: Search,
    title: "Discovery & Planning",
    description:
      "We start by understanding your vision, goals, and target audience. Together we define the project scope, timeline, and strategy.",
    accent: "01",
  },
  {
    icon: PenTool,
    title: "Design & Prototype",
    description:
      "Our designers craft intuitive UI/UX wireframes and interactive prototypes, ensuring the look and feel aligns with your brand.",
    accent: "02",
  },
  {
    icon: Code2,
    title: "Development",
    description:
      "Our engineers bring designs to life using modern technologies, with clean code, regular updates, and agile sprints.",
    accent: "03",
  },
  {
    icon: Rocket,
    title: "Testing & Launch",
    description:
      "Rigorous QA testing ensures a bug-free product. We deploy, monitor, and provide ongoing support post-launch.",
    accent: "04",
  },
];

const ProcessTimeline = () => {
  // ── Header ────────────────────────────────────────────────────────────────
  const headerRef = useGSAP((el) => {
    gsap.from(el.children, {
      scrollTrigger: { trigger: el, start: "top 82%", once: true },
      y: 40, opacity: 0, duration: 0.75, stagger: 0.2, ease: "power3.out",
    });
  });

  // ── Timeline ─────────────────────────────────────────────────────────────
  const listRef = useGSAP((el) => {
    const steps = el.querySelectorAll(".timeline-step");
    const lineTrack = el.querySelector<HTMLElement>(".line-track");

    // Scrub-driven line draw as user scrolls
    if (lineTrack) {
      gsap.fromTo(
        lineTrack,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.8,
          },
        }
      );
    }

    // Each step: alternating left/right slide in
    steps.forEach((step, i) => {
      const dir = i % 2 === 0 ? -80 : 80;
      const card = step.querySelector(".step-card");
      const dot = step.querySelector(".step-dot");
      const num = step.querySelector(".step-num");

      const tl = gsap.timeline({
        scrollTrigger: { trigger: step, start: "top 85%", once: true },
      });

      // Dot enters with elastic pop
      if (dot) tl.from(dot, { scale: 0, duration: 0.5, ease: "elastic.out(1.5, 0.5)" });
      // Card wipes in from side
      if (card) tl.fromTo(card,
        { x: dir, opacity: 0, clipPath: i % 2 === 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" },
        { x: 0, opacity: 1, clipPath: "inset(0 0% 0 0%)", duration: 0.75, ease: "power4.out" },
        "-=0.25"
      );
      // Big step number counter pop
      if (num) tl.from(num, { scale: 0.4, opacity: 0, duration: 0.45, ease: "back.out(3)" }, "-=0.5");

      // Hover: card lift + dot pulse
      card?.addEventListener("mouseenter", () => {
        gsap.to(card, { y: -6, boxShadow: "0 20px 60px hsl(var(--primary)/0.15)", duration: 0.3, ease: "power2.out" });
        if (dot) gsap.to(dot, { scale: 1.2, duration: 0.3, ease: "back.out(2)" });
      });
      card?.addEventListener("mouseleave", () => {
        gsap.to(card, { y: 0, boxShadow: "none", duration: 0.4, ease: "power2.inOut" });
        if (dot) gsap.to(dot, { scale: 1, duration: 0.3, ease: "power2.inOut" });
      });
    });
  });

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            How We <span className="gradient-text">Work</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our streamlined process ensures quality delivery from concept to launch
          </p>
        </div>

        {/* Timeline */}
        <div ref={listRef} className="max-w-3xl mx-auto relative">

          {/* Vertical scrub line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border/50">
            <div className="line-track w-full h-full bg-gradient-to-b from-primary via-accent to-primary/20 rounded-full origin-top" />
          </div>

          {steps.map((step, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div key={step.title} className="timeline-step relative flex items-center mb-16 last:mb-0">

                {/* Left slot */}
                <div className={`flex-1 ${isLeft ? "pr-12 flex justify-end" : "pr-12"}`}>
                  {isLeft && (
                    <div className="step-card glass rounded-2xl p-6 max-w-xs border border-transparent hover:border-primary/40 transition-colors duration-500 text-right">
                      <div className="flex items-center justify-end gap-3 mb-3">
                        <h3 className="text-lg font-heading font-semibold">{step.title}</h3>
                        <span className="text-xs font-bold text-primary bg-primary/10 rounded-full px-3 py-1">
                          Step {idx + 1}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                      <div className="mt-3 h-0.5 w-0 bg-primary rounded-full ml-auto transition-all duration-700 group-hover:w-full" />
                    </div>
                  )}
                </div>

                {/* Center dot */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="step-dot w-14 h-14 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center shadow-lg stat-ring">
                    <step.icon className="text-primary" size={22} />
                  </div>
                  {/* Big number */}
                  <span
                    className="step-num absolute -top-7 left-1/2 -translate-x-1/2 text-5xl font-heading font-black text-primary/8 select-none leading-none"
                    aria-hidden="true"
                  >
                    {step.accent}
                  </span>
                </div>

                {/* Right slot */}
                <div className={`flex-1 ${!isLeft ? "pl-12 flex justify-start" : "pl-12"}`}>
                  {!isLeft && (
                    <div className="step-card glass rounded-2xl p-6 max-w-xs border border-transparent hover:border-primary/40 transition-colors duration-500">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-bold text-primary bg-primary/10 rounded-full px-3 py-1">
                          Step {idx + 1}
                        </span>
                        <h3 className="text-lg font-heading font-semibold">{step.title}</h3>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                      <div className="mt-3 h-0.5 w-0 bg-primary rounded-full transition-all duration-700" />
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;

import Layout from "@/components/layout/Layout";
import { Eye, Target, Quote, Lightbulb, TrendingUp, Shield, Gem } from "lucide-react";
import { useGSAP } from "@/hooks/useGSAP";

const inviqMeaning = [
  {
    letter: "I", word: "Innovation", tagline: "We push boundaries", icon: Lightbulb, color: "from-orange-500/20 to-primary/5",
    description: "We constantly challenge the status quo, exploring new technologies and creative approaches to deliver solutions that truly stand out."
  },
  {
    letter: "N", word: "Next-Level", tagline: "Always ahead", icon: TrendingUp, color: "from-amber-500/20 to-orange-400/5",
    description: "We don't settle for average. Every product and service we deliver is built to be a step above the rest — in design, performance, and experience."
  },
  {
    letter: "V", word: "Vision", tagline: "Purpose-driven", icon: Eye, color: "from-yellow-500/15 to-amber-400/5",
    description: "Everything we build starts with a clear vision. We look beyond the present to design technology that creates lasting impact for tomorrow."
  },
  {
    letter: "I", word: "Integrity", tagline: "Trust first", icon: Shield, color: "from-primary/20 to-orange-300/5",
    description: "We operate with complete transparency and honesty. Our clients trust us because we say what we mean, and we deliver exactly what we promise."
  },
  {
    letter: "Q", word: "Quality", tagline: "No compromise", icon: Gem, color: "from-rose-500/15 to-primary/5",
    description: "Every line of code, every design element, and every solution we ship is held to the highest standard. Quality is not a step — it's our culture."
  },
];

const stats = [
  { value: "2025", label: "Founded" },
  { value: "5+", label: "Awards" },
  { value: "8+", label: "Services" },
  { value: "4", label: "Team Members" },
];

/* ── Hero ── */
const AboutHero = () => {
  const ref = useGSAP((el) => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.from(el.querySelector("h1"), { y: 70, opacity: 0, duration: 0.85 })
      .fromTo(el.querySelector(".hero-sub"),
        { clipPath: "inset(0 100% 0 0)", opacity: 1 },
        { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "expo.inOut" }, "-=0.4");

    const orbs = el.querySelectorAll(".orb");
    tl.from(orbs, { scale: 0, opacity: 0, duration: 1.2, stagger: 0.2, ease: "power2.out" }, "-=0.8");

    const handleMouse = (e: MouseEvent) => {
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      orbs.forEach((orb, i) => {
        const d = i === 0 ? 0.022 : 0.014;
        gsap.to(orb, { x: (e.clientX - cx) * d, y: (e.clientY - cy) * d, duration: 1.3, ease: "power1.out" });
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  });

  return (
    <section ref={ref} className="py-28 relative overflow-hidden grain">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-transparent to-transparent" />
      <div className="orb absolute top-1/3 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      <div className="orb absolute bottom-1/3 right-1/4 w-64 h-64 bg-primary/6 rounded-full blur-3xl" />
      <div aria-hidden className="absolute inset-0 flex items-center justify-center text-[16vw] font-heading font-black text-border/15 select-none pointer-events-none leading-none overflow-hidden">ABOUT</div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
          About <span className="gradient-text">INVIQ</span>
        </h1>
        <p className="hero-sub text-lg text-muted-foreground max-w-xl mx-auto">
          INVIQ — Building transformative software products that power the future.
        </p>
      </div>
    </section>
  );
};

/* ── Vision & Mission ── */
const VisionMission = () => {
  const ref = useGSAP((el) => {
    const cards = el.querySelectorAll(".vm-card");
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { x: i === 0 ? -80 : 80, opacity: 0, clipPath: i === 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" },
        {
          x: 0, opacity: 1, clipPath: "inset(0 0% 0 0%)",
          duration: 0.9, ease: "expo.inOut",
          scrollTrigger: { trigger: card, start: "top 82%", once: true },
        }
      );
      const icon = card.querySelector(".vm-icon");
      ScrollTrigger.create({
        trigger: card, start: "top 80%", once: true,
        onEnter: () => gsap.from(icon, { scale: 0, rotation: -20, duration: 0.55, ease: "elastic.out(1.5,0.5)", delay: 0.4 }),
      });

      card.addEventListener("mouseenter", () => {
        gsap.to(card, { y: -6, duration: 0.3, ease: "power2.out" });
        gsap.to(icon, { scale: 1.1, rotation: 5, duration: 0.3, ease: "back.out(2)" });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { y: 0, duration: 0.4, ease: "power2.inOut" });
        gsap.to(icon, { scale: 1, rotation: 0, duration: 0.3 });
      });
    });
  });

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div ref={ref} className="grid md:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="vm-card glass rounded-2xl p-8 hover:border-primary/50 transition-colors duration-500 group cursor-default">
            <div className="vm-icon w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <Eye className="text-primary" size={28} />
            </div>
            <h2 className="text-2xl font-heading font-bold mb-4">Our Vision</h2>
            <p className="text-muted-foreground leading-relaxed">
              To be the visionary force behind transformative software products that drive sustainable growth and a smarter world.
            </p>
            <div className="mt-5 h-0.5 w-0 bg-gradient-to-r from-primary to-accent rounded-full group-hover:w-full transition-all duration-700" />
          </div>

          {/* Mission */}
          <div className="vm-card glass rounded-2xl p-8 hover:border-primary/50 transition-colors duration-500 group cursor-default">
            <div className="vm-icon w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <Target className="text-primary" size={28} />
            </div>
            <h2 className="text-2xl font-heading font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              At INVIQ, our mission is to build and innovate our own software products using modern technologies, focusing on creativity, performance, and usability — empowering individuals and businesses while fostering continuous learning.
            </p>
            <div className="mt-5 h-0.5 w-0 bg-gradient-to-r from-primary to-accent rounded-full group-hover:w-full transition-all duration-700" />
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Stats Banner ── */
const StatsBanner = () => {
  const ref = useGSAP((el) => {
    const statEls = el.querySelectorAll(".stat-item");
    gsap.from(statEls, {
      scrollTrigger: { trigger: el, start: "top 80%", once: true },
      y: 50, opacity: 0, scale: 0.85,
      duration: 0.7, stagger: 0.13, ease: "back.out(2)",
    });

    statEls.forEach((s) => {
      s.addEventListener("mouseenter", () => gsap.to(s, { y: -8, scale: 1.05, duration: 0.3, ease: "power2.out" }));
      s.addEventListener("mouseleave", () => gsap.to(s, { y: 0, scale: 1, duration: 0.35, ease: "power2.inOut" }));
    });
  });

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-32 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
      <div ref={ref} className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {stats.map(({ value, label }) => (
            <div key={label} className="stat-item text-center glass rounded-2xl py-6 px-4 cursor-default border border-transparent hover:border-primary/30 transition-colors duration-300">
              <div className="text-3xl md:text-4xl font-heading font-bold gradient-text mb-1 stat-ring inline-block rounded-full px-1">{value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Founders Quote ── */
const FoundersQuote = () => {
  const ref = useGSAP((el) => {
    const card = el.querySelector(".founders-card");
    const icon = el.querySelector(".founders-icon");

    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 78%", once: true } });
    tl.from(card, { scale: 0.88, opacity: 0, y: 60, duration: 0.9, ease: "power4.out" })
      .from(icon, { scale: 0, duration: 0.5, ease: "elastic.out(1.5, 0.5)" }, "-=0.4")
      .from(el.querySelectorAll(".fq-line"), { y: 24, opacity: 0, duration: 0.55, stagger: 0.14, ease: "power3.out" }, "-=0.3");

    // Continuous float
    gsap.to(icon, { y: -10, duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
  });

  return (
    <section ref={ref} className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="founders-card glass rounded-3xl p-8 md:p-12 text-center relative overflow-hidden border border-border/50">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="founders-icon w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8">
                <Quote className="text-primary" size={32} />
              </div>
              <h2 className="fq-line text-2xl md:text-3xl font-heading font-bold mb-6">
                Message from the <span className="gradient-text">Founders</span>
              </h2>
              <blockquote className="fq-line text-lg text-muted-foreground leading-relaxed italic">
                &ldquo;We started INVIQ with a shared belief: technology should make tomorrow better. Our team is dedicated to building meaningful products that create real impact.&rdquo;
              </blockquote>
              <div className="fq-line mt-8 pt-8 border-t border-border/50">
                <p className="text-primary font-heading font-semibold">The INVIQ Founding Team</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── INVIQ Meaning ── */
const InviqMeaning = () => {
  const headerRef = useGSAP((el) => {
    gsap.from(el.children, {
      scrollTrigger: { trigger: el, start: "top 82%", once: true },
      y: 36, opacity: 0, duration: 0.7, stagger: 0.18, ease: "power3.out",
    });
  });

  const listRef = useGSAP((el) => {
    const rows = el.querySelectorAll(".inviq-row");

    rows.forEach((row, i) => {
      gsap.fromTo(row,
        { x: -70, opacity: 0, clipPath: "inset(0 0 0 100%)" },
        {
          x: 0, opacity: 1, clipPath: "inset(0 0% 0 0%)",
          duration: 0.8, ease: "expo.inOut",
          scrollTrigger: { trigger: row, start: "top 84%", once: true },
          delay: i * 0.06,
        }
      );

      // Letter pop
      const letter = row.querySelector(".inviq-letter");
      ScrollTrigger.create({
        trigger: row, start: "top 82%", once: true,
        onEnter: () => gsap.from(letter, { scale: 0, rotation: -25, duration: 0.55, ease: "elastic.out(1.5,0.5)", delay: 0.25 + i * 0.05 }),
      });

      // Hover
      row.addEventListener("mouseenter", () => {
        gsap.to(row, { x: 8, duration: 0.3, ease: "power2.out" });
        gsap.to(letter, { scale: 1.1, rotation: 5, duration: 0.3, ease: "back.out(2)" });
      });
      row.addEventListener("mouseleave", () => {
        gsap.to(row, { x: 0, duration: 0.4, ease: "power2.inOut" });
        gsap.to(letter, { scale: 1, rotation: 0, duration: 0.3 });
      });
    });
  });

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div ref={headerRef} className="text-center mb-14">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-medium">The name behind the brand</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            What <span className="gradient-text">INVIQ</span> Means
          </h2>
        </div>

        <div ref={listRef} className="max-w-3xl mx-auto space-y-4">
          {inviqMeaning.map((item, index) => (
            <div
              key={item.word}
              className="inviq-row glass rounded-2xl p-6 md:p-7 flex items-start gap-5 hover:border-primary/40 transition-colors duration-300 group cursor-default"
            >
              <div className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                <span className="inviq-letter text-4xl md:text-5xl font-heading font-black gradient-text leading-none select-none inline-block">
                  {item.letter}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-xl md:text-2xl font-heading font-bold">{item.word}</h3>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    <item.icon size={11} />{item.tagline}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{item.description}</p>
                <div className="mt-3 h-0.5 w-0 bg-gradient-to-r from-primary to-accent rounded-full group-hover:w-full transition-all duration-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Page ── */
const About = () => (
  <Layout>
    <AboutHero />
    <VisionMission />
    <StatsBanner />
    <FoundersQuote />
    <InviqMeaning />
  </Layout>
);

export default About;

import { useRef } from "react";
import Layout from "@/components/layout/Layout";
import { Linkedin, ArrowUpRight, Sparkles } from "lucide-react";
import { useGSAP } from "@/hooks/useGSAP";

/* ── Team data ── */
const team = [
  {
    name: "K. Shanika Dilrukshi",
    shortName: "Shanika",
    position: "Chief Executive Officer",
    badge: "CEO",
    image: "/shanika.jpg",
    bio: "Visionary leader driving INVIQ's strategic direction, culture, and long-term growth. Passionate about building technology that creates real impact.",
    linkedin: "https://www.linkedin.com/in/shanika-dilrukshi-82aa6a295/",
    color: "from-orange-500/20 to-primary/10",
    glowColor: "hsl(24 100% 50% / 0.25)",
  },
  {
    name: "A.S. Ambagahawatta",
    shortName: "Anujika",
    position: "Chief Financial Officer",
    badge: "CFO",
    image: "/Anujika.jpeg",
    bio: "Financial strategist who keeps INVIQ's resources aligned with its ambition. Expert in sustainable growth planning and financial governance.",
    linkedin: "https://www.linkedin.com/in/anujika-ambagahawatta/",
    color: "from-blue-500/20 to-cyan-500/10",
    glowColor: "hsl(210 100% 56% / 0.2)",
  },
  {
    name: "T.M. Kavindu Praneeth",
    shortName: "Kavindu",
    position: "Chief Technology Officer",
    badge: "CTO",
    image: "/kavindu.jpg",
    bio: "Tech visionary architecting innovative solutions with cutting-edge tools. Leads the engineering team to turn bold ideas into polished products.",
    linkedin: "https://www.linkedin.com/in/kavindu-praneeth/",
    color: "from-purple-500/20 to-indigo-500/10",
    glowColor: "hsl(270 80% 60% / 0.2)",
  },
];

const inviqLetters = [
  { letter: "I", word: "Innovation", desc: "We push boundaries" },
  { letter: "N", word: "Next-Level", desc: "Always ahead" },
  { letter: "V", word: "Vision", desc: "Purpose-driven" },
  { letter: "I", word: "Integrity", desc: "Trust first" },
  { letter: "Q", word: "Quality", desc: "No compromise" },
];

/* ── Hero ── */
const TeamHero = () => {
  const ref = useGSAP((el) => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.from(el.querySelector(".badge"), { y: 30, opacity: 0, duration: 0.6 })
      .from(el.querySelector("h1"), { y: 60, opacity: 0, duration: 0.8 }, "-=0.3")
      .fromTo(el.querySelector("p"),
        { clipPath: "inset(0 100% 0 0)", opacity: 1 },
        { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "expo.inOut" }, "-=0.4")
      .from(el.querySelectorAll(".orb"), { scale: 0, opacity: 0, duration: 1.2, stagger: 0.2, ease: "power2.out" }, "-=0.8");

    // Floating orbs parallax
    const handleMouse = (e: MouseEvent) => {
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      el.querySelectorAll(".orb").forEach((orb, i) => {
        const d = i === 0 ? 0.02 : 0.014;
        gsap.to(orb, { x: (e.clientX - cx) * d, y: (e.clientY - cy) * d, duration: 1.3, ease: "power1.out" });
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  });

  return (
    <section ref={ref} className="py-28 relative overflow-hidden grain">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-transparent to-transparent" />
      <div className="orb absolute top-1/3 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      <div className="orb absolute bottom-0 left-1/4 w-64 h-64 bg-orange-500/6 rounded-full blur-3xl" />
      <div aria-hidden className="absolute inset-0 flex items-center justify-center text-[16vw] font-heading font-black text-border/15 select-none pointer-events-none leading-none overflow-hidden">TEAM</div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
        <div className="badge inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 text-sm font-medium text-primary mb-8">
          <Sparkles size={14} /><span>The People Behind INVIQ</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
          Meet Our <span className="gradient-text">Leadership</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A passionate team of builders, thinkers, and strategists united by one goal — creating technology that drives real change.
        </p>
      </div>
    </section>
  );
};

/* ── Member Card ── */
const MemberCard = ({ member, index }: { member: typeof team[0]; index: number }) => {
  const cardRef = useGSAP((el) => {
    // Entrance
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: "top 82%", once: true },
      y: 80, opacity: 0, scale: 0.92,
      duration: 0.8, delay: index * 0.15,
      ease: "power4.out",
    });

    // Photo scale + shine on hover
    const img = el.querySelector(".member-img") as HTMLElement;
    const glow = el.querySelector(".member-glow") as HTMLElement;
    const shine = el.querySelector(".member-shine") as HTMLElement;
    const li = el.querySelector(".member-li") as HTMLElement;
    const badge = el.querySelector(".member-badge") as HTMLElement;

    // Badge pops on load
    ScrollTrigger.create({
      trigger: el, start: "top 80%", once: true,
      onEnter: () => gsap.from(badge, { scale: 0, rotation: -15, duration: 0.5, ease: "back.out(2.5)", delay: 0.3 + index * 0.1 }),
    });

    el.addEventListener("mouseenter", () => {
      gsap.to(el, { y: -10, duration: 0.35, ease: "power2.out" });
      gsap.to(glow, { opacity: 1, duration: 0.4 });
      gsap.to(img, { scale: 1.07, duration: 0.6, ease: "power2.out" });
      if (li) gsap.to(li, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
    });
    el.addEventListener("mouseleave", () => {
      gsap.to(el, { y: 0, duration: 0.45, ease: "power2.inOut" });
      gsap.to(glow, { opacity: 0, duration: 0.4 });
      gsap.to(img, { scale: 1, duration: 0.5, ease: "power2.inOut" });
      if (li) gsap.to(li, { opacity: 0, y: 6, duration: 0.3 });
    });

    // Mouse-move spotlight on card
    el.addEventListener("mousemove", (ev) => {
      const e = ev as MouseEvent;
      const r = (el as HTMLElement).getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      if (shine) shine.style.background = `radial-gradient(circle at ${x}% ${y}%, hsl(var(--primary)/0.10) 0%, transparent 65%)`;
    });
  });

  return (
    <div ref={cardRef} className="relative cursor-default">
      {/* Glow blob */}
      <div
        className="member-glow absolute -inset-4 rounded-3xl blur-2xl opacity-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at center, ${member.glowColor}, transparent 70%)` }}
      />

      <div className="relative glass rounded-2xl sm:rounded-3xl overflow-hidden border border-border/50 hover:border-primary/40 transition-colors duration-500 shadow-lg">
        {/* Spotlight shine overlay */}
        <div className="member-shine absolute inset-0 pointer-events-none z-10 rounded-2xl" />

        {/* Photo */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
          <img
            src={member.image}
            alt={member.name}
            loading="lazy"
            decoding="async"
            className="member-img w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

          {/* Badge */}
          <div className="absolute top-3 left-3 z-20">
            <span className={`member-badge inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold tracking-widest bg-gradient-to-r ${member.color} backdrop-blur-sm border border-white/10 text-foreground`}>
              {member.badge}
            </span>
          </div>

          {/* LinkedIn top-right — slides down on hover */}
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.shortName} on LinkedIn`}
            className="member-li absolute top-3 right-3 z-20 w-9 h-9 rounded-xl bg-[#0A66C2] flex items-center justify-center shadow-lg opacity-0 translate-y-1.5"
          >
            <Linkedin size={14} className="text-white" />
          </a>

          {/* Name overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
            <h3 className="text-xl font-heading font-bold text-foreground leading-tight">{member.shortName}</h3>
            <p className="text-primary text-xs font-semibold mt-0.5 tracking-wide uppercase">{member.position}</p>
          </div>
        </div>

        {/* Bio */}
        <div className="px-5 pb-5 pt-3">
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">{member.bio}</p>
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:gap-3 transition-all duration-300 group"
          >
            <div className="w-6 h-6 rounded-lg bg-[#0A66C2]/15 flex items-center justify-center">
              <Linkedin size={11} className="text-[#0A66C2]" />
            </div>
            <span>View LinkedIn Profile</span>
            <ArrowUpRight size={12} className="opacity-60 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>
    </div>
  );
};

/* ── INVIQ Acronym Strip ── */
const InviqStrip = () => {
  const ref = useGSAP((el) => {
    gsap.from(el.querySelector(".strip-label"), {
      scrollTrigger: { trigger: el, start: "top 84%", once: true },
      y: 20, opacity: 0, duration: 0.6, ease: "power3.out",
    });
    gsap.from(el.querySelectorAll(".inviq-pill"), {
      scrollTrigger: { trigger: el, start: "top 80%", once: true },
      y: 50, opacity: 0, scale: 0.85,
      duration: 0.65, stagger: 0.1, ease: "back.out(2)",
    });

    // Hover: letter bounces
    el.querySelectorAll(".inviq-pill").forEach((pill) => {
      const letter = pill.querySelector(".big-letter");
      pill.addEventListener("mouseenter", () => {
        gsap.to(letter, { y: -8, scale: 1.15, duration: 0.3, ease: "back.out(2)" });
        gsap.to(pill, { y: -4, duration: 0.3, ease: "power2.out" });
      });
      pill.addEventListener("mouseleave", () => {
        gsap.to(letter, { y: 0, scale: 1, duration: 0.35, ease: "power2.inOut" });
        gsap.to(pill, { y: 0, duration: 0.35, ease: "power2.inOut" });
      });
    });
  });

  return (
    <section ref={ref} className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <p className="strip-label text-center text-xs uppercase tracking-widest text-muted-foreground mb-8 font-medium">
          What INVIQ stands for
        </p>
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {inviqLetters.map((item, i) => (
            <div key={i} className="inviq-pill group glass rounded-2xl px-5 py-4 flex items-center gap-3 hover:border-primary/40 transition-colors duration-300 cursor-default">
              <span className="big-letter text-3xl sm:text-4xl font-heading font-black gradient-text leading-none select-none inline-block">
                {item.letter}
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground leading-tight">{item.word}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Quote / CTA ── */
const TeamCTA = () => {
  const ref = useGSAP((el) => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 78%", once: true } });
    tl.from(el.querySelector(".quote-card"), { scale: 0.9, opacity: 0, y: 50, duration: 0.85, ease: "power4.out" })
      .from(el.querySelector(".quote-icon"), { scale: 0, duration: 0.5, ease: "elastic.out(1.5, 0.5)" }, "-=0.4")
      .from(el.querySelectorAll(".quote-h, .quote-p, .quote-link"), {
        y: 24, opacity: 0, duration: 0.55, stagger: 0.15, ease: "power3.out",
      }, "-=0.3");
  });

  return (
    <section ref={ref} className="py-20 relative grain">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="quote-card glass rounded-3xl p-8 md:p-12 relative overflow-hidden border border-border/50">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="quote-icon w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8">
                <span className="text-3xl">🤝</span>
              </div>
              <h2 className="quote-h text-2xl md:text-3xl font-heading font-bold mb-4">
                United by a <span className="gradient-text">Common Vision</span>
              </h2>
              <blockquote className="quote-p text-muted-foreground leading-relaxed italic mb-8">
                &ldquo;We started INVIQ with a shared belief: technology should make tomorrow better. Our team is dedicated to building meaningful products that create real impact.&rdquo;
              </blockquote>
              <a
                href="https://www.linkedin.com/company/inviq-private-limited/"
                target="_blank"
                rel="noopener noreferrer"
                className="quote-link inline-flex items-center gap-2.5 glass rounded-full px-6 py-3 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="w-6 h-6 rounded-full bg-[#0A66C2] flex items-center justify-center">
                  <Linkedin size={12} className="text-white" />
                </div>
                Follow INVIQ on LinkedIn
                <ArrowUpRight size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Page ── */
const Team = () => {
  // Grid section header + cards
  const gridHeaderRef = useGSAP((el) => {
    gsap.from(el.children, {
      scrollTrigger: { trigger: el, start: "top 82%", once: true },
      y: 36, opacity: 0, duration: 0.7, stagger: 0.18, ease: "power3.out",
    });
  });

  return (
    <Layout>
      <TeamHero />

      {/* Team Grid */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/10 to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div ref={gridHeaderRef} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">
              The <span className="gradient-text">Founding Team</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Three perspectives, one mission — ship products that matter.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <MemberCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      <InviqStrip />
      <TeamCTA />
    </Layout>
  );
};

export default Team;

import { useEffect, useRef, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Linkedin, ArrowUpRight, Sparkles } from "lucide-react";

/* ── Scroll-reveal hook ── */
const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
};

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

/* ── Team Member Card ── */
const MemberCard = ({
  member,
  index,
  visible,
}: {
  member: (typeof team)[0];
  index: number;
  visible: boolean;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`group relative transition-all duration-700`}
      style={{
        transitionDelay: `${index * 160}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glow blob behind card */}
      <div
        className="absolute -inset-3 rounded-3xl blur-2xl transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at center, ${member.glowColor}, transparent 70%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Card */}
      <div className="relative glass rounded-2xl sm:rounded-3xl overflow-hidden border border-border/50 hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 shadow-lg">

        {/* Photo area */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
          <img
            src={member.image}
            alt={member.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
          />

          {/* Gradient overlay — always visible at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

          {/* Role badge — top left */}
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
            <span
              className={`inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-widest bg-gradient-to-r ${member.color} backdrop-blur-sm border border-white/10 text-foreground`}
            >
              {member.badge}
            </span>
          </div>

          {/* LinkedIn button — top right, visible on hover */}
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.shortName} on LinkedIn`}
            className="absolute top-2 sm:top-4 right-2 sm:right-4 w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-[#0A66C2] flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-110"
          >
            <Linkedin size={13} className="text-white" />
          </a>

          {/* Name + title pinned to bottom of photo */}
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5">
            <h3 className="text-base sm:text-xl font-heading font-bold text-foreground leading-tight">
              {member.shortName}
            </h3>
            <p className="text-primary text-[10px] sm:text-xs font-semibold mt-0.5 tracking-wide uppercase">
              {member.position}
            </p>
          </div>
        </div>

        {/* Bio area */}
        <div className="px-3 sm:px-5 pb-3 sm:pb-5 pt-2 sm:pt-3">
          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 hidden sm:block">
            {member.bio}
          </p>
          {/* Short bio on mobile */}
          <p className="text-muted-foreground text-xs leading-relaxed mb-3 sm:hidden line-clamp-2">
            {member.bio}
          </p>

          {/* LinkedIn CTA link */}
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 sm:gap-2 text-xs font-semibold text-primary hover:gap-2.5 sm:hover:gap-3 transition-all duration-300 group/link"
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-[#0A66C2]/15 flex items-center justify-center">
              <Linkedin size={10} className="text-[#0A66C2]" />
            </div>
            <span className="hidden sm:inline">View LinkedIn Profile</span>
            <span className="sm:hidden">LinkedIn</span>
            <ArrowUpRight size={12} className="opacity-60 group-hover/link:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>
    </div>
  );
};

/* ── Page ── */
const Team = () => {
  const hero = useScrollReveal(0.1);
  const grid = useScrollReveal(0.05);
  const quote = useScrollReveal();

  return (
    <Layout>
      {/* ── Hero ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl animate-float" />

        <div
          ref={hero.ref}
          className={`container mx-auto px-4 lg:px-8 relative z-10 transition-all duration-1000 ${hero.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 text-sm font-medium text-primary mb-6">
              <Sparkles size={14} />
              <span>The People Behind INVIQ</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Meet Our <span className="gradient-text">Leadership</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A passionate team of builders, thinkers, and strategists united
              by one goal — creating technology that drives real change.
            </p>
          </div>
        </div>
      </section>

      {/* ── Team Grid ── */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/10 to-transparent" />
        <div
          ref={grid.ref}
          className="container mx-auto px-4 lg:px-8 relative z-10"
        >
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <MemberCard
                key={member.name}
                member={member}
                index={index}
                visible={grid.visible}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── INVIQ Acronym Strip ── */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-8 font-medium">
            What INVIQ stands for
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
            {[
              { letter: "I", word: "Innovation", desc: "We push boundaries" },
              { letter: "N", word: "Next-Level", desc: "Always ahead" },
              { letter: "V", word: "Vision", desc: "Purpose-driven" },
              { letter: "I", word: "Integrity", desc: "Trust first" },
              { letter: "Q", word: "Quality", desc: "No compromise" },
            ].map((item, i) => (
              <div
                key={i}
                className="group glass rounded-2xl px-5 py-4 flex items-center gap-3 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Big letter */}
                <span className="text-3xl sm:text-4xl font-heading font-black gradient-text leading-none select-none">
                  {item.letter}
                </span>
                {/* Word + desc */}
                <div>
                  <p className="text-sm font-semibold text-foreground leading-tight">
                    {item.word}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── Quote / CTA ── */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div
            ref={quote.ref}
            className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${quote.visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
          >
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
              United by a{" "}
              <span className="gradient-text">Common Vision</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
              Our leadership team brings together expertise in strategy, finance,
              and technology. Together we&apos;re committed to building products
              that make a real difference.
            </p>
            <a
              href="https://www.linkedin.com/company/inviq-private-limited/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 glass rounded-full px-6 py-3 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="w-6 h-6 rounded-full bg-[#0A66C2] flex items-center justify-center">
                <Linkedin size={12} className="text-white" />
              </div>
              Follow INVIQ on LinkedIn
              <ArrowUpRight size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Team;

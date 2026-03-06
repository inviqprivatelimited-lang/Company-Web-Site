import { Trophy, Award, Medal } from "lucide-react";
import { useGSAP } from "@/hooks/useGSAP";

const achievements = [
  {
    icon: Trophy,
    title: "Best Social Impact Award",
    event: "Code With WIE 2025",
    issuer: "IEEE WIE Student Branch - University of Moratuwa",
    image: "/WIE.jpeg",
    color: "from-yellow-500/20 to-orange-500/10",
  },
  {
    icon: Medal,
    title: "2nd Runner Up",
    event: "CODEFEST 2025",
    issuer: "Sri Lanka Institute of Information Technology",
    image: "/codefest.jpeg",
    color: "from-slate-400/20 to-slate-600/10",
  },
  {
    icon: Award,
    title: "Finalist",
    event: "Mobitel Codeblast Hackathon 2025",
    issuer: "Mobitel",
    image: "/codeblast.jpeg",
    color: "from-primary/20 to-accent/10",
  },
];

const AchievementsSection = () => {
  const withImages = achievements.filter((a) => a.image);
  const withoutImages = achievements.filter((a) => !a.image);

  // ── Header ────────────────────────────────────────────────────────────────
  const headerRef = useGSAP((el) => {
    gsap.from(el.children, {
      scrollTrigger: { trigger: el, start: "top 82%", once: true },
      y: 40, opacity: 0, duration: 0.75, stagger: 0.18, ease: "power3.out",
    });
  });

  // ── Cards ─────────────────────────────────────────────────────────────────
  const gridRef = useGSAP((el) => {
    const cards = el.querySelectorAll(".ach-card");

    // Staggered 3D flip-up
    gsap.from(cards, {
      scrollTrigger: { trigger: el, start: "top 78%", once: true },
      y: 100, opacity: 0, rotationX: 12,
      transformOrigin: "bottom center",
      duration: 0.9, stagger: { amount: 0.55 },
      ease: "power4.out",
    });

    cards.forEach((card) => {
      const icon = card.querySelector(".ach-icon");
      const shine = card.querySelector(".ach-shine");

      // Icon pop on reveal
      ScrollTrigger.create({
        trigger: card, start: "top 82%", once: true,
        onEnter: () => gsap.from(icon, { scale: 0, rotation: -20, duration: 0.55, ease: "elastic.out(1.5,0.5)", delay: 0.35 }),
      });

      // Mouse-move shine sweep
      card.addEventListener("mousemove", (ev) => {
        const e = ev as MouseEvent;
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        if (shine) {
          (shine as HTMLElement).style.background =
            `radial-gradient(circle at ${x}% ${y}%, hsl(var(--primary)/0.12) 0%, transparent 60%)`;
        }
        gsap.to(card, {
          rotationY: ((e.clientX - rect.left - rect.width / 2) / rect.width) * 8,
          rotationX: ((e.clientY - rect.top - rect.height / 2) / rect.height) * -8,
          duration: 0.4, ease: "power2.out", transformPerspective: 900,
        });
      });
      card.addEventListener("mouseleave", () => {
        if (shine) (shine as HTMLElement).style.background = "";
        gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.6, ease: "power3.out" });
      });
    });
  });

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
      {/* Decorative large ghost text */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[14vw] font-heading font-black text-border/30 select-none pointer-events-none leading-none whitespace-nowrap"
      >
        AWARDS
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Our <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Recognition of our commitment to innovation and excellence
          </p>
        </div>

        {/* Cards */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          style={{ perspective: "1200px" }}
        >
          {withImages.map((achievement, index) => (
            <div
              key={index}
              className="ach-card relative glass rounded-2xl overflow-hidden border border-transparent hover:border-primary/50 transition-colors duration-500 cursor-default"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Shine overlay */}
              <div className="ach-shine absolute inset-0 pointer-events-none z-10 rounded-2xl transition-all duration-100" />

              {/* Gradient tint top */}
              <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-60 pointer-events-none`} />

              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={achievement.image}
                  alt={achievement.event}
                  loading="lazy"
                  decoding="async"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover object-center hover:scale-110 transition-transform duration-700"
                />
              </div>

              <div className="p-6 relative z-20">
                <div className="flex items-start gap-4">
                  <div className="ach-icon w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                    <achievement.icon className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-1">{achievement.title}</h3>
                    <p className="text-primary text-sm font-medium mb-1">{achievement.event}</p>
                    <p className="text-muted-foreground text-xs">{achievement.issuer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Text-only achievements */}
        {withoutImages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {withoutImages.map((achievement, index) => (
              <div
                key={index}
                className="ach-card glass rounded-2xl p-6 border border-transparent hover:border-primary/50 transition-colors duration-500"
              >
                <div className="flex items-start gap-4">
                  <div className="ach-icon w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <achievement.icon className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-1">{achievement.title}</h3>
                    <p className="text-primary text-sm font-medium mb-1">{achievement.event}</p>
                    <p className="text-muted-foreground text-xs">{achievement.issuer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AchievementsSection;

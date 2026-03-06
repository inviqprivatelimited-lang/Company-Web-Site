import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Code2, Globe, Smartphone, Brain, Rocket, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@/hooks/useGSAP";

const services = [
  { icon: Code2, title: "Custom Software", description: "Powerful, user-friendly digital solutions tailored to your needs.", image: "/dekstop dev.jpeg" },
  { icon: Globe, title: "Website Development", description: "Modern, responsive, and high-performing websites for your business.", image: "/web dev.jpeg" },
  { icon: Smartphone, title: "Mobile Apps", description: "Fast, intuitive apps ready for growth on Android & iOS.", image: "/mobile dev.jpeg" },
  { icon: Brain, title: "AI Automations", description: "Save time and boost productivity with custom AI solutions.", image: "/ai automation.jpeg" },
  { icon: Rocket, title: "SaaS Products", description: "Innovative digital products solving real-world problems.", image: "/saas.jpeg" },
  { icon: Gamepad2, title: "Game Development", description: "Engaging, high-performance games using Unity Engine.", image: "/game dev.jpeg" },
];

/** 3-D card tilt on mouse move */
function initTilt(card: Element) {
  const el = card as HTMLElement;
  const onMove = (e: MouseEvent) => {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = ((e.clientY - cy) / (rect.height / 2)) * -8;
    const ry = ((e.clientX - cx) / (rect.width / 2)) * 8;
    gsap.to(el, { rotationX: rx, rotationY: ry, duration: 0.4, ease: "power2.out", transformPerspective: 900 });
  };
  const onLeave = () => gsap.to(el, { rotationX: 0, rotationY: 0, duration: 0.6, ease: "power3.out" });

  el.addEventListener("mousemove", onMove as EventListener);
  el.addEventListener("mouseleave", onLeave);
}

const ServicesPreview = () => {
  // ── Section heading char-split ────────────────────────────────────────
  const headerRef = useGSAP((el) => {
    gsap.from(el.querySelectorAll("h2, p"), {
      scrollTrigger: { trigger: el, start: "top 82%", once: true },
      y: 50, opacity: 0, duration: 0.8, stagger: 0.18, ease: "power3.out",
    });

    // Shimmer on gradient word
    const gw = el.querySelector<HTMLElement>(".gradient-word");
    if (gw) {
      ScrollTrigger.create({
        trigger: gw, start: "top 80%", once: true,
        onEnter: () => gsap.fromTo(gw,
          { backgroundSize: "0% 100%" },
          { backgroundSize: "100% 100%", duration: 1, ease: "power3.out" }
        ),
      });
    }
  });

  // ── Cards stagger + 3-D tilt ─────────────────────────────────────────
  const gridRef = useGSAP((el) => {
    const cards = el.querySelectorAll(".service-card");

    gsap.from(cards, {
      scrollTrigger: { trigger: el, start: "top 76%", once: true },
      y: 90, opacity: 0, scale: 0.94,
      duration: 0.8, stagger: { amount: 0.7, from: "start" },
      ease: "power4.out",
    });

    // Icon counter-spin on reveal
    cards.forEach((card, i) => {
      ScrollTrigger.create({
        trigger: card, start: "top 82%", once: true,
        onEnter: () => gsap.from(card.querySelector(".svc-icon"), {
          rotation: -30, scale: 0, duration: 0.6, ease: "back.out(2.5)", delay: 0.2 + i * 0.04,
        }),
      });
      initTilt(card);
    });
  });

  // ── CTA ───────────────────────────────────────────────────────────────
  const ctaRef = useGSAP((el) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
      y: 30, opacity: 0, duration: 0.6, ease: "power2.out",
    });
  });

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />

      {/* Background glow blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            What We{" "}
            <span className="gradient-word gradient-text">Offer</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive technology solutions to transform your business
          </p>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ perspective: "1200px" }}
        >
          {services.map((service) => (
            <div
              key={service.title}
              className="service-card group glass rounded-2xl overflow-hidden border border-transparent hover:border-primary/50 transition-colors duration-500 cursor-default"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Image */}
              <div className="aspect-video overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  decoding="async"
                  width={480}
                  height={270}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Sheen overlay that tracks mouse via CSS */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: "linear-gradient(135deg, hsl(var(--primary)/0.07) 0%, transparent 60%)" }} />

              <div className="p-6">
                <div className="svc-icon w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/25 transition-colors duration-300">
                  <service.icon className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>

                {/* Animated bottom bar */}
                <div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-primary to-accent rounded-full group-hover:w-full transition-all duration-700" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="text-center mt-12">
          <Button variant="glass" size="lg" asChild>
            <Link to="/services">
              View All Services <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;

import { Link } from "react-router-dom";
import { ArrowRight, Code2, Globe, Smartphone, Brain, Rocket, Gamepad2, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@/hooks/useGSAP";

const services = [
  {
    icon: Code2,
    title: "Custom Software",
    description: "Powerful, user-friendly digital solutions engineered to fit your exact business workflow — from backend systems to polished frontends.",
    image: "/dekstop dev.jpeg",
    number: "01",
    accent: "from-indigo-500/20 to-primary/10",
    iconBg: "bg-indigo-500/15",
    iconColor: "text-indigo-400",
    bar: "from-indigo-500 to-primary",
    featured: true,
  },
  {
    icon: Brain,
    title: "AI Automations",
    description: "Cut manual work and unlock intelligent decision-making with custom AI pipelines, chatbots, and automation built for your industry.",
    image: "/ai automation.jpeg",
    number: "02",
    accent: "from-violet-500/20 to-purple-500/10",
    iconBg: "bg-violet-500/15",
    iconColor: "text-violet-400",
    bar: "from-violet-500 to-purple-400",
    featured: false,
  },
  {
    icon: Globe,
    title: "Website Development",
    description: "Modern, fast-loading websites and web apps that convert visitors into customers.",
    image: "/web dev.jpeg",
    number: "03",
    accent: "from-sky-500/20 to-blue-500/10",
    iconBg: "bg-sky-500/15",
    iconColor: "text-sky-400",
    bar: "from-sky-500 to-blue-400",
    featured: false,
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Native-quality iOS & Android apps built with Flutter for speed and reach.",
    image: "/mobile dev.jpeg",
    number: "04",
    accent: "from-cyan-500/20 to-teal-500/10",
    iconBg: "bg-cyan-500/15",
    iconColor: "text-cyan-400",
    bar: "from-cyan-500 to-teal-400",
    featured: false,
  },
  {
    icon: Rocket,
    title: "SaaS Products",
    description: "From idea to launch — we design and build scalable SaaS platforms that grow with your users.",
    image: "/saas.jpeg",
    number: "05",
    accent: "from-orange-500/20 to-amber-500/10",
    iconBg: "bg-orange-500/15",
    iconColor: "text-orange-400",
    bar: "from-orange-500 to-amber-400",
    featured: false,
  },
  {
    icon: Gamepad2,
    title: "Game Development",
    description: "Immersive, high-performance 2D & 3D games built with Unity — from casual mobile games to full-scale experiences.",
    image: "/game dev.jpeg",
    number: "06",
    accent: "from-emerald-500/20 to-green-500/10",
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
    bar: "from-emerald-500 to-green-400",
    featured: false,
  },
];

/* ── Featured Card (large, with image bg) ─────────────────────────── */
const FeaturedCard = ({ service }: { service: typeof services[0] }) => (
  <Link
    to="/services"
    className="svc-card group relative lg:col-span-2 rounded-3xl overflow-hidden border border-border/40 hover:border-primary/40 transition-colors duration-500 min-h-[360px] flex flex-col justify-end cursor-pointer"
  >
    {/* Background image */}
    <img
      src={service.image}
      alt={service.title}
      loading="lazy"
      className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
    />

    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
    <div className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-60`} />

    {/* Ghost number */}
    <span aria-hidden className="absolute top-4 right-6 text-[7rem] font-heading font-black text-white/5 leading-none select-none">
      {service.number}
    </span>

    {/* Content */}
    <div className="relative z-10 p-8">
      <div className={`w-12 h-12 rounded-xl ${service.iconBg} flex items-center justify-center mb-5`}>
        <service.icon className={service.iconColor} size={24} />
      </div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-heading font-bold text-foreground mb-2">{service.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-md">{service.description}</p>
        </div>
        <div className="shrink-0 w-10 h-10 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300 mt-1">
          <ArrowUpRight size={16} className="text-primary group-hover:text-white transition-colors duration-300" />
        </div>
      </div>
      {/* Bottom bar */}
      <div className={`mt-5 h-0.5 w-0 group-hover:w-full bg-gradient-to-r ${service.bar} rounded-full transition-all duration-700`} />
    </div>
  </Link>
);

/* ── Regular Card ──────────────────────────────────────────────────── */
const ServiceCard = ({ service }: { service: typeof services[0] }) => (
  <Link
    to="/services"
    className="svc-card group relative glass rounded-3xl overflow-hidden border border-border/40 hover:border-primary/30 transition-colors duration-500 flex flex-col cursor-pointer"
  >
    {/* Ghost number */}
    <span aria-hidden className="absolute top-4 right-5 text-6xl font-heading font-black text-border/25 leading-none select-none">
      {service.number}
    </span>

    {/* Color tint bg */}
    <div className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

    {/* Image — slides up on hover */}
    <div className="relative h-44 overflow-hidden">
      <img
        src={service.image}
        alt={service.title}
        loading="lazy"
        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90" />
    </div>

    {/* Content */}
    <div className="relative z-10 p-6 flex flex-col gap-3 flex-1">
      <div className={`w-11 h-11 rounded-xl ${service.iconBg} flex items-center justify-center`}>
        <service.icon className={service.iconColor} size={22} />
      </div>
      <h3 className="text-lg font-heading font-semibold text-foreground">{service.title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed flex-1">{service.description}</p>

      {/* "Learn more" — slides in on hover */}
      <div className="flex items-center gap-1.5 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
        <span>Learn more</span>
        <ArrowRight size={12} />
      </div>

      {/* Bottom accent bar */}
      <div className={`h-0.5 w-0 group-hover:w-full bg-gradient-to-r ${service.bar} rounded-full transition-all duration-700`} />
    </div>
  </Link>
);

const ServicesPreview = () => {
  /* ── Header ─────────────────────────────────────────────────────── */
  const headerRef = useGSAP((el) => {
    gsap.from(el.children, {
      scrollTrigger: { trigger: el, start: "top 82%", once: true },
      y: 40, opacity: 0, duration: 0.75, stagger: 0.15, ease: "power3.out",
    });
  });

  /* ── Cards stagger ────────────────────────────────────────────── */
  const gridRef = useGSAP((el) => {
    const cards = el.querySelectorAll(".svc-card");
    gsap.from(cards, {
      scrollTrigger: { trigger: el, start: "top 78%", once: true },
      y: 70, opacity: 0, scale: 0.95,
      duration: 0.75, stagger: { amount: 0.6, from: "start" },
      ease: "power4.out",
    });

    // Icon pop-in per card
    cards.forEach((card, i) => {
      const icon = card.querySelector(".svc-icon-wrap");
      if (!icon) return;
      ScrollTrigger.create({
        trigger: card, start: "top 82%", once: true,
        onEnter: () => gsap.from(icon, {
          scale: 0, rotation: -20, duration: 0.55,
          ease: "back.out(2.5)", delay: 0.15 + i * 0.05,
        }),
      });
    });
  });

  /* ── CTA ──────────────────────────────────────────────────────── */
  const ctaRef = useGSAP((el) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
      y: 30, opacity: 0, duration: 0.6, ease: "power2.out",
    });
  });

  const [featured, ...rest] = services;

  return (
    <section className="py-28 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/15 to-transparent pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-[400px] h-[400px] bg-violet-500/4 rounded-full blur-3xl pointer-events-none" />

      {/* Ghost text */}
      <div aria-hidden className="absolute inset-0 flex items-center justify-center text-[13vw] font-heading font-black text-border/5 select-none pointer-events-none leading-none overflow-hidden">
        SERVICES
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">

        {/* ── Header ──────────────────────────────────────────────── */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/25 text-xs font-semibold text-primary mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              What We Build
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold leading-tight">
              Solutions That Drive{" "}
              <span className="gradient-text">Growth</span>
            </h2>
            <p className="text-muted-foreground mt-3 max-w-lg leading-relaxed">
              From custom software to AI automation — we build everything your business needs to scale and thrive in the digital era.
            </p>
          </div>

          {/* Right: count + link */}
          <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
            <div className="text-5xl font-heading font-black text-primary/20 leading-none select-none">
              06
            </div>
            <p className="text-xs text-muted-foreground">services available</p>
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-3 transition-all duration-300"
            >
              View all services <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* ── Bento Grid ──────────────────────────────────────────── */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-auto">

          {/* Featured card – spans 2 cols on large */}
          <FeaturedCard service={featured} />

          {/* AI card – right of featured */}
          <ServiceCard service={rest[0]} />

          {/* Bottom row – 3 equal cards */}
          {rest.slice(1).map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>

        {/* ── CTA ─────────────────────────────────────────────────── */}
        <div ref={ctaRef} className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="hero" size="lg" asChild>
            <Link to="/services">
              Explore All Services <ArrowRight size={18} />
            </Link>
          </Button>
          <Button variant="glass" size="lg" asChild>
            <Link to="/contact">Get a Free Quote</Link>
          </Button>
        </div>

      </div>
    </section>
  );
};

export default ServicesPreview;

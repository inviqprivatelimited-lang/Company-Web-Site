import { useState, useRef, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Code2, Globe, Smartphone, Brain, Rocket,
  Video, Gamepad2, Wrench, ArrowRight, Check,
  Sparkles, ChevronRight,
} from "lucide-react";
import { useGSAP } from "@/hooks/useGSAP";

// ─── Data ─────────────────────────────────────────────────────────────────────
const services = [
  {
    id: "custom-software",
    icon: Code2,
    number: "01",
    title: "Custom Software\nDevelopment",
    tagline: "Built around your workflow, not the other way around.",
    description:
      "We build powerful, user-friendly digital solutions tailored to your exact needs — from robust backend systems to beautiful client-facing interfaces.",
    features: ["Web applications", "Mobile apps (Android & iOS)", "Desktop software", "Backend systems & APIs"],
    image: "/dekstop dev.jpeg",
    accent: "from-blue-500/20 to-cyan-500/10",
  },
  {
    id: "website-dev",
    icon: Globe,
    number: "02",
    title: "Client Website\nDevelopment",
    tagline: "Websites that convert visitors into customers.",
    description:
      "We design and develop modern, responsive, high-performing websites that look stunning on every device and are optimised for SEO and speed.",
    features: ["Business websites", "Portfolio & personal sites", "E-commerce websites", "Landing pages", "UI/UX design"],
    image: "/web dev.jpeg",
    accent: "from-emerald-500/20 to-teal-500/10",
  },
  {
    id: "mobile-apps",
    icon: Smartphone,
    number: "03",
    title: "Mobile App\nDevelopment",
    tagline: "Apps your users will love using every day.",
    description:
      "Build apps that are fast, intuitive, and ready for growth — available on both Android and iOS with a consistent, delightful experience.",
    features: ["Full mobile app development", "Cross-platform solutions", "App UI/UX", "App maintenance"],
    image: "/mobile dev.jpeg",
    accent: "from-violet-500/20 to-purple-500/10",
  },
  {
    id: "ai-automations",
    icon: Brain,
    number: "04",
    title: "Business AI\nAutomations",
    tagline: "Let AI do the heavy lifting so you can focus on growth.",
    description:
      "We help businesses save time and boost productivity using custom AI tools, automating repetitive tasks and surfacing intelligent insights.",
    features: ["Custom AI tools", "Workflow automation", "Chatbots & virtual assistants", "Data analysis & prediction"],
    image: "/ai automation.jpeg",
    accent: "from-orange-500/20 to-yellow-500/10",
  },
  {
    id: "saas",
    icon: Rocket,
    number: "05",
    title: "SaaS Products",
    tagline: "Innovative products that solve real-world problems at scale.",
    description:
      "We create our own groundbreaking digital products — scalable SaaS platforms and AI-powered applications built for long-term success.",
    features: ["SaaS platforms", "AI-powered applications", "Productivity tools", "Creative tech solutions"],
    image: "/saas.jpeg",
    accent: "from-rose-500/20 to-pink-500/10",
  },
  {
    id: "content-creation",
    icon: Video,
    number: "06",
    title: "Content Creation",
    tagline: "Creative stories told through the lens of technology.",
    description:
      "Compelling, tech-focused digital content crafted for impact — from short-form social media reels to long-form educational storytelling.",
    features: ["Tech-focused videos", "Home-based creative content", "Digital storytelling", "Short-form social media content"],
    image: "/content create.jpeg",
    accent: "from-fuchsia-500/20 to-pink-500/10",
  },
  {
    id: "game-dev",
    icon: Gamepad2,
    number: "07",
    title: "Game Development\n(Unity)",
    tagline: "Immersive game experiences that keep players coming back.",
    description:
      "We create engaging, high-performance 2D & 3D games using Unity Engine — from mobile titles to AR-based interactive experiences.",
    features: ["2D & 3D game development", "Mobile & desktop game builds", "AR-based interactive experiences", "Game UI/UX & animations"],
    image: "/game dev.jpeg",
    accent: "from-lime-500/20 to-green-500/10",
  },
  {
    id: "maintenance",
    icon: Wrench,
    number: "08",
    title: "Website Maintenance\n& Support",
    tagline: "Your site, always fast. Always secure. Always yours.",
    description:
      "We keep your website secure, updated, and running at peak performance with proactive monitoring and rapid support.",
    features: ["Regular updates & backups", "Bug fixing & performance optimization", "Security monitoring", "Domain & hosting support"],
    image: "/web maintence.jpeg",
    accent: "from-sky-500/20 to-blue-500/10",
  },
];

// ─── Hero Section ─────────────────────────────────────────────────────────────
const ServicesHero = () => {
  const ref = useGSAP((el) => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.from(el.querySelector(".hero-badge"), { y: 30, opacity: 0, duration: 0.6 })
      .from(el.querySelector(".hero-h1"), { y: 60, opacity: 0, duration: 0.8 }, "-=0.3")
      .from(el.querySelector(".hero-sub"), {
        clipPath: "inset(0 100% 0 0)", opacity: 1, duration: 0.9, ease: "expo.inOut",
      }, "-=0.4")
      .from(el.querySelectorAll(".hero-stat"), {
        y: 40, opacity: 0, duration: 0.6, stagger: 0.12, ease: "power3.out",
      }, "-=0.4");
  });

  return (
    <section ref={ref} className="py-28 relative overflow-hidden grain">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-transparent to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/6 rounded-full blur-3xl pointer-events-none" />

      {/* Ghost text */}
      <div aria-hidden className="absolute inset-0 flex items-center justify-center text-[16vw] font-heading font-black text-border/15 select-none pointer-events-none leading-none overflow-hidden">
        SERVICES
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
        {/* Badge */}
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 text-sm font-medium text-primary mb-8">
          <Sparkles size={14} />
          <span>What We Build</span>
        </div>

        {/* Heading */}
        <h1 className="hero-h1 text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
          Our <span className="gradient-text">Services</span>
        </h1>

        {/* Sub */}
        <p className="hero-sub text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-14">
          Comprehensive technology solutions to transform your business and drive innovation
        </p>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { num: "8", label: "Core Services" },
            { num: "5+", label: "Awards" },
            { num: "100%", label: "Dedication" },
          ].map(({ num, label }) => (
            <div key={label} className="hero-stat text-center">
              <div className="text-3xl font-heading font-bold gradient-text">{num}</div>
              <div className="text-xs text-muted-foreground mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Sticky Nav Pills ─────────────────────────────────────────────────────────
const StickyNav = ({ active }: { active: string }) => {
  const pills = services.map((s) => ({ id: s.id, icon: s.icon, short: s.number }));
  return (
    <nav className="sticky top-20 z-40 py-3 hidden xl:block">
      <div className="flex flex-col gap-2">
        {pills.map(({ id, icon: Icon, short }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${active === id
                ? "bg-primary text-white shadow-lg shadow-primary/30"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
          >
            <Icon size={14} />
            {short}
          </a>
        ))}
      </div>
    </nav>
  );
};

// ─── Single Service Row ───────────────────────────────────────────────────────
const ServiceRow = ({
  service,
  index,
  onVisible,
}: {
  service: (typeof services)[0];
  index: number;
  onVisible: (id: string) => void;
}) => {
  const isEven = index % 2 === 0;

  const rowRef = useGSAP((el) => {
    // Notify parent when this section enters viewport
    ScrollTrigger.create({
      trigger: el,
      start: "top 55%",
      end: "bottom 45%",
      onEnter: () => onVisible(service.id),
      onEnterBack: () => onVisible(service.id),
    });

    const imgWrap = el.querySelector(".svc-img-wrap");
    const imgEl = el.querySelector(".svc-img");
    const content = el.querySelector(".svc-content");
    const number = el.querySelector(".svc-number");
    const title = el.querySelector(".svc-title");
    const tagline = el.querySelector(".svc-tagline");
    const desc = el.querySelector(".svc-desc");
    const feats = el.querySelectorAll(".svc-feat");
    const line = el.querySelector(".svc-line");
    const iconBox = el.querySelector(".svc-icon-box");

    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 78%", once: true },
    });

    // Number ghost sweeps in
    if (number) tl.from(number, {
      x: isEven ? -60 : 60, opacity: 0, duration: 0.7, ease: "power3.out",
    });

    // Image: clip-path wipe + scale
    if (imgWrap) tl.fromTo(imgWrap,
      { clipPath: isEven ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)", opacity: 1 },
      { clipPath: "inset(0 0% 0 0%)", duration: 1.0, ease: "expo.inOut" },
      "-=0.5"
    );
    if (imgEl) tl.from(imgEl, { scale: 1.15, duration: 1.4, ease: "power2.out" }, "-=1.0");

    // Content slides from opposite side
    if (content) tl.from(content, {
      x: isEven ? 70 : -70, opacity: 0, duration: 0.8, ease: "power4.out",
    }, "-=0.7");

    // Icon box pops
    if (iconBox) tl.from(iconBox, { scale: 0, rotation: -30, duration: 0.55, ease: "back.out(2.5)" }, "-=0.5");

    // Title + tagline stagger
    if (title) tl.from(title, { y: 30, opacity: 0, duration: 0.5, ease: "power3.out" }, "-=0.4");
    if (tagline) tl.from(tagline, { y: 20, opacity: 0, duration: 0.5, ease: "power3.out" }, "-=0.35");
    if (desc) tl.from(desc, { y: 20, opacity: 0, duration: 0.55, ease: "power3.out" }, "-=0.35");

    // Feature pills stagger scale-in
    if (feats.length) tl.from(feats, {
      scale: 0.6, opacity: 0, duration: 0.4, stagger: 0.07, ease: "back.out(2)",
    }, "-=0.3");

    // Bottom line draws
    if (line) tl.from(line, {
      scaleX: 0, transformOrigin: isEven ? "left center" : "right center",
      duration: 0.6, ease: "power3.out",
    }, "-=0.2");

    // Parallax image on scroll
    if (imgWrap) {
      gsap.to(imgWrap, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: el, start: "top bottom", end: "bottom top", scrub: 1.2,
        },
      });
    }

    // 3D tilt on image hover
    if (imgWrap) {
      const img = imgWrap as HTMLElement;
      img.addEventListener("mousemove", (e) => {
        const r = img.getBoundingClientRect();
        const rx = ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -6;
        const ry = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 6;
        gsap.to(img, { rotationX: rx, rotationY: ry, duration: 0.4, ease: "power2.out", transformPerspective: 800 });
      });
      img.addEventListener("mouseleave", () =>
        gsap.to(img, { rotationX: 0, rotationY: 0, duration: 0.6, ease: "power3.out" })
      );
    }
  });

  return (
    <div
      id={service.id}
      ref={rowRef}
      className="relative py-20 md:py-28 border-b border-border/30 last:border-0 scroll-mt-24"
    >
      {/* Giant ghost number */}
      <div
        aria-hidden
        className={`svc-number absolute top-8 ${isEven ? "left-0" : "right-0"} text-[10vw] font-heading font-black text-border/20 select-none pointer-events-none leading-none`}
      >
        {service.number}
      </div>

      <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 lg:gap-20 items-center relative z-10`}>

        {/* ── Image side ─────────────────────────────────────────────── */}
        <div className="w-full lg:w-1/2">
          <div
            className="svc-img-wrap relative rounded-3xl overflow-hidden shadow-2xl"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Gradient accent tint */}
            <div className={`absolute inset-0 bg-gradient-to-br ${service.accent} z-10 pointer-events-none mix-blend-overlay`} />

            <img
              src={service.image}
              alt={service.title}
              loading="lazy"
              decoding="async"
              width={640}
              height={400}
              className="svc-img w-full aspect-[4/3] object-cover object-center"
            />

            {/* Floating icon badge over the image */}
            <div className={`absolute bottom-5 ${isEven ? "right-5" : "left-5"} z-20`}>
              <div className="svc-icon-box w-14 h-14 rounded-2xl bg-background/80 backdrop-blur-md border border-primary/30 flex items-center justify-center shadow-xl">
                <service.icon className="text-primary" size={26} />
              </div>
            </div>

            {/* Service number badge */}
            <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-background/70 backdrop-blur-sm text-xs font-bold text-primary border border-primary/25">
              {service.number}
            </div>
          </div>
        </div>

        {/* ── Content side ───────────────────────────────────────────── */}
        <div className="svc-content w-full lg:w-1/2 space-y-6">
          {/* Tagline pill */}
          <div className="svc-tagline inline-flex items-center gap-2 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {service.tagline}
          </div>

          {/* Title */}
          <h2 className="svc-title text-3xl md:text-4xl font-heading font-bold leading-tight whitespace-pre-line">
            {service.title}
          </h2>

          {/* Description */}
          <p className="svc-desc text-muted-foreground leading-relaxed">
            {service.description}
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2">
            {service.features.map((feat) => (
              <span
                key={feat}
                className="svc-feat inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium glass border border-border/50 hover:border-primary/40 transition-colors duration-300"
              >
                <Check size={11} className="text-primary flex-shrink-0" />
                {feat}
              </span>
            ))}
          </div>

          {/* Decorative line */}
          <div className="svc-line h-px bg-gradient-to-r from-primary to-accent rounded-full" />

          {/* CTA */}
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-4 transition-all duration-300"
          >
            <span>Start This Project</span>
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

      </div>
    </div>
  );
};

// ─── CTA ─────────────────────────────────────────────────────────────────────
const ServicesCTA = () => {
  const ref = useGSAP((el) => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 78%", once: true },
    });
    tl.from(el.querySelector(".cta-blob"), { scale: 0.4, opacity: 0, duration: 1.2, ease: "power2.out" })
      .from(el.querySelector(".cta-h"), { y: 40, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.7")
      .from(el.querySelector(".cta-p"), { y: 24, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
      .from(el.querySelector(".cta-btn-row"), { scale: 0.85, opacity: 0, duration: 0.5, ease: "back.out(2)" }, "-=0.3");
  });

  return (
    <section ref={ref} className="py-28 relative overflow-hidden grain">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="cta-blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />

      <div aria-hidden className="absolute inset-0 flex items-center justify-center text-[14vw] font-heading font-black text-border/20 select-none pointer-events-none leading-none overflow-hidden">
        START
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
        <h2 className="cta-h text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
          Ready to Get <span className="gradient-text">Started</span>?
        </h2>
        <p className="cta-p text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
          Let&apos;s discuss how we can help bring your vision to life.
          Pick a service and we&apos;ll map out a plan together.
        </p>
        <div className="cta-btn-row flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="hero" size="xl" asChild>
            <Link to="/contact">
              Contact Us <ArrowRight size={20} />
            </Link>
          </Button>
          <Button variant="glass" size="xl" asChild>
            <Link to="/team">Meet the Team</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
const Services = () => {
  const [activeId, setActiveId] = useState(services[0].id);

  return (
    <Layout>
      <ServicesHero />

      {/* Main content: sticky nav + service rows */}
      <section className="relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex gap-8 xl:gap-12">

            {/* Sticky sidebar nav */}
            <div className="w-12 flex-shrink-0 hidden xl:block">
              <StickyNav active={activeId} />
            </div>

            {/* Service rows */}
            <div className="flex-1 min-w-0">
              {services.map((service, index) => (
                <ServiceRow
                  key={service.id}
                  service={service}
                  index={index}
                  onVisible={setActiveId}
                />
              ))}
            </div>

          </div>
        </div>
      </section>

      <ServicesCTA />
    </Layout>
  );
};

export default Services;

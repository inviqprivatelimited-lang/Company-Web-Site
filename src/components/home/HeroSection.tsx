import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@/hooks/useGSAP";

const heroImage = "/my-hero.png";

const rotatingWords = [
  "SaaS Platforms",
  "Custom Software",
  "Mobile Apps",
  "AI Solutions",
  "Web Applications",
  "Game Experiences",
];

/** Wrap every character in a span for per-char GSAP animations */
function splitChars(el: HTMLElement) {
  const text = el.textContent ?? "";
  el.innerHTML = text
    .split("")
    .map((ch) =>
      ch === " "
        ? `<span class="char-wrap"><span class="char">&nbsp;</span></span>`
        : `<span class="char-wrap"><span class="char">${ch}</span></span>`
    )
    .join("");
  return el.querySelectorAll<HTMLElement>(".char");
}

/** Draw a canvas particle field */
function initParticles(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => { };

  let raf: number;
  let W = 0, H = 0;

  type Particle = { x: number; y: number; vx: number; vy: number; r: number; a: number };
  const particles: Particle[] = [];

  const resize = () => {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  };

  const spawn = () => {
    const count = Math.floor((W * H) / 9000);
    particles.length = 0;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.6 + 0.4,
        a: Math.random(),
      });
    }
  };

  const draw = () => {
    ctx.clearRect(0, 0, W, H);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
      p.a = 0.3 + 0.5 * Math.abs(Math.sin(Date.now() * 0.001 + p.x));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(24,100%,60%,${p.a})`;
      ctx.fill();
    });

    // Draw faint connectors between close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 90) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `hsla(24,100%,55%,${0.12 * (1 - dist / 90)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    raf = requestAnimationFrame(draw);
  };

  resize();
  spawn();
  draw();
  window.addEventListener("resize", () => { resize(); spawn(); });

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", () => { resize(); spawn(); });
  };
}

// ─────────────────────────────────────────────────────────────────────────────
const HeroSection = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ── Typewriter ──────────────────────────────────────────────────────────
  useEffect(() => {
    const word = rotatingWords[currentWord];
    let t: ReturnType<typeof setTimeout>;
    if (!isDeleting) {
      if (displayText.length < word.length)
        t = setTimeout(() => setDisplayText(word.slice(0, displayText.length + 1)), 80);
      else t = setTimeout(() => setIsDeleting(true), 1800);
    } else {
      if (displayText.length > 0)
        t = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 40);
      else { setIsDeleting(false); setCurrentWord((p) => (p + 1) % rotatingWords.length); }
    }
    return () => clearTimeout(t);
  }, [displayText, isDeleting, currentWord]);

  // ── Particle canvas ─────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cleanup = initParticles(canvas);
    return cleanup;
  }, []);

  // ── GSAP Master timeline ────────────────────────────────────────────────
  const sectionRef = useGSAP((el) => {
    // ── Split "We Build" word by char ──
    const h1 = el.querySelector<HTMLElement>(".hero-title-static");
    let chars: NodeListOf<HTMLElement> | null = null;
    if (h1) chars = splitChars(h1);

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Hero image parallax zoom-in
    tl.from(el.querySelector(".hero-img"), {
      scale: 1.18,
      opacity: 0,
      duration: 1.8,
      ease: "expo.out",
    });

    // Char-by-char reveal of "We Build"
    if (chars && chars.length) {
      tl.from(
        chars,
        { y: "120%", opacity: 0, duration: 0.7, stagger: 0.04, ease: "back.out(2)" },
        "-=1.3"
      );
    }

    // Subheading clip-path wipe left → right
    tl.fromTo(
      el.querySelector(".hero-sub"),
      { clipPath: "inset(0 100% 0 0)", opacity: 1 },
      { clipPath: "inset(0 0% 0 0)", duration: 1.0, ease: "expo.inOut" },
      "-=0.4"
    );

    // Buttons pop with back.out
    tl.from(
      el.querySelectorAll(".hero-btn"),
      { scale: 0.7, opacity: 0, duration: 0.55, stagger: 0.15, ease: "back.out(2.5)" },
      "-=0.5"
    );

    // Stats slide up + fade
    tl.from(
      el.querySelectorAll(".hero-stat"),
      { y: 50, opacity: 0, duration: 0.6, stagger: 0.12, ease: "power3.out" },
      "-=0.3"
    );

    // ── Mouse parallax on orbs ──
    const handleMouse = (e: MouseEvent) => {
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      el.querySelectorAll(".hero-orb").forEach((orb, i) => {
        const d = i === 0 ? 0.025 : 0.015;
        gsap.to(orb, { x: (e.clientX - cx) * d, y: (e.clientY - cy) * d, duration: 1.4, ease: "power1.out" });
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  });

  // ── ScrollTrigger number counters ───────────────────────────────────────
  const statsRef = useGSAP((el) => {
    el.querySelectorAll<HTMLElement>("[data-count]").forEach((counter) => {
      const end = parseInt(counter.dataset.count ?? "0", 10);
      const obj = { v: 0 };
      ScrollTrigger.create({
        trigger: counter,
        start: "top 88%",
        once: true,
        onEnter: () =>
          gsap.to(obj, {
            v: end,
            duration: 2,
            ease: "power3.out",
            onUpdate: () => { counter.textContent = Math.floor(obj.v).toString(); },
          }),
      });
    });
  });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden grain"
    >
      {/* Floating particle canvas */}
      <canvas ref={canvasRef} className="particles-canvas" />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      {/* Animated orbs */}
      <div className="hero-orb absolute top-1/4 left-1/4 w-[28rem] h-[28rem] bg-primary/10 rounded-full blur-3xl animate-pulse-glow" style={{ contain: "strict" }} />
      <div className="hero-orb absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/6 rounded-full blur-3xl animate-pulse-glow delay-500" style={{ contain: "strict" }} />
      <div className="hero-orb absolute top-3/4 left-1/2 w-64 h-64 bg-accent/8 rounded-full blur-2xl animate-pulse-glow delay-300" style={{ contain: "strict" }} />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

      {/* Hero image with parallax */}
      <img
        src={heroImage}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
        className="hero-img absolute inset-0 w-full h-full object-cover object-top opacity-10"
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* "We Build" — char-split animated */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-6">
            <span className="hero-title-static inline-block">We Build</span>{" "}
            <span className="gradient-text inline-block min-w-[200px] md:min-w-[320px] min-h-[1.2em]">
              {displayText}
              <span className="typing-cursor">|</span>
            </span>
          </h1>

          {/* Subheading — clip-path wipe */}
          <p className="hero-sub text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            From idea to launch — we craft digital products that drive growth.
            Empowering businesses through innovative technology solutions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="hero-btn" variant="hero" size="xl" asChild>
              <Link to="/services">
                Explore Services <ArrowRight size={20} />
              </Link>
            </Button>
            <Button className="hero-btn" variant="glass" size="xl" asChild>
              <Link to="/about">Learn More</Link>
            </Button>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-3 gap-8 mt-20">
            {[
              { count: 5, suffix: "+", label: "Awards Won" },
              { count: 8, suffix: "+", label: "Services" },
              { count: 100, suffix: "%", label: "Commitment" },
            ].map(({ count, suffix, label }) => (
              <div key={label} className="hero-stat text-center group">
                <div className="text-3xl md:text-4xl font-heading font-bold gradient-text flex items-center justify-center gap-0.5">
                  <span data-count={count}>0</span>
                  <span>{suffix}</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">{label}</div>
                {/* Animated underline */}
                <div className="mt-2 h-0.5 w-0 bg-primary rounded-full mx-auto group-hover:w-12 transition-all duration-500" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;

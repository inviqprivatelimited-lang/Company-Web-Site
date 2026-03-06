import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const REDIRECT_DELAY = 10;

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(REDIRECT_DELAY);
  const cardRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    if (countdown <= 0) { navigate("/"); return; }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown, navigate]);

  // GSAP entrance + glitch loop
  useEffect(() => {
    // Check if gsap is defined (e.g., loaded via a script tag or imported globally)
    // If using a module bundler, you might need to import gsap: `import gsap from 'gsap';`
    if (typeof gsap === "undefined") {
      console.warn("GSAP not found. Animations will not play.");
      return;
    }
    const card = cardRef.current;
    const num = numRef.current;
    if (!card || !num) return;

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.from(card, { scale: 0.8, opacity: 0, y: 60, duration: 0.8 })
      .from(num, { scale: 0.5, opacity: 0, duration: 0.7, ease: "elastic.out(1.2, 0.5)" }, "-=0.4")
      .from(card.querySelectorAll(".anim"), { y: 24, opacity: 0, duration: 0.5, stagger: 0.12, ease: "power3.out" }, "-=0.3");

    // Glitch loop
    const g = gsap.timeline({ repeat: -1, repeatDelay: 3 });
    g.to(num, { x: -4, skewX: 3, duration: 0.05, ease: "none" })
      .to(num, { x: 4, skewX: -3, duration: 0.05, ease: "none" })
      .to(num, { x: -2, skewX: 2, duration: 0.05, ease: "none" })
      .to(num, { x: 0, skewX: 0, duration: 0.05, ease: "none" });
  }, []);

  // Canvas particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.4,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(24,100%,60%,${0.3 + 0.4 * Math.abs(Math.sin(Date.now() * 0.001 + p.x))})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  const progress = ((REDIRECT_DELAY - countdown) / REDIRECT_DELAY) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "linear-gradient(135deg,#0f0f0f 0%,#1a1a2e 50%,#16213e 100%)" }}>

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Blobs */}
      <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full blur-3xl opacity-20"
        style={{ background: "linear-gradient(135deg,#f97316,#fb923c)", animation: "blob 8s ease-in-out infinite" }} />
      <div className="absolute bottom-[-80px] left-[-80px] w-[350px] h-[350px] rounded-full blur-3xl opacity-15"
        style={{ background: "linear-gradient(135deg,#f97316,#fbbf24)", animation: "blob 8s ease-in-out infinite 4s" }} />

      {/* Card */}
      <div ref={cardRef} className="relative z-10 text-center px-10 py-12 max-w-[520px] w-full mx-4"
        style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, boxShadow: "0 25px 50px rgba(0,0,0,0.4)" }}>

        {/* Logo */}
        <div className="anim flex items-center justify-center gap-2.5 mb-8">
          <img src="/logo1.png" alt="INVIQ" className="w-9 h-9 object-contain" />
          <span className="text-[22px] font-black text-white tracking-[3px]">INVIQ</span>
        </div>

        {/* 404 */}
        <div ref={numRef} className="text-[120px] font-black leading-none mb-2 select-none"
          style={{ background: "linear-gradient(135deg,#f97316,#fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          404
        </div>

        <h1 className="anim text-[26px] font-bold text-white mb-3">Page Not Found</h1>
        <p className="anim text-[15px] mb-7 leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
          The page{" "}
          <code className="px-2 py-0.5 rounded text-[13px] font-mono" style={{ background: "rgba(249,115,22,0.2)", color: "#f97316" }}>
            {location.pathname}
          </code>{" "}
          doesn&apos;t exist or has been moved.
        </p>

        {/* Progress bar */}
        <div className="anim h-[5px] rounded-full overflow-hidden mb-2.5" style={{ background: "rgba(255,255,255,0.1)" }}>
          <div className="h-full rounded-full transition-[width] duration-1000 linear"
            style={{ width: `${progress}%`, background: "linear-gradient(90deg,#f97316,#fbbf24)" }} />
        </div>
        <p className="anim text-[13px] mb-7" style={{ color: "rgba(255,255,255,0.5)" }}>
          Redirecting to home in{" "}
          <span className="font-bold text-[15px]" style={{ color: "#f97316" }}>{countdown}</span>s…
        </p>

        {/* Buttons */}
        <div className="anim flex gap-3 justify-center mb-7 flex-wrap">
          <button onClick={() => navigate("/")}
            className="px-7 py-3 rounded-full text-[15px] font-semibold text-white cursor-pointer border-0 transition-all duration-200 hover:opacity-90 hover:scale-105"
            style={{ background: "linear-gradient(135deg,#f97316,#fb923c)", boxShadow: "0 4px 20px rgba(249,115,22,0.4)" }}>
            Go Home Now
          </button>
          <button onClick={() => navigate(-1)}
            className="px-7 py-3 rounded-full text-[15px] font-semibold text-white cursor-pointer transition-all duration-200 hover:scale-105"
            style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)" }}>
            Go Back
          </button>
        </div>

        {/* Quick links */}
        <div className="anim flex gap-2 justify-center flex-wrap">
          {[{ label: "About", path: "/about" }, { label: "Services", path: "/services" }, { label: "Team", path: "/team" }, { label: "Contact", path: "/contact" }].map(({ label, path }) => (
            <button key={path} onClick={() => navigate(path)}
              className="px-3.5 py-1.5 rounded-md text-[13px] cursor-pointer border-0 transition-colors duration-200 hover:underline"
              style={{ background: "transparent", color: "rgba(255,255,255,0.5)" }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%,100% { border-radius:60% 40% 30% 70%/60% 30% 70% 40%; }
          50%      { border-radius:30% 60% 70% 40%/50% 60% 30% 60%; }
        }
      `}</style>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)",
    fontFamily: "'Inter', sans-serif",
    position: "relative",
    overflow: "hidden",
    padding: "20px",
  },
  blob: {
    position: "absolute",
    borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
    animation: "blob 8s ease-in-out infinite",
    opacity: 0.15,
    filter: "blur(40px)",
  },
  blob1: {
    width: 400,
    height: 400,
    background: "linear-gradient(135deg, #f97316, #fb923c)",
    top: "-100px",
    right: "-100px",
    animationDelay: "0s",
  },
  blob2: {
    width: 350,
    height: 350,
    background: "linear-gradient(135deg, #f97316, #fbbf24)",
    bottom: "-80px",
    left: "-80px",
    animationDelay: "4s",
  },
  card: {
    position: "relative",
    zIndex: 10,
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 24,
    padding: "48px 40px",
    maxWidth: 520,
    width: "100%",
    textAlign: "center",
    animation: "fadeInUp 0.6s ease-out both",
    boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 32,
  },
  logo: {
    width: 36,
    height: 36,
    objectFit: "contain",
  },
  logoText: {
    fontSize: 22,
    fontWeight: 800,
    color: "#fff",
    letterSpacing: 2,
  },
  errorCode: {
    fontSize: 120,
    fontWeight: 900,
    lineHeight: 1,
    background: "linear-gradient(135deg, #f97316, #fbbf24)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: 8,
    animation: "pulse404 3s ease-in-out infinite",
  },
  title: {
    fontSize: 26,
    fontWeight: 700,
    color: "#fff",
    margin: "0 0 12px",
  },
  subtitle: {
    fontSize: 15,
    color: "rgba(255,255,255,0.6)",
    margin: "0 0 28px",
    lineHeight: 1.6,
  },
  code: {
    background: "rgba(249,115,22,0.2)",
    color: "#f97316",
    padding: "2px 8px",
    borderRadius: 6,
    fontSize: 13,
    fontFamily: "monospace",
  },
  progressWrapper: {
    height: 5,
    background: "rgba(255,255,255,0.1)",
    borderRadius: 100,
    overflow: "hidden",
    marginBottom: 10,
  },
  progressBar: {
    height: "100%",
    background: "linear-gradient(90deg, #f97316, #fbbf24)",
    borderRadius: 100,
    transition: "width 1s linear",
  },
  redirectMsg: {
    fontSize: 13,
    color: "rgba(255,255,255,0.5)",
    marginBottom: 28,
  },
  countdownNum: {
    color: "#f97316",
    fontWeight: 700,
    fontSize: 15,
  },
  btnRow: {
    display: "flex",
    gap: 12,
    justifyContent: "center",
    marginBottom: 28,
    flexWrap: "wrap" as const,
  },
  btnPrimary: {
    background: "linear-gradient(135deg, #f97316, #fb923c)",
    color: "#fff",
    border: "none",
    borderRadius: 50,
    padding: "12px 28px",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "'Inter', sans-serif",
    boxShadow: "0 4px 20px rgba(249,115,22,0.4)",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  btnSecondary: {
    background: "transparent",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: 50,
    padding: "12px 28px",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "'Inter', sans-serif",
    transition: "background 0.2s, border-color 0.2s",
  },
  linksRow: {
    display: "flex",
    gap: 8,
    justifyContent: "center",
    flexWrap: "wrap" as const,
  },
  link: {
    background: "transparent",
    color: "rgba(255,255,255,0.5)",
    border: "none",
    padding: "6px 14px",
    fontSize: 13,
    cursor: "pointer",
    fontFamily: "'Inter', sans-serif",
    borderRadius: 6,
    transition: "color 0.2s",
    textDecoration: "underline",
    textDecorationColor: "transparent",
  },
};

export default NotFound;

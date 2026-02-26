import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const REDIRECT_DELAY = 10; // seconds

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(REDIRECT_DELAY);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Countdown + auto-redirect
  useEffect(() => {
    if (countdown <= 0) {
      navigate("/");
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  const progress = ((REDIRECT_DELAY - countdown) / REDIRECT_DELAY) * 100;

  return (
    <div style={styles.page}>
      {/* Animated background blobs */}
      <div style={{ ...styles.blob, ...styles.blob1 }} />
      <div style={{ ...styles.blob, ...styles.blob2 }} />

      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.logoRow}>
          <img src="/logo1.png" alt="INVIQ Logo" style={styles.logo} />
          <span style={styles.logoText}>INVIQ</span>
        </div>

        {/* 404 */}
        <div style={styles.errorCode}>404</div>

        <h1 style={styles.title}>Page Not Found</h1>
        <p style={styles.subtitle}>
          The page{" "}
          <code style={styles.code}>{location.pathname}</code>{" "}
          doesn't exist or has been moved.
        </p>

        {/* Progress bar */}
        <div style={styles.progressWrapper}>
          <div style={{ ...styles.progressBar, width: `${progress}%` }} />
        </div>
        <p style={styles.redirectMsg}>
          Redirecting to home in{" "}
          <span style={styles.countdownNum}>{countdown}</span>s…
        </p>

        {/* Buttons */}
        <div style={styles.btnRow}>
          <button style={styles.btnPrimary} onClick={() => navigate("/")}>
            Go Home Now
          </button>
          <button style={styles.btnSecondary} onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>

        {/* Quick links */}
        <div style={styles.linksRow}>
          {[
            { label: "About", path: "/about" },
            { label: "Services", path: "/services" },
            { label: "Team", path: "/team" },
            { label: "Contact", path: "/contact" },
          ].map((link) => (
            <button
              key={link.path}
              style={styles.link}
              onClick={() => navigate(link.path)}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        @keyframes blob {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse404 {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
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

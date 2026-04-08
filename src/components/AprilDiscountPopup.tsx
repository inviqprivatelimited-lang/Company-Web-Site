import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Sparkles, Gift, ArrowRight, Zap, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "inviq_april_popup_dismissed_2026";

const AprilDiscountPopup = () => {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    // Only show during April 2026
    const now = new Date();
    const isApril2026 = now.getFullYear() === 2026 && now.getMonth() === 3; // 0-indexed
    if (!isApril2026) return;

    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (dismissed) return;

    // Delay slightly for better UX
    const timer = setTimeout(() => setVisible(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setClosing(true);
    setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem(STORAGE_KEY, "1");
    }, 400);
  };

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
        style={{
          animation: closing
            ? "fadeOut 0.4s ease forwards"
            : "fadeIn 0.35s ease forwards",
        }}
        onClick={dismiss}
        aria-hidden
      />

      {/* Popup */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="April Special Discount Offer"
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
      >
        <div
          className="pointer-events-auto relative w-full max-w-lg"
          style={{
            animation: closing
              ? "popupOut 0.4s cubic-bezier(0.32,0,0.67,0) forwards"
              : "popupIn 0.55s cubic-bezier(0.34,1.56,0.64,1) forwards",
          }}
        >
          {/* Outer glow rings */}
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/30 via-orange-400/20 to-violet-500/20 blur-2xl animate-pulse-glow pointer-events-none" />
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-primary/20 to-orange-400/10 blur-xl pointer-events-none" />

          {/* Card */}
          <div className="relative glass rounded-3xl border border-primary/40 overflow-hidden shadow-2xl">

            {/* Decorative top gradient bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-primary via-orange-400 to-violet-500" />

            {/* Background pattern */}
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, hsl(var(--primary)) 0%, transparent 60%), radial-gradient(circle at 80% 80%, hsl(24 100% 50%) 0%, transparent 60%)",
              }}
            />

            <div className="relative p-8">
              {/* Close button */}
              <button
                onClick={dismiss}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary/80 flex items-center justify-center hover:bg-secondary transition-colors duration-200 text-muted-foreground hover:text-foreground"
                aria-label="Close"
              >
                <X size={15} />
              </button>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/15 border border-primary/30 text-sm font-semibold text-primary mb-5">
                <Gift size={13} />
                <span>April 2026 Special Offer</span>
              </div>

              {/* Headline */}
              <div className="mb-2 flex items-start gap-3">
                <span className="text-4xl leading-none mt-1">🎉</span>
                <div>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold leading-tight">
                    Get{" "}
                    <span className="gradient-text">20% OFF</span>{" "}
                    Your Next Project
                  </h2>
                  <p className="text-primary font-semibold text-sm mt-1">
                    April Flash Discount — Limited Time Only
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 mt-4">
                Celebrate with us! This April, every new software project — web apps, mobile apps,
                AI automation, SaaS, and more — comes with an exclusive{" "}
                <strong className="text-foreground">20% discount</strong> on your total project cost.
                Don't miss this limited-time deal.
              </p>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  { icon: Zap, label: "Web & Mobile Apps" },
                  { icon: Sparkles, label: "AI Automation" },
                  { icon: Timer, label: "Offer ends Apr 30" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-border/50 text-xs font-medium text-muted-foreground"
                  >
                    <item.icon size={11} className="text-primary" />
                    {item.label}
                  </div>
                ))}
              </div>

              {/* Countdown visual */}
              <div className="glass rounded-2xl px-5 py-4 border border-primary/20 mb-6 flex items-center gap-4">
                <div className="text-3xl font-heading font-black text-primary tabular-nums">20%</div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Off every new order</div>
                  <div className="text-xs text-muted-foreground">Valid: April 1 – April 30, 2026</div>
                </div>
                <div className="ml-auto">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Gift size={20} className="text-primary" />
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex gap-3">
                <Button variant="hero" className="flex-1" asChild onClick={dismiss}>
                  <Link to="/contact">
                    Claim My Discount <ArrowRight size={16} />
                  </Link>
                </Button>
                <Button variant="glass" onClick={dismiss}>
                  Maybe Later
                </Button>
              </div>

              {/* Fine print */}
              <p className="text-xs text-muted-foreground/60 text-center mt-4">
                Mention this offer when you contact us. Limited spots available.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes popupIn {
          from { opacity: 0; transform: scale(0.75) translateY(40px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes popupOut {
          from { opacity: 1; transform: scale(1) translateY(0); }
          to { opacity: 0; transform: scale(0.85) translateY(20px); }
        }
      `}</style>
    </>
  );
};

export default AprilDiscountPopup;

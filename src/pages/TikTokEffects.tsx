import { useRef } from "react";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Play, Sparkles, Gamepad2, Star,
    TrendingUp, Users, Zap, ArrowRight, ChevronDown,
} from "lucide-react";
import { useGSAP } from "@/hooks/useGSAP";

/* ─── Data ───────────────────────────────────────────────────────────────── */
const features = [
    {
        icon: Gamepad2,
        title: "Gaming Style Face Filters",
        description:
            "Level up your TikTok content with immersive gaming-themed AR overlays, HUD elements, and character transformations that resonate with gaming audiences.",
        color: "from-purple-500/20 to-indigo-500/10",
        number: "01",
    },
    {
        icon: Sparkles,
        title: "Interactive Influencer Effects",
        description:
            "Stand out with effects that react to your face, voice, and movements — designed to be shared, duetted, and go viral organically.",
        color: "from-orange-500/20 to-primary/10",
        number: "02",
    },
    {
        icon: Star,
        title: "Brand Promotion AR Filters",
        description:
            "Turn your brand identity into an interactive TikTok experience. Let your audience become your ambassadors through creative AR branding.",
        color: "from-yellow-500/20 to-amber-500/10",
        number: "03",
    },
    {
        icon: Zap,
        title: "Fully Custom TikTok Effects",
        description:
            "Got a unique idea? We bring it to life. From concept to published effect, we handle the entire creative and technical pipeline.",
        color: "from-cyan-500/20 to-blue-500/10",
        number: "04",
    },
];

const stats = [
    { value: "10x", label: "Higher Engagement", icon: TrendingUp },
    { value: "3x", label: "More Shares", icon: Users },
    { value: "AR", label: "Powered Experience", icon: Sparkles },
];

const audience = [
    "TikTok Influencers & Content Creators",
    "Gaming Streamers & Communities",
    "Brands seeking viral organic reach",
    "Anyone with a creative effect idea",
];

const DRIVE_FILE_ID = "1x3nJnDOeig7SL_SuQxFAe6pDfZkKHAyq";
const DRIVE_EMBED_URL = `https://drive.google.com/file/d/${DRIVE_FILE_ID}/preview`;

/* ─── Section: Hero ─────────────────────────────────────────────────────── */
const ShowcaseHero = () => {
    const ref = useGSAP((el) => {
        const badge = el.querySelector(".sc-badge");
        const h1 = el.querySelector("h1");
        const sub = el.querySelector(".sc-sub");
        const statEls = el.querySelectorAll(".sc-stat");
        const btns = el.querySelectorAll(".sc-btn");
        const imgWrap = el.querySelector(".sc-img-wrap");
        const img = el.querySelector(".sc-img");
        const glowRing = el.querySelector(".sc-glow");
        const orbs = el.querySelectorAll(".sc-orb");

        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        // Orbs scale in
        tl.from(orbs, { scale: 0, opacity: 0, duration: 1.4, stagger: 0.25, ease: "power2.out" })
            // Badge drops
            .from(badge, { y: -30, opacity: 0, duration: 0.6 }, "-=0.9")
            // H1 chars slide up
            .from(h1, { y: 80, opacity: 0, duration: 0.85 }, "-=0.5")
            // Sub wipes
            .fromTo(sub,
                { clipPath: "inset(0 100% 0 0)", opacity: 1 },
                { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "expo.inOut" }, "-=0.5"
            )
            // Stats stagger pop
            .from(statEls, { y: 40, opacity: 0, scale: 0.85, duration: 0.55, stagger: 0.12, ease: "back.out(2)" }, "-=0.5")
            // Buttons pop
            .from(btns, { scale: 0.75, opacity: 0, duration: 0.5, stagger: 0.14, ease: "back.out(2.5)" }, "-=0.3")
            // Image: glow ring scales in, then image wipes left→right
            .from(glowRing, { scale: 0, opacity: 0, duration: 1.0, ease: "power2.out" }, "-=0.9")
            .fromTo(imgWrap,
                { clipPath: "inset(0 100% 0 0)", opacity: 1 },
                { clipPath: "inset(0 0% 0 0)", duration: 1.0, ease: "expo.inOut" }, "-=0.7"
            )
            .from(img, { scale: 1.18, duration: 1.4, ease: "power2.out" }, "-=1.0");

        // Mouse parallax on orbs
        const handleMouse = (e: MouseEvent) => {
            const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
            orbs.forEach((orb, i) => {
                const d = i === 0 ? 0.022 : -0.015;
                gsap.to(orb, { x: (e.clientX - cx) * d, y: (e.clientY - cy) * d, duration: 1.3, ease: "power1.out" });
            });
            // Subtle parallax on poster
            if (imgWrap) {
                gsap.to(imgWrap, {
                    x: (e.clientX - cx) * -0.012,
                    y: (e.clientY - cy) * -0.012,
                    duration: 1.2, ease: "power1.out",
                });
            }
        };
        window.addEventListener("mousemove", handleMouse);
        return () => window.removeEventListener("mousemove", handleMouse);
    });

    return (
        <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden grain">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
            <div className="absolute inset-0 opacity-30"
                style={{ backgroundImage: "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(24 100% 50% / 0.3), transparent)" }} />

            {/* Ghost text */}
            <div aria-hidden className="absolute inset-0 flex items-center justify-center text-[12vw] font-heading font-black text-border/10 select-none pointer-events-none leading-none overflow-hidden whitespace-nowrap">
                TIKTOK AR EFFECT
            </div>

            {/* Orbs */}
            <div className="sc-orb absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="sc-orb absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-orange-500/6 blur-3xl" />

            <div className="container mx-auto px-4 lg:px-8 relative z-10 py-28">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* ── Left: Text ── */}
                    <div className="space-y-8">
                        <div className="sc-badge inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 text-sm font-medium text-primary">
                            <Sparkles size={14} />
                            <span>Powered by TikTok Effect House</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
                            Custom{" "}
                            <span className="gradient-text">TikTok AR Effects</span>{" "}
                            That Make You Unforgettable
                        </h1>

                        <p className="sc-sub text-lg text-muted-foreground leading-relaxed max-w-xl">
                            Most TikTok content looks the same. We change that. INVIQ designs
                            custom AR effects and face filters that spark interaction, drive shares,
                            and help creators and brands grow their audience faster.
                        </p>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-4">
                            {stats.map((stat) => (
                                <div key={stat.label} className="sc-stat flex items-center gap-3 glass rounded-xl px-4 py-3 hover:border-primary/40 transition-colors duration-300">
                                    <stat.icon size={20} className="text-primary" />
                                    <div>
                                        <div className="text-xl font-heading font-bold text-primary">{stat.value}</div>
                                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-4">
                            <Button className="sc-btn" variant="hero" size="xl" asChild>
                                <Link to="/contact">
                                    Get Your Custom Effect <ArrowRight size={20} />
                                </Link>
                            </Button>
                            <Button
                                className="sc-btn"
                                variant="glass"
                                size="xl"
                                onClick={() => document.getElementById("demo-section")?.scrollIntoView({ behavior: "smooth" })}
                            >
                                Watch Demo <ChevronDown size={20} />
                            </Button>
                        </div>
                    </div>

                    {/* ── Right: Poster ── */}
                    <div className="relative flex justify-center">
                        <div className="relative w-full max-w-md">
                            {/* Glow ring */}
                            <div className="sc-glow absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/30 via-orange-400/20 to-transparent blur-2xl" />
                            {/* Pulse animation on glow */}
                            <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-3xl animate-pulse-glow" />
                            <div className="sc-img-wrap relative glass rounded-3xl overflow-hidden border border-primary/30 shadow-2xl">
                                <img
                                    src="/effect house post.png"
                                    alt="INVIQ Effect House – TikTok AR Effect Demo Poster"
                                    className="sc-img w-full h-auto object-cover"
                                    width={540}
                                    height={540}
                                    fetchPriority="high"
                                    decoding="async"
                                />
                                {/* Floating live badge */}
                                <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/10">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                    <span className="text-white text-xs font-semibold">LIVE DEMO</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

/* ─── Section: Demo Video ────────────────────────────────────────────────── */
const DemoVideo = () => {
    const headerRef = useGSAP((el) => {
        gsap.from(el.children, {
            scrollTrigger: { trigger: el, start: "top 82%", once: true },
            y: 44, opacity: 0, duration: 0.75, stagger: 0.18, ease: "power3.out",
        });
    });

    const playerRef = useGSAP((el) => {
        const wrap = el.querySelector(".player-wrap");
        const cap = el.querySelector(".player-cap");

        gsap.from(wrap, {
            scrollTrigger: { trigger: el, start: "top 78%", once: true },
            scale: 0.9, opacity: 0, y: 60, duration: 0.9, ease: "power4.out",
        });
        gsap.from(cap, {
            scrollTrigger: { trigger: el, start: "top 70%", once: true },
            y: 20, opacity: 0, duration: 0.6, ease: "power3.out", delay: 0.3,
        });

        // Hover: subtle lift
        wrap?.addEventListener("mouseenter", () => gsap.to(wrap, { y: -6, duration: 0.35, ease: "power2.out" }));
        wrap?.addEventListener("mouseleave", () => gsap.to(wrap, { y: 0, duration: 0.45, ease: "power2.inOut" }));

        // Glow pulse
        const glow = el.querySelector(".player-glow");
        if (glow) gsap.to(glow, { opacity: 0.6, scale: 1.05, duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
    });

    return (
        <section id="demo-section" className="py-28 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                {/* Header */}
                <div ref={headerRef} className="max-w-3xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 text-sm font-medium text-primary mb-6">
                        <Play size={14} className="fill-current" />
                        <span>Live Demonstration</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
                        See the Effect{" "}
                        <span className="gradient-text">In Action</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Watch our custom TikTok AR effect demo — built entirely by the INVIQ team.
                        This is the quality and creativity we bring to every project.
                    </p>
                </div>

                {/* Player */}
                <div ref={playerRef} className="max-w-4xl mx-auto relative">
                    {/* Outer animated glow */}
                    <div className="player-glow absolute -inset-6 rounded-3xl bg-gradient-to-r from-primary/20 via-orange-500/15 to-primary/20 blur-2xl opacity-0 pointer-events-none" />

                    <div className="player-wrap relative rounded-3xl overflow-hidden glass border border-primary/30 shadow-2xl">
                        {/* Corner accent lines */}
                        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/60 rounded-tl-3xl pointer-events-none z-10" />
                        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-primary/60 rounded-tr-3xl pointer-events-none z-10" />
                        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-primary/60 rounded-bl-3xl pointer-events-none z-10" />
                        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/60 rounded-br-3xl pointer-events-none z-10" />

                        <div className="aspect-video w-full relative">
                            <iframe
                                src={DRIVE_EMBED_URL}
                                title="INVIQ Effect House – TikTok AR Effect Demo"
                                className="w-full h-full border-0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            />
                            {/* Block Google Drive top-right icon */}
                            <div
                                aria-hidden
                                style={{ position: "absolute", top: 0, right: 0, width: 52, height: 44, background: "#1f1f1f", zIndex: 10 }}
                            />
                        </div>
                    </div>

                    <p className="player-cap text-center text-muted-foreground text-sm mt-5 flex items-center justify-center gap-2">
                        <Sparkles size={14} className="text-primary" />
                        Custom TikTok AR effect built with Effect House by INVIQ Systems
                    </p>
                </div>
            </div>
        </section>
    );
};

/* ─── Section: Why AR Effects ────────────────────────────────────────────── */
const WhyAR = () => {
    const headerRef = useGSAP((el) => {
        gsap.from(el.children, {
            scrollTrigger: { trigger: el, start: "top 82%", once: true },
            y: 44, opacity: 0, duration: 0.75, stagger: 0.18, ease: "power3.out",
        });
    });

    const gridRef = useGSAP((el) => {
        const cards = el.querySelectorAll(".feat-card");

        gsap.from(cards, {
            scrollTrigger: { trigger: el, start: "top 76%", once: true },
            y: 80, opacity: 0, scale: 0.92,
            duration: 0.8, stagger: { amount: 0.5, from: "start" }, ease: "power4.out",
        });

        cards.forEach((card) => {
            const icon = card.querySelector(".feat-icon");
            const num = card.querySelector(".feat-num");
            const bar = card.querySelector(".feat-bar");

            ScrollTrigger.create({
                trigger: card, start: "top 80%", once: true,
                onEnter: () => {
                    gsap.from(icon, { scale: 0, rotation: -30, duration: 0.55, ease: "elastic.out(1.5,0.5)", delay: 0.3 });
                    gsap.from(num, { scale: 0.4, opacity: 0, duration: 0.4, ease: "back.out(3)", delay: 0.15 });
                },
            });

            // 3-D tilt
            card.addEventListener("mousemove", (ev) => {
                const e = ev as MouseEvent;
                const r = (card as HTMLElement).getBoundingClientRect();
                const rx = ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -7;
                const ry = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 7;
                gsap.to(card, { rotationX: rx, rotationY: ry, duration: 0.4, ease: "power2.out", transformPerspective: 900 });
            });
            card.addEventListener("mouseleave", () => {
                gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.5, ease: "power3.out" });
            });
            card.addEventListener("mouseenter", () => {
                if (bar) gsap.to(bar, { scaleX: 1, duration: 0.6, ease: "power3.out" });
                gsap.to(card, { y: -6, duration: 0.3, ease: "power2.out" });
            });
            card.addEventListener("mouseleave", () => {
                if (bar) gsap.to(bar, { scaleX: 0, duration: 0.4, ease: "power2.inOut" });
                gsap.to(card, { y: 0, duration: 0.4, ease: "power2.inOut" });
            });
        });
    });

    return (
        <section className="py-28 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div aria-hidden className="absolute inset-0 flex items-center justify-center text-[14vw] font-heading font-black text-border/10 select-none pointer-events-none leading-none overflow-hidden">WHY AR</div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                <div ref={headerRef} className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                        Why TikTok AR Effects{" "}
                        <span className="gradient-text">Matter Now</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Many creators and brands are trying to grow on TikTok, but most content
                        looks the same. Interactive AR effects are one of the most effective ways
                        to stand out — when people use a filter in their videos, it naturally
                        encourages others to try it, share it, and engage with your content.
                    </p>
                </div>

                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ perspective: "1200px" }}>
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="feat-card relative glass rounded-2xl p-8 cursor-default border border-transparent hover:border-primary/40 transition-colors duration-300 overflow-hidden"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            {/* Ghost number */}
                            <span
                                aria-hidden
                                className="feat-num absolute top-4 right-5 text-5xl font-heading font-black text-border/30 select-none leading-none"
                            >
                                {feature.number}
                            </span>

                            {/* Gradient bg tint */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-50 pointer-events-none rounded-2xl`} />

                            <div className="relative z-10">
                                <div className="feat-icon w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                    <feature.icon className="text-primary" size={28} />
                                </div>
                                <h3 className="text-xl font-heading font-semibold mb-3">{feature.title}</h3>
                                <p className="text-muted-foreground leading-relaxed text-sm">{feature.description}</p>
                            </div>

                            {/* Animated bottom bar */}
                            <div
                                className="feat-bar absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-primary to-accent rounded-full origin-left"
                                style={{ transform: "scaleX(0)" }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ─── Section: Who It's For ──────────────────────────────────────────────── */
const WhoItsFor = () => {
    const ref = useGSAP((el) => {
        const card = el.querySelector(".who-card");
        const leftSide = el.querySelector(".who-left");
        const rightSide = el.querySelector(".who-right");
        const items = el.querySelectorAll(".who-item");
        const imgWrap = el.querySelector(".who-img");
        const badge = el.querySelector(".who-badge");

        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 76%", once: true } });

        tl.from(card, { y: 60, opacity: 0, scale: 0.95, duration: 0.85, ease: "power4.out" })
            .from(badge, { scale: 0, duration: 0.5, ease: "back.out(2.5)" }, "-=0.5")
            .fromTo(leftSide,
                { x: -60, opacity: 0, clipPath: "inset(0 0 0 100%)" },
                { x: 0, opacity: 1, clipPath: "inset(0 0% 0 0%)", duration: 0.9, ease: "expo.inOut" }, "-=0.4"
            )
            .from(items, { x: -30, opacity: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" }, "-=0.5")
            .fromTo(imgWrap,
                { clipPath: "inset(0 100% 0 0)", opacity: 1 },
                { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "expo.inOut" }, "-=0.6"
            );

        // 3D tilt on image
        if (imgWrap) {
            const el2 = imgWrap as HTMLElement;
            el2.addEventListener("mousemove", (e) => {
                const r = el2.getBoundingClientRect();
                gsap.to(el2, {
                    rotationY: ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 8,
                    rotationX: ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -8,
                    duration: 0.4, ease: "power2.out", transformPerspective: 900,
                });
            });
            el2.addEventListener("mouseleave", () =>
                gsap.to(el2, { rotationX: 0, rotationY: 0, duration: 0.6, ease: "power3.out" })
            );
        }
    });

    return (
        <section className="py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
            <div className="container mx-auto px-4 lg:px-8 relative z-10">

                <div ref={ref} className="who-card glass rounded-3xl p-10 md:p-16 border border-primary/20 overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Left */}
                        <div className="who-left">
                            <div className="who-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-6">
                                <Users size={14} /><span>Built For</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                                Designed for{" "}
                                <span className="gradient-text">Creators & Brands</span>{" "}
                                Who Want to Stand Out
                            </h2>
                            <p className="text-muted-foreground mb-8 leading-relaxed">
                                At INVIQ Systems, we design custom TikTok effects for influencers,
                                gaming creators, and brands who want something unique for their content.
                                Our effects help creators make their videos more engaging while giving
                                brands a creative way to reach new audiences.
                            </p>
                            <ul className="space-y-3">
                                {audience.map((item) => (
                                    <li key={item} className="who-item flex items-center gap-3 text-sm">
                                        <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                                            <div className="w-2 h-2 rounded-full bg-primary" />
                                        </div>
                                        <span className="text-muted-foreground">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right — Poster */}
                        <div className="who-right relative">
                            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-primary/20 to-orange-400/10 blur-xl animate-pulse-glow pointer-events-none" />
                            <div
                                className="who-img relative glass rounded-2xl overflow-hidden border border-primary/20 cursor-default"
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                <img
                                    src="/effect house post.png"
                                    alt="TikTok AR Effect by INVIQ"
                                    className="w-full h-auto object-cover"
                                    loading="lazy"
                                    width={540}
                                    height={540}
                                />
                                {/* Shine overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

/* ─── Section: CTA ───────────────────────────────────────────────────────── */
const ShowcaseCTA = () => {
    const ref = useGSAP((el) => {
        const blob1 = el.querySelector(".cta-blob1");
        const blob2 = el.querySelector(".cta-blob2");
        const badge = el.querySelector(".cta-badge");
        const h2 = el.querySelector("h2");
        const p = el.querySelector("p");
        const btns = el.querySelectorAll(".cta-btn");

        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 76%", once: true } });
        tl.from([blob1, blob2], { scale: 0.3, opacity: 0, duration: 1.4, stagger: 0.2, ease: "power2.out" })
            .from(badge, { y: -24, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.9")
            .fromTo(h2,
                { clipPath: "inset(0 100% 0 0)", opacity: 1 },
                { clipPath: "inset(0 0% 0 0)", duration: 1.0, ease: "expo.inOut" }, "-=0.5"
            )
            .from(p, { y: 24, opacity: 0, duration: 0.65, ease: "power3.out" }, "-=0.4")
            .from(btns, { scale: 0.8, opacity: 0, duration: 0.5, stagger: 0.15, ease: "back.out(2)" }, "-=0.3");

        // Continuous blob yoyo
        if (blob1) gsap.to(blob1, { scale: 1.12, duration: 4.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
        if (blob2) gsap.to(blob2, { scale: 1.08, duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.5 });

        // Mouse parallax
        const handleMouse = (e: MouseEvent) => {
            const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
            if (blob1) gsap.to(blob1, { x: (e.clientX - cx) * 0.03, y: (e.clientY - cy) * 0.03, duration: 1.6, ease: "power1.out" });
            if (blob2) gsap.to(blob2, { x: (e.clientX - cx) * -0.02, y: (e.clientY - cy) * -0.02, duration: 1.6, ease: "power1.out" });
        };
        window.addEventListener("mousemove", handleMouse);
        return () => window.removeEventListener("mousemove", handleMouse);
    });

    return (
        <section ref={ref} className="py-28 relative overflow-hidden grain">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-orange-500/5" />
            <div className="cta-blob1 absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/12 blur-3xl" />
            <div className="cta-blob2 absolute top-1/2 right-1/4 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-orange-500/8 blur-3xl" />

            {/* Ghost text */}
            <div aria-hidden className="absolute inset-0 flex items-center justify-center text-[15vw] font-heading font-black text-border/15 select-none pointer-events-none leading-none overflow-hidden">
                VIRAL
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="cta-badge inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 text-sm font-medium text-primary mb-8">
                        <Sparkles size={14} /><span>Ready to Go Viral?</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                        Create Your Own{" "}
                        <span className="gradient-text">TikTok Effect</span>
                    </h2>
                    <p className="text-muted-foreground text-lg mb-10 leading-relaxed max-w-xl mx-auto">
                        If you are interested in creating your own custom TikTok AR effect,
                        feel free to get in touch. We&apos;d love to hear your idea and bring it to life.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Button className="cta-btn" variant="hero" size="xl" asChild>
                            <Link to="/contact">
                                Start Your Effect Project <ArrowRight size={20} />
                            </Link>
                        </Button>
                        <Button className="cta-btn" variant="glass" size="xl" asChild>
                            <Link to="/services">View All Services</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

/* ─── Page ───────────────────────────────────────────────────────────────── */
const TikTokEffects = () => (
    <Layout>
        <ShowcaseHero />
        <DemoVideo />
        <WhyAR />
        <WhoItsFor />
        <ShowcaseCTA />
    </Layout>
);

export default TikTokEffects;

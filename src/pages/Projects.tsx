import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    ExternalLink, Globe, ArrowRight, Sparkles,
    Monitor, Eye, Layers, Star, Zap, Code2,
} from "lucide-react";
import { useGSAP } from "@/hooks/useGSAP";

/* ─── Project Data ────────────────────────────────────────────────────────── */
const projects = [
    {
        id: "visioncraft",
        name: "VisionCraft",
        tagline: "AI-Powered Visual Creation Platform",
        description:
            "VisionCraft is a cutting-edge AI-powered platform that empowers creators and businesses to generate stunning visuals, design assets, and creative content at scale. Built with modern web technologies, it delivers an intuitive experience for both beginners and professionals.",
        url: "https://visioncraftsampleproject.replit.app/",
        gradient: "from-violet-500/20 via-purple-500/10 to-indigo-500/20",
        accentColor: "text-violet-400",
        borderColor: "border-violet-500/30",
        badgeColor: "bg-violet-500/10 border-violet-500/20 text-violet-400",
        glowColor: "bg-violet-500/10",
        tags: ["AI", "Web App", "Creative Tools", "SaaS"],
        features: [
            { icon: Eye, label: "AI Visual Generation" },
            { icon: Layers, label: "Multi-format Export" },
            { icon: Zap, label: "Real-time Preview" },
        ],
        icon: "🎨",
        category: "AI / Creative Platform",
    },
    {
        id: "buildcraft",
        name: "BuildCraft",
        tagline: "Smart Construction Management System",
        description:
            "BuildCraft is a comprehensive construction project management platform designed to streamline workflows, track project timelines, manage teams, and optimize resource allocation. It brings transparency and efficiency to complex construction projects from planning to delivery.",
        url: "https://buildcraftsampleproject.replit.app/",
        gradient: "from-orange-500/20 via-amber-500/10 to-yellow-500/20",
        accentColor: "text-orange-400",
        borderColor: "border-orange-500/30",
        badgeColor: "bg-orange-500/10 border-orange-500/20 text-orange-400",
        glowColor: "bg-orange-500/10",
        tags: ["Project Management", "Web App", "Dashboard", "Enterprise"],
        features: [
            { icon: Monitor, label: "Live Project Dashboard" },
            { icon: Star, label: "Team Collaboration" },
            { icon: Code2, label: "Smart Automation" },
        ],
        icon: "🏗️",
        category: "Enterprise / Management",
    },
    {
        id: "sweetbliss",
        name: "SweetBliss Cakes",
        tagline: "Artisan Bakery & Custom Cake Ordering Platform",
        description:
            "SweetBliss is a beautifully crafted bakery e-commerce experience that lets customers browse handcrafted cakes, place custom orders, and schedule pickups or deliveries. Built with a warm, inviting aesthetic that mirrors the brand's artisanal quality and sweet personality.",
        url: "https://sweetblisscakesampleproject.replit.app/",
        gradient: "from-pink-500/20 via-rose-500/10 to-fuchsia-500/20",
        accentColor: "text-pink-400",
        borderColor: "border-pink-500/30",
        badgeColor: "bg-pink-500/10 border-pink-500/20 text-pink-400",
        glowColor: "bg-pink-500/10",
        tags: ["E-Commerce", "Web App", "Food & Beverage", "Retail"],
        features: [
            { icon: Star, label: "Custom Cake Builder" },
            { icon: Monitor, label: "Online Ordering" },
            { icon: Zap, label: "Pickup & Delivery" },
        ],
        icon: "🎂",
        category: "E-Commerce / F&B",
    },
    {
        id: "velvettouch",
        name: "Velvet Touch Saloon",
        tagline: "Premium Beauty Salon Booking & Services Platform",
        description:
            "Velvet Touch is a sleek, full-featured beauty salon web platform enabling clients to explore services, browse stylists, and book appointments online. It combines an elegant visual identity with a seamless user journey — from discovery to confirmed booking.",
        url: "https://velvettouchsaloonsampleproject.replit.app/",
        gradient: "from-emerald-500/20 via-teal-500/10 to-cyan-500/20",
        accentColor: "text-emerald-400",
        borderColor: "border-emerald-500/30",
        badgeColor: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
        glowColor: "bg-emerald-500/10",
        tags: ["Booking System", "Web App", "Beauty & Wellness", "Service"],
        features: [
            { icon: Eye, label: "Stylist Profiles" },
            { icon: Layers, label: "Service Catalog" },
            { icon: Code2, label: "Online Appointment Booking" },
        ],
        icon: "💅",
        category: "Beauty & Wellness",
    },
];

/* ─── Section: Hero ─────────────────────────────────────────────────────── */
const ProjectsHero = () => {
    const ref = useGSAP((el) => {
        const badge = el.querySelector(".ph-badge");
        const h1 = el.querySelector("h1");
        const sub = el.querySelector(".ph-sub");
        const orbs = el.querySelectorAll(".ph-orb");

        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.from(orbs, { scale: 0, opacity: 0, duration: 1.2, stagger: 0.2, ease: "power2.out" })
            .from(badge, { y: -24, opacity: 0, duration: 0.6 }, "-=0.8")
            .from(h1, { y: 60, opacity: 0, duration: 0.85 }, "-=0.5")
            .fromTo(
                sub,
                { clipPath: "inset(0 100% 0 0)", opacity: 1 },
                { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "expo.inOut" },
                "-=0.4"
            );

        // Mouse parallax
        const handleMouse = (e: MouseEvent) => {
            const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
            orbs.forEach((orb, i) => {
                const d = i === 0 ? 0.025 : -0.015;
                gsap.to(orb, { x: (e.clientX - cx) * d, y: (e.clientY - cy) * d, duration: 1.2, ease: "power1.out" });
            });
        };
        window.addEventListener("mousemove", handleMouse);
        return () => window.removeEventListener("mousemove", handleMouse);
    });

    return (
        <section ref={ref} className="relative pt-32 pb-20 overflow-hidden grain">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
            <div
                className="absolute inset-0 opacity-25"
                style={{ backgroundImage: "radial-gradient(ellipse 70% 40% at 50% -10%, hsl(271 91% 65% / 0.3), transparent)" }}
            />

            {/* Ghost text */}
            <div aria-hidden className="absolute inset-0 flex items-center justify-center text-[12vw] font-heading font-black text-border/5 select-none pointer-events-none leading-none overflow-hidden whitespace-nowrap z-0">
                OUR WORK
            </div>

            {/* Orbs */}
            <div className="ph-orb absolute top-1/4 left-1/3 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
            <div className="ph-orb absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-violet-500/8 blur-3xl" />

            <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
                <div className="ph-badge inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 text-sm font-medium text-primary mb-6">
                    <Sparkles size={14} />
                    <span>Client Sample Projects</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6">
                    Real Projects,{" "}
                    <span className="gradient-text">Real Results</span>
                </h1>
                <p className="ph-sub text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                    Explore live sample projects we've built for our clients. These showcase our
                    technical depth, design quality, and ability to deliver production-ready software
                    across different industries.
                </p>
            </div>
        </section>
    );
};

/* ─── Section: Project Cards ─────────────────────────────────────────────── */
const ProjectCards = () => {
    const ref = useGSAP((el) => {
        const cards = el.querySelectorAll(".proj-card");

        cards.forEach((card) => {
            // Fade-up each card when it scrolls into view
            gsap.from(card, {
                scrollTrigger: { trigger: card, start: "top 82%", once: true },
                y: 60, opacity: 0, duration: 0.85, ease: "power3.out",
            });

            // Animate content children
            const content = card.querySelector(".proj-content");
            if (content) {
                gsap.from(Array.from(content.children), {
                    scrollTrigger: { trigger: card, start: "top 75%", once: true },
                    y: 24, opacity: 0, duration: 0.5, stagger: 0.1, ease: "power3.out", delay: 0.2,
                });
            }

            // Subtle hover lift — no 3D (avoids overflow-hidden conflict)
            card.addEventListener("mouseenter", () =>
                gsap.to(card, { y: -6, duration: 0.3, ease: "power2.out" })
            );
            card.addEventListener("mouseleave", () =>
                gsap.to(card, { y: 0, duration: 0.4, ease: "power2.inOut" })
            );
        });
    });

    return (
        <section className="py-20 relative">
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                <div ref={ref} className="space-y-16">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            className="proj-card glass rounded-3xl overflow-hidden border border-border/50 hover:border-primary/30 transition-colors duration-500"
                        >
                            <div className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? "lg:flex lg:flex-row-reverse" : ""}`}>

                                {/* ── Browser Preview ── */}
                                <div className="relative bg-secondary/20 p-6 flex flex-col gap-0">
                                    {/* Glow — stays inside overflow-hidden parent */}
                                    <div className={`absolute inset-0 ${project.glowColor} opacity-30 pointer-events-none blur-2xl`} />

                                    {/* Browser chrome wrapper */}
                                    <div className="relative rounded-2xl overflow-hidden border border-border/40 shadow-2xl">
                                        {/* URL bar */}
                                        <div className="bg-secondary/80 backdrop-blur-sm px-4 py-2.5 flex items-center gap-3 border-b border-border/40">
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                                            </div>
                                            <div className="flex-1 bg-background/50 rounded-md px-3 py-1 flex items-center gap-2 min-w-0">
                                                <Globe size={11} className="text-muted-foreground shrink-0" />
                                                <span className="text-xs text-muted-foreground truncate font-mono">
                                                    {project.url.replace("https://", "")}
                                                </span>
                                            </div>
                                            {/* Live badge inside the bar */}
                                            <div className="flex items-center gap-1 bg-green-500/15 border border-green-500/30 rounded-full px-2.5 py-0.5 shrink-0">
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                                <span className="text-green-400 text-[10px] font-semibold">LIVE</span>
                                            </div>
                                        </div>

                                        {/* Iframe preview — fixed height, clipped */}
                                        <div className="relative overflow-hidden bg-background" style={{ height: "340px" }}>
                                            <iframe
                                                src={project.url}
                                                title={`${project.name} – Live Preview`}
                                                className="border-0 absolute top-0 left-0"
                                                style={{
                                                    width: "160%",
                                                    height: "160%",
                                                    transform: "scale(0.625)",
                                                    transformOrigin: "top left",
                                                }}
                                                loading="lazy"
                                                sandbox="allow-scripts allow-same-origin allow-forms"
                                            />
                                            {/* Click-blocker overlay */}
                                            <div className="absolute inset-0" aria-hidden />
                                        </div>
                                    </div>
                                </div>

                                {/* ── Project Info ── */}
                                <div className="proj-content p-8 lg:p-12 flex flex-col justify-center gap-5">
                                    {/* Category badge */}
                                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium w-fit ${project.badgeColor}`}>
                                        <span>{project.icon}</span>
                                        <span>{project.category}</span>
                                    </div>

                                    <div>
                                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-1.5">
                                            {project.name}
                                        </h2>
                                        <p className={`text-sm font-medium ${project.accentColor}`}>
                                            {project.tagline}
                                        </p>
                                    </div>

                                    <p className="text-muted-foreground leading-relaxed text-sm">
                                        {project.description}
                                    </p>

                                    {/* Feature pills */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.features.map((f) => (
                                            <div key={f.label} className="flex items-center gap-2 glass rounded-xl px-3 py-2">
                                                <f.icon size={13} className="text-primary" />
                                                <span className="text-xs text-muted-foreground font-medium">{f.label}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Tech tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="proj-tag px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-muted-foreground"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* CTA */}
                                    <div className="flex flex-wrap gap-3 pt-1">
                                        <Button variant="hero" asChild>
                                            <a href={project.url} target="_blank" rel="noopener noreferrer">
                                                View Live Project <ExternalLink size={15} />
                                            </a>
                                        </Button>
                                        <Button variant="glass" asChild>
                                            <Link to="/contact">
                                                Build Similar <ArrowRight size={15} />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>

                            </div>

                            {/* Bottom accent bar */}
                            <div className={`h-1 bg-gradient-to-r ${project.gradient.replace("/20", "").replace("/10", "")}`} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ─── Section: CTA ───────────────────────────────────────────────────────── */
const ProjectsCTA = () => {
    const ref = useGSAP((el) => {
        const blob1 = el.querySelector(".pcta-blob1");
        const blob2 = el.querySelector(".pcta-blob2");
        const inner = el.querySelector(".pcta-inner");

        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 78%", once: true } });
        tl.from([blob1, blob2], { scale: 0.3, opacity: 0, duration: 1.2, stagger: 0.2, ease: "power2.out" })
            .from(inner?.children ?? [], { y: 40, opacity: 0, duration: 0.65, stagger: 0.15, ease: "power3.out" }, "-=0.8");

        if (blob1) gsap.to(blob1, { scale: 1.1, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" });
        if (blob2) gsap.to(blob2, { scale: 1.08, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.2 });
    });

    return (
        <section ref={ref} className="py-28 relative overflow-hidden grain">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-violet-500/5" />
            <div className="pcta-blob1 absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/12 blur-3xl" />
            <div className="pcta-blob2 absolute top-1/2 right-1/4 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-violet-500/8 blur-3xl" />

            <div aria-hidden className="absolute inset-0 flex items-center justify-center text-[15vw] font-heading font-black text-border/10 select-none pointer-events-none leading-none overflow-hidden">
                BUILD
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                <div className="pcta-inner max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 text-sm font-medium text-primary mb-8">
                        <Sparkles size={14} />
                        <span>Ready to build yours?</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                        Have a Project{" "}
                        <span className="gradient-text">In Mind?</span>
                    </h2>
                    <p className="text-muted-foreground text-lg mb-10 leading-relaxed max-w-xl mx-auto">
                        From concept to deployment, we build production-ready software tailored to
                        your business. Let's turn your idea into the next great product.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Button variant="hero" size="xl" asChild>
                            <Link to="/contact">
                                Start Your Project <ArrowRight size={20} />
                            </Link>
                        </Button>
                        <Button variant="glass" size="xl" asChild>
                            <Link to="/services">View Our Services</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

/* ─── Page ───────────────────────────────────────────────────────────────── */
const Projects = () => (
    <Layout>
        <ProjectsHero />
        <ProjectCards />
        <ProjectsCTA />
    </Layout>
);

export default Projects;

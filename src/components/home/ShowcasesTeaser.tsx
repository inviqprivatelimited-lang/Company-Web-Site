import { Link } from "react-router-dom";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@/hooks/useGSAP";

const ShowcasesTeaser = () => {
    // ── Badge + heading stagger ───────────────────────────────────────────────
    const headerRef = useGSAP((el) => {
        gsap.from(el.children, {
            scrollTrigger: { trigger: el, start: "top 82%", once: true },
            y: 44, opacity: 0, duration: 0.75, stagger: 0.18, ease: "power3.out",
        });
    });

    // ── Main showcase card ────────────────────────────────────────────────────
    const cardRef = useGSAP((el) => {
        const card = el.querySelector(".showcase-card");
        const imgSide = el.querySelector(".showcase-img");
        const textSide = el.querySelector(".showcase-text");
        const playBtn = el.querySelector(".showcase-play");
        const tags = el.querySelectorAll(".showcase-tag");
        const line = el.querySelector(".showcase-line");

        const tl = gsap.timeline({
            scrollTrigger: { trigger: el, start: "top 74%", once: true },
        });

        // Card border glow fade in
        tl.from(card, { y: 70, opacity: 0, duration: 0.85, ease: "power4.out" })
            // Image wipes in from left
            .fromTo(imgSide,
                { clipPath: "inset(0 100% 0 0)", opacity: 1 },
                { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "expo.inOut" },
                "-=0.55"
            )
            // Play button elastic pop
            .from(playBtn, { scale: 0, duration: 0.55, ease: "elastic.out(1.4, 0.5)" }, "-=0.2")
            // Text side slides in from right
            .from(textSide, { x: 60, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.45")
            // Tags stagger scale
            .from(tags, { scale: 0.65, opacity: 0, duration: 0.4, stagger: 0.07, ease: "back.out(2)" }, "-=0.3")
            // Bottom line draws
            .from(line, { scaleX: 0, duration: 0.5, ease: "power3.out", transformOrigin: "left center" }, "-=0.1");

        // Hover: card rise + play pulse
        card?.addEventListener("mouseenter", () => {
            gsap.to(card, { y: -6, duration: 0.35, ease: "power2.out" });
            gsap.to(playBtn, { scale: 1.15, duration: 0.3, ease: "back.out(2)" });
        });
        card?.addEventListener("mouseleave", () => {
            gsap.to(card, { y: 0, duration: 0.45, ease: "power2.inOut" });
            gsap.to(playBtn, { scale: 1, duration: 0.3, ease: "power2.inOut" });
        });
    });

    // ── CTA ───────────────────────────────────────────────────────────────────
    const ctaRef = useGSAP((el) => {
        gsap.from(el, {
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
            y: 24, opacity: 0, duration: 0.55, ease: "power2.out",
        });
    });

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

            <div className="container mx-auto px-4 lg:px-8 relative z-10">

                {/* Header */}
                <div ref={headerRef} className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 text-sm font-medium text-primary mb-6">
                        <Sparkles size={14} />
                        <span>Our Work in Action</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                        Creative <span className="gradient-text">Showcases</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        See what we've built — from custom TikTok AR effects to interactive
                        demos. Real work, real results.
                    </p>
                </div>

                {/* Card */}
                <div ref={cardRef} className="max-w-5xl mx-auto">
                    <Link
                        to="/showcases"
                        className="showcase-card group block glass rounded-3xl overflow-hidden border border-primary/20 hover:border-primary/50 transition-colors duration-500 shadow-lg hover:shadow-primary/10"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">

                            {/* Image side */}
                            <div className="showcase-img relative aspect-video md:aspect-auto overflow-hidden bg-black/30">
                                <img
                                    src="/effect house post.png"
                                    alt="INVIQ Showcases – TikTok AR Effect Demo"
                                    className="w-full h-full object-cover object-center opacity-80 group-hover:scale-110 transition-transform duration-700"
                                    loading="lazy"
                                    width={600}
                                    height={400}
                                />
                                {/* Radial gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/30" />
                                {/* Play button */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors duration-300">
                                    <div className="showcase-play w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-2xl glow">
                                        <Play size={26} className="text-white ml-1" />
                                    </div>
                                </div>
                                {/* Badge */}
                                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-xs font-medium text-white border border-white/10">
                                    <Sparkles size={11} className="text-primary" />
                                    TikTok AR Effect
                                </div>
                            </div>

                            {/* Text side */}
                            <div className="showcase-text p-8 md:p-10 flex flex-col justify-center">
                                <div className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-4">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                    Effect House Demo
                                </div>

                                <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4 leading-tight">
                                    Custom TikTok AR Effect — Built by INVIQ
                                </h3>

                                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                    We designed and published a fully custom interactive AR effect
                                    on TikTok Effect House. Gaming style filters, face tracking,
                                    and viral-ready interactions — all crafted for maximum engagement.
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {["AR / Face Filter", "TikTok Effect House", "Gaming Style", "Brand Promo"].map((tag) => (
                                        <span
                                            key={tag}
                                            className="showcase-tag px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-3 text-primary font-semibold group-hover:gap-5 transition-all duration-300">
                                    <span>View Showcases</span>
                                    <ArrowRight size={18} />
                                </div>

                                {/* Animated bottom line */}
                                <div className="showcase-line mt-6 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full" />
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Bottom CTA */}
                <div ref={ctaRef} className="text-center mt-10">
                    <Button variant="glass" size="lg" asChild>
                        <Link to="/showcases">
                            Explore All Showcases <ArrowRight size={18} />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default ShowcasesTeaser;

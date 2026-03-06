import { Link } from "react-router-dom";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const ShowcasesTeaser = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Subtle gradient bg */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                {/* Section header */}
                <div className="text-center mb-12">
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
                <div className="max-w-5xl mx-auto">
                    <Link
                        to="/showcases"
                        className="group block glass rounded-3xl overflow-hidden border border-primary/20 hover:border-primary/50 transition-all duration-500 hover:-translate-y-1 shadow-lg hover:shadow-primary/10"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                            {/* Thumbnail / preview */}
                            <div className="relative aspect-video md:aspect-auto overflow-hidden bg-black/30">
                                <img
                                    src="/effect house post.png"
                                    alt="INVIQ Showcases – TikTok AR Effect Demo"
                                    className="w-full h-full object-cover object-center opacity-80 group-hover:scale-105 transition-transform duration-700"
                                    loading="lazy"
                                    width={600}
                                    height={400}
                                />
                                {/* Play button overlay */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors duration-300">
                                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-2xl glow group-hover:scale-110 transition-transform duration-300">
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
                            <div className="p-8 md:p-10 flex flex-col justify-center">
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
                                    and viral-ready interactions — all crafted for maximum
                                    engagement.
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {["AR / Face Filter", "TikTok Effect House", "Gaming Style", "Brand Promo"].map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-3 text-primary font-semibold group-hover:gap-5 transition-all duration-300">
                                    <span>View Showcases</span>
                                    <ArrowRight size={18} />
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-10">
                    <Button variant="glass" size="lg" asChild>
                        <Link to="/showcases">
                            Explore All Showcases
                            <ArrowRight size={18} />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default ShowcasesTeaser;

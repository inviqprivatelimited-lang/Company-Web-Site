import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Play,
    Sparkles,
    Gamepad2,
    Star,
    TrendingUp,
    Users,
    Zap,
    ArrowRight,
    Mail,
    Phone,
    Globe,
    ChevronDown,
} from "lucide-react";

const features = [
    {
        icon: Gamepad2,
        title: "Gaming Style Face Filters",
        description:
            "Level up your TikTok content with immersive gaming-themed AR overlays, HUD elements, and character transformations that resonate with gaming audiences.",
    },
    {
        icon: Sparkles,
        title: "Interactive Influencer Effects",
        description:
            "Stand out with effects that react to your face, voice, and movements — designed to be shared, duetted, and go viral organically.",
    },
    {
        icon: Star,
        title: "Brand Promotion AR Filters",
        description:
            "Turn your brand identity into an interactive TikTok experience. Let your audience become your ambassadors through creative AR branding.",
    },
    {
        icon: Zap,
        title: "Fully Custom TikTok Effects",
        description:
            "Got a unique idea? We bring it to life. From concept to published effect, we handle the entire creative and technical pipeline.",
    },
];

const stats = [
    { value: "10x", label: "Higher Engagement", icon: TrendingUp },
    { value: "3x", label: "More Shares", icon: Users },
    { value: "AR", label: "Powered Experience", icon: Sparkles },
];

// 👇 Paste your Google Drive FILE ID here after uploading the video
// How to get it: Share the video → "Anyone with link" → copy the ID from the URL
// e.g. https://drive.google.com/file/d/THIS_PART_IS_THE_ID/view
const DRIVE_FILE_ID = "1x3nJnDOeig7SL_SuQxFAe6pDfZkKHAyq";
const DRIVE_EMBED_URL = `https://drive.google.com/file/d/${DRIVE_FILE_ID}/preview`;

const TikTokEffects = () => {
    return (
        <Layout>
            {/* ── Hero ── */}
            <section className="relative min-h-screen flex items-center overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage:
                            "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(24 100% 50% / 0.3), transparent)",
                    }}
                />
                {/* Floating orbs */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl animate-float" />
                <div
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-orange-500/5 blur-3xl animate-float"
                    style={{ animationDelay: "3s" }}
                />

                <div className="container mx-auto px-4 lg:px-8 relative z-10 py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left: Text */}
                        <div className="space-y-8 animate-slide-up">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 text-sm font-medium text-primary">
                                <Sparkles size={14} />
                                <span>Powered by TikTok Effect House</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
                                Custom{" "}
                                <span className="gradient-text">TikTok AR Effects</span>{" "}
                                That Make You Unforgettable
                            </h1>

                            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                                Most TikTok content looks the same. We change that. INVIQ
                                designs custom AR effects and face filters that spark
                                interaction, drive shares, and help creators and brands grow
                                their audience faster.
                            </p>

                            {/* Stats row */}
                            <div className="flex flex-wrap gap-6">
                                {stats.map((stat) => (
                                    <div key={stat.label} className="flex items-center gap-3 glass rounded-xl px-4 py-3">
                                        <stat.icon size={20} className="text-primary" />
                                        <div>
                                            <div className="text-xl font-heading font-bold text-primary">
                                                {stat.value}
                                            </div>
                                            <div className="text-xs text-muted-foreground">{stat.label}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* CTAs */}
                            <div className="flex flex-wrap gap-4">
                                <Button variant="hero" size="xl" asChild>
                                    <Link to="/contact">
                                        Get Your Custom Effect
                                        <ArrowRight size={20} />
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="xl"
                                    className="border-primary/40 hover:bg-primary/10"
                                    onClick={() =>
                                        document
                                            .getElementById("demo-section")
                                            ?.scrollIntoView({ behavior: "smooth" })
                                    }
                                >
                                    Watch Demo
                                    <ChevronDown size={20} />
                                </Button>
                            </div>
                        </div>

                        {/* Right: Poster image */}
                        <div className="relative flex justify-center animate-fade-in delay-300">
                            <div className="relative w-full max-w-md">
                                {/* Glow ring */}
                                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/30 via-orange-400/20 to-transparent blur-2xl animate-pulse-glow" />
                                <div className="relative glass rounded-3xl overflow-hidden border border-primary/30 shadow-2xl">
                                    <img
                                        src="/effect house post.png"
                                        alt="INVIQ Effect House – TikTok AR Effect Demo Poster"
                                        className="w-full h-auto object-cover"
                                        width={540}
                                        height={540}
                                    />
                                    {/* Floating badge overlay */}
                                    <div className="absolute bottom-4 left-4 right-4 glass rounded-xl px-4 py-3 flex items-center gap-3 border border-primary/20">
                                        <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                                            <Sparkles size={18} className="text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-foreground">Effect House Demo</p>
                                            <p className="text-xs text-muted-foreground">by INVIQ Systems</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Demo Video Section ── */}
            <section id="demo-section" className="py-24 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    {/* Section header */}
                    <div className="max-w-3xl mx-auto text-center mb-14 animate-slide-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 text-sm font-medium text-primary mb-6">
                            <Play size={14} />
                            <span>Live Demonstration</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
                            See the Effect{" "}
                            <span className="gradient-text">In Action</span>
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Watch our custom TikTok AR effect demo — built entirely by the
                            INVIQ team. This is the quality and creativity we bring to every
                            project.
                        </p>
                    </div>

                    {/* Video player — Google Drive iframe */}
                    <div className="max-w-4xl mx-auto">
                        <div className="relative rounded-3xl overflow-hidden glass border border-primary/30 shadow-2xl group">
                            {/* Hover glow */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-orange-500/10 to-primary/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                            {/* Google Drive iframe player */}
                            <div className="aspect-video w-full relative">
                                <iframe
                                    src={DRIVE_EMBED_URL}
                                    title="INVIQ Effect House – TikTok AR Effect Demo"
                                    className="w-full h-full border-0"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                />
                                {/* Block the Google Drive popout / open-in-Drive icon (top-right corner) */}
                                <div
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        right: 0,
                                        width: "52px",
                                        height: "44px",
                                        background: "#1f1f1f",
                                        zIndex: 10,
                                        pointerEvents: "all",
                                        cursor: "default",
                                    }}
                                    aria-hidden="true"
                                />
                            </div>
                        </div>

                        {/* Caption */}
                        <p className="text-center text-muted-foreground text-sm mt-4">
                            ↑ Custom TikTok AR effect built with Effect House by INVIQ Systems
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Why AR Effects ── */}
            <section className="py-24 relative">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                            Why TikTok AR Effects{" "}
                            <span className="gradient-text">Matter Now</span>
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Many creators and brands are trying to grow on TikTok, but most
                            content looks the same. Interactive AR effects are one of the most
                            effective ways to stand out — when people use a filter in their
                            videos, it naturally encourages others to try it, share it, and
                            engage with your content.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={feature.title}
                                className="glass rounded-2xl p-8 hover:border-primary/50 transition-all duration-500 group animate-slide-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                                    <feature.icon className="text-primary" size={28} />
                                </div>
                                <h3 className="text-xl font-heading font-semibold mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Who It's For ── */}
            <section className="py-20 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    <div className="glass rounded-3xl p-10 md:p-16 border border-primary/20">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm font-medium text-primary mb-6">
                                    <Users size={14} />
                                    <span>Built For</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                                    Designed for{" "}
                                    <span className="gradient-text">Creators & Brands</span>{" "}
                                    Who Want to Stand Out
                                </h2>
                                <p className="text-muted-foreground mb-8 leading-relaxed">
                                    At INVIQ Systems, we design custom TikTok effects for
                                    influencers, gaming creators, and brands who want something
                                    unique for their content. Our effects help creators make their
                                    videos more engaging while giving brands a creative way to
                                    reach new audiences.
                                </p>
                                <ul className="space-y-3">
                                    {[
                                        "TikTok Influencers & Content Creators",
                                        "Gaming Streamers & Communities",
                                        "Brands seeking viral organic reach",
                                        "Anyone with a creative effect idea",
                                    ].map((item) => (
                                        <li key={item} className="flex items-center gap-3 text-sm">
                                            <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                                <div className="w-2 h-2 rounded-full bg-primary" />
                                            </div>
                                            <span className="text-muted-foreground">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* Poster image column */}
                            <div className="relative">
                                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-primary/20 to-orange-400/10 blur-xl animate-pulse-glow" />
                                <div className="relative glass rounded-2xl overflow-hidden border border-primary/20">
                                    <img
                                        src="/effect house post.png"
                                        alt="TikTok AR Effect by INVIQ"
                                        className="w-full h-auto object-cover"
                                        loading="lazy"
                                        width={540}
                                        height={540}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-orange-500/5" />
                <div
                    className="absolute inset-0 opacity-40"
                    style={{
                        backgroundImage:
                            "radial-gradient(ellipse 60% 60% at 50% 50%, hsl(24 100% 50% / 0.15), transparent)",
                    }}
                />
                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 text-sm font-medium text-primary mb-8">
                            <Sparkles size={14} />
                            <span>Ready to Go Viral?</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                            Create Your Own{" "}
                            <span className="gradient-text">TikTok Effect</span>
                        </h2>
                        <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                            If you are interested in creating your own custom TikTok AR
                            effect, feel free to get in touch. We'd love to hear your idea and
                            bring it to life.
                        </p>

                        {/* Contact details */}
                        {/* <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                            <a
                                href="mailto:inviqprivatelimited@gmail.com"
                                className="flex items-center gap-3 glass rounded-xl px-6 py-4 hover:border-primary/50 transition-all duration-300 group"
                            >
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    <Mail size={18} className="text-primary" />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs text-muted-foreground">Email us</p>
                                    <p className="text-sm font-medium text-foreground">
                                        inviqprivatelimited@gmail.com
                                    </p>
                                </div>
                            </a>
                            <a
                                href="https://wa.me/94760503617"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 glass rounded-xl px-6 py-4 hover:border-primary/50 transition-all duration-300 group"
                            >
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    <Phone size={18} className="text-primary" />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs text-muted-foreground">WhatsApp</p>
                                    <p className="text-sm font-medium text-foreground">
                                        +94 76 050 3617
                                    </p>
                                </div>
                            </a>
                            <a
                                href="https://inviqsystems.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 glass rounded-xl px-6 py-4 hover:border-primary/50 transition-all duration-300 group"
                            >
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    <Globe size={18} className="text-primary" />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs text-muted-foreground">Website</p>
                                    <p className="text-sm font-medium text-foreground">
                                        inviqsystems.com
                                    </p>
                                </div>
                            </a>
                        </div> */}

                        <div className="flex flex-wrap gap-4 justify-center">
                            <Button variant="hero" size="xl" asChild>
                                <Link to="/contact">
                                    Start Your Effect Project
                                    <ArrowRight size={20} />
                                </Link>
                            </Button>
                            <Button
                                variant="outline"
                                size="xl"
                                className="border-primary/40 hover:bg-primary/10"
                                asChild
                            >
                                <Link to="/services">View All Services</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default TikTokEffects;

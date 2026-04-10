import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Sparkles, ArrowRight, Clock, Calendar, Tag, Search, BookOpen,
} from "lucide-react";
import { useGSAP } from "@/hooks/useGSAP";
import { blogs, BlogPost } from "@/data/blogs";
import { cn } from "@/lib/utils";

/* ─── GSAP type shim ─────────────────────────────────────────────────────── */
declare const gsap: any;

/* ─── Helper: format date ──────────────────────────────────────────────── */
const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

/* ─── Section: Hero ─────────────────────────────────────────────────────── */
const BlogHero = () => {
  const ref = useGSAP((el: Element) => {
    const badge = el.querySelector(".bh-badge");
    const h1 = el.querySelector("h1");
    const sub = el.querySelector(".bh-sub");
    const orbs = el.querySelectorAll(".bh-orb");

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

    const handleMouse = (e: MouseEvent) => {
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      orbs.forEach((orb: Element, i: number) => {
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
        OUR BLOG
      </div>

      {/* Orbs */}
      <div className="bh-orb absolute top-1/4 left-1/3 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="bh-orb absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-violet-500/8 blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
        <div className="bh-badge inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 text-sm font-medium text-primary mb-6">
          <BookOpen size={14} />
          <span>Insights & Ideas</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6">
          The INVIQ{" "}
          <span className="gradient-text">Blog</span>
        </h1>
        <p className="bh-sub text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Tips, trends, and behind-the-scenes stories from our team — covering web design,
          development, business growth, and the digital world.
        </p>
      </div>
    </section>
  );
};

/* ─── Component: Blog Card ───────────────────────────────────────────────── */
const BlogCard = ({ post, index }: { post: BlogPost; index: number }) => (
  <Link
    to={`/blog/${post.id}`}
    id={`blog-card-${post.id}`}
    className={cn(
      "blog-card group glass rounded-3xl overflow-hidden border border-border/50",
      "hover:border-primary/30 transition-all duration-500 flex flex-col"
    )}
  >
    {/* Cover area */}
    <div className={`relative bg-gradient-to-br ${post.gradient} p-8 flex items-center justify-center min-h-[160px]`}>
      <div className="absolute inset-0 opacity-30 blur-2xl bg-inherit" />
      <span className="text-6xl relative z-10">{post.coverEmoji}</span>
      {/* Read time badge */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full glass border border-border/40 text-xs text-muted-foreground">
        <Clock size={11} />
        {post.readTime}
      </div>
    </div>

    {/* Content */}
    <div className="flex flex-col flex-1 p-6 gap-4">
      {/* Category + date */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span className={cn("px-3 py-1 rounded-full border text-xs font-medium", post.badgeColor)}>
          {post.category}
        </span>
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Calendar size={11} /> {formatDate(post.date)}
        </span>
      </div>

      {/* Title */}
      <h2 className="text-xl font-heading font-bold leading-snug group-hover:text-primary transition-colors duration-300 line-clamp-2">
        {post.title}
      </h2>

      {/* Excerpt */}
      <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">
        {post.excerpt}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {post.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/8 border border-primary/15 text-[11px] text-muted-foreground"
          >
            <Tag size={9} /> {tag}
          </span>
        ))}
      </div>

      {/* Read more */}
      <div className={cn("flex items-center gap-2 text-sm font-semibold mt-1", post.accentColor)}>
        Read Article
        <ArrowRight
          size={15}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </div>
    </div>

    {/* Bottom accent bar */}
    <div className={`h-1 bg-gradient-to-r ${post.gradient.replace("/20", "").replace("/10", "")}`} />
  </Link>
);

/* ─── Section: Blog Grid ─────────────────────────────────────────────────── */
const BlogGrid = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const cats = ["All", ...Array.from(new Set(blogs.map((b) => b.category)))];
    return cats;
  }, []);

  const filtered = useMemo(() => {
    return blogs
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .filter((post) => {
        const matchesSearch =
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
          post.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
        const matchesCategory =
          activeCategory === "All" || post.category === activeCategory;
        return matchesSearch && matchesCategory;
      });
  }, [search, activeCategory]);

  const ref = useGSAP((el: Element) => {
    const cards = el.querySelectorAll(".blog-card");
    cards.forEach((card) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: "top 85%", once: true },
        y: 50, opacity: 0, duration: 0.7, ease: "power3.out",
      });
      card.addEventListener("mouseenter", () =>
        gsap.to(card, { y: -6, duration: 0.3, ease: "power2.out" })
      );
      card.addEventListener("mouseleave", () =>
        gsap.to(card, { y: 0, duration: 0.4, ease: "power2.inOut" })
      );
    });
  });

  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              id="blog-search"
              type="text"
              placeholder="Search articles…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl glass border border-border/50 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`filter-${cat.replace(/\s+/g, "-").toLowerCase()}`}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-medium border transition-all duration-200",
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "glass border-border/50 text-muted-foreground hover:border-primary/40 hover:text-primary"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 glass rounded-3xl border border-border/50">
            <span className="text-5xl mb-4 block">🔍</span>
            <p className="text-muted-foreground">No articles found. Try a different search or category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

/* ─── Section: CTA ───────────────────────────────────────────────────────── */
const BlogCTA = () => {
  const ref = useGSAP((el: Element) => {
    const inner = el.querySelector(".bcta-inner");
    const blob1 = el.querySelector(".bcta-blob1");
    const blob2 = el.querySelector(".bcta-blob2");

    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 78%", once: true } });
    tl.from([blob1, blob2], { scale: 0.3, opacity: 0, duration: 1.2, stagger: 0.2, ease: "power2.out" })
      .from((inner as HTMLElement)?.children ?? [], { y: 40, opacity: 0, duration: 0.65, stagger: 0.15, ease: "power3.out" }, "-=0.8");

    if (blob1) gsap.to(blob1, { scale: 1.1, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" });
    if (blob2) gsap.to(blob2, { scale: 1.08, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.2 });
  });

  return (
    <section ref={ref} className="py-28 relative overflow-hidden grain">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-violet-500/5" />
      <div className="bcta-blob1 absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/12 blur-3xl" />
      <div className="bcta-blob2 absolute top-1/2 right-1/4 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-violet-500/8 blur-3xl" />

      <div aria-hidden className="absolute inset-0 flex items-center justify-center text-[15vw] font-heading font-black text-border/10 select-none pointer-events-none leading-none overflow-hidden">
        IDEAS
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="bcta-inner max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 text-sm font-medium text-primary mb-8">
            <Sparkles size={14} />
            <span>Work with us</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Ready to Build Something{" "}
            <span className="gradient-text">Amazing?</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed max-w-xl mx-auto">
            The ideas in our blog come from real experience. Let's apply them to your project and
            create a digital presence that truly stands out.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">
                Start Your Project <ArrowRight size={20} />
              </Link>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <Link to="/projects">See Our Work</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Page ───────────────────────────────────────────────────────────────── */
const Blog = () => (
  <Layout>
    <BlogHero />
    <BlogGrid />
    <BlogCTA />
  </Layout>
);

export default Blog;

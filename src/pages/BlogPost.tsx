import { useMemo, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, ArrowRight, Clock, Calendar, Tag, BookOpen, Sparkles,
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
    month: "long",
    day: "numeric",
  });

/* ─── Naive Markdown Renderer ────────────────────────────────────────────── */
/**
 * Converts a subset of Markdown to HTML:
 *  - ## / ### headings
 *  - **bold**, *italic*
 *  - `inline code`
 *  - --- horizontal rule
 *  - > blockquote (supports markdown links inside)
 *  - blank line = new paragraph
 *  - unordered lists (- item)
 *  - ordered lists (1. item)
 */
function renderMarkdown(md: string): string {
  const lines = md.trim().split("\n");
  const html: string[] = [];
  let inUL = false;
  let inOL = false;
  let inBlockquote = false;
  let inParagraph = false;

  const closeParagraph = () => {
    if (inParagraph) { html.push("</p>"); inParagraph = false; }
  };
  const closeUL = () => { if (inUL) { html.push("</ul>"); inUL = false; } };
  const closeOL = () => { if (inOL) { html.push("</ol>"); inOL = false; } };
  const closeBQ = () => { if (inBlockquote) { html.push("</blockquote>"); inBlockquote = false; } };

  const inline = (text: string): string => {
    return text
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`(.+?)`/g, "<code>$1</code>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary underline hover:opacity-80 transition-opacity">$1</a>');
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    // Heading 2
    if (/^## /.test(line)) {
      closeParagraph(); closeUL(); closeOL(); closeBQ();
      html.push(`<h2 class="text-2xl md:text-3xl font-heading font-bold mt-10 mb-4 gradient-text w-fit">${inline(line.slice(3))}</h2>`);
      continue;
    }
    // Heading 3
    if (/^### /.test(line)) {
      closeParagraph(); closeUL(); closeOL(); closeBQ();
      html.push(`<h3 class="text-xl font-heading font-semibold mt-8 mb-3 text-foreground">${inline(line.slice(4))}</h3>`);
      continue;
    }
    // Horizontal rule
    if (/^---/.test(line)) {
      closeParagraph(); closeUL(); closeOL(); closeBQ();
      html.push(`<hr class="my-10 border-border/50" />`);
      continue;
    }
    // Blockquote
    if (/^> /.test(line)) {
      closeParagraph(); closeUL(); closeOL();
      if (!inBlockquote) {
        html.push(`<blockquote class="border-l-4 border-primary pl-5 py-2 my-6 text-muted-foreground italic glass rounded-r-xl">`);
        inBlockquote = true;
      }
      html.push(`<p class="mb-0">${inline(line.slice(2))}</p>`);
      continue;
    }
    closeBQ();
    // Unordered list
    if (/^- /.test(line)) {
      closeParagraph(); closeOL();
      if (!inUL) { html.push(`<ul class="list-disc pl-6 space-y-2 my-4 text-muted-foreground">`); inUL = true; }
      html.push(`<li>${inline(line.slice(2))}</li>`);
      continue;
    }
    closeUL();
    // Ordered list
    if (/^\d+\. /.test(line)) {
      closeParagraph(); closeUL();
      if (!inOL) { html.push(`<ol class="list-decimal pl-6 space-y-2 my-4 text-muted-foreground">`); inOL = true; }
      html.push(`<li>${inline(line.replace(/^\d+\. /, ""))}</li>`);
      continue;
    }
    closeOL();
    // Empty line
    if (line.trim() === "") {
      closeParagraph();
      continue;
    }
    // Paragraph
    if (!inParagraph) {
      html.push(`<p class="text-muted-foreground leading-relaxed mb-4">`);
      inParagraph = true;
    }
    html.push(inline(line) + " ");
  }

  closeParagraph();
  closeUL();
  closeOL();
  closeBQ();

  return html.join("\n");
}

/* ─── Component: Related Posts ───────────────────────────────────────────── */
const RelatedPosts = ({ current }: { current: BlogPost }) => {
  const related = blogs
    .filter(
      (b) =>
        b.id !== current.id &&
        (b.category === current.category ||
          b.tags.some((t) => current.tags.includes(t)))
    )
    .slice(0, 2);

  if (related.length === 0) return null;

  return (
    <aside className="mt-16">
      <h3 className="text-xl font-heading font-bold mb-6 flex items-center gap-2">
        <Sparkles size={18} className="text-primary" /> Related Articles
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {related.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.id}`}
            className={cn(
              "group glass rounded-2xl p-5 border border-border/50",
              "hover:border-primary/30 transition-all duration-300 flex gap-4"
            )}
          >
            <span className="text-3xl">{post.coverEmoji}</span>
            <div className="flex flex-col gap-1">
              <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full border w-fit", post.badgeColor)}>
                {post.category}
              </span>
              <p className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </p>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock size={10} /> {post.readTime}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
};

/* ─── Page: Blog Post Detail ─────────────────────────────────────────────── */
const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const post = useMemo(() => blogs.find((b) => b.id === slug), [slug]);
  const postIndex = useMemo(() => blogs.findIndex((b) => b.id === slug), [slug]);
  const prevPost = postIndex > 0 ? blogs[postIndex - 1] : null;
  const nextPost = postIndex < blogs.length - 1 ? blogs[postIndex + 1] : null;

  useEffect(() => {
    if (!post) navigate("/blog");
  }, [post, navigate]);

  const ref = useGSAP((el: Element) => {
    const header = el.querySelector(".bp-header");
    const body = el.querySelector(".bp-body");
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(header, { y: 40, opacity: 0, duration: 0.8 })
      .from(body, { y: 30, opacity: 0, duration: 0.7 }, "-=0.4");
  });

  if (!post) return null;

  const renderedContent = renderMarkdown(post.content);

  return (
    <Layout>
      {/* Hero */}
      <section className={`relative pt-32 pb-16 overflow-hidden grain bg-gradient-to-br ${post.gradient}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl relative z-10">
          <div ref={ref} className="bp-header">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-foreground truncate max-w-[200px]">{post.title}</span>
            </nav>

            {/* Cover emoji */}
            <div className="text-7xl mb-8 text-center">{post.coverEmoji}</div>

            {/* Meta row */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <span className={cn("px-3 py-1 rounded-full border text-xs font-medium", post.badgeColor)}>
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock size={12} /> {post.readTime}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar size={12} /> {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <BookOpen size={12} /> By {post.author}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-center leading-tight mb-6">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-lg text-muted-foreground text-center leading-relaxed max-w-2xl mx-auto mb-6">
              {post.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/8 border border-primary/20 text-xs text-muted-foreground"
                >
                  <Tag size={10} /> {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div
            ref={ref}
            className="bp-body glass rounded-3xl border border-border/50 p-8 md:p-12"
            dangerouslySetInnerHTML={{ __html: renderedContent }}
          />

          {/* Prev / Next navigation */}
          <nav className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4" aria-label="Post navigation">
            {prevPost ? (
              <Link
                to={`/blog/${prevPost.id}`}
                id="blog-nav-prev"
                className="group glass rounded-2xl p-5 border border-border/50 hover:border-primary/30 transition-all duration-300 flex items-center gap-3"
              >
                <ArrowLeft size={18} className="shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground mb-1">Previous</p>
                  <p className="text-sm font-semibold truncate group-hover:text-primary transition-colors">{prevPost.title}</p>
                </div>
              </Link>
            ) : <div />}
            {nextPost ? (
              <Link
                to={`/blog/${nextPost.id}`}
                id="blog-nav-next"
                className="group glass rounded-2xl p-5 border border-border/50 hover:border-primary/30 transition-all duration-300 flex items-center gap-3 md:text-right md:flex-row-reverse"
              >
                <ArrowRight size={18} className="shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground mb-1">Next</p>
                  <p className="text-sm font-semibold truncate group-hover:text-primary transition-colors">{nextPost.title}</p>
                </div>
              </Link>
            ) : <div />}
          </nav>

          {/* Related posts */}
          <RelatedPosts current={post} />

          {/* Back to blog */}
          <div className="mt-12 text-center">
            <Button variant="glass" asChild>
              <Link to="/blog" id="back-to-blog">
                <ArrowLeft size={16} /> Back to Blog
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;

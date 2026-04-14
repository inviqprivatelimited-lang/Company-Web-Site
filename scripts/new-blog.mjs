#!/usr/bin/env node
/**
 * ─── INVIQ Blog Post Generator ────────────────────────────────────────────────
 *
 * Interactively creates a new blog post entry in src/data/blogs.ts
 *
 * Usage:
 *   node scripts/new-blog.mjs
 *
 * Or add to package.json scripts:
 *   "new-blog": "node scripts/new-blog.mjs"
 * Then run:
 *   npm run new-blog
 */

import { createInterface } from "readline";
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BLOGS_FILE = resolve(__dirname, "../src/data/blogs.ts");

// ── Prompt helper ────────────────────────────────────────────────────────────
const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((res) => rl.question(q, (a) => res(a.trim())));

// ── Slug helper ──────────────────────────────────────────────────────────────
const toSlug = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

// ── Gradient & color presets ─────────────────────────────────────────────────
const presets = [
  {
    gradient: "from-violet-500/20 via-purple-500/10 to-indigo-500/20",
    accentColor: "text-violet-400",
    badgeColor: "bg-violet-500/10 border-violet-500/20 text-violet-400",
  },
  {
    gradient: "from-pink-500/20 via-rose-500/10 to-fuchsia-500/20",
    accentColor: "text-pink-400",
    badgeColor: "bg-pink-500/10 border-pink-500/20 text-pink-400",
  },
  {
    gradient: "from-orange-500/20 via-amber-500/10 to-yellow-500/20",
    accentColor: "text-orange-400",
    badgeColor: "bg-orange-500/10 border-orange-500/20 text-orange-400",
  },
  {
    gradient: "from-emerald-500/20 via-teal-500/10 to-cyan-500/20",
    accentColor: "text-emerald-400",
    badgeColor: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  },
  {
    gradient: "from-sky-500/20 via-blue-500/10 to-indigo-500/20",
    accentColor: "text-sky-400",
    badgeColor: "bg-sky-500/10 border-sky-500/20 text-sky-400",
  },
  {
    gradient: "from-lime-500/20 via-green-500/10 to-teal-500/20",
    accentColor: "text-lime-400",
    badgeColor: "bg-lime-500/10 border-lime-500/20 text-lime-400",
  },
];

// ─── Main ────────────────────────────────────────────────────────────────────
console.log("\n✨  INVIQ Blog Post Generator\n" + "─".repeat(40));

const title = await ask("📝 Post Title: ");
if (!title) { console.error("Title is required."); process.exit(1); }

const slug = await ask(`🔗 URL Slug (default: ${toSlug(title)}): `) || toSlug(title);
const excerpt = await ask("📋 Short Excerpt (1-2 sentences): ");
const coverEmoji = await ask("🎨 Cover Emoji (e.g. 🚀): ") || "📝";
const category = await ask("🏷️  Category (e.g. Business Growth): ");
const tagsRaw = await ask("🔖 Tags (comma-separated, e.g. Web,Design,Tips): ");
const readTime = await ask("⏱️  Read Time (e.g. 5 min read): ") || "5 min read";
const author = await ask("👤 Author (default: INVIQ Team): ") || "INVIQ Team";

const today = new Date().toISOString().split("T")[0];
const date = await ask(`📅 Date (default: ${today}): `) || today;

// Pick a random color preset
const preset = presets[Math.floor(Math.random() * presets.length)];

console.log("\n📄 Enter your blog post content in Markdown format.");
console.log("   Supported: ## headings, **bold**, *italic*, `code`, - lists, > blockquote");
console.log("   Type END on a new line when done.\n");

const contentLines = [];
const contentRL = createInterface({ input: process.stdin, output: process.stdout });
await new Promise((resolve) => {
  contentRL.on("line", (line) => {
    if (line.trim() === "END") { contentRL.close(); resolve(); }
    else contentLines.push(line);
  });
  process.stdout.write("> ");
  contentRL.on("line", () => process.stdout.write("> "));
});

const content = contentLines.join("\n");
const tags = tagsRaw.split(",").map((t) => t.trim()).filter(Boolean);

// ── Build the new blog entry ─────────────────────────────────────────────────
const entry = `
  {
    id: "${slug}",
    title: "${title.replace(/"/g, '\\"')}",
    excerpt: "${excerpt.replace(/"/g, '\\"')}",
    coverEmoji: "${coverEmoji}",
    gradient: "${preset.gradient}",
    accentColor: "${preset.accentColor}",
    badgeColor: "${preset.badgeColor}",
    category: "${category}",
    tags: [${tags.map((t) => `"${t}"`).join(", ")}],
    readTime: "${readTime}",
    date: "${date}",
    author: "${author}",
    content: \`
${content}
    \`,
  },`;

// ── Insert before the closing ]; ─────────────────────────────────────────────
let fileContent = readFileSync(BLOGS_FILE, "utf-8");
const insertPoint = fileContent.lastIndexOf("];");

if (insertPoint === -1) {
  console.error("❌ Could not find the end of the blogs array in blogs.ts.");
  process.exit(1);
}

const updatedContent =
  fileContent.slice(0, insertPoint) +
  entry +
  "\n" +
  fileContent.slice(insertPoint);

writeFileSync(BLOGS_FILE, updatedContent, "utf-8");

// ── Update sitemap.xml ───────────────────────────────────────────────────────
const SITEMAP_FILE = resolve(__dirname, "../public/sitemap.xml");
try {
  let sitemapContent = readFileSync(SITEMAP_FILE, "utf-8");
  const sitemapEntry = `
  <url>
    <loc>https://inviqsystems.com/blog/${slug}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  
  const sitemapInsertPoint = sitemapContent.lastIndexOf("</urlset>");
  if (sitemapInsertPoint !== -1) {
    const updatedSitemap = 
      sitemapContent.slice(0, sitemapInsertPoint) + 
      sitemapEntry + 
      sitemapContent.slice(sitemapInsertPoint);
    writeFileSync(SITEMAP_FILE, updatedSitemap, "utf-8");
    console.log(`✅  Sitemap updated: public/sitemap.xml`);
  }
} catch (err) {
  console.error("⚠️  Could not upate sitemap.xml automatically.");
}

console.log(`\n✨  Blog post "${title}" is now LIVE!`);
rl.close();
process.exit(0);

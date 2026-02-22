const technologies = [
  { name: "React", icon: "⚛️" },
  { name: "TypeScript", icon: "🔷" },
  { name: "Node.js", icon: "🟢" },
  { name: "Python", icon: "🐍" },
  { name: "Flutter", icon: "🦋" },
  { name: "Unity", icon: "🎮" },
  { name: "Next.js", icon: "▲" },
  { name: "TailwindCSS", icon: "🎨" },
  { name: "Firebase", icon: "🔥" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "Docker", icon: "🐳" },
  { name: "AWS", icon: "☁️" },
  { name: "MongoDB", icon: "🍃" },
  { name: "Figma", icon: "🎯" },
];

const TechMarquee = () => {
  return (
    <section className="py-12 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 mb-8">
        <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-widest">
          Technologies We Work With
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Scrolling track */}
        <div className="marquee-track flex gap-8">
          {[...technologies, ...technologies].map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="flex-shrink-0 glass rounded-xl px-6 py-3 flex items-center gap-3 hover:border-primary/50 transition-colors duration-300"
            >
              <span className="text-xl">{tech.icon}</span>
              <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechMarquee;

/* Tech logos via CDN (simpleicons.org) – no extra package needed */
const technologies = [
  {
    name: "React",
    icon: "https://cdn.simpleicons.org/react/61DAFB",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.simpleicons.org/typescript/3178C6",
  },
  {
    name: "Node.js",
    icon: "https://cdn.simpleicons.org/nodedotjs/5FA04E",
  },
  {
    name: "Python",
    icon: "https://cdn.simpleicons.org/python/3776AB",
  },
  {
    name: "Flutter",
    icon: "https://cdn.simpleicons.org/flutter/02569B",
  },
  {
    name: "Unity",
    icon: "https://cdn.simpleicons.org/unity/FFFFFF",
  },
  {
    name: "Next.js",
    icon: "https://cdn.simpleicons.org/nextdotjs/FFFFFF",
  },
  {
    name: "TailwindCSS",
    icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
  },
  {
    name: "Firebase",
    icon: "https://cdn.simpleicons.org/firebase/DD2C00",
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.simpleicons.org/postgresql/4169E1",
  },
  {
    name: "Docker",
    icon: "https://cdn.simpleicons.org/docker/2496ED",
  },
  {
    name: "AWS",
    icon: "https://cdn.simpleicons.org/amazonaws/FF9900",
  },
  {
    name: "MongoDB",
    icon: "https://cdn.simpleicons.org/mongodb/47A248",
  },
  {
    name: "Figma",
    icon: "https://cdn.simpleicons.org/figma/F24E1E",
  },
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
              <img
                src={tech.icon}
                alt={tech.name}
                width={20}
                height={20}
                className="w-5 h-5 object-contain"
                loading="lazy"
              />
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

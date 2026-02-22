import { useEffect, useRef, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Linkedin } from "lucide-react";

const useScrollReveal = (threshold = 0.2) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
};

const team = [
  {
    name: "K. Shanika Dilrukshi",
    position: "CEO",
    image: "/ceo.jpeg",
    bio: "Visionary leader driving INVIQ's strategic direction and growth.",
  },
  // {
  //   name: "E.N. Vishaka Lakmali",
  //   position: "COO",
  //   image: "/coo.jpeg",
  //   bio: "Operations expert ensuring seamless execution across all projects.",
  // },
  {
    name: "A.S. Ambagahawatta",
    position: "CFO",
    image: "/cfo.jpeg",
    bio: "Financial strategist managing resources for sustainable growth.",
  },
  {
    name: "T.M. Kavindu Praneeth",
    position: "CTO",
    initials: "KP",
    bio: "Tech lead architecting innovative solutions with cutting-edge tools.",
  },
];

const Team = () => {
  const hero = useScrollReveal(0.1);
  const grid = useScrollReveal(0.1);
  const quote = useScrollReveal();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />

        <div
          ref={hero.ref}
          className={`container mx-auto px-4 lg:px-8 relative z-10 transition-all duration-1000 ${
            hero.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Our <span className="gradient-text">Team</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Meet the passionate minds behind INVIQ driving innovation forward
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20">
        <div ref={grid.ref} className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <div
                key={member.name}
                className={`glass rounded-2xl overflow-hidden text-center hover:border-primary/50 transition-all duration-700 group hover:-translate-y-2 ${
                  grid.visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-16"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Avatar */}
                {member.image ? (
                  <div className="w-full aspect-square overflow-hidden relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-4">
                      <p className="text-xs text-muted-foreground px-4 text-center">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full aspect-square bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-500">
                    <span className="text-5xl font-heading font-bold gradient-text">
                      {member.initials}
                    </span>
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-4">
                      <p className="text-xs text-muted-foreground px-4 text-center">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                )}

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-lg font-heading font-semibold mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary text-sm font-medium">
                    {member.position}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div
            ref={quote.ref}
            className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${
              quote.visible
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95"
            }`}
          >
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">
              United by a <span className="gradient-text">Common Vision</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our diverse team brings together expertise in software development,
              design, marketing, and business strategy. Together, we&apos;re
              committed to building technology that makes a real difference.
            </p>
            <a
              href="https://www.linkedin.com/company/inviq-private-limited/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 glass rounded-full px-6 py-3 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
            >
              <Linkedin size={16} />
              Connect with us on LinkedIn
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Team;

import { useEffect, useRef, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Eye, Target, Quote, Lightbulb, Gem, Zap } from "lucide-react";

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

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Constantly pushing boundaries with creative solutions and modern technologies.",
  },
  {
    icon: Gem,
    title: "Quality",
    description:
      "Delivering excellence in every product through meticulous attention to detail.",
  },
  {
    icon: Zap,
    title: "Impact",
    description:
      "Creating meaningful solutions that make a real difference in the world.",
  },
];

const stats = [
  { value: "2025", label: "Founded" },
  { value: "5+", label: "Awards" },
  { value: "8+", label: "Services" },
  { value: "4", label: "Team Members" },
];

const About = () => {
  const hero = useScrollReveal(0.1);
  const vision = useScrollReveal();
  const mission = useScrollReveal();
  const statsSection = useScrollReveal(0.3);
  const founders = useScrollReveal();
  const valuesSection = useScrollReveal();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-glow delay-500" />

        <div
          ref={hero.ref}
          className={`container mx-auto px-4 lg:px-8 relative z-10 transition-all duration-1000 ${
            hero.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              About <span className="gradient-text">INVIQ</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              INVIQ - Building transformative software products
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Vision */}
            <div
              ref={vision.ref}
              className={`glass rounded-2xl p-8 hover:border-primary/50 transition-all duration-700 group ${
                vision.visible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-12"
              }`}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500">
                <Eye className="text-primary" size={28} />
              </div>
              <h2 className="text-2xl font-heading font-bold mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To be the visionary force behind transformative software products
                that drive sustainable growth and a smarter world.
              </p>
            </div>

            {/* Mission */}
            <div
              ref={mission.ref}
              className={`glass rounded-2xl p-8 hover:border-primary/50 transition-all duration-700 delay-200 group ${
                mission.visible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-12"
              }`}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500">
                <Target className="text-primary" size={28} />
              </div>
              <h2 className="text-2xl font-heading font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                At INVIQ, our mission is to build and innovate our own software
                products using modern technologies, focusing on creativity,
                performance, and usability. We aim to deliver solutions that
                empower individuals and businesses, while fostering a culture of
                continuous learning, collaboration, and future-driven thinking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5" />
        <div
          ref={statsSection.ref}
          className="container mx-auto px-4 lg:px-8 relative z-10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center transition-all duration-700 ${
                  statsSection.visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="text-3xl md:text-4xl font-heading font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Message */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div
            ref={founders.ref}
            className={`max-w-3xl mx-auto transition-all duration-1000 ${
              founders.visible
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95"
            }`}
          >
            <div className="glass rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
              {/* Decorative glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8 animate-float">
                  <Quote className="text-primary" size={32} />
                </div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">
                  Message from the{" "}
                  <span className="gradient-text">Founders</span>
                </h2>
                <blockquote className="text-lg text-muted-foreground leading-relaxed italic">
                  &ldquo;We started INVIQ with a shared belief: technology should
                  make tomorrow better. Our team is dedicated to building
                  meaningful products that create real impact.&rdquo;
                </blockquote>
                <div className="mt-8 pt-8 border-t border-border/50">
                  <p className="text-primary font-heading font-semibold">
                    The INVIQ Founding Team
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div
            ref={valuesSection.ref}
            className={`text-center mb-16 transition-all duration-700 ${
              valuesSection.visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Our <span className="gradient-text">Values</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className={`glass rounded-2xl p-8 text-center hover:border-primary/50 transition-all duration-700 group hover:-translate-y-2 ${
                  valuesSection.visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500">
                  <value.icon className="text-primary" size={28} />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3 gradient-text">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;

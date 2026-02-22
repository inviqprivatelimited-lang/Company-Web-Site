import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/my-hero.png";

const rotatingWords = [
  "SaaS Platforms",
  "Custom Software",
  "Mobile Apps",
  "AI Solutions",
  "Web Applications",
  "Game Experiences",
];

const useCountUp = (end: number, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return { count, ref };
};

const HeroSection = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = rotatingWords[currentWord];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayText.length < word.length) {
        timeout = setTimeout(() => {
          setDisplayText(word.slice(0, displayText.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 1800);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 40);
      } else {
        setIsDeleting(false);
        setCurrentWord((prev) => (prev + 1) % rotatingWords.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentWord]);

  const stat1 = useCountUp(5);
  const stat2 = useCountUp(8);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-glow delay-500" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

      {/* Background Hero Image */}
      <img
        src={heroImage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover object-top opacity-10 animate-zoom-in"
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-6 animate-slide-up">
            We Build{" "}
            <span className="gradient-text inline-block min-w-[200px] md:min-w-[320px]">
              {displayText}
              <span className="typing-cursor">|</span>
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up delay-200">
            From idea to launch — we craft digital products that drive growth.
            Empowering businesses through innovative technology solutions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up delay-300">
            <Button variant="hero" size="xl" asChild>
              <Link to="/services">
                Explore Services
                <ArrowRight size={20} />
              </Link>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <Link to="/about">Learn More</Link>
            </Button>
          </div>

          {/* Animated Counter Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 animate-slide-up delay-500">
            <div className="text-center" ref={stat1.ref}>
              <div className="text-3xl md:text-4xl font-heading font-bold gradient-text">
                {stat1.count}+
              </div>
              <div className="text-sm text-muted-foreground mt-1">Awards Won</div>
            </div>
            <div className="text-center" ref={stat2.ref}>
              <div className="text-3xl md:text-4xl font-heading font-bold gradient-text">
                {stat2.count}+
              </div>
              <div className="text-sm text-muted-foreground mt-1">Services</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-heading font-bold gradient-text">
                100%
              </div>
              <div className="text-sm text-muted-foreground mt-1">Commitment</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

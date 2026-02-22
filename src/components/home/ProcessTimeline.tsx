import { useEffect, useRef, useState } from "react";
import { Search, PenTool, Code2, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discovery & Planning",
    description:
      "We start by understanding your vision, goals, and target audience. Together we define the project scope, timeline, and strategy.",
  },
  {
    icon: PenTool,
    title: "Design & Prototype",
    description:
      "Our designers craft intuitive UI/UX wireframes and interactive prototypes, ensuring the look and feel aligns with your brand.",
  },
  {
    icon: Code2,
    title: "Development",
    description:
      "Our engineers bring designs to life using modern technologies, with clean code, regular updates, and agile sprints.",
  },
  {
    icon: Rocket,
    title: "Testing & Launch",
    description:
      "Rigorous QA testing ensures a bug-free product. We deploy, monitor, and provide ongoing support post-launch.",
  },
];

const TimelineStep = ({
  step,
  index,
  isLast,
}: {
  step: (typeof steps)[0];
  index: number;
  isLast: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative flex gap-6 md:gap-10 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center flex-shrink-0 z-10">
          <step.icon className="text-primary" size={20} />
        </div>
        {!isLast && (
          <div className="w-0.5 flex-1 bg-gradient-to-b from-primary/40 to-primary/10 mt-2" />
        )}
      </div>

      {/* Content card */}
      <div className={`glass rounded-2xl p-6 mb-8 flex-1 hover:border-primary/50 transition-all duration-500 group ${isLast ? "" : ""}`}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-bold text-primary bg-primary/10 rounded-full px-3 py-1">
            Step {index + 1}
          </span>
          <h3 className="text-lg font-heading font-semibold">{step.title}</h3>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  );
};

const ProcessTimeline = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            How We <span className="gradient-text">Work</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our streamlined process ensures quality delivery from concept to launch
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-2xl mx-auto">
          {steps.map((step, index) => (
            <TimelineStep
              key={step.title}
              step={step}
              index={index}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;

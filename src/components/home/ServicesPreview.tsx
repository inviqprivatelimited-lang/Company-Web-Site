import { Link } from "react-router-dom";
import { ArrowRight, Code2, Globe, Smartphone, Brain, Rocket, Video, Gamepad2, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Code2,
    title: "Custom Software",
    description: "Powerful, user-friendly digital solutions tailored to your needs.",
    image: "/dekstop dev.jpeg",
  },
  {
    icon: Globe,
    title: "Website Development",
    description: "Modern, responsive, and high-performing websites for your business.",
    image: "/web dev.jpeg",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Fast, intuitive apps ready for growth on Android & iOS.",
    image: "/mobile dev.jpeg",
  },
  {
    icon: Brain,
    title: "AI Automations",
    description: "Save time and boost productivity with custom AI solutions.",
    image: "/ai automation.jpeg",
  },
  {
    icon: Rocket,
    title: "SaaS Products",
    description: "Innovative digital products solving real-world problems.",
    image: "/saas.jpeg",
  },
  {
    icon: Gamepad2,
    title: "Game Development",
    description: "Engaging, high-performance games using Unity Engine.",
    image: "/game dev.jpeg",
  },
];

const ServicesPreview = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            What We <span className="gradient-text">Offer</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive technology solutions to transform your business
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group glass rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Service Image */}
              <div className="aspect-video overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  decoding="async"
                  width={480}
                  height={270}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <service.icon className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="glass" size="lg" asChild>
            <Link to="/services">
              View All Services
              <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;

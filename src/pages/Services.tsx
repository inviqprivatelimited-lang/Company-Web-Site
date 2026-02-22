import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Code2,
  Globe,
  Smartphone,
  Brain,
  Rocket,
  Video,
  Gamepad2,
  Wrench,
  ArrowRight,
  Check,
} from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Custom Software Development",
    description: "We build powerful, user-friendly digital solutions tailored to your needs.",
    features: ["Web applications", "Mobile apps (Android & iOS)", "Desktop software", "Backend systems & APIs"],
    image: "/dekstop dev.jpeg",
  },
  {
    icon: Globe,
    title: "Client Website Development",
    description: "We design and develop modern, responsive, and high-performing websites.",
    features: ["Business websites", "Portfolio & personal sites", "E-commerce websites", "Landing pages", "UI/UX design"],
    image: "/web dev.jpeg",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Build apps that are fast, intuitive, and ready for growth.",
    features: ["Full mobile app development", "Cross-platform solutions", "App UI/UX", "App maintenance"],
    image: "/mobile dev.jpeg",
  },
  {
    icon: Brain,
    title: "Business AI Automations",
    description: "We help businesses save time and boost productivity using AI.",
    features: ["Custom AI tools", "Workflow automation", "Chatbots & virtual assistants", "Data analysis & prediction", "Process automation"],
    image: "/ai automation.jpeg",
  },
  {
    icon: Rocket,
    title: "Our Own Products (SaaS Solutions)",
    description: "We create our own innovative digital products to solve real-world problems.",
    features: ["SaaS platforms", "AI-powered applications", "Productivity tools", "Creative tech solutions"],
    image: "/saas.jpeg",
  },
  {
    icon: Video,
    title: "Content Creation",
    description: "Creative content inspired by technology and everyday life.",
    features: ["Tech-focused videos", "Home-based creative content", "Digital storytelling", "Short-form social media content"],
    image: "/content create.jpeg",
  },
  {
    icon: Gamepad2,
    title: "Game Development (Unity)",
    description: "We create engaging and high-performance games using Unity Engine.",
    features: ["2D & 3D game development", "Mobile & desktop game builds", "AR-based interactive experiences", "Game UI/UX & animations"],
    image: "/game dev.jpeg",
  },
  {
    icon: Wrench,
    title: "Website Maintenance & Support",
    description: "We keep your website secure, updated, and running smoothly.",
    features: ["Regular updates & backups", "Bug fixing & performance optimization", "Security monitoring", "Content updates", "Domain & hosting support"],
    image: "/web maintence.jpeg",
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive technology solutions to transform your business and drive innovation
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="glass rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500 group"
              >
                {/* Service Image */}
                <div className="aspect-video overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                      <service.icon className="text-primary" size={28} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-heading font-semibold mb-3">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                        {service.description}
                      </p>
                      <ul className="space-y-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Check size={14} className="text-primary flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Ready to Get <span className="gradient-text">Started</span>?
            </h2>
            <p className="text-muted-foreground mb-8">
              Let&apos;s discuss how we can help bring your vision to life
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">
                Contact Us
                <ArrowRight size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;

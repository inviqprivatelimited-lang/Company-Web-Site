import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useGSAP } from "@/hooks/useGSAP";

const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbx6Eyp9f4v8s1y0t9fIYKlD6MhtQJ_RUMiXo6iixOb3TdwdQZj33AVJY5A6y6zXDLDxJw/exec";

const contactInfo = [
  { icon: Mail, label: "Email", value: "inviqprivatelimited@gmail.com", href: "mailto:inviqprivatelimited@gmail.com" },
  { icon: Phone, label: "Phone", value: "+94 76 050 3617", href: "tel:+94760503617" },
  { icon: MapPin, label: "Location", value: "Sri Lanka", href: null },
];

/* ── Hero ── */
const ContactHero = () => {
  const ref = useGSAP((el) => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.from(el.querySelector(".badge"), { y: 30, opacity: 0, duration: 0.6 })
      .from(el.querySelector("h1"), { y: 60, opacity: 0, duration: 0.8 }, "-=0.3")
      .fromTo(el.querySelector(".sub"),
        { clipPath: "inset(0 100% 0 0)", opacity: 1 },
        { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "expo.inOut" }, "-=0.4");

    const orbs = el.querySelectorAll(".orb");
    tl.from(orbs, { scale: 0, opacity: 0, duration: 1.2, stagger: 0.2, ease: "power2.out" }, "-=0.7");

    // Blobs pulse
    orbs.forEach((orb, i) => {
      gsap.to(orb, { scale: 1.1, duration: 3 + i, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 1.2 });
    });

    const handleMouse = (e: MouseEvent) => {
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      orbs.forEach((orb, i) => {
        const d = i === 0 ? 0.022 : -0.014;
        gsap.to(orb, { x: (e.clientX - cx) * d, y: (e.clientY - cy) * d, duration: 1.3, ease: "power1.out" });
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  });

  return (
    <section ref={ref} className="py-28 relative overflow-hidden grain">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-transparent to-transparent" />
      <div className="orb absolute top-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      <div className="orb absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent/8 rounded-full blur-3xl" />
      <div aria-hidden className="absolute inset-0 flex items-center justify-center text-[15vw] font-heading font-black text-border/15 select-none pointer-events-none leading-none overflow-hidden">HELLO</div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
        <div className="badge inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 text-sm font-medium text-primary mb-8">
          <Sparkles size={14} /><span>Get In Touch</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
          Contact <span className="gradient-text">Us</span>
        </h1>
        <p className="sub text-lg text-muted-foreground max-w-xl mx-auto">
          Have a project in mind? Let&apos;s talk about how we can help turn your ideas into reality.
        </p>
      </div>
    </section>
  );
};

/* ── Contact Info Cards ── */
const InfoCards = () => {
  const ref = useGSAP((el) => {
    const cards = el.querySelectorAll(".info-card");
    gsap.from(cards, {
      scrollTrigger: { trigger: el, start: "top 80%", once: true },
      y: 60, opacity: 0, scale: 0.9,
      duration: 0.7, stagger: 0.13, ease: "back.out(2)",
    });

    cards.forEach((card) => {
      const icon = card.querySelector(".info-icon");
      ScrollTrigger.create({
        trigger: card, start: "top 78%", once: true,
        onEnter: () => gsap.from(icon, { scale: 0, rotation: -20, duration: 0.5, ease: "elastic.out(1.5,0.5)", delay: 0.3 }),
      });
      card.addEventListener("mouseenter", () => {
        gsap.to(card, { y: -8, duration: 0.3, ease: "power2.out" });
        gsap.to(icon, { scale: 1.15, rotation: 5, duration: 0.3, ease: "back.out(2)" });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { y: 0, duration: 0.4, ease: "power2.inOut" });
        gsap.to(icon, { scale: 1, rotation: 0, duration: 0.3 });
      });
    });
  });

  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
      {contactInfo.map(({ icon: Icon, label, value, href }) => {
        const inner = (
          <div className="info-card glass rounded-2xl p-5 flex items-center gap-4 border border-transparent hover:border-primary/40 transition-colors duration-300 cursor-default">
            <div className="info-icon w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon className="text-primary" size={20} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{label}</p>
              <p className="text-sm font-semibold text-foreground">{value}</p>
            </div>
          </div>
        );
        return href ? (
          <a key={label} href={href} className="block hover:no-underline">{inner}</a>
        ) : (
          <div key={label}>{inner}</div>
        );
      })}
    </div>
  );
};

/* ── Page ── */
const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: "POST", mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, timestamp: new Date().toISOString() }),
      });
      toast({ title: "Message Sent! 🎉", description: "We'll get back to you as soon as possible." });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast({ title: "Error", description: "Failed to send message. Please try again later.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Form section animation ── */
  const formSectionRef = useGSAP((el) => {
    const left = el.querySelector(".form-left");
    const right = el.querySelector(".form-right");

    gsap.fromTo(left,
      { x: -70, opacity: 0, clipPath: "inset(0 0 0 100%)" },
      {
        x: 0, opacity: 1, clipPath: "inset(0 0% 0 0%)", duration: 0.9, ease: "expo.inOut",
        scrollTrigger: { trigger: el, start: "top 78%", once: true }
      }
    );
    gsap.fromTo(right,
      { x: 70, opacity: 0, clipPath: "inset(0 100% 0 0)" },
      {
        x: 0, opacity: 1, clipPath: "inset(0 0% 0 0%)", duration: 0.9, ease: "expo.inOut",
        scrollTrigger: { trigger: el, start: "top 78%", once: true }, delay: 0.1
      }
    );

    // Form fields stagger
    gsap.from(el.querySelectorAll(".form-field"), {
      scrollTrigger: { trigger: el.querySelector(".form-right"), start: "top 78%", once: true },
      y: 30, opacity: 0, duration: 0.5, stagger: 0.1, ease: "power3.out", delay: 0.4,
    });

    // Focus glow on input fields
    el.querySelectorAll("input, textarea").forEach((input) => {
      input.addEventListener("focus", () => gsap.to(input, { scale: 1.01, duration: 0.2, ease: "power1.out" }));
      input.addEventListener("blur", () => gsap.to(input, { scale: 1, duration: 0.2, ease: "power1.out" }));
    });
  });

  return (
    <Layout>
      <ContactHero />

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">

            {/* Info cards row */}
            <InfoCards />

            {/* Main grid */}
            <div ref={formSectionRef} className="grid lg:grid-cols-2 gap-12">

              {/* Left — Get in touch text */}
              <div className="form-left space-y-8">
                <div>
                  <h2 className="text-2xl font-heading font-bold mb-4">
                    Get in <span className="gradient-text">Touch</span>
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Ready to start your next project? Reach out to us and let&apos;s discuss how INVIQ can help transform your ideas into reality.
                  </p>
                </div>

                {/* Decorative INVIQ promise list */}
                <div className="space-y-3">
                  {[
                    "Fast response within 24 hours",
                    "Free initial consultation",
                    "Transparent pricing",
                    "Dedicated project manager",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      </div>
                      {item}
                    </div>
                  ))}
                </div>

                {/* Social quick links */}
                <div className="flex gap-3">
                  {[
                    { label: "LinkedIn", href: "https://www.linkedin.com/company/inviq-private-limited/" },
                    { label: "Facebook", href: "https://www.facebook.com/share/1DbzAbHH8u/" },
                  ].map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-foreground glass border border-primary/30 hover:border-primary/70 hover:text-primary transition-all duration-300"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Right — Form */}
              <div className="form-right glass rounded-2xl p-8">
                <h3 className="text-xl font-heading font-semibold mb-6">Send us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="form-field">
                      <label className="text-sm font-medium mb-2 block">Name</label>
                      <Input type="text" name="name" placeholder="Your name"
                        value={formData.name} onChange={handleChange} required
                        className="bg-secondary/50 border-border/50 focus:border-primary transition-colors" />
                    </div>
                    <div className="form-field">
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <Input type="email" name="email" placeholder="your@email.com"
                        value={formData.email} onChange={handleChange} required
                        className="bg-secondary/50 border-border/50 focus:border-primary transition-colors" />
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="text-sm font-medium mb-2 block">Subject</label>
                    <Input type="text" name="subject" placeholder="How can we help?"
                      value={formData.subject} onChange={handleChange} required
                      className="bg-secondary/50 border-border/50 focus:border-primary transition-colors" />
                  </div>

                  <div className="form-field">
                    <label className="text-sm font-medium mb-2 block">Message</label>
                    <Textarea name="message" placeholder="Tell us about your project..."
                      rows={5} value={formData.message} onChange={handleChange} required
                      className="bg-secondary/50 border-border/50 focus:border-primary resize-none transition-colors" />
                  </div>

                  <div className="form-field">
                    <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Sending…" : "Send Message"}
                      <Send size={18} className={isSubmitting ? "animate-spin" : ""} />
                    </Button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;

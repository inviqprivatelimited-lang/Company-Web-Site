import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@/hooks/useGSAP";

const CTASection = () => {
  const sectionRef = useGSAP((el) => {
    const blob = el.querySelector(".cta-blob");
    const blob2 = el.querySelector(".cta-blob2");
    const head = el.querySelector(".cta-heading");
    const sub = el.querySelector(".cta-sub");
    const btns = el.querySelectorAll(".cta-btn");

    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 76%", once: true },
    });

    // Blobs scale in
    tl.from([blob, blob2], {
      scale: 0.3, opacity: 0, duration: 1.4, stagger: 0.2, ease: "power2.out",
    })
      // Heading wipe
      .fromTo(head,
        { clipPath: "inset(0 100% 0 0)", opacity: 1 },
        { clipPath: "inset(0 0% 0 0)", duration: 1, ease: "expo.inOut" },
        "-=0.8"
      )
      // Sub fade
      .from(sub, { y: 24, opacity: 0, duration: 0.65, ease: "power3.out" }, "-=0.4")
      // Buttons pop
      .from(btns, { scale: 0.8, opacity: 0, duration: 0.5, stagger: 0.15, ease: "back.out(2)" }, "-=0.3");

    // Continuous pulsing blobs
    if (blob) gsap.to(blob, { scale: 1.12, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" });
    if (blob2) gsap.to(blob2, { scale: 1.08, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.5 });

    // Mouse parallax on blobs
    const handleMouse = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      gsap.to(blob, { x: (e.clientX - cx) * 0.03, y: (e.clientY - cy) * 0.03, duration: 1.6, ease: "power1.out" });
      gsap.to(blob2, { x: (e.clientX - cx) * -0.02, y: (e.clientY - cy) * -0.02, duration: 1.6, ease: "power1.out" });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  });

  return (
    <section ref={sectionRef} className="py-28 relative overflow-hidden grain">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      {/* Floating blobs */}
      <div className="cta-blob absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/12 rounded-full blur-3xl" />
      <div className="cta-blob2 absolute top-1/2 right-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-accent/10 rounded-full blur-3xl" />

      {/* Ghost text */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center text-[18vw] font-heading font-black text-border/20 select-none pointer-events-none leading-none whitespace-nowrap overflow-hidden"
      >
        BUILD
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="cta-heading text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
            Ready to Build Your{" "}
            <span className="gradient-text">Vision</span>?
          </h2>
          <p className="cta-sub text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Let&apos;s transform your ideas into powerful digital solutions.
            Start your journey with INVIQ today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="cta-btn" variant="hero" size="xl" asChild>
              <Link to="/contact">
                Start Your Project <ArrowRight size={20} />
              </Link>
            </Button>
            <Button className="cta-btn" variant="glass" size="xl" asChild>
              <Link to="/team">Meet Our Team</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

import { useEffect } from "react";

/**
 * useGlobalGSAP
 * Sets up site-wide GSAP features:
 *   1. Magnetic cursor (dot + trailing ring) — Nextzela-style
 *   2. Floating particle field on a canvas behind the hero
 *   3. Scroll-progress bar at the top of the page
 */
export function useGlobalGSAP() {
    useEffect(() => {
        if (typeof gsap === "undefined") return;

        // ── 1. Magnetic cursor ──────────────────────────────────────────────────
        const dot = document.createElement("div");
        dot.id = "gsap-cursor";
        const ring = document.createElement("div");
        ring.id = "gsap-cursor-ring";
        document.body.appendChild(dot);
        document.body.appendChild(ring);

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Dot snaps instantly
            gsap.set(dot, { x: mouseX, y: mouseY });
            // Ring lags behind for a smooth trail
            gsap.to(ring, { x: mouseX, y: mouseY, duration: 0.18, ease: "power2.out" });
        };

        // Expand ring on hoverable elements
        const onHoverIn = () =>
            gsap.to(ring, { scale: 2.2, opacity: 0.6, duration: 0.3, ease: "power2.out" });
        const onHoverOut = () =>
            gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" });

        const hoverTargets = "a, button, [data-hover]";
        document.querySelectorAll(hoverTargets).forEach((el) => {
            el.addEventListener("mouseenter", onHoverIn);
            el.addEventListener("mouseleave", onHoverOut);
        });

        window.addEventListener("mousemove", onMouseMove);

        // ── 2. Scroll Progress Bar ──────────────────────────────────────────────
        const progressBar = document.createElement("div");
        progressBar.id = "scroll-progress";
        Object.assign(progressBar.style, {
            position: "fixed",
            top: "0",
            left: "0",
            height: "3px",
            width: "0%",
            background: "linear-gradient(90deg, hsl(24,100%,50%), hsl(35,100%,60%))",
            zIndex: "10000",
            transformOrigin: "left center",
            pointerEvents: "none",
        });
        document.body.appendChild(progressBar);

        const updateProgress = () => {
            const scrolled = window.scrollY;
            const total = document.documentElement.scrollHeight - window.innerHeight;
            const pct = total > 0 ? (scrolled / total) * 100 : 0;
            gsap.set(progressBar, { width: `${pct}%` });
        };
        window.addEventListener("scroll", updateProgress, { passive: true });

        // ── 3. Cleanup ──────────────────────────────────────────────────────────
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("scroll", updateProgress);
            document.querySelectorAll(hoverTargets).forEach((el) => {
                el.removeEventListener("mouseenter", onHoverIn);
                el.removeEventListener("mouseleave", onHoverOut);
            });
            dot.remove();
            ring.remove();
            progressBar.remove();
        };
    }, []);
}

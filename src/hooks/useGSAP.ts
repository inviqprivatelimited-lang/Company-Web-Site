import { useEffect, useRef } from "react";

/**
 * useGSAP — minimal hook to run GSAP animations safely.
 * Automatically cleans up tweens when the component unmounts.
 *
 * @param animateFn  Function that receives the container ref element and sets up animations.
 * @param deps       Dependency array (like useEffect).
 */
export function useGSAP(
    animateFn: (el: HTMLElement) => (() => void) | void,
    deps: React.DependencyList = []
) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el || typeof gsap === "undefined") return;

        const cleanup = animateFn(el);

        return () => {
            if (typeof cleanup === "function") cleanup();
            // Kill all GSAP tweens that target children of this element
            gsap.killTweensOf(el.querySelectorAll("*") as unknown as gsap.TweenTarget);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return ref;
}

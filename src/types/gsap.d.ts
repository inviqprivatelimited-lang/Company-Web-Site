// Global GSAP types for CDN usage (no npm install needed)
// gsap@3.12.5 + ScrollTrigger loaded via CDN in index.html

declare const gsap: {
    to: (targets: gsap.TweenTarget, vars: gsap.TweenVars) => gsap.core.Tween;
    from: (targets: gsap.TweenTarget, vars: gsap.TweenVars) => gsap.core.Tween;
    fromTo: (targets: gsap.TweenTarget, fromVars: gsap.TweenVars, toVars: gsap.TweenVars) => gsap.core.Tween;
    set: (targets: gsap.TweenTarget, vars: gsap.TweenVars) => gsap.core.Tween;
    timeline: (vars?: gsap.TimelineVars) => gsap.core.Timeline;
    registerPlugin: (...args: unknown[]) => void;
    killTweensOf: (targets: gsap.TweenTarget, vars?: gsap.TweenVars | string) => void;
    utils: {
        toArray: <T = Element>(targets: gsap.DOMTarget) => T[];
        clamp: (min: number, max: number, value: number) => number;
        interpolate: (a: number, b: number, progress: number) => number;
    };
    context: (func: () => void, scope?: Element | string | object) => gsap.Context;
    matchMedia: () => gsap.MatchMedia;
};

declare namespace gsap {
    type TweenTarget = string | Element | Element[] | NodeList | object | object[] | null;
    type DOMTarget = string | Element | Element[] | NodeList;

    interface TweenVars {
        duration?: number;
        delay?: number;
        ease?: string | ((progress: number) => number);
        stagger?: number | StaggerVars;
        opacity?: number;
        x?: number | string;
        y?: number | string;
        xPercent?: number;
        yPercent?: number;
        scale?: number;
        scaleX?: number;
        scaleY?: number;
        rotation?: number;
        rotationX?: number;
        rotationY?: number;
        skewX?: number;
        skewY?: number;
        width?: number | string;
        height?: number | string;
        autoAlpha?: number;
        scrollTrigger?: ScrollTriggerVars;
        clearProps?: string;
        overwrite?: boolean | string;
        onComplete?: () => void;
        onStart?: () => void;
        onUpdate?: () => void;
        willChange?: string;
        transformOrigin?: string;
        color?: string;
        backgroundColor?: string;
        borderColor?: string;
        fontSize?: number | string;
        left?: number | string;
        top?: number | string;
        right?: number | string;
        bottom?: number | string;
        margin?: number | string;
        padding?: number | string;
        filter?: string;
        clipPath?: string;
        [key: string]: unknown;
    }

    interface TimelineVars extends TweenVars {
        defaults?: TweenVars;
        paused?: boolean;
        repeat?: number;
        repeatDelay?: number;
        yoyo?: boolean;
    }

    interface StaggerVars {
        each?: number;
        amount?: number;
        from?: number | string;
        grid?: [number, number] | 'auto';
        ease?: string;
        repeat?: number;
        yoyo?: boolean;
        onComplete?: () => void;
    }

    interface ScrollTriggerVars {
        trigger?: string | Element;
        start?: string | number;
        end?: string | number;
        scrub?: boolean | number;
        pin?: boolean | string | Element;
        markers?: boolean;
        toggleActions?: string;
        onEnter?: () => void;
        onLeave?: () => void;
        onEnterBack?: () => void;
        onLeaveBack?: () => void;
        once?: boolean;
        id?: string;
        invalidateOnRefresh?: boolean;
    }

    interface Context {
        add: (func: () => void) => void;
        revert: () => void;
        kill: () => void;
    }

    interface MatchMedia {
        add: (conditions: string | object, func: () => void) => void;
        revert: () => void;
    }

    namespace core {
        interface Tween {
            kill: () => Tween;
            pause: () => Tween;
            play: () => Tween;
            reverse: () => Tween;
            restart: () => Tween;
            progress: (value?: number) => number | Tween;
            duration: (value?: number) => number | Tween;
            then: (onFulfilled?: () => void) => Promise<Tween>;
        }

        interface Timeline extends Tween {
            to: (targets: TweenTarget, vars: TweenVars, position?: number | string) => Timeline;
            from: (targets: TweenTarget, vars: TweenVars, position?: number | string) => Timeline;
            fromTo: (targets: TweenTarget, fromVars: TweenVars, toVars: TweenVars, position?: number | string) => Timeline;
            set: (targets: TweenTarget, vars: TweenVars, position?: number | string) => Timeline;
            add: (child: Tween | Timeline | (() => void), position?: number | string) => Timeline;
        }
    }
}

declare const ScrollTrigger: {
    create: (vars: gsap.ScrollTriggerVars & { animation?: gsap.core.Tween | gsap.core.Timeline }) => unknown;
    refresh: () => void;
    kill: (revert?: boolean) => void;
    getAll: () => unknown[];
    addEventListener: (type: string, callback: () => void) => void;
    removeEventListener: (type: string, callback: () => void) => void;
    batch: (targets: gsap.DOMTarget, vars: object) => void;
    defaults: (vars: gsap.ScrollTriggerVars) => void;
};

import { useEffect, useRef, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type AnimationType = 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scaleUp' | 'textReveal' | 'parallax';

interface ScrollAnimationOptions {
    type?: AnimationType;
    delay?: number;
    duration?: number;
    stagger?: number;
    triggerStart?: string;
    triggerEnd?: string;
    scrub?: boolean | number;
    markers?: boolean;
    once?: boolean;
}

export function useScrollAnimation<T extends HTMLElement>(
    options: ScrollAnimationOptions = {}
): RefObject<T | null> {
    const ref = useRef<T>(null);
    const {
        type = 'fadeUp',
        delay = 0,
        duration = 1,
        stagger = 0,
        triggerStart = 'top 85%',
        triggerEnd = 'bottom 20%',
        scrub = false,
        once = true,
    } = options;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const children = stagger > 0 ? el.children : [el];

        const getFromTo = () => {
            switch (type) {
                case 'fadeUp':
                    return {
                        from: { opacity: 0, y: 60 },
                        to: { opacity: 1, y: 0 },
                    };
                case 'fadeIn':
                    return {
                        from: { opacity: 0 },
                        to: { opacity: 1 },
                    };
                case 'slideLeft':
                    return {
                        from: { opacity: 0, x: -80 },
                        to: { opacity: 1, x: 0 },
                    };
                case 'slideRight':
                    return {
                        from: { opacity: 0, x: 80 },
                        to: { opacity: 1, x: 0 },
                    };
                case 'scaleUp':
                    return {
                        from: { opacity: 0, scale: 0.8 },
                        to: { opacity: 1, scale: 1 },
                    };
                case 'textReveal':
                    return {
                        from: { opacity: 0, y: 80, clipPath: 'inset(0 0 100% 0)' },
                        to: { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' },
                    };
                case 'parallax':
                    return {
                        from: { y: -50 },
                        to: { y: 50 },
                    };
                default:
                    return {
                        from: { opacity: 0, y: 60 },
                        to: { opacity: 1, y: 0 },
                    };
            }
        };

        const { from, to } = getFromTo();

        const isMobile = window.innerWidth < 768;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: triggerStart,
                end: triggerEnd,
                scrub: isMobile ? false : (type === 'parallax' ? 1 : scrub),
                toggleActions: once ? 'play none none none' : 'play reverse play reverse',
            },
        });

        if (stagger > 0) {
            gsap.set(children, from);
            tl.to(children, {
                ...to,
                duration,
                stagger,
                delay,
                ease: 'power3.out',
            });
        } else {
            gsap.set(el, from);
            tl.to(el, {
                ...to,
                duration,
                delay,
                ease: 'power3.out',
            });
        }

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach(st => {
                if (st.trigger === el) st.kill();
            });
        };
    }, [type, delay, duration, stagger, triggerStart, triggerEnd, scrub, once]);

    return ref;
}

export function useParallax<T extends HTMLElement>(
    speed: number = 0.5
): RefObject<T | null> {
    const ref = useRef<T>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Skip parallax on mobile for performance
        if (window.innerWidth < 768) return;

        const tl = gsap.to(el, {
            y: () => speed * 100,
            ease: 'none',
            scrollTrigger: {
                trigger: el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
            },
        });

        return () => {
            tl.kill();
        };
    }, [speed]);

    return ref;
}

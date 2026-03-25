import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContentSticks() {
    const sectionRef = useRef<HTMLElement>(null);
    const line1 = useRef<HTMLSpanElement>(null);
    const line2 = useRef<HTMLSpanElement>(null);
    const line3 = useRef<HTMLSpanElement>(null);
    const line4 = useRef<HTMLSpanElement>(null);
    const handRef = useRef<HTMLSpanElement>(null);
    const descRef = useRef<HTMLDivElement>(null);
    const wipeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const lines = [line1.current, line2.current, line3.current, line4.current];

            // Each line slides up and fades in on scroll
            lines.forEach((line, i) => {
                gsap.fromTo(
                    line,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.9,
                        ease: 'power3.out',
                        delay: i * 0.12,
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none none',
                        },
                    }
                );

                // Subtle parallax on scroll
                gsap.to(line, {
                    y: (i % 2 === 0 ? -20 : 20) * (0.5 + i * 0.1),
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 2,
                    },
                });
            });

            // Handwritten text bounce
            gsap.fromTo(
                handRef.current,
                { y: 40, opacity: 0, rotate: -15, scale: 0.8 },
                {
                    y: 0,
                    opacity: 1,
                    rotate: -6,
                    scale: 1,
                    duration: 1.2,
                    ease: 'back.out(3)',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
                }
            );

            // Description
            gsap.fromTo(
                descRef.current,
                { x: 60, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: descRef.current, start: 'top 90%' },
                }
            );

            // Wipe transition — dark overlay rises from bottom
            gsap.fromTo(
                wipeRef.current,
                { scaleY: 0 },
                {
                    scaleY: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: '80% center',
                        end: 'bottom center',
                        scrub: true,
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-24 md:py-40 lg:py-64 bg-[var(--color-bg-deep)] relative grain-overlay"
        >
            {/* Subtle glow */}
            <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[var(--color-primary)]/3 rounded-full blur-[300px] pointer-events-none" />

            {/* Handwritten label — constrained */}
            <div className="relative z-[2] px-5 md:px-12 lg:px-24 flex justify-end mb-4 md:mb-6">
                <span
                    ref={handRef}
                    className="block text-3xl md:text-5xl lg:text-7xl text-[var(--color-primary)] -rotate-6 opacity-0"
                    style={{ fontFamily: 'var(--font-hand)', fontWeight: 700 }}
                >
                    Make it stick!
                </span>
            </div>

            {/* Full-bleed headline — no max-width so text is never clipped */}
            <div className="relative z-[2] w-full text-right pr-5 md:pr-12 lg:pr-24">
                <h2
                    className="uppercase leading-none text-white"
                    style={{ fontFamily: 'var(--font-display)' }}
                >
                    <span ref={line1} className="block text-[11vw] md:text-[11vw] lg:text-[10vw] tracking-tighter pb-2">Content</span>
                    <span ref={line2} className="block text-[11vw] md:text-[11vw] lg:text-[10vw] text-outline-thick tracking-tighter pb-2">That Sticks</span>
                    <span ref={line3} className="block text-[11vw] md:text-[11vw] lg:text-[10vw] tracking-tighter pb-2">Stories</span>
                    <span ref={line4} className="block text-[11vw] md:text-[11vw] lg:text-[10vw] text-outline-thick tracking-tighter pb-2">That Stay</span>
                </h2>
            </div>

            {/* Description — constrained */}
            <div ref={descRef} className="relative z-[2] px-5 md:px-12 lg:px-24 mt-12 md:mt-20 flex justify-start">
                <div className="max-w-md border-l-[3px] border-[var(--color-primary)] pl-5 md:pl-6">
                    <p className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-gray-400 leading-relaxed font-bold">
                        CONTENT TODAY IS OFTEN TIED TO INDIVIDUALS. DEOS ORIGINALS TAKES A DIFFERENT APPROACH.
                        WE CREATE BRANDS THAT STAND ON THEIR OWN, BEYOND JUST PERSONALITIES.
                    </p>
                </div>
            </div>

            {/* Wipe transition to next section */}
            <div
                ref={wipeRef}
                className="absolute bottom-0 left-0 right-0 h-[25%] bg-[var(--color-bg-dark)] origin-bottom z-20"
                style={{ transform: 'scaleY(0)' }}
            />
        </section>
    );
}


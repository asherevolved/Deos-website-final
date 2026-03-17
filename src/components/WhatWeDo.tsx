import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WhatWeDo() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const descRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading text reveal with clip-path
            gsap.fromTo(
                headingRef.current,
                { clipPath: 'inset(0 0 100% 0)', y: 60 },
                {
                    clipPath: 'inset(0 0 0% 0)',
                    y: 0,
                    duration: 1.4,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                    },
                }
            );

            // Animated line grows from left
            gsap.fromTo(
                lineRef.current,
                { scaleX: 0 },
                {
                    scaleX: 1,
                    duration: 1.2,
                    ease: 'power3.inOut',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 65%',
                    },
                }
            );

            // Description fades in
            gsap.fromTo(
                descRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: descRef.current,
                        start: 'top 80%',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="py-24 md:py-40 lg:py-56 px-5 md:px-12 lg:px-24 bg-[var(--color-bg-deep)] grain-overlay relative"

        >
            <div className="max-w-7xl mx-auto relative z-[2]">
                {/* Heading */}
                <div ref={headingRef} className="mb-8">
                    <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-primary)] font-bold block mb-6">
                        About Us
                    </span>
                    <h2
                        className="text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.85] uppercase text-white tracking-tighter"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        What <span className="text-outline-thick">We</span> Do
                    </h2>
                </div>

                {/* Animated horizontal line */}
                <div
                    ref={lineRef}
                    className="h-[2px] bg-gradient-to-r from-[var(--color-primary)] via-gray-700 to-transparent mb-20 origin-left"
                />

                {/* Description — generous spacing */}
                <div ref={descRef} className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <div />
                    <div className="space-y-8">
                        <p
                            className="text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-snug text-white font-normal italic"
                            style={{ fontFamily: 'var(--font-serif)' }}
                        >
                            We create <span className="text-[var(--color-primary)] not-italic font-bold" style={{ fontFamily: 'var(--font-display)' }}>elevated</span>, distinctive content that is crafted beyond the ordinary.
                        </p>
                        <p className="text-sm text-gray-400 leading-relaxed max-w-lg font-medium">
                            Derived from Latin, Deos means "gods." Combined with Originals, the name represents
                            work elevated beyond the ordinary. At Deos Originals, we create with authority,
                            precision, and originality — building brands that stand on their own.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

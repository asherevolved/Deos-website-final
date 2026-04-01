import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const line1 = useRef<HTMLSpanElement>(null);
    const line2 = useRef<HTMLSpanElement>(null);
    const line3 = useRef<HTMLSpanElement>(null);
    const taglineRef = useRef<HTMLParagraphElement>(null);
    const scrollCta = useRef<HTMLDivElement>(null);
    const edgeLabelsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const lines = [line1.current, line2.current, line3.current];

            const isMobile = window.innerWidth < 768;
            // Set initial state
            gsap.set(lines, { y: isMobile ? 80 : 200, opacity: 0, skewY: isMobile ? 4 : 8 });
            gsap.set(taglineRef.current, { opacity: 0, y: 40 });
            gsap.set(scrollCta.current, { opacity: 0 });
            gsap.set(edgeLabelsRef.current, { opacity: 0 });

            // Entry timeline — text reveals on load (NO scroll-driven exit)
            const tl = gsap.timeline({ delay: 0.3 });
            tl.to(lines[0], { y: 0, opacity: 1, skewY: 0, duration: 1.2, ease: 'power4.out' })
                .to(lines[1], { y: 0, opacity: 1, skewY: 0, duration: 1.2, ease: 'power4.out' }, '-=0.9')
                .to(lines[2], { y: 0, opacity: 1, skewY: 0, duration: 1.2, ease: 'power4.out' }, '-=0.9')
                .to(taglineRef.current, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.5')
                .to(scrollCta.current, { opacity: 1, duration: 0.8 }, '-=0.4')
                .to(edgeLabelsRef.current, { opacity: 1, duration: 0.8 }, '-=0.6');
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <header
            ref={sectionRef}
            className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden grain-overlay"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#050505] to-[#080808]" />

            {/* Edge labels */}
            <div ref={edgeLabelsRef} className="absolute inset-0 z-[3] pointer-events-none opacity-0 hidden md:block">
                <span className="absolute top-28 left-6 md:left-10 text-[9px] uppercase tracking-[0.3em] text-gray-600 font-semibold"
                    style={{ writingMode: 'vertical-lr' }}
                >
                    Based in Mysore
                </span>
                <span className="absolute top-28 right-6 md:right-10 text-[9px] uppercase tracking-[0.3em] text-gray-600 font-semibold"
                    style={{ writingMode: 'vertical-lr' }}
                >
                    Est. 2024
                </span>
            </div>

            {/* Main content */}
            <div className="relative z-[3] text-center px-4 max-w-7xl mx-auto">
                <h1 className="uppercase text-white leading-[0.85] tracking-tighter">
                    <span ref={line1} className="block text-[14vw] md:text-[10vw] lg:text-[9vw]"
                        style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}
                    >
                        NOT YOUR
                    </span>
                    <span ref={line2} className="block text-[15vw] md:text-[13vw] lg:text-[12vw] text-outline md:text-outline-thick"
                        style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}
                    >
                        REGULAR
                    </span>
                    <span ref={line3} className="block text-[11vw] md:text-[8vw] lg:text-[7vw]"
                        style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}
                    >
                        MARKETING AGENCY
                    </span>
                </h1>

                <p
                    ref={taglineRef}
                    className="mt-8 md:mt-14 text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase text-gray-400 max-w-xl mx-auto font-bold"
                >
                    Creation is powerful · Execution is everything · Originality is non-negotiable
                </p>
            </div>

            {/* Scroll indicator */}
            <div ref={scrollCta} className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2 md:gap-3">
                <span className="text-[9px] uppercase tracking-[0.4em] text-gray-500 font-bold">Scroll</span>
                <div className="w-[1px] h-10 md:h-16 relative overflow-hidden">
                    <div className="absolute w-full h-full bg-gradient-to-b from-[var(--color-primary)] to-transparent animate-scroll-pulse" />
                </div>
            </div>
        </header>
    );
}

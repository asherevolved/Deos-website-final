import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const line1 = useRef<HTMLSpanElement>(null);
    const line2 = useRef<HTMLSpanElement>(null);
    const line3 = useRef<HTMLSpanElement>(null);
    const taglineRef = useRef<HTMLParagraphElement>(null);


    useEffect(() => {
        const ctx = gsap.context(() => {
            const lines = [line1.current, line2.current, line3.current];

            const isMobile = window.innerWidth < 768;
            // Set initial state
            gsap.set(lines, { y: isMobile ? 80 : 200, opacity: 0, skewY: isMobile ? 4 : 8 });
            gsap.set(taglineRef.current, { opacity: 0, y: 40 });

            // Entry timeline — text reveals on load (NO scroll-driven exit)
            const tl = gsap.timeline({ delay: 0.3 });
            tl.to(lines[0], { y: 0, opacity: 1, skewY: 0, duration: 1.2, ease: 'power4.out' })
                .to(lines[1], { y: 0, opacity: 1, skewY: 0, duration: 1.2, ease: 'power4.out' }, '-=0.9')
                .to(lines[2], { y: 0, opacity: 1, skewY: 0, duration: 1.2, ease: 'power4.out' }, '-=0.9')
                .to(taglineRef.current, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.5');
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <header
            ref={sectionRef}
            className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden grain-overlay pt-28 md:pt-32"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#050505] to-[#080808]" />

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

        </header>
    );
}

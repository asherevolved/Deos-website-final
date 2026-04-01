import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Lenis-style sticky scroll section ──
   Left side: large heading pinned in place (desktop only)
   Right side: content cards scroll past with staggered reveals
   On mobile, uses a simple stacked layout
*/

const features = [
    {
        label: '01',
        title: 'We Push Creative Boundaries',
        desc: 'Redefining content through bold experimentation. We don\'t follow trends — we set them. Every project is a chance to break the mold and create something never seen before.',
        icon: 'bolt',
    },
    {
        label: '02',
        title: 'Designed For Longevity',
        desc: 'Our IPs are built to last, scaling beyond trends. We create systems, not one-off campaigns. Brands that endure, narratives that compound, and audiences that grow.',
        icon: 'all_inclusive',
    },
    {
        label: '03',
        title: 'Audience Engagement Drives Everything',
        desc: 'We build communities that care deeply. Every piece of content is engineered for connection — sparking conversations, building loyalty, and turning viewers into advocates.',
        icon: 'groups',
    },
];

export default function StickyFeatures() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const cardsContainerRef = useRef<HTMLDivElement>(null);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const check = () => setIsDesktop(window.innerWidth >= 1024);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Only pin the heading on desktop (lg+)
            if (isDesktop) {
                ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom bottom',
                    pin: headingRef.current,
                    pinSpacing: false,
                });
            }

            // Animate each card as it enters
            if (cardsContainerRef.current) {
                const cards = cardsContainerRef.current.querySelectorAll('.feature-card');
                cards.forEach((card) => {
                    // Line grow
                    const line = card.querySelector('.card-line');
                    if (line) {
                        gsap.fromTo(line,
                            { scaleX: 0 },
                            {
                                scaleX: 1,
                                duration: 1,
                                ease: 'power3.inOut',
                                scrollTrigger: {
                                    trigger: card,
                                    start: 'top 75%',
                                },
                            }
                        );
                    }

                    // Content fade-up
                    const content = card.querySelector('.card-content');
                    if (content) {
                        gsap.fromTo(content,
                            { opacity: 0, y: 60 },
                            {
                                opacity: 1,
                                y: 0,
                                duration: 1.2,
                                ease: 'power3.out',
                                scrollTrigger: {
                                    trigger: card,
                                    start: 'top 75%',
                                },
                            }
                        );
                    }
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, [isDesktop]);

    return (
        <section
            ref={sectionRef}
            className="relative bg-[var(--color-bg-deep)] min-h-screen"
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto px-5 md:px-12 lg:px-24">
                {/* Left: Sticky heading (only on desktop) */}
                <div
                    ref={headingRef}
                    className="pt-16 pb-8 lg:pt-24 lg:pb-12 lg:pr-16 flex flex-col justify-center lg:h-screen"
                >
                    <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-primary)] font-bold mb-6">
                        What We Stand For
                    </span>
                    <h2
                        className="text-4xl md:text-5xl lg:text-7xl uppercase leading-[0.85] text-white mb-6 lg:mb-8 tracking-tighter"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        Why
                        <br />
                        <span className="text-outline-thick">Deos</span>
                        <br />
                        Originals?
                    </h2>
                    <p className="text-sm text-gray-400 max-w-sm leading-relaxed font-medium">
                        Our approach is simple — Innovate, Sustain, and Connect.
                        Every piece of content is built with purpose.
                    </p>

                    {/* Vertical line accent — hidden on mobile */}
                    <div className="hidden lg:block mt-10 w-[3px] h-24 bg-gradient-to-b from-[var(--color-primary)] to-transparent" />
                </div>

                {/* Right: Scrolling cards */}
                <div ref={cardsContainerRef} className="py-8 lg:py-20 space-y-0">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="feature-card py-8 md:py-12 lg:py-16"
                        >
                            {/* Animated line separator */}
                            <div className="card-line h-[2px] bg-gray-800 mb-8 lg:mb-12 origin-left" />

                            <div className="card-content">
                                <div className="flex items-start gap-4 md:gap-6 mb-4 md:mb-6">
                                    <span className="text-[var(--color-primary)] text-[11px] font-mono font-bold tracking-widest mt-2">
                                        {feature.label}
                                    </span>
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[var(--color-primary)] text-black flex items-center justify-center">
                                        <span className="material-symbols-outlined text-lg md:text-xl font-bold">{feature.icon}</span>
                                    </div>
                                </div>

                                <h3
                                    className="text-2xl md:text-3xl lg:text-4xl uppercase mb-4 md:mb-6 text-white leading-tight tracking-tight"
                                    style={{ fontFamily: 'var(--font-display)' }}
                                >
                                    {feature.title}
                                </h3>

                                <p className="text-sm text-gray-400 leading-relaxed max-w-md font-medium">
                                    {feature.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}


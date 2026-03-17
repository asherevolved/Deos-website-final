import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const values = [
    {
        icon: 'bolt',
        title: ['We Push Creative', 'Boundaries'],
        desc: 'Redefining content through bold experimentation.',
        rotate: 'rotate-3',
        hoverRotate: 'group-hover:rotate-12',
    },
    {
        icon: 'all_inclusive',
        title: ['Designed For', 'Longevity'],
        desc: 'Our IPs are built to last, scaling beyond trends.',
        rotate: '-rotate-2',
        hoverRotate: 'group-hover:-rotate-12',
    },
    {
        icon: 'groups',
        title: ['Audience Engagement', 'Drives Everything'],
        desc: 'We build communities that care deeply.',
        rotate: 'rotate-1',
        hoverRotate: 'group-hover:rotate-6',
    },
];

export default function Values() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title reveal
            gsap.fromTo(
                titleRef.current,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: 'top 80%',
                    },
                }
            );

            // Staggered card scale-up
            if (cardsRef.current) {
                const cards = cardsRef.current.children;
                gsap.fromTo(
                    cards,
                    { y: 80, opacity: 0, scale: 0.85 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.9,
                        stagger: 0.12,
                        ease: 'back.out(1.4)',
                        scrollTrigger: {
                            trigger: cardsRef.current,
                            start: 'top 80%',
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-32 bg-[var(--color-bg-deep)] relative overflow-hidden"
        >
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-primary)]/5 rounded-full blur-[200px] pointer-events-none" />

            <div ref={titleRef} className="max-w-screen-xl mx-auto px-6 text-center mb-20 relative">
                <h2
                    className="relative z-10 text-5xl md:text-7xl uppercase mb-6 text-white"
                    style={{ fontFamily: 'var(--font-display)' }}
                >
                    What We{' '}
                    <span className="text-[var(--color-primary)] relative inline-block">
                        Stand For
                        <svg className="absolute w-full h-4 bottom-1 left-0" preserveAspectRatio="none" viewBox="0 0 100 10">
                            <path d="M0 5 Q 50 10 100 5" fill="none" stroke="#EAB308" strokeWidth="3" />
                        </svg>
                    </span>
                </h2>
                <p className="text-[10px] font-mono max-w-md mx-auto text-gray-500 uppercase tracking-[0.15em] mt-6 border-t border-b border-gray-800 py-3">
                    Our approach is simple—Innovate, Sustain, and Connect.
                    <br />
                    Every piece of content is built with purpose.
                </p>
            </div>

            <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto px-6">
                {values.map((value) => (
                    <div key={value.icon} className="flex flex-col items-center text-center group">
                        <div
                            className={`w-14 h-14 bg-[var(--color-primary)] text-black flex items-center justify-center mb-6 border border-white ${value.rotate} ${value.hoverRotate} transition-transform duration-300 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]`}
                        >
                            <span className="material-symbols-outlined text-2xl font-bold">{value.icon}</span>
                        </div>
                        <h3
                            className="text-2xl uppercase mb-3 text-white leading-none"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            {value.title[0]}
                            <br />
                            {value.title[1]}
                        </h3>
                        <p className="text-xs text-gray-500 font-mono uppercase tracking-wide max-w-xs mt-2">
                            {value.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}

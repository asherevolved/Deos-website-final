import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Team section — vertical grid layout ──
   NO horizontal scroll — all 4 members visible in a grid
   Each card animates in with stagger
   Avoids the problem of skipping cards during horizontal scroll
*/

const teamMembers = [
    {
        name: 'Aavish Garg',
        role: 'Founder & CEO',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_oQzjrPEM7udGXgv9bc_ezzEYvQseRD5gEuTN363YzKGHPtWWNNEwd4ndvWlWBW1PimpJ-OjuN8LU85JK_RjFmIelFVGLbfIoOQdb4UWLN9jHA0CsENwGfqKCtR5g0U5XPtYoL9J3ZxYjWv6M4gBI6MgVytbDLy_-i-3dXrqaXWl6-PO0UDO81K7E-rkrig9OeYiLNjiEokBoZvEOJzJvrnW2mLCjtWYB9LGUdK7JY4PnVDzW6q-ndmEluxsc6etXJvY5DSNgwb0',
    },
    {
        name: 'Amaan Andicot',
        role: 'Creative Director',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1aZnifu1GBBVqobArxz5GW4YxHnlkNuSltzguZ9GenLAuFQMXKiQEnLZ7Bxde29AFdQaRdJ3fkN6CDF486PT1qO_IFkKYnCcjrgJeSC5wm85NxPOOCu6fBrZSvqVwkr2olP6XINxpI1YYEX803cE3QrvrKBsLv7oXJdGw5MqC02lTNQ4MjrV0yxGNti5GOXMm27SgSnpdM494r1QgrKUKm5OoKDyItOvP2I-Ee5ejLjPPIhHYBhTdtJRJg5PJQvZ8BbjoKFx-bWk',
    },
    {
        name: 'Amrita M.',
        role: 'Head of Strategy',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBB7QacL1Ob3MWDwryHXCvYzEYhiN2uqMTtJaOd85c1GC2iGroadzhNiSWxjeSTWCdODRSSyR14zKpgrTbPe1Fv34Qs59w23pwzlXmYZvbQvyDY4CDhU87JQ3PAGCTAPYMfVNzmbli8bvRW4W9zSGLtYi3DI5Lb-B3xSomxihvDqXpWu0LLoOx3oWVrJCv7v9yB4DH4xfXcbx4_-Z613XJjF9ctxrGzTgvj4B5Zl3MmM_4Z3vgmxeLbSBx4VOcLVW5_xyb_1P-XL-w',
    },
    {
        name: 'Arnab Dewan',
        role: 'Lead Developer',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdliamRHgZVXidWmd8tAhAZY-xzMjvYjBmIOsBcaLkfcKiZkcH9c11mhMFwDnJnXAowwgCrTfc06miyq2tNiTqFUPUvN-uLqHQa6omNAx_cD8kBmBDrSOVBkcvk2fmxpD9I6KTc2Vd-fmM9-zQ3v6Igb40Ut0w2WkpTkPt8TpUfn1cafNS3HRi5uhrNDDyxc8FYz_CN13EwfXv9c1r22dY6s3eSGkGvHpIF_9C3fiEW8raBqazpDx-eMaTJT2JlrQ-7NnrVCyPHcU',
    },
];

export default function Team() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header clip-path
            gsap.fromTo(
                headerRef.current,
                { clipPath: 'inset(0 0 100% 0)', y: 60 },
                {
                    clipPath: 'inset(0 0 0% 0)',
                    y: 0,
                    duration: 1.4,
                    ease: 'power4.out',
                    scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
                }
            );

            // Line grows
            gsap.fromTo(
                lineRef.current,
                { scaleX: 0 },
                {
                    scaleX: 1,
                    duration: 1.5,
                    ease: 'power3.inOut',
                    scrollTrigger: { trigger: lineRef.current, start: 'top 80%' },
                }
            );

            // Stagger each card in
            cardsRef.current.forEach((card, i) => {
                if (!card) return;
                gsap.fromTo(
                    card,
                    { y: 80, opacity: 0, scale: 0.95 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 1,
                        delay: i * 0.15,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="team"
            className="relative bg-[var(--color-bg-deep)] overflow-hidden grain-overlay py-20 md:py-32 lg:py-40"
        >
            {/* Header */}
            <div className="px-5 md:px-12 lg:px-24 max-w-7xl mx-auto relative z-[2]">
                <div ref={headerRef}>
                    <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-primary)] font-bold block mb-6">
                        The Crew
                    </span>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                        <h2
                            className="text-[12vw] md:text-[10vw] lg:text-[8vw] uppercase leading-[0.85] text-white tracking-tighter"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            Our <span className="text-outline-thick">Team</span>
                        </h2>
                        <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500 max-w-xs md:text-right leading-relaxed">
                            Storytellers & Strategists united by our passion for creating things that matter.
                        </p>
                    </div>
                </div>
                <div ref={lineRef} className="h-[2px] bg-gray-800 mt-10 origin-left" />
            </div>

            {/* Team grid — 4 columns to show ALL members */}
            <div className="px-5 md:px-12 lg:px-24 max-w-7xl mx-auto mt-10 md:mt-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {teamMembers.map((member, i) => (
                        <div
                            key={member.name}
                            ref={(el) => { cardsRef.current[i] = el; }}
                            className="group cursor-pointer opacity-0"
                        >
                            <div className="border border-gray-800 bg-[#0a0a0a] transition-all duration-700 group-hover:border-[var(--color-primary)]/40 relative overflow-hidden">
                                {/* Photo */}
                                <div className="aspect-[3/4] overflow-hidden">
                                    <img
                                        alt={`Portrait of ${member.name}`}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transform group-hover:scale-105 transition-all duration-700"
                                        src={member.img}
                                        loading="lazy"
                                    />
                                </div>

                                {/* Info bar */}
                                <div className="relative p-4 md:p-5 border-t border-gray-800">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3
                                                className="text-sm md:text-lg uppercase text-white tracking-tight"
                                                style={{ fontFamily: 'var(--font-display)' }}
                                            >
                                                {member.name}
                                            </h3>
                                            <span className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-gray-600 font-bold mt-1 block">
                                                {member.role}
                                            </span>
                                        </div>
                                        <div className="w-8 h-8 md:w-10 md:h-10 border border-gray-700 flex items-center justify-center group-hover:bg-[var(--color-primary)] group-hover:border-[var(--color-primary)] transition-all duration-400">
                                            <span className="material-symbols-outlined text-sm md:text-lg text-gray-600 group-hover:text-black transition-colors">
                                                arrow_outward
                                            </span>
                                        </div>
                                    </div>

                                    {/* Hover line */}
                                    <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[3px] bg-[var(--color-primary)] transition-all duration-700" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

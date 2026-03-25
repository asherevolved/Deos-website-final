import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        number: '01.',
        title: 'Content Strategy & Creation',
        description:
            'From short-form reels to long-form documentaries — we build content systems engineered to captivate. Every frame is purposeful, every word deliberate.',
        tags: ['Video Production', 'Scripting', 'Social Media', 'Content Systems'],
    },
    {
        number: '02.',
        title: 'Branding',
        description:
            'Crafting visual identities that feel clear, timeless, and true to your brand. We distill your essence into a language that is impossible to ignore.',
        tags: ['Logo Design', 'Color System', 'Typography', 'Brand Direction'],
    },
    {
        number: '03.',
        title: 'Social Media',
        description:
            'Branded templates and content systems to help you stay consistent and scroll-worthy. Built for platforms, designed for humans.',
        tags: ['Instagram Design', 'Story Kits', 'Content Templates', 'Visual Consistency'],
    },
    {
        number: '04.',
        title: 'Motion Design',
        description:
            'Thoughtful animations that add rhythm, clarity, and life to your brand. Micro-interactions, reels, and motion identity — all in one place.',
        tags: ['UI Animation', 'Micro-interactions', 'Video Editing', 'Reels'],
    },
];

export default function HowWeCanHelp() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading reveal
            gsap.fromTo(
                headingRef.current,
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.4,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 72%',
                    },
                }
            );

            // Service rows stagger in
            if (listRef.current) {
                const rows = listRef.current.querySelectorAll('.service-row');
                rows.forEach((row, i) => {
                    gsap.fromTo(
                        row,
                        { opacity: 0, y: 30 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.9,
                            ease: 'power3.out',
                            delay: i * 0.1,
                            scrollTrigger: {
                                trigger: listRef.current,
                                start: 'top 75%',
                            },
                        }
                    );
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Animate the detail panel open/close
    useEffect(() => {
        const panels = document.querySelectorAll<HTMLElement>('.service-panel');
        panels.forEach((panel, i) => {
            if (i === openIndex) {
                gsap.to(panel, {
                    height: 'auto',
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power3.out',
                });
            } else {
                gsap.to(panel, {
                    height: 0,
                    opacity: 0,
                    duration: 0.4,
                    ease: 'power3.in',
                });
            }
        });
    }, [openIndex]);

    return (
        <section
            ref={sectionRef}
            id="services"
            className="bg-[var(--color-bg-deep)] grain-overlay relative overflow-hidden"
        >
            {/* Top border */}
            <div className="h-[1px] bg-gradient-to-r from-[var(--color-primary)] via-gray-800 to-transparent" />

            <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-24 py-24 md:py-40 lg:py-56">
                <div className="flex flex-col lg:flex-row lg:gap-24 xl:gap-32">

                    {/* ── LEFT: Sticky heading ── */}
                    <div
                        ref={headingRef}
                        className="lg:w-[38%] shrink-0 lg:sticky lg:top-32 lg:self-start mb-16 lg:mb-0"
                    >
                        <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-primary)] font-bold block mb-6">
                            (Services)
                        </span>
                        <h2
                            className="text-[13vw] md:text-[10vw] lg:text-[5.5vw] xl:text-[5vw] leading-[0.85] uppercase text-white tracking-tighter mb-8"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            How We{' '}
                            <br />
                            Can <span className="text-outline-thick">Help</span>
                        </h2>
                        <p className="text-sm text-gray-400 leading-relaxed font-medium max-w-xs">
                            A focused set of creative services — each crafted to make your brand unforgettable and your content unstoppable.
                        </p>

                        {/* Vertical accent line */}
                        <div className="hidden lg:block mt-10 w-[2px] h-20 bg-gradient-to-b from-[var(--color-primary)] to-transparent" />
                    </div>

                    {/* ── RIGHT: Service accordion list ── */}
                    <div ref={listRef} className="flex-1 min-w-0">
                        {services.map((service, idx) => {
                            const isOpen = openIndex === idx;
                            return (
                                <div
                                    key={idx}
                                    className="service-row border-t border-gray-800/70"
                                >
                                    {/* Clickable row header */}
                                    <button
                                        className="w-full text-left py-7 md:py-8 flex items-center justify-between gap-6 group cursor-pointer"
                                        onClick={() => setOpenIndex(isOpen ? null : idx)}
                                        aria-expanded={isOpen}
                                    >
                                        <div className="flex items-baseline gap-5 md:gap-8">
                                            <span
                                                className="text-[var(--color-primary)] text-sm font-mono font-bold tracking-widest shrink-0 tabular-nums"
                                            >
                                                {service.number}
                                            </span>
                                            <h3
                                                className={[
                                                    'text-2xl md:text-3xl lg:text-4xl uppercase leading-tight tracking-tight transition-colors duration-300',
                                                    isOpen
                                                        ? 'text-[var(--color-primary)]'
                                                        : 'text-white group-hover:text-[var(--color-primary)]',
                                                ].join(' ')}
                                                style={{ fontFamily: 'var(--font-display)' }}
                                            >
                                                {service.title}
                                            </h3>
                                        </div>

                                        {/* Plus / Minus toggle */}
                                        <div
                                            className={[
                                                'shrink-0 w-9 h-9 md:w-10 md:h-10 border flex items-center justify-center transition-all duration-300',
                                                isOpen
                                                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-black'
                                                    : 'border-gray-700 text-gray-500 group-hover:border-[var(--color-primary)] group-hover:text-[var(--color-primary)]',
                                            ].join(' ')}
                                        >
                                            <span
                                                className="material-symbols-outlined text-lg leading-none transition-transform duration-300"
                                                style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                                            >
                                                add
                                            </span>
                                        </div>
                                    </button>

                                    {/* Expandable detail panel */}
                                    <div
                                        className="service-panel overflow-hidden"
                                        style={{ height: 0, opacity: 0 }}
                                    >
                                        <div className="pb-8 md:pb-10 pl-0 md:pl-[4.5rem]">
                                            <p className="text-sm text-gray-400 leading-relaxed font-medium max-w-lg mb-6">
                                                {service.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {service.tags.map((tag, t) => (
                                                    <span
                                                        key={t}
                                                        className="text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1.5 border border-[var(--color-primary)]/30 text-[var(--color-primary)]/70"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Bottom border */}
                        <div className="border-t border-gray-800/70" />

                        {/* CTA row */}
                        <div className="pt-10 md:pt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                            <p className="text-sm text-gray-500 font-medium max-w-sm leading-relaxed">
                                Not sure where to start?{' '}
                                <span className="text-white font-semibold">We'll figure it out together.</span>
                            </p>
                            <a
                                href="#contact"
                                className="group inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-black bg-[var(--color-primary)] px-7 py-4 hover:bg-white transition-colors duration-300 shrink-0"
                            >
                                Let's Talk
                                <span className="material-symbols-outlined text-base transition-transform duration-300 group-hover:translate-x-1">
                                    arrow_forward
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        number: '01.',
        title: 'Website & Apps',
        description:
            'We design and develop high-performance websites and apps that look incredible and convert. Built for speed, crafted for impact — from landing pages to full-scale digital platforms.',
        tags: ['Web Design', 'App Development', 'UI/UX', 'CMS Integration'],
        image: '/what-we-do/Website and Apps.jpg',
    },
    {
        number: '02.',
        title: 'Branding',
        description:
            'Crafting visual identities that feel clear, timeless, and true to your brand. We distill your essence into a language that is impossible to ignore — from logo to full brand system.',
        tags: ['Logo Design', 'Color System', 'Typography', 'Brand Direction'],
        image: '/what-we-do/Branding.jpg',
    },
    {
        number: '03.',
        title: 'Brand Launches & Store Launches',
        description:
            'A launch is your defining moment. We orchestrate launch strategies that create noise, build anticipation, and make your brand impossible to miss from day one.',
        tags: ['Launch Strategy', 'Campaign Planning', 'Store Openings', 'PR Events'],
        image: '/what-we-do/Brand Launches.jpg',
    },
    {
        number: '04.',
        title: 'Promo Shoots & Ads',
        description:
            'Scroll-stopping visuals and high-impact ad content. We handle everything from concept and direction to final edit — built to perform across every platform.',
        tags: ['Photography', 'Video Ads', 'Creative Direction', 'Post Production'],
        image: '/what-we-do/Promo Shoots and Ads.jpg',
    },
    {
        number: '05.',
        title: 'Movie Screen Ads',
        description:
            'Reach audiences in the most captivating environment imaginable. We produce cinematic-quality ads made for the big screen — bold, memorable, and built to last.',
        tags: ['Cinema Advertising', 'Cinematic Production', 'Brand Films', 'Screen Media'],
        image: '/what-we-do/Movie Screening Adds.jpg',
    },
    {
        number: '06.',
        title: 'PR & Influencer Marketing',
        description:
            'We connect your brand with the right voices and the right rooms. From strategic press coverage to influencer partnerships that genuinely move the needle.',
        tags: ['Press & Media', 'Influencer Campaigns', 'Brand Partnerships', 'Community'],
        image: '/what-we-do/Pr and Influencer Marketing.jpg',
    },
    {
        number: '07.',
        title: 'Meta Management',
        description:
            'Full-funnel Meta advertising managed by experts. We run data-driven campaigns across Facebook and Instagram that grow your audience and drive real results.',
        tags: ['Facebook Ads', 'Instagram Ads', 'Audience Targeting', 'Performance Marketing'],
        image: '/what-we-do/258.webp',
    },
];

export default function WhatWeDo() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const descRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    /* ── Scroll animations ── */
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading clip-path reveal
            gsap.fromTo(
                headingRef.current,
                { clipPath: 'inset(0 0 100% 0)', y: 60 },
                {
                    clipPath: 'inset(0 0 0% 0)',
                    y: 0,
                    duration: 1.4,
                    ease: 'power4.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
                }
            );

            // Divider line grows
            gsap.fromTo(
                lineRef.current,
                { scaleX: 0 },
                {
                    scaleX: 1,
                    duration: 1.2,
                    ease: 'power3.inOut',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
                }
            );

            // About description fades in
            gsap.fromTo(
                descRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: descRef.current, start: 'top 80%' },
                }
            );

            // Service rows stagger in
            const isMobile = window.innerWidth < 768;
            if (listRef.current) {
                const rows = listRef.current.querySelectorAll('.service-row');
                rows.forEach((row, i) => {
                    gsap.fromTo(
                        row,
                        { opacity: 0, y: isMobile ? 15 : 30 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: isMobile ? 0.5 : 0.9,
                            ease: 'power3.out',
                            delay: isMobile ? i * 0.04 : i * 0.1,
                            scrollTrigger: { trigger: isMobile ? row : listRef.current, start: 'top 85%' },
                        }
                    );
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    /* ── Accordion open/close ── */
    useEffect(() => {
        if (!listRef.current) return;
        const panels = listRef.current.querySelectorAll<HTMLElement>('.service-panel');
        panels.forEach((panel, i) => {
            if (i === openIndex) {
                gsap.to(panel, { height: 'auto', opacity: 1, duration: 0.5, ease: 'power3.out' });
            } else {
                gsap.to(panel, { height: 0, opacity: 0, duration: 0.35, ease: 'power3.in' });
            }
        });
    }, [openIndex]);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="py-12 md:py-16 lg:py-20 px-5 md:px-12 lg:px-24 bg-[var(--color-bg-deep)] grain-overlay relative"
        >
            <div className="max-w-7xl mx-auto relative z-[2]">

                {/* ── HEADING ── */}
                <div ref={headingRef} className="mb-8">
                    <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-primary)] font-bold block mb-6">
                        About Us
                    </span>
                    <h2
                        className="text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.85] uppercase text-white tracking-tighter"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        What <span className="text-outline md:text-outline-thick">We</span> Do
                    </h2>
                </div>

                {/* ── DIVIDER ── */}
                <div
                    ref={lineRef}
                    className="h-[2px] bg-gradient-to-r from-[var(--color-primary)] via-gray-700 to-transparent mb-12 origin-left"
                />

                {/* ── ABOUT DESCRIPTION ── */}
                <div ref={descRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-12 md:mb-16">
                    <div />
                    <div className="space-y-8">
                        <p
                            className="text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-snug text-white font-normal italic"
                            style={{ fontFamily: 'var(--font-serif)' }}
                        >
                            We create{' '}
                            <span
                                className="text-[var(--color-primary)] not-italic font-bold"
                                style={{ fontFamily: 'var(--font-display)' }}
                            >
                                elevated
                            </span>
                            , distinctive content that is crafted beyond the ordinary.
                        </p>
                        <p className="text-sm text-gray-400 leading-relaxed max-w-lg font-medium">
                            Derived from Latin, Deos means "gods." Combined with Originals, the name represents
                            work elevated beyond the ordinary. At Deos Originals, we create with authority,
                            precision, and originality — building brands that stand on their own.
                        </p>
                    </div>
                </div>

                {/* ── SERVICES ACCORDION ── */}
                <div className="h-[1px] bg-gray-800/80 mb-12 md:mb-16" />

                <div
                    ref={listRef}
                    onMouseLeave={() => { if (window.innerWidth >= 1024) { setOpenIndex(null); setHoveredIndex(null); } }}
                    className="relative flex"
                >
                    {/* Left: Service list */}
                    <div className="flex-1 min-w-0">
                        {services.map((service, idx) => {
                            const isOpen = openIndex === idx;
                            return (
                                <div
                                    key={idx}
                                    className="service-row relative z-0 border-t border-gray-800/70 overflow-hidden"
                                    onMouseEnter={() => { if (window.innerWidth >= 1024) { setOpenIndex(idx); setHoveredIndex(idx); } }}
                                >
                                    <button
                                        className="relative z-10 w-full text-left py-7 md:py-8 flex items-center justify-between gap-6 group cursor-pointer"
                                        onClick={() => setOpenIndex(isOpen ? null : idx)}
                                        aria-expanded={isOpen}
                                    >
                                        <div className="flex items-baseline gap-5 md:gap-8">
                                            <span className="text-[var(--color-primary)] text-sm font-mono font-bold tracking-widest shrink-0 tabular-nums">
                                                {service.number}
                                            </span>
                                            <span
                                                className={[
                                                    'text-lg md:text-3xl lg:text-4xl uppercase leading-tight tracking-tight transition-colors duration-300',
                                                    isOpen
                                                        ? 'text-[var(--color-primary)]'
                                                        : 'text-white group-hover:text-[var(--color-primary)]',
                                                ].join(' ')}
                                                style={{ fontFamily: 'var(--font-display)' }}
                                            >
                                                {service.title}
                                            </span>
                                        </div>

                                        {/* Plus / × toggle */}
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

                                    {/* Expandable panel */}
                                    <div
                                        className="service-panel relative z-10 overflow-hidden"
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

                        {/* CTA */}
                        <div className="pt-8 md:pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
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

                    {/* Right: Hover image preview (desktop only) */}
                    <div className="hidden lg:flex w-[320px] xl:w-[380px] shrink-0 ml-10 items-start justify-center sticky top-24 self-start">
                        <div className="relative w-full aspect-[4/5] overflow-hidden rounded-sm">
                            {services.map((service, idx) => (
                                <img
                                    key={idx}
                                    src={service.image}
                                    alt={service.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out"
                                    style={{ opacity: hoveredIndex === idx ? 1 : 0 }}
                                    loading="lazy"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

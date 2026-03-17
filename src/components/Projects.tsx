import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        num: '01',
        title: 'AURA BRAND REBIRTH',
        category: 'Branding & Identity',
        desc: 'Complete brand overhaul — from strategy to visual identity. A rebirth that redefined how Aura connects with its audience.',
        icon: 'auto_awesome',
    },
    {
        num: '02',
        title: 'NOVA DIGITAL CAMPAIGN',
        category: 'Digital Marketing',
        desc: 'A multi-platform digital campaign that broke through the noise. Data-driven creative that generated 10M+ impressions.',
        icon: 'campaign',
    },
    {
        num: '03',
        title: 'ECHO VIRAL SERIES',
        category: 'Content Production',
        desc: 'Original content series that went viral organically. Authentic storytelling that built a community of 500K+ engaged followers.',
        icon: 'trending_up',
    },
];

export default function Projects() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const cardsWrapperRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLSpanElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) return; // Skip complex animation on mobile

        const ctx = gsap.context(() => {
            const wrapper = wrapperRef.current;
            const text = textRef.current;
            const overlay = overlayRef.current;
            const cardsWrapper = cardsWrapperRef.current;
            const subtitle = subtitleRef.current;
            if (!wrapper || !text || !overlay || !cardsWrapper || !subtitle) return;

            // Master timeline pinned to wrapper
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapper,
                    start: 'top top',
                    end: '+=3000',
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                },
            });

            // Phase 1: Scale text moderately (NOT 60x — that causes pixelation)
            // Use clip-path expansion + moderate scale for a crisp zoom effect
            tl.fromTo(
                text,
                { scale: 1, opacity: 1 },
                { scale: 8, opacity: 0, duration: 1.2, ease: 'power2.in' }
            );

            // Fade subtitle
            tl.to(subtitle, { opacity: 0, duration: 0.15 }, 0.1);

            // Phase 2: Flash golden overlay (the portal)
            tl.to(overlay, { opacity: 1, duration: 0.25, ease: 'power2.inOut' }, 0.6);

            // Phase 3: Transition overlay to dark
            tl.to(overlay, { backgroundColor: '#050505', duration: 0.3, ease: 'power2.inOut' }, 0.85);

            // Phase 4: Reveal cards wrapper
            tl.fromTo(cardsWrapper, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 1.15);

            // Phase 5: Stagger cards in
            const cards = cardsWrapper.querySelectorAll('.project-card');
            cards.forEach((card, i) => {
                tl.fromTo(
                    card,
                    { y: 60 + i * 30, opacity: 0, scale: 0.95 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.4,
                        ease: 'power3.out',
                    },
                    1.2 + i * 0.12
                );
            });

            // Phase 6: Hold for reading
            tl.to({}, { duration: 1.2 });

        }, wrapperRef);

        return () => ctx.revert();
    }, [isMobile]);

    // Mobile: simple scroll-triggered reveal
    useEffect(() => {
        if (!isMobile) return;

        const ctx = gsap.context(() => {
            const cardsWrapper = cardsWrapperRef.current;
            if (!cardsWrapper) return;

            const cards = cardsWrapper.querySelectorAll('.project-card');
            cards.forEach((card, i) => {
                gsap.fromTo(
                    card,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        delay: i * 0.1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                        },
                    }
                );
            });
        }, wrapperRef);

        return () => ctx.revert();
    }, [isMobile]);

    // ── Mobile layout: no pinning, just vertical scroll ──
    if (isMobile) {
        return (
            <div ref={wrapperRef} id="projects" className="bg-[var(--color-bg-deep)] py-24 px-5">
                {/* Section header */}
                <div className="mb-10">
                    <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-primary)] font-bold block mb-4">
                        Selected Work
                    </span>
                    <h2
                        className="text-[12vw] uppercase text-white leading-[0.85] tracking-tighter mb-4"
                        style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}
                    >
                        Projects
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="h-[2px] flex-1 bg-gray-800" />
                        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">
                            {String(projects.length).padStart(2, '0')} Projects
                        </span>
                    </div>
                </div>

                {/* Cards stacked vertically */}
                <div ref={cardsWrapperRef} className="flex flex-col gap-4">
                    {projects.map((project) => (
                        <div key={project.num} className="project-card group">
                            <div className="border border-gray-800 bg-[#0a0a0a] relative overflow-hidden">
                                {/* Top bar */}
                                <div className="flex justify-between items-center border-b border-gray-800 px-5 py-3">
                                    <span
                                        className="text-[var(--color-primary)] text-4xl font-black"
                                        style={{ fontFamily: 'var(--font-display)' }}
                                    >
                                        {project.num}
                                    </span>
                                    <div className="w-9 h-9 border border-gray-700 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-base text-white">
                                            {project.icon}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <span className="text-[9px] uppercase tracking-[0.25em] text-gray-600 font-bold block mb-3">
                                        {project.category}
                                    </span>
                                    <h3
                                        className="text-lg uppercase mb-3 text-white leading-tight tracking-tight"
                                        style={{ fontFamily: 'var(--font-display)' }}
                                    >
                                        {project.title}
                                    </h3>
                                    <p className="text-xs text-gray-500 leading-relaxed font-medium">
                                        {project.desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // ── Desktop layout: pinned zoom animation ──
    return (
        <div ref={wrapperRef} id="projects" className="relative h-screen overflow-hidden bg-[var(--color-bg-deep)]">
            {/* Zooming text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                <span
                    ref={subtitleRef}
                    className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-primary)] font-bold mb-6"
                >
                    Selected Work
                </span>
                <div
                    ref={textRef}
                    className="text-center will-change-transform"
                    style={{
                        transformOrigin: '50% 50%',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                    }}
                >
                    <h2
                        className="text-[16vw] lg:text-[14vw] uppercase text-white leading-none tracking-tighter whitespace-nowrap"
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 900,
                            WebkitFontSmoothing: 'antialiased',
                        }}
                    >
                        PROJECTS
                    </h2>
                </div>
            </div>

            {/* Gold overlay for portal transition */}
            <div
                ref={overlayRef}
                className="absolute inset-0 z-20 opacity-0"
                style={{
                    backgroundColor: 'var(--color-primary)',
                    willChange: 'opacity, background-color',
                }}
            />

            {/* Revealed project cards */}
            <div
                ref={cardsWrapperRef}
                className="absolute inset-0 z-30 flex items-center justify-center opacity-0 px-6 md:px-12 lg:px-20"
            >
                <div className="max-w-7xl w-full">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-14">
                        <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-primary)] font-bold">
                            Selected Work
                        </span>
                        <div className="h-[2px] flex-1 mx-6 bg-gray-800" />
                        <span className="text-[11px] uppercase tracking-[0.3em] text-gray-500 font-bold">
                            {String(projects.length).padStart(2, '0')} Projects
                        </span>
                    </div>

                    {/* Cards grid */}
                    <div className="grid grid-cols-3 gap-5 lg:gap-7">
                        {projects.map((project) => (
                            <div key={project.num} className="project-card group cursor-pointer">
                                <div className="border border-gray-800 bg-[#0a0a0a] hover:border-[var(--color-primary)]/50 transition-all duration-500 relative overflow-hidden h-full">
                                    {/* Top bar */}
                                    <div className="flex justify-between items-center border-b border-gray-800 px-6 py-4">
                                        <span
                                            className="text-[var(--color-primary)] text-5xl font-black"
                                            style={{ fontFamily: 'var(--font-display)' }}
                                        >
                                            {project.num}
                                        </span>
                                        <div className="w-10 h-10 border border-gray-700 flex items-center justify-center group-hover:bg-[var(--color-primary)] group-hover:border-[var(--color-primary)] transition-all duration-400">
                                            <span className="material-symbols-outlined text-lg text-white group-hover:text-black transition-colors">
                                                {project.icon}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 lg:p-8">
                                        <span className="text-[9px] uppercase tracking-[0.25em] text-gray-600 font-bold block mb-4">
                                            {project.category}
                                        </span>
                                        <h3
                                            className="text-xl lg:text-2xl uppercase mb-5 text-white leading-tight tracking-tight"
                                            style={{ fontFamily: 'var(--font-display)' }}
                                        >
                                            {project.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 leading-relaxed font-medium">
                                            {project.desc}
                                        </p>
                                    </div>

                                    {/* Hover line */}
                                    <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[3px] bg-[var(--color-primary)] transition-all duration-700" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

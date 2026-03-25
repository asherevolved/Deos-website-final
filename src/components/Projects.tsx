import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { InfiniteSlider } from '@/components/ui/InfiniteSlider';

gsap.registerPlugin(ScrollTrigger);

const clients = [
    { src: '/clients/Greeco_Final_logo_page-0001-removebg-preview (1).png', alt: 'Greeco' },
    { src: '/clients/LOUNGE29-LOGO.png', alt: 'Lounge 29' },
    { src: '/clients/MYSTUC_TAVERN_BANNER_5x6_page-0001-removebg-preview.png', alt: 'Mystuc Tavern' },
    { src: '/clients/Pataka Logo.png', alt: 'Pataka' },
    { src: '/clients/SVJ.png', alt: 'SVJ' },
    { src: '/clients/The pearl.png', alt: 'The Pearl' },
    { src: '/clients/WhatsApp_Image_2026-03-24_at_4.11.56_PM-removebg-preview.png', alt: 'Client' },
    { src: '/clients/images-removebg-preview.png', alt: 'Client' },
    { src: '/clients/sunburnunion_vel5hwh0mj.png', alt: 'Sunburn Union' },
];

export default function Projects() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const revealRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLSpanElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) return;

        const ctx = gsap.context(() => {
            const wrapper = wrapperRef.current;
            const text = textRef.current;
            const overlay = overlayRef.current;
            const reveal = revealRef.current;
            const subtitle = subtitleRef.current;
            if (!wrapper || !text || !overlay || !reveal || !subtitle) return;

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

            // Phase 1: Scale text out
            tl.fromTo(text, { scale: 1, opacity: 1 }, { scale: 8, opacity: 0, duration: 1.2, ease: 'power2.in' });
            tl.to(subtitle, { opacity: 0, duration: 0.15 }, 0.1);

            // Phase 2: Gold portal flash
            tl.to(overlay, { opacity: 1, duration: 0.25, ease: 'power2.inOut' }, 0.6);

            // Phase 3: Dark background
            tl.to(overlay, { backgroundColor: '#050505', duration: 0.3, ease: 'power2.inOut' }, 0.85);

            // Phase 4: Reveal clients panel
            tl.fromTo(reveal, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 1.15);

            // Hold
            tl.to({}, { duration: 1.2 });

        }, wrapperRef);

        return () => ctx.revert();
    }, [isMobile]);

    /* ── Logo card shared render ── */
    const LogoCard = ({ client, size = 'lg' }: { client: typeof clients[0]; size?: 'sm' | 'lg' }) => (
        <div
            className="flex items-center justify-center border border-gray-700/60 bg-[#0d0d0d] hover:border-[var(--color-primary)]/50 transition-colors duration-300"
            style={{
                minWidth: size === 'lg' ? '240px' : '180px',
                height: size === 'lg' ? '120px' : '90px',
                padding: size === 'lg' ? '20px 28px' : '14px 20px',
            }}
        >
            <img
                src={client.src}
                alt={client.alt}
                className="w-auto object-contain select-none pointer-events-none"
                style={{
                    maxHeight: size === 'lg' ? '72px' : '52px',
                    maxWidth: size === 'lg' ? '180px' : '140px',
                }}
                loading="lazy"
            />
        </div>
    );

    /* ── Mobile layout ── */
    if (isMobile) {
        return (
            <div ref={wrapperRef} id="projects" className="bg-[var(--color-bg-deep)] py-24 px-5">
                <div className="mb-10">
                    <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-primary)] font-bold block mb-4">
                        Our Portfolio
                    </span>
                    <h2
                        className="text-[12vw] uppercase text-white leading-[0.85] tracking-tighter mb-6"
                        style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}
                    >
                        Clients We<br />
                        <span className="text-outline-thick">Worked</span> With
                    </h2>
                    <div className="h-[2px] bg-gradient-to-r from-[var(--color-primary)] via-gray-700 to-transparent" />
                </div>

                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-12 z-10" style={{ background: 'linear-gradient(to right, var(--color-bg-deep), transparent)' }} />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-12 z-10" style={{ background: 'linear-gradient(to left, var(--color-bg-deep), transparent)' }} />
                    <InfiniteSlider gap={16} speed={50} speedOnHover={20}>
                        {clients.map((c) => <LogoCard key={c.alt} client={c} size="sm" />)}
                    </InfiniteSlider>
                    <div className="mt-4">
                        <InfiniteSlider gap={16} speed={60} speedOnHover={20} reverse>
                            {[...clients].reverse().map((c) => <LogoCard key={c.alt + '-r'} client={c} size="sm" />)}
                        </InfiniteSlider>
                    </div>
                </div>
            </div>
        );
    }

    /* ── Desktop layout: pinned zoom → clients reveal ── */
    return (
        <div ref={wrapperRef} id="projects" className="relative h-screen overflow-hidden bg-[var(--color-bg-deep)]">

            {/* Zooming text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                <span
                    ref={subtitleRef}
                    className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-primary)] font-bold mb-6"
                >
                    Our Portfolio
                </span>
                <div
                    ref={textRef}
                    className="text-center will-change-transform"
                    style={{ transformOrigin: '50% 50%', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                >
                    <h2
                        className="text-[16vw] lg:text-[14vw] uppercase text-white leading-none tracking-tighter whitespace-nowrap"
                        style={{ fontFamily: 'var(--font-display)', fontWeight: 900, WebkitFontSmoothing: 'antialiased' }}
                    >
                        PROJECTS
                    </h2>
                </div>
            </div>

            {/* Gold portal overlay */}
            <div
                ref={overlayRef}
                className="absolute inset-0 z-20 opacity-0"
                style={{ backgroundColor: 'var(--color-primary)', willChange: 'opacity, background-color' }}
            />

            {/* Revealed: Clients We Worked With */}
            <div
                ref={revealRef}
                className="absolute inset-0 z-30 flex flex-col justify-center opacity-0 px-8 md:px-14 lg:px-20 overflow-hidden"
            >
                <div className="max-w-7xl w-full mx-auto">
                    {/* Header */}
                    <div className="flex items-end justify-between mb-10">
                        <div>
                            <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-primary)] font-bold block mb-3">
                                Our Portfolio
                            </span>
                            <h2
                                className="text-4xl md:text-6xl lg:text-7xl uppercase text-white leading-[0.85] tracking-tighter"
                                style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}
                            >
                                Clients We{' '}
                                <span className="text-outline-thick">Worked</span> With
                            </h2>
                        </div>
                        <span className="text-[11px] uppercase tracking-[0.3em] text-gray-500 font-bold mb-2">
                            {String(clients.length).padStart(2, '0')} Clients
                        </span>
                    </div>

                    {/* Divider */}
                    <div className="h-[2px] bg-gradient-to-r from-[var(--color-primary)] via-gray-700 to-transparent mb-10" />

                    {/* Row 1 — forward */}
                    <div className="relative mb-4">
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-28 z-10" style={{ background: 'linear-gradient(to right, #050505, transparent)' }} />
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-28 z-10" style={{ background: 'linear-gradient(to left, #050505, transparent)' }} />
                        <InfiniteSlider gap={20} speed={60} speedOnHover={25}>
                            {clients.map((c) => <LogoCard key={c.alt} client={c} size="lg" />)}
                        </InfiniteSlider>
                    </div>

                    {/* Row 2 — reverse */}
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-28 z-10" style={{ background: 'linear-gradient(to right, #050505, transparent)' }} />
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-28 z-10" style={{ background: 'linear-gradient(to left, #050505, transparent)' }} />
                        <InfiniteSlider gap={20} speed={70} speedOnHover={25} reverse>
                            {[...clients].reverse().map((c) => <LogoCard key={c.alt + '-r'} client={c} size="lg" />)}
                        </InfiniteSlider>
                    </div>
                </div>
            </div>
        </div>
    );
}

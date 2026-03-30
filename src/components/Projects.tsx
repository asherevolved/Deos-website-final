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
    { src: '/clients/WhatsApp_Image_2026-03-24_at_4.11.56_PM-removebg-preview.png', alt: 'Client 1' },
    { src: '/clients/images-removebg-preview.png', alt: 'Client 2' },
    { src: '/clients/sunburnunion_vel5hwh0mj.png', alt: 'Sunburn Union' },
];

const presentClients = [
    { src: '/clients/Color Logo.png', alt: 'Color Logo' },
    { src: '/clients/ElanBar-03.png', alt: 'Elan Bar' },
    { src: '/clients/Gokulam Logo 1 orange.png', alt: 'Gokulam' },
    { src: '/clients/RoyalBluColor.png', alt: 'Royal Blu' },
    { src: '/clients/SMSL_blackwhite_logo.png', alt: 'SMSL' },
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
    const LogoCard = ({ client, size = 'lg', isPresent = false }: { client: typeof clients[0]; size?: 'sm' | 'lg'; isPresent?: boolean }) => {
        const isMumbaiChai = client.src === '/clients/images-removebg-preview.png';
        const isWhiteTeak = client.src === '/clients/Color Logo.png';
        const isSmsl = client.src === '/clients/SMSL_blackwhite_logo.png';
        const isPresentWhiteTeak = isPresent && isWhiteTeak;
        const isPresentSmsl = isPresent && isSmsl;

        return (
            <div
                className="flex items-center justify-center"
                style={{
                    minWidth: isPresentSmsl ? (size === 'lg' ? '360px' : '320px') : (isMumbaiChai ? (size === 'lg' ? '340px' : '300px') : (size === 'lg' ? '300px' : '260px')),
                    height: size === 'lg' ? '140px' : '120px',
                }}
            >
                <img
                    src={client.src}
                    alt={client.alt}
                    className={isPresentSmsl
                        ? 'w-[300px] h-[116px] object-contain select-none pointer-events-none'
                        : isMumbaiChai
                        ? 'w-[280px] h-[108px] object-contain select-none pointer-events-none'
                        : 'w-[220px] h-[84px] object-contain select-none pointer-events-none'}
                    style={{
                        filter: isPresentWhiteTeak ? 'brightness(0) invert(1)' : 'brightness(1.15) contrast(1.15)'
                    }}
                    loading="lazy"
                />
            </div>
        );
    };

    /* ── Mobile layout ── */
    if (isMobile) {
        return (
            <div ref={wrapperRef} id="projects" className="bg-[var(--color-bg-deep)] py-32 px-5">
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

                    <div className="relative mb-16">
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 z-10" style={{ background: 'linear-gradient(to right, var(--color-bg-deep), transparent)' }} />
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 z-10" style={{ background: 'linear-gradient(to left, var(--color-bg-deep), transparent)' }} />
                        <InfiniteSlider gap={16} speed={50} speedOnHover={20}>
                            {clients.map((c) => <LogoCard key={c.alt} client={c} size="sm" />)}
                        </InfiniteSlider>
                    </div>

                    <div className="mb-6 mt-8">
                        <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-primary)] font-bold block mb-4">
                            Current Work
                        </span>
                        <h3
                            className="text-[10vw] uppercase text-white leading-[0.85] tracking-tighter mb-6"
                            style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}
                        >
                            Present Clientele
                        </h3>
                        <div className="h-[2px] bg-gradient-to-r from-[var(--color-primary)] via-gray-700 to-transparent" />
                    </div>

                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 z-10" style={{ background: 'linear-gradient(to right, var(--color-bg-deep), transparent)' }} />
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 z-10" style={{ background: 'linear-gradient(to left, var(--color-bg-deep), transparent)' }} />
                        <InfiniteSlider gap={16} speed={50} speedOnHover={20}>
                            {presentClients.map((c) => <LogoCard key={c.alt + '-present'} client={c} size="sm" isPresent />)}
                        </InfiniteSlider>
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
                className="absolute inset-0 z-30 flex flex-col justify-start pt-28 md:pt-32 lg:pt-32 opacity-0 px-8 md:px-14 lg:px-20 overflow-visible"
            >
                <div className="max-w-7xl w-full mx-auto">
                    {/* Header */}
                    <div className="flex items-end justify-between mb-4">
                        <div>
                            <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-primary)] font-bold block mb-1">
                                Our Portfolio
                            </span>
                            <h2
                                className="text-3xl md:text-4xl lg:text-5xl uppercase text-white leading-[0.85] tracking-tighter"
                                style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}
                            >
                                Clients We{' '}
                                <span className="text-outline-thick">Worked</span> With
                            </h2>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-[2px] bg-gradient-to-r from-[var(--color-primary)] via-gray-700 to-transparent mb-6" />

                    {/* Single logo row */}
                    <div className="relative mb-8">
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-28 z-10" style={{ background: 'linear-gradient(to right, #050505, transparent)' }} />
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-28 z-10" style={{ background: 'linear-gradient(to left, #050505, transparent)' }} />
                        <InfiniteSlider gap={20} speed={60} speedOnHover={25}>
                            {clients.map((c) => <LogoCard key={c.alt} client={c} size="sm" />)}
                        </InfiniteSlider>
                    </div>

                    {/* Present Clientele — same style as above */}
                    <div className="max-w-7xl w-full mx-auto">
                        <div className="flex items-end justify-between mb-4">
                            <div>
                                <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-primary)] font-bold block mb-1">
                                    Current Work
                                </span>
                                <h3
                                    className="text-2xl md:text-3xl lg:text-4xl uppercase text-white leading-[0.9] tracking-tighter"
                                    style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}
                                >
                                    Present Clientele
                                </h3>
                            </div>
                        </div>

                        <div className="h-[2px] bg-gradient-to-r from-[var(--color-primary)] via-gray-700 to-transparent mb-6" />

                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 w-28 z-10" style={{ background: 'linear-gradient(to right, #050505, transparent)' }} />
                            <div className="pointer-events-none absolute inset-y-0 right-0 w-28 z-10" style={{ background: 'linear-gradient(to left, #050505, transparent)' }} />
                            <InfiniteSlider gap={24} speed={55} speedOnHover={25}>
                                {presentClients.map((c) => <LogoCard key={c.alt + '-present'} client={c} size="sm" isPresent />)}
                            </InfiniteSlider>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

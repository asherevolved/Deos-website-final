import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Inline Instagram SVG ── */
const InstagramIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full"
        aria-hidden="true"
    >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
);



interface BrandConfig {
    label: string;
    instagramUrl: string;
    logoNode: React.ReactNode;
}

const brands: BrandConfig[] = [
    {
        label: 'Marketing',
        instagramUrl: 'https://www.instagram.com/deos.originals',
        logoNode: (
            <img
                src="/logo.png"
                alt="Deos Originals"
                className="object-contain max-h-28 md:max-h-36 w-auto"
                loading="lazy"
            />
        ),
    },
    {
        label: 'Events',
        instagramUrl: 'https://www.instagram.com/wedeosofficial/',
        logoNode: (
            <img
                src="/wedeos-logo.png"
                alt="WeDeos Entertainment"
                className="object-contain max-h-28 md:max-h-36 w-auto"
                loading="lazy"
            />
        ),
    },
];

export default function InstagramFeed() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const cards = sectionRef.current?.querySelectorAll<HTMLElement>('.brand-card');
        if (!cards?.length) return;

        gsap.fromTo(
            cards,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: 'power3.out',
                stagger: 0.2,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 78%',
                    once: true,
                },
            }
        );
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            id="instagram"
            className="py-20 md:py-28 px-5 md:px-12 lg:px-24 bg-[var(--color-bg-deep)]"
        >
            {/* ── Heading ── */}
            <div className="max-w-6xl mx-auto mb-14 md:mb-20">
                <h2
                    className="text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.9] text-white tracking-tighter"
                    style={{ fontFamily: 'var(--font-display)' }}
                >
                    We're On{' '}
                    <span className="text-outline md:text-outline-thick">Instagram</span>
                </h2>
            </div>

            {/* ── Horizontal rule ── */}
            <div className="max-w-6xl mx-auto mb-14 md:mb-20">
                <div className="h-px bg-white/10 w-full" />
            </div>

            {/* ── Brand columns ── */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2">
                {brands.map((brand, i) => (
                    <div
                        key={brand.label}
                        className={`brand-card flex flex-col items-center gap-10 md:gap-14 py-10 md:py-6 ${
                            i === 0 ? 'md:border-r md:border-white/10' : ''
                        } ${i > 0 && brands.length > 1 ? 'border-t border-white/10 md:border-t-0' : ''}`}
                        style={{ opacity: 0 }}
                    >
                        {/* Category label */}
                        <span
                            className="text-white text-xl md:text-2xl font-bold underline underline-offset-4 decoration-1 tracking-wide"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            {brand.label}
                        </span>

                        {/* Logo */}
                        <div className="flex items-center justify-center" style={{ minHeight: '100px' }}>
                            {brand.logoNode}
                        </div>

                        {/* Instagram CTA */}
                        <a
                            href={brand.instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Follow ${brand.label} on Instagram`}
                            className="group relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full text-white transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-black"
                        >
                            {/* Static ring */}
                            <span className="absolute inset-0 rounded-full border-[1.5px] border-white/30 group-hover:border-[var(--color-primary)] transition-colors duration-300" />
                            {/* Hover glow */}
                            <span
                                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ background: 'radial-gradient(circle, rgba(234,179,8,0.18) 0%, transparent 70%)' }}
                            />
                            {/* Icon */}
                            <span className="relative w-9 h-9 md:w-11 md:h-11 group-hover:text-[var(--color-primary)] transition-colors duration-300">
                                <InstagramIcon />
                            </span>
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
}

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Pre-footer image reveal — talentless.media style ──
   Full-width image that scales up and reveals as you scroll
   Creates a dramatic transition before the footer
   Uses the Deos brand image from public folder
*/

export default function ImageCollage() {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Image scales from 0.85 to 1 as you scroll into it
            gsap.fromTo(
                imageRef.current,
                { scale: 0.8, borderRadius: '24px' },
                {
                    scale: 1,
                    borderRadius: '0px',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top bottom',
                        end: 'top top',
                        scrub: 1,
                    },
                }
            );

            // Dark overlay fades in as image enters for contrast
            gsap.fromTo(
                overlayRef.current,
                { opacity: 0 },
                {
                    opacity: 0.5,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 40%',
                        end: 'bottom bottom',
                        scrub: 1,
                    },
                }
            );

            // Text fades up
            gsap.fromTo(
                textRef.current,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.4,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: 'top 80%',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-[var(--color-bg-deep)]"
            style={{ height: '100vh' }}
        >
            {/* Full-bleed image container */}
            <div
                ref={imageRef}
                className="absolute inset-0 will-change-transform overflow-hidden"
                style={{ transformOrigin: '50% 50%' }}
            >
                <img
                    src="/cursor.webp"
                    alt="Deos Originals — Not Your Regular Marketing Agency"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Dark gradient overlay for readability */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent z-10"
            />

            {/* Optional centered text overlay */}
            <div
                ref={textRef}
                className="absolute bottom-16 left-0 right-0 z-20 text-center px-6"
            >
                <span
                    className="text-[8vw] md:text-[5vw] lg:text-[4vw] uppercase text-white tracking-tighter leading-none"
                    style={{ fontFamily: 'var(--font-display)' }}
                >
                    No Rest. Just Building.
                </span>
            </div>
        </section>
    );
}

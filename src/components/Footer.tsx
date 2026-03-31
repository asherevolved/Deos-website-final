import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const sectionRef = useRef<HTMLElement>(null);
    const ctaRef = useRef<HTMLHeadingElement>(null);
    const socialRef = useRef<HTMLDivElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const topLineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Top line reveal
            gsap.fromTo(topLineRef.current,
                { scaleX: 0 },
                {
                    scaleX: 1,
                    duration: 1.5,
                    ease: 'power3.inOut',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
                }
            );

            // CTA text — fade + slide up
            gsap.fromTo(
                ctaRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', toggleActions: 'play none none none' },
                }
            );

            // Line grows
            gsap.fromTo(lineRef.current,
                { scaleX: 0 },
                {
                    scaleX: 1,
                    duration: 1.5,
                    ease: 'power3.inOut',
                    scrollTrigger: { trigger: lineRef.current, start: 'top 85%' },
                }
            );

            // Social icons stagger
            if (socialRef.current) {
                const icons = socialRef.current.children;
                gsap.fromTo(
                    icons,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.08,
                        ease: 'back.out(2)',
                        scrollTrigger: { trigger: socialRef.current, start: 'top 85%' },
                    }
                );
            }

            // Info slide in
            gsap.fromTo(
                infoRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: infoRef.current, start: 'top 90%' },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer ref={sectionRef} id="contact" className="bg-[var(--color-bg-deep)] pt-16 md:pt-24 pb-8">
            {/* Top line */}
            <div ref={topLineRef} className="h-[2px] bg-gradient-to-r from-transparent via-gray-800 to-transparent mx-5 md:mx-12 lg:mx-24 mb-16 md:mb-24 origin-center" />

            {/* CTA label — constrained */}
            <div className="px-5 md:px-12 lg:px-24 mb-6">
                <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-primary)] font-bold block">
                    Let's Work Together
                </span>
            </div>

            {/* Full-bleed heading so large text is never clipped */}
            <div className="pl-5 md:pl-12 lg:pl-24 mb-6">
                <h2
                    ref={ctaRef}
                    className="text-[14vw] sm:text-[14vw] md:text-[12vw] lg:text-[10vw] uppercase leading-none tracking-tighter"
                    style={{ fontFamily: 'var(--font-display)' }}
                >
                    <span className="text-white block pb-2">Get In</span>
                    <span className="text-white block pb-2">Touch</span>
                </h2>
            </div>

            {/* Sub-text + rest of footer — constrained */}
            <div className="px-5 md:px-12 lg:px-24 max-w-7xl mx-auto">
                <div className="mb-24">
                    <p className="text-sm text-gray-500 max-w-md leading-relaxed font-medium"
                        style={{ fontFamily: 'var(--font-body)' }}
                    >
                        Ready to create something extraordinary? Let's talk about your next project.
                    </p>
                </div>

                {/* Divider */}
                <div ref={lineRef} className="h-[2px] bg-gray-800 mb-16 origin-left" />

                {/* Bottom section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    {/* Col 1: Brand */}
                    <div>
                        <span
                            className="text-2xl text-white uppercase tracking-tighter block mb-6"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            DEOS<span className="text-[var(--color-primary)]">ORIGINALS</span>
                            <span className="text-[var(--color-primary)] text-xs align-top font-sans">©</span>
                        </span>
                        <p className="text-xs text-gray-500 leading-relaxed font-medium max-w-xs">
                            We create with authority, precision, and originality — building brands that stand on their own.
                        </p>
                    </div>

                    {/* Col 2: Social */}
                    <div>
                        <span className="text-[9px] uppercase tracking-[0.25em] text-gray-500 font-bold block mb-5">
                            Connect
                        </span>
                        <div ref={socialRef} className="flex gap-3">
                            {[
                                { icon: 'language', label: 'Website' },
                                { icon: 'alternate_email', label: 'Email' },
                                { icon: 'smart_display', label: 'YouTube' },
                                { icon: 'work', label: 'LinkedIn' },
                            ].map((social) => (
                                <a
                                    key={social.icon}
                                    href="#"
                                    aria-label={social.label}
                                    className="w-12 h-12 border border-gray-800 flex items-center justify-center hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] hover:text-black transition-all duration-400 text-gray-400"
                                >
                                    <span className="material-symbols-outlined text-lg">{social.icon}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Col 3: Contact info */}
                    <div ref={infoRef} className="space-y-6 lg:text-right">
                        <div>
                            <span className="text-[9px] uppercase tracking-[0.25em] text-gray-500 font-bold block mb-2">H.Q.</span>
                            <span
                                className="text-white text-xl uppercase tracking-tight"
                                style={{ fontFamily: 'var(--font-display)' }}
                            >
                                Mysore, India
                            </span>
                        </div>
                        <div>
                            <span className="text-[9px] uppercase tracking-[0.25em] text-gray-500 font-bold block mb-2">Phone</span>
                            <a
                                className="text-white hover:text-[var(--color-primary)] transition-colors text-sm font-bold"
                                href="tel:+919110851733"
                            >
                                +91 9110851733 / +91 78925 72758
                            </a>
                        </div>
                        <div>
                            <span className="text-[9px] uppercase tracking-[0.25em] text-gray-500 font-bold block mb-2">Email</span>
                            <a
                                className="text-white hover:text-[var(--color-primary)] transition-colors text-sm font-bold lowercase"
                                href="mailto:deosoriginals@gmail.com"
                            >
                                deosoriginals@gmail.com
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-20 pt-6 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4">
                    <span className="text-[9px] text-gray-600 uppercase tracking-[0.2em] font-bold">
                        © 2024 Deos Originals. All Rights Reserved.
                    </span>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-gray-500 hover:text-[var(--color-primary)] transition-colors cursor-pointer font-bold"
                    >
                        <span className="material-symbols-outlined text-sm">arrow_upward</span>
                        Back To Top
                    </button>
                </div>
            </div>
        </footer>
    );
}

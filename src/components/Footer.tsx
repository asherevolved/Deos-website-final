import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const sectionRef = useRef<HTMLElement>(null);
    const yellowBoxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const isMobile = window.innerWidth < 768;
            gsap.fromTo(
                yellowBoxRef.current,
                { y: isMobile ? 30 : 80, opacity: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 85%',
                        ...(isMobile
                            ? { toggleActions: 'play none none none' }
                            : { end: 'top 20%', scrub: 1 }
                        ),
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer
            ref={sectionRef}
            id="contact"
            // Dark gray/black wrapper that pulls tightly over the pinned ImageCollage like a curtain
            // Removed rounded-t classes to prevent the background image from bleeding through the corners awkwardly
            className="relative bg-[#0a0a0a] z-20 pt-16 md:pt-24 pb-12 md:pb-16 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]"
        >
            {/* The structural solid yellow box from the images (using DEOS theme #EAB308) */}
            <div 
                ref={yellowBoxRef}
                className="mx-3 md:mx-6 lg:mx-8 bg-[var(--color-primary)] rounded-[1rem] md:rounded-[1.5rem] p-4 md:p-6 lg:p-8 relative min-h-0 md:min-h-[600px] flex flex-col justify-between"
            >
                {/* TOP PILL BAR */}
                <div className="bg-[#050505] text-white rounded-[0.75rem] md:rounded-[1rem] flex justify-between items-center px-4 md:px-6 py-3 md:py-5">
                    <div
                        className="flex items-center gap-1 uppercase tracking-tighter text-base md:text-2xl lg:text-3xl"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        DEOS ORIGINALS<span className="text-[#EAB308] font-sans text-sm md:text-xl ml-1">{'<'}</span>
                    </div>
                    
                    <a 
                        href="mailto:deosoriginals@gmail.com" 
                        className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                    >
                        <span 
                            className="hidden sm:block text-white uppercase text-lg md:text-2xl tracking-tighter"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            Contact Us
                        </span>
                        {/* Rounded white icon button exactly like the picture */}
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-xl flex items-center justify-center text-black pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                            </svg>
                        </div>
                    </a>
                </div>

                {/* MIDDLE / BOTTOM INFO */}
                <div className="flex flex-col lg:flex-row justify-between items-end mt-10 md:mt-24 lg:mt-32 gap-8 md:gap-16 px-1 md:px-4 lg:px-6 pb-4">
                    
                    {/* LEFT COLUMN: GET IN TOUCH & SOCIALS */}
                    <div className="w-full lg:w-3/5 flex flex-col">
                        <h2 
                            className="text-[#1a1a1a] text-[11vw] sm:text-[11vw] lg:text-[8vw] leading-[0.8] tracking-tighter mb-4 md:mb-6 uppercase"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            Get In Touch
                        </h2>
                        
                        {/* Thin dashed horizontal line matching the exact image */}
                        <div className="w-full border-t border-dashed border-[#1a1a1a] opacity-40 my-8" />
                        
                        <p 
                            className="text-[#1a1a1a] font-medium text-xs md:text-sm max-w-sm mb-8 leading-relaxed" 
                            style={{ fontFamily: 'var(--font-body)' }}
                        >
                            Stories that captivate, content that lasts. We build brands that stand on their own.
                        </p>
                    </div>

                    {/* RIGHT COLUMN: CONTACT INFO & BACK TO TOP */}
                    <div className="w-full lg:w-2/5 flex flex-col justify-end text-[#1a1a1a] text-sm md:text-xl space-y-4 md:space-y-6 uppercase tracking-tighter pb-2 lg:pb-6" style={{ fontFamily: 'var(--font-display)' }}>
                        <div className="flex items-start gap-4 lg:gap-8">
                            <span className="w-12 text-[#1a1a1a]" style={{ fontFamily: 'var(--font-display)' }}>H.Q.</span>
                            <span>Mysore, India</span>
                        </div>
                        <div className="flex items-start gap-4 lg:gap-8">
                            <span className="w-12 text-[#1a1a1a]" style={{ fontFamily: 'var(--font-display)' }}>E.</span>
                            {/* Make email wrap nicely */}
                            <a href="mailto:deosoriginals@gmail.com" className="hover:opacity-60 transition-opacity break-all">
                                DEOSORIGINALS@GMAIL.COM
                            </a>
                        </div>
                        <div className="flex items-start gap-4 lg:gap-8">
                            <span className="w-12 text-[#1a1a1a]" style={{ fontFamily: 'var(--font-display)' }}>P.</span>
                            <a href="tel:+919110851733" className="hover:opacity-60 transition-opacity break-all">
                                9110851733 / +91 78925 72758
                            </a>
                        </div>
                        <div className="flex items-center gap-4 lg:gap-8 pt-8 md:pt-12 cursor-pointer hover:opacity-60 transition-opacity" onClick={handleScrollToTop}>
                            <span className="w-12 text-[#1a1a1a] flex items-center justify-start text-xl md:text-2xl">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                                </svg>
                            </span>
                            <button className="uppercase tracking-tighter text-sm md:text-base">
                                Go Back To Top
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        // Animate nav line width on scroll
        gsap.fromTo(
            lineRef.current,
            { scaleX: 0 },
            {
                scaleX: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: document.body,
                    start: '100px top',
                    end: '200px top',
                    scrub: true,
                },
            }
        );
    }, []);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const handleScrollTop = () => {
        setMenuOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNavClick = (item: string) => {
        setMenuOpen(false);
        const el = document.getElementById(item.toLowerCase());
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    const navItems = ['About', 'Projects', 'Team', 'Contact'];

    return (
        <>
            <nav
                ref={navRef}
                className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl"
            >
                <div className="px-5 md:px-10 py-4 md:py-5 flex justify-between items-center">
                    <button
                        onClick={handleScrollTop}
                        className="text-white text-xl md:text-2xl tracking-tighter uppercase cursor-pointer"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        DEOS<span className="text-[var(--color-primary)]">ORIGINALS</span>
                        <span className="text-[var(--color-primary)] text-xs align-top font-sans">©</span>
                    </button>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-10">
                        {navItems.map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-[10px] uppercase tracking-[0.25em] text-gray-400 hover:text-white transition-colors duration-500 font-semibold"
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    <a
                        href="mailto:deosoriginals@gmail.com"
                        className="hidden md:flex items-center gap-2 border border-gray-700 text-white px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[var(--color-primary)] hover:text-black hover:border-[var(--color-primary)] transition-all duration-500"
                    >
                        Get in Touch
                    </a>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden flex flex-col gap-[5px] cursor-pointer relative w-7 h-5 justify-center"
                        aria-label="Toggle menu"
                    >
                        <span
                            className={`block w-full h-[2px] bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[3.5px]' : ''
                                }`}
                        />
                        <span
                            className={`block w-full h-[2px] bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''
                                }`}
                        />
                    </button>
                </div>
                <div
                    ref={lineRef}
                    className="h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent origin-left"
                    style={{ transform: 'scaleX(0)' }}
                />
            </nav>

            {/* Mobile menu overlay */}
            <div
                className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-500 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            >
                <div className="flex flex-col items-center gap-8">
                    {navItems.map((item, i) => (
                        <button
                            key={item}
                            onClick={() => handleNavClick(item)}
                            className="text-2xl uppercase tracking-[0.15em] text-white font-bold cursor-pointer hover:text-[var(--color-primary)] transition-colors duration-300"
                            style={{
                                fontFamily: 'var(--font-display)',
                                transitionDelay: menuOpen ? `${i * 80}ms` : '0ms',
                                opacity: menuOpen ? 1 : 0,
                                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                                transition: 'all 0.4s ease',
                            }}
                        >
                            {item}
                        </button>
                    ))}
                    <a
                        href="mailto:deosoriginals@gmail.com"
                        className="mt-4 border border-[var(--color-primary)] text-[var(--color-primary)] px-8 py-3 text-sm font-bold uppercase tracking-[0.2em] hover:bg-[var(--color-primary)] hover:text-black transition-all duration-500"
                        style={{
                            opacity: menuOpen ? 1 : 0,
                            transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'all 0.4s ease 0.35s',
                        }}
                    >
                        Get in Touch
                    </a>
                </div>
            </div>
        </>
    );
}


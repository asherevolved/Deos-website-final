import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const isMobile = window.innerWidth < 768;

        const lenis = new Lenis({
            lerp: isMobile ? 0.1 : 0.05,
            smoothWheel: true,
            touchMultiplier: 1,
            infinite: false,
            autoRaf: false, // We'll use GSAP's ticker instead for perfect sync
        });

        lenisRef.current = lenis;

        // Sync Lenis scroll events with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        // Use GSAP's ticker for perfectly synced RAF
        const rafCallback = (time: number) => {
            lenis.raf(time * 1000);
        };
        gsap.ticker.add(rafCallback);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(rafCallback); // Remove the SAME function reference
            lenis.destroy();
        };
    }, []);

    return lenisRef;
}

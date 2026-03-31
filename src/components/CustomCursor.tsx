import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        // Force hotspot offset without conflict with gsap x/y tweens
        // Point is on the right side of the inner mirrored image, so xPercent is -85.
        gsap.set(cursor, { xPercent: -85, yPercent: -15, x: -100, y: -100 });

        // Hide cursor natively
        document.documentElement.style.cursor = 'none';

        // Hide link cursors
        const style = document.createElement('style');
        style.innerHTML = `
            * { cursor: none !important; }
        `;
        document.head.appendChild(style);

        const onMouseMove = (e: MouseEvent) => {
            if (!isVisible) setIsVisible(true);
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1, // brief smoothing
                ease: 'power3.out'
            });
        };

        window.addEventListener('mousemove', onMouseMove);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            document.head.removeChild(style);
            document.documentElement.style.cursor = '';
        };
    }, [isVisible]);

    return (
        <div
            ref={cursorRef}
            className={`fixed top-0 left-0 w-[100px] h-[100px] pointer-events-none z-[9999] hidden md:block transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
            {/* Native image pointing right, aligning right tip (85%, 15%) to raw cursor coordinate */}
            <div 
                className="w-full h-full"
                style={{
                    backgroundImage: 'url(/new-cursor.png)',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'top right',
                    filter: 'brightness(0) invert(1) drop-shadow(0px 2px 4px rgba(0,0,0,0.5))'
                }}
            />
        </div>
    );
}

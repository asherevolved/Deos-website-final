import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function ScrollProgress() {
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const bar = barRef.current;
        if (!bar) return;

        const updateProgress = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollHeight <= 0) {
                gsap.set(bar, { scaleX: 0 });
                bar.style.opacity = '0';
                return;
            }
            
            const progress = Math.max(0, Math.min(1, window.scrollY / scrollHeight));
            gsap.set(bar, { scaleX: progress });
            bar.style.opacity = progress > 0.01 ? '1' : '0';
        };

        gsap.ticker.add(updateProgress);
        updateProgress();

        return () => {
            gsap.ticker.remove(updateProgress);
        };
    }, []);

    return (
        <div
            ref={barRef}
            className="fixed top-0 left-0 w-full h-[3px] z-[100] origin-left pointer-events-none"
            style={{
                background: 'linear-gradient(90deg, #EAB308, #FACC15)',
                transform: 'scaleX(0)',
                opacity: 0,
                transition: 'opacity 0.3s',
                willChange: 'transform',
            }}
        />
    );
}

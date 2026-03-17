export default function HorizontalMarquee() {
    const text = "DEOS ORIGINALS  ✦  CONTENT POWERHOUSE  ✦  NOT YOUR REGULAR  ✦  CREATION IS POWERFUL  ✦  ";

    return (
        <div className="py-5 overflow-hidden bg-[var(--color-primary)] relative">
            <div className="flex whitespace-nowrap animate-marquee">
                {[...Array(6)].map((_, i) => (
                    <span
                        key={i}
                        className="text-black text-sm md:text-lg font-bold uppercase tracking-[0.15em] mx-2"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        {text}
                    </span>
                ))}
            </div>
        </div>
    );
}

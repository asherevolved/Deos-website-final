export default function Location() {
  return (
    <section id="location" className="relative bg-black overflow-hidden py-14 md:py-20 lg:py-24">
      {/* Header */}
      <div className="px-5 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-primary)] font-bold block mb-6">
          Deos Originals · Mysuru
        </span>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
          <h2
            className="text-[12vw] md:text-[10vw] lg:text-[8vw] uppercase leading-[0.85] text-white tracking-tighter"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Our <span className="text-outline md:text-outline-thick">Office</span>
          </h2>
        </div>
        <div className="h-[2px] bg-gray-800" />
      </div>

      {/* Map + Info */}
      <div className="px-5 md:px-12 lg:px-24 max-w-7xl mx-auto mt-8 md:mt-12">
        <div className="border border-gray-800">
          {/* Street View iframe */}
          <div className="relative h-[340px] md:h-[460px] overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!4v1713000000000!6m8!1m7!1sCAoSLEFGMVFpcE43NHpEWHFLbWN4NkV4UWpNdlBBT2xRT2xOX2hQa0hGNlVob20!2m2!1d12.2749234!2d76.6106971!3f90!4f0!5f0.7820865974627469"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Deos Originals Street View"
              className="w-full h-full border-none block"
            />
            <div
              className="absolute bottom-3 left-3 bg-black text-[var(--color-primary)] text-[11px] uppercase tracking-[0.12em] px-2.5 py-1 border border-gray-800 pointer-events-none"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Street View · Deos Originals
            </div>
          </div>

          {/* Address + CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center border-t border-gray-800">
            <div className="flex-1 p-5 md:p-8">
              <span
                className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-primary)] font-bold block mb-3"
              >
                Address
              </span>
              <p className="text-sm text-gray-500 leading-relaxed font-light tracking-wide">
                1st Floor, No. 4930, Near Kautilya School<br />
                Kanakadasa Nagar, Dattagalli 3rd Stage<br />
                Mysuru, Karnataka 570022, India
              </p>
            </div>
            <div className="px-5 pb-5 sm:px-8 sm:pb-0 sm:border-l sm:border-gray-800 shrink-0">
              <a
                href="https://www.google.com/maps/place/Deos+Originals/@12.2749234,76.6106971,17z"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[var(--color-primary)] text-black text-[13px] uppercase tracking-[0.12em] font-bold transition-opacity hover:opacity-85"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                  <path d="M21.71 11.29l-9-9a1 1 0 00-1.42 0l-9 9a1 1 0 000 1.42l9 9a1 1 0 001.42 0l9-9a1 1 0 000-1.42zM14 14.5V12h-4v3H8v-4a1 1 0 011-1h5V7.5l3.5 3.5-3.5 3.5z" fill="currentColor" />
                </svg>
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

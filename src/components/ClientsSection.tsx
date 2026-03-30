import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { InfiniteSlider } from '@/components/ui/InfiniteSlider';

gsap.registerPlugin(ScrollTrigger);

const clients = [
  { src: '/clients/Greeco_Final_logo_page-0001-removebg-preview (1).png', alt: 'Greeco' },
  { src: '/clients/LOUNGE29-LOGO.png', alt: 'Lounge 29' },
  { src: '/clients/MYSTUC_TAVERN_BANNER_5x6_page-0001-removebg-preview.png', alt: 'Mystuc Tavern' },
  { src: '/clients/Pataka Logo.png', alt: 'Pataka' },
  { src: '/clients/SVJ.png', alt: 'SVJ' },
  { src: '/clients/The pearl.png', alt: 'The Pearl' },
  { src: '/clients/WhatsApp_Image_2026-03-24_at_4.11.56_PM-removebg-preview.png', alt: 'Client 1' },
  { src: '/clients/images-removebg-preview.png', alt: 'Client 2' },
  { src: '/clients/sunburnunion_vel5hwh0mj.png', alt: 'Sunburn Union' },
];

export default function ClientsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { clipPath: 'inset(0 0 100% 0)', y: 40 },
        {
          clipPath: 'inset(0 0 0% 0)',
          y: 0,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="clients"
      className="py-24 md:py-32 bg-[var(--color-bg-deep)] grain-overlay relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-24 mb-14 md:mb-20">
        <div ref={headingRef}>
          <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-primary)] font-bold block mb-6">
            Our Portfolio
          </span>
          <h2
            className="text-[12vw] md:text-[9vw] lg:text-[7vw] leading-[0.85] uppercase text-white tracking-tighter"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Clients We{' '}
            <span className="text-outline-thick">Worked</span> With
          </h2>
        </div>
      </div>

      {/* Gradient fade edges */}
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10"
          style={{ background: 'linear-gradient(to right, var(--color-bg-deep), transparent)' }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10"
          style={{ background: 'linear-gradient(to left, var(--color-bg-deep), transparent)' }}
        />

        <InfiniteSlider gap={48} speed={60} speedOnHover={30}>
          {clients.map((client) => (
            <div
              key={client.alt}
              className="flex items-center justify-center px-6 py-4"
              style={{
                minWidth: client.src === '/clients/SVJ.png'
                  ? '320px'
                  : client.src === '/clients/images-removebg-preview.png'
                  ? '300px'
                  : '260px',
                height: '120px'
              }}
            >
              <img
                src={client.src}
                alt={client.alt}
                className={client.src === '/clients/SVJ.png'
                  ? 'w-[300px] h-[116px] object-contain select-none pointer-events-none'
                  : client.src === '/clients/images-removebg-preview.png'
                  ? 'w-[280px] h-[108px] object-contain select-none pointer-events-none'
                  : 'w-[220px] h-[84px] object-contain select-none pointer-events-none'}
                style={{ filter: client.src === '/clients/SVJ.png' ? 'brightness(0) invert(1)' : 'none' }}
                loading="lazy"
              />
            </div>
          ))}
        </InfiniteSlider>
      </div>

      {/* Bottom rule */}
      <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-24 mt-14 md:mt-20">
        <div className="h-[1px] bg-gradient-to-r from-[var(--color-primary)] via-gray-700 to-transparent" />
      </div>
    </section>
  );
}

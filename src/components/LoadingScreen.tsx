import { useEffect, useRef, useState } from 'react';

export default function LoadingScreen() {
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);
  const [pct, setPct] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let p = 0;
    intervalRef.current = setInterval(() => {
      p += Math.random() * 6 + 2;
      if (p >= 100) {
        p = 100;
        clearInterval(intervalRef.current!);
        setTimeout(() => {
          setExiting(true);
          setTimeout(() => setGone(true), 950);
        }, 420);
      }
      setPct(Math.floor(p));
    }, 90);
    return () => clearInterval(intervalRef.current!);
  }, []);

  if (gone) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--color-primary)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        transform: exiting ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 900ms cubic-bezier(0.76, 0, 0.24, 1)',
        willChange: 'transform',
      }}
    >
      {/* Corner labels */}
      <span style={{
        position: 'absolute', top: 24, left: 28,
        fontFamily: 'var(--font-display)', fontSize: 10,
        letterSpacing: '0.3em', textTransform: 'uppercase',
        color: '#000', opacity: 0.5,
      }}>
        DEOS · MMXXIII
      </span>
      <span style={{
        position: 'absolute', top: 28, right: 28,
        fontFamily: 'var(--font-body)', fontStyle: 'italic',
        fontSize: 12, letterSpacing: '0.05em',
        color: '#000', opacity: 0.5,
      }}>
        loading the studio
      </span>

      {/* Stage */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40 }}>
        {/* Logo */}
        <img
          src="/deos-logo.jpeg"
          alt="Deos Originals"
          style={{
            width: 'clamp(160px, 22vw, 260px)',
            height: 'auto',
            display: 'block',
            animation: 'loaderMarkIn 700ms cubic-bezier(0.22,1,0.36,1) 120ms both',
          }}
        />

        {/* Progress bar */}
        <div style={{ width: 'clamp(280px, 34vw, 420px)' }}>
          <div style={{
            position: 'relative', height: 1,
            background: 'rgba(0,0,0,0.18)', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0,
              width: `${pct}%`, height: '100%',
              background: '#000',
              transition: 'width 120ms linear',
            }} />
          </div>

          {/* Meta row */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            marginTop: 14,
            fontFamily: 'var(--font-display)',
            fontSize: 11, letterSpacing: '0.3em',
            color: '#000', opacity: 0.75,
            textTransform: 'uppercase',
          }}>
            <span>{String(pct).padStart(3, '0')}</span>
            <em style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', letterSpacing: '0.04em', textTransform: 'none', fontSize: 12, opacity: 0.8 }}>
              loading the studio
            </em>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes loaderMarkIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

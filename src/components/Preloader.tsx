import { useState, useEffect, useRef } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<'enter' | 'hold' | 'exit'>('enter');
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef(Date.now());

  useEffect(() => {
    const duration = 2400;

    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      const p = Math.min(elapsed / duration, 1);
      setProgress(p);

      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setPhase('hold');
        setTimeout(() => {
          setPhase('exit');
          setTimeout(onComplete, 800);
        }, 400);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [onComplete]);

  const eased = 1 - Math.pow(1 - progress, 3);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        background: '#0a0a0c',
        opacity: phase === 'exit' ? 0 : 1,
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: phase === 'exit' ? 'none' : 'auto',
      }}
    >
      {/* Background ambient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 40% 40% at 50% 50%, rgba(212,160,74,0.03) 0%, transparent 100%)',
        }}
      />

      {/* Center content */}
      <div className="relative text-center">
        {/* XL Logo */}
        <div
          className="mb-8"
          style={{
            opacity: eased,
            transform: `translateY(${(1 - eased) * 30}px)`,
          }}
        >
          <h1
            className="text-7xl md:text-8xl font-bold"
            style={{
              fontFamily: "'Cinzel', serif",
              background: `linear-gradient(135deg, #d4a04a 0%, #f0c050 ${eased * 100}%, #d4a04a 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.08em',
              filter: `drop-shadow(0 0 ${eased * 40}px rgba(212,160,74,${eased * 0.3}))`,
            }}
          >
            XL
          </h1>
        </div>

        {/* Divider line */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div
            className="h-[1px]"
            style={{
              width: `${eased * 80}px`,
              background: 'linear-gradient(90deg, transparent, #d4a04a)',
              opacity: eased,
            }}
          />
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: '#d4a04a',
              opacity: eased,
              boxShadow: `0 0 ${eased * 12}px rgba(212,160,74,0.5)`,
            }}
          />
          <div
            className="h-[1px]"
            style={{
              width: `${eased * 80}px`,
              background: 'linear-gradient(90deg, #d4a04a, transparent)',
              opacity: eased,
            }}
          />
        </div>

        {/* Subtitle */}
        <p
          className="text-xs tracking-[0.4em] uppercase mb-12"
          style={{
            fontFamily: "'Cinzel', serif",
            color: 'rgba(212,160,74,0.5)',
            opacity: Math.max(0, eased - 0.3) / 0.7,
            transform: `translateY(${(1 - eased) * 15}px)`,
          }}
        >
          Cafe & Billiards
        </p>

        {/* Progress bar */}
        <div className="w-48 mx-auto">
          <div
            className="h-[1px] relative overflow-hidden"
            style={{ background: 'rgba(212,160,74,0.1)' }}
          >
            <div
              className="absolute inset-y-0 left-0"
              style={{
                width: `${eased * 100}%`,
                background: 'linear-gradient(90deg, #d4a04a, #f0c050)',
                boxShadow: '0 0 8px rgba(212,160,74,0.5)',
                transition: 'none',
              }}
            />
          </div>
          <p
            className="text-[10px] tracking-widest mt-3"
            style={{
              color: 'rgba(245,240,232,0.2)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {Math.round(eased * 100)}%
          </p>
        </div>
      </div>

      {/* Corner accents */}
      <div
        className="absolute top-8 left-8"
        style={{
          width: 24,
          height: 24,
          borderLeft: '1px solid rgba(212,160,74,0.15)',
          borderTop: '1px solid rgba(212,160,74,0.15)',
          opacity: eased,
        }}
      />
      <div
        className="absolute top-8 right-8"
        style={{
          width: 24,
          height: 24,
          borderRight: '1px solid rgba(212,160,74,0.15)',
          borderTop: '1px solid rgba(212,160,74,0.15)',
          opacity: eased,
        }}
      />
      <div
        className="absolute bottom-8 left-8"
        style={{
          width: 24,
          height: 24,
          borderLeft: '1px solid rgba(212,160,74,0.15)',
          borderBottom: '1px solid rgba(212,160,74,0.15)',
          opacity: eased,
        }}
      />
      <div
        className="absolute bottom-8 right-8"
        style={{
          width: 24,
          height: 24,
          borderRight: '1px solid rgba(212,160,74,0.15)',
          borderBottom: '1px solid rgba(212,160,74,0.15)',
          opacity: eased,
        }}
      />
    </div>
  );
}

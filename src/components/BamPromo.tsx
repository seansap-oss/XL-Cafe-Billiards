import { useState, useEffect } from 'react';
import type { MorphState } from '../types';

interface BamPromoProps {
  morphState: MorphState;
}

export function BamPromo({ morphState }: BamPromoProps) {
  const { phase } = morphState;
  const isVisible = phase === 'zoom-complete' || phase === 'content-entrance';
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (phase === 'zoom-complete') {
      const timer = setTimeout(() => setEntered(true), 600);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  if (!isVisible) return null;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a0a0c 0%, #0f0f18 50%, #0a0a0c 100%)',
        zIndex: 25,
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0 ? '#d4a04a' : i % 3 === 1 ? '#8b5cf6' : '#3b82f6',
              opacity: 0.15 + Math.random() * 0.2,
              animation: `float${i % 3} ${8 + Math.random() * 12}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 40% at 50% 45%, rgba(212,160,74,0.08) 0%, transparent 100%)',
        }}
      />

      {/* Main content */}
      <div
        className="relative z-10 text-center px-6 max-w-3xl mx-auto"
        style={{
          opacity: entered ? 1 : 0,
          transform: entered ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
          transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* B.A.M. Logo */}
        <div className="mb-8">
          <div
            className="text-xs tracking-[0.5em] uppercase mb-4"
            style={{
              color: 'rgba(212,160,74,0.5)',
              fontFamily: "'Cinzel', serif",
              opacity: entered ? 1 : 0,
              transform: entered ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
            }}
          >
            This Friday at XL
          </div>

          <h1
            className="text-7xl md:text-9xl font-bold mb-4"
            style={{
              fontFamily: "'Cinzel', serif",
              background: 'linear-gradient(135deg, #d4a04a 0%, #f0c050 40%, #d4a04a 60%, #b8922f 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.05em',
              textShadow: 'none',
              filter: 'drop-shadow(0 0 40px rgba(212,160,74,0.2))',
              opacity: entered ? 1 : 0,
              transform: entered ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
            }}
          >
            B.A.M.
          </h1>

          <div
            className="flex items-center justify-center gap-4 mb-6"
            style={{
              opacity: entered ? 1 : 0,
              transition: 'opacity 1s ease 0.5s',
            }}
          >
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-amber-glow/30" />
            <span
              className="text-sm tracking-[0.3em] uppercase"
              style={{ color: '#d4a04a', fontFamily: "'Cinzel', serif" }}
            >
              Bring A Mate
            </span>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-amber-glow/30" />
          </div>

          <p
            className="text-lg md:text-xl mb-2"
            style={{
              color: 'rgba(245,240,232,0.7)',
              fontWeight: 300,
              letterSpacing: '0.02em',
              opacity: entered ? 1 : 0,
              transition: 'opacity 1s ease 0.6s',
            }}
          >
            Your crew drinks free when you bring a mate.
          </p>
          <p
            className="text-sm"
            style={{
              color: 'rgba(245,240,232,0.35)',
              opacity: entered ? 1 : 0,
              transition: 'opacity 1s ease 0.7s',
            }}
          >
            Every Friday &bull; 8PM till Late &bull; XL Billiards Lounge
          </p>
        </div>

        {/* Divider */}
        <div
          className="w-32 h-[1px] mx-auto mb-8"
          style={{
            background: 'linear-gradient(90deg, transparent, #d4a04a, transparent)',
            opacity: entered ? 1 : 0,
            transition: 'opacity 1s ease 0.8s',
          }}
        />

        {/* Feature cards */}
        <div
          className="grid grid-cols-3 gap-4 mb-10"
          style={{
            opacity: entered ? 1 : 0,
            transform: entered ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.9s',
          }}
        >
          {[
            { label: 'Free Drinks', detail: 'All night', icon: '01' },
            { label: 'Live DJs', detail: 'From 10PM', icon: '02' },
            { label: 'VIP Tables', detail: 'Book now', icon: '03' },
          ].map((item) => (
            <div
              key={item.label}
              className="p-4 rounded-lg text-center"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(212,160,74,0.1)',
              }}
            >
              <div
                className="text-xs mb-2 tracking-widest"
                style={{ color: '#d4a04a', fontFamily: "'Cinzel', serif" }}
              >
                {item.icon}
              </div>
              <div
                className="text-sm font-semibold mb-1"
                style={{ color: '#f5f0e8' }}
              >
                {item.label}
              </div>
              <div
                className="text-xs"
                style={{ color: 'rgba(245,240,232,0.4)' }}
              >
                {item.detail}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            opacity: entered ? 1 : 0,
            transform: entered ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 1.1s',
          }}
        >
          <button
            className="px-10 py-4 rounded-full text-sm tracking-[0.2em] uppercase font-semibold cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #d4a04a 0%, #b8922f 100%)',
              color: '#0a0a0c',
              fontFamily: "'Cinzel', serif",
              border: 'none',
              boxShadow: '0 0 30px rgba(212,160,74,0.2), 0 4px 20px rgba(0,0,0,0.4)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 0 50px rgba(212,160,74,0.3), 0 8px 30px rgba(0,0,0,0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(212,160,74,0.2), 0 4px 20px rgba(0,0,0,0.4)';
            }}
          >
            Reserve Your Table
          </button>
        </div>
      </div>

      <style>{`
        @keyframes float0 {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-5px); }
          75% { transform: translateY(-25px) translateX(8px); }
        }
        @keyframes float1 {
          0%, 100% { transform: translateY(0) translateX(0); }
          33% { transform: translateY(-15px) translateX(-12px); }
          66% { transform: translateY(-30px) translateX(6px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-18px) translateX(-8px); }
        }
      `}</style>
    </div>
  );
}

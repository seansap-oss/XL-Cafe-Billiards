import { useMemo, type CSSProperties } from 'react';
import type { MorphState } from '../types';
import { useSmoothValue } from '../hooks';

interface CinematicSceneProps {
  morphState: MorphState;
}

export function CinematicScene({ morphState }: CinematicSceneProps) {
  const { phase, cameraDepth } = morphState;
  const smoothDepth = useSmoothValue(cameraDepth, 0.05);

  const isVisible = phase === 'scene-reveal' || phase === 'zoom-approach' || phase === 'zoom-diving';
  if (!isVisible) return null;

  const phoneScale = 1 + smoothDepth * 2.5;
  const phoneTranslateY = -smoothDepth * 30;
  const overlayFade = 1 - smoothDepth * 0.7;

  const phoneStyle: CSSProperties = {
    position: 'absolute',
    bottom: '20%',
    left: '50%',
    transform: `translateX(-50%) translateY(${phoneTranslateY}px) scale(${phoneScale})`,
    transformOrigin: 'center bottom',
    willChange: 'transform',
    width: 180,
    height: 320,
    borderRadius: 24,
    background: 'linear-gradient(145deg, #1a1a2e 0%, #0f0f1a 100%)',
    border: '2px solid rgba(212,160,74,0.4)',
    boxShadow: `
      0 0 60px rgba(212,160,74,0.15),
      0 20px 60px rgba(0,0,0,0.6),
      inset 0 1px 0 rgba(255,255,255,0.1)
    `,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    zIndex: 20,
  };

  const screenGlow = useMemo(() => ({
    position: 'absolute' as const,
    inset: 8,
    borderRadius: 18,
    background: 'linear-gradient(180deg, rgba(212,160,74,0.12) 0%, rgba(139,92,246,0.08) 100%)',
    opacity: overlayFade,
  }), [overlayFade]);

  return (
    <div className="absolute inset-0 flex items-end justify-center overflow-hidden pointer-events-none">
      {/* Ambient lounge atmosphere */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 30%, rgba(212,160,74,0.04) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 30% 70%, rgba(139,92,246,0.03) 0%, transparent 50%),
            radial-gradient(ellipse 40% 40% at 70% 60%, rgba(59,130,246,0.02) 0%, transparent 50%)
          `,
          opacity: overlayFade,
        }}
      />

      {/* Billiard table hint - ambient green glow at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: 'linear-gradient(0deg, rgba(16,80,40,0.08) 0%, transparent 100%)',
          opacity: overlayFade,
        }}
      />

      {/* Phone device */}
      <div style={phoneStyle}>
        <div style={screenGlow} />

        {/* B.A.M. Promo content on screen */}
        <div className="relative z-10 text-center px-4">
          <div
            className="text-xs font-bold tracking-widest mb-2"
            style={{
              fontFamily: "'Cinzel', serif",
              color: '#d4a04a',
              textShadow: '0 0 20px rgba(212,160,74,0.5)',
            }}
          >
            B.A.M.
          </div>
          <div
            className="text-[8px] tracking-wider uppercase mb-3"
            style={{ color: 'rgba(245,240,232,0.6)' }}
          >
            Exclusive Promo
          </div>
          <div
            className="w-12 h-[1px] mx-auto mb-3"
            style={{ background: 'linear-gradient(90deg, transparent, #d4a04a, transparent)' }}
          />
          <div
            className="text-[7px] tracking-wide"
            style={{ color: 'rgba(245,240,232,0.4)' }}
          >
            Friday Nights
          </div>
        </div>

        {/* Notch */}
        <div
          className="absolute top-3 left-1/2 -translate-x-1/2"
          style={{
            width: 60,
            height: 6,
            borderRadius: 3,
            background: 'rgba(0,0,0,0.5)',
          }}
        />

        {/* Screen shine */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%)',
            borderRadius: 18,
          }}
        />
      </div>
    </div>
  );
}

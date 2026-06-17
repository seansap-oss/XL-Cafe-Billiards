import { useMemo, type CSSProperties } from 'react';
import type { MorphState } from '../types';
import { useSmoothValue } from '../hooks';

interface HeroMorphProps {
  morphState: MorphState;
  children: React.ReactNode;
}

const ASPECT_ratios = {
  '16:9': { width: 100, height: 56.25 },
  '4:3':  { width: 100, height: 75 },
  '9:16': { width: 56.25, height: 100 },
} as const;

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function HeroMorph({ morphState, children }: HeroMorphProps) {
  const { morphProgress, phase } = morphState;

  const smoothProgress = useSmoothValue(morphProgress, 0.06);

  const dimensions = useMemo(() => {
    if (smoothProgress <= 0) return ASPECT_ratios['16:9'];
    if (smoothProgress >= 1) return ASPECT_ratios['9:16'];

    if (smoothProgress < 0.5) {
      const t = smoothProgress / 0.5;
      return {
        width: lerp(ASPECT_ratios['16:9'].width, ASPECT_ratios['4:3'].width, t),
        height: lerp(ASPECT_ratios['16:9'].height, ASPECT_ratios['4:3'].height, t),
      };
    }
    const t = (smoothProgress - 0.5) / 0.5;
    return {
      width: lerp(ASPECT_ratios['4:3'].width, ASPECT_ratios['9:16'].width, t),
      height: lerp(ASPECT_ratios['4:3'].height, ASPECT_ratios['9:16'].height, t),
    };
  }, [smoothProgress]);

  const perspectiveZ = useMemo(() => {
    if (phase === 'hero-initial') return 0;
    if (phase === 'hero-morphing') return smoothProgress * 120;
    return 120 + (phase === 'hero-morphed' ? 0 : smoothProgress * 80);
  }, [phase, smoothProgress]);

  const rotateX = useMemo(() => {
    if (smoothProgress <= 0) return 0;
    return smoothProgress * 8;
  }, [smoothProgress]);

  const containerStyle: CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    width: `${dimensions.width}vmin`,
    height: `${dimensions.height}vmin`,
    maxWidth: '100vw',
    maxHeight: '100vh',
    transform: `
      translate(-50%, -50%)
      perspective(1200px)
      translate3d(0, 0, ${perspectiveZ}px)
      rotateX(${rotateX}deg)
    `,
    transformStyle: 'preserve-3d',
    willChange: 'transform, width, height',
    transition: 'none',
    borderRadius: smoothProgress > 0.8 ? `${lerp(0, 16, (smoothProgress - 0.8) / 0.2)}px` : '0px',
    overflow: 'hidden',
    zIndex: 10,
  };

  const vignetteOpacity = 0.3 + smoothProgress * 0.4;

  return (
    <div style={containerStyle} className="gpu-layer">
      <div className="absolute inset-0 overflow-hidden">
        {children}
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, transparent 30%, rgba(10,10,12,${vignetteOpacity}) 100%)`,
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, rgba(212,160,74,0.05) 0%, transparent 40%, rgba(10,10,12,0.3) 100%)`,
          opacity: 1 - smoothProgress * 0.5,
        }}
      />
    </div>
  );
}

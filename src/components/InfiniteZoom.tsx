import { useMemo, type CSSProperties } from 'react';
import type { MorphState } from '../types';
import { useSmoothValue } from '../hooks';

interface InfiniteZoomProps {
  morphState: MorphState;
  children: React.ReactNode;
}

export function InfiniteZoom({ morphState, children }: InfiniteZoomProps) {
  const { zoomProgress, cameraDepth, phase } = morphState;

  const smoothZoom = useSmoothValue(zoomProgress, 0.05);
  const smoothDepth = useSmoothValue(cameraDepth, 0.05);

  const isInZoomPhase = phase === 'zoom-approach' || phase === 'zoom-diving' || phase === 'zoom-complete';

  const scale = useMemo(() => {
    if (!isInZoomPhase) return 1;
    return 1 + smoothZoom * 14;
  }, [isInZoomPhase, smoothZoom]);

  const translateZ = useMemo(() => {
    if (!isInZoomPhase) return 0;
    return smoothDepth * -2000;
  }, [isInZoomPhase, smoothDepth]);

  const blurAmount = useMemo(() => {
    if (phase === 'zoom-diving') return smoothDepth * 2;
    return 0;
  }, [phase, smoothDepth]);

  const containerStyle: CSSProperties = {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transformStyle: 'preserve-3d',
    willChange: 'transform',
    transform: `
      perspective(1200px)
      translate3d(0, 0, ${translateZ}px)
      scale(${scale})
    `,
    filter: blurAmount > 0 ? `blur(${blurAmount}px)` : undefined,
  };

  const overlayOpacity = useMemo(() => {
    if (!isInZoomPhase) return 0;
    return Math.min(smoothZoom * 1.5, 0.6);
  }, [isInZoomPhase, smoothZoom]);

  const glowIntensity = useMemo(() => {
    if (!isInZoomPhase) return 0;
    return smoothZoom;
  }, [isInZoomPhase, smoothZoom]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div style={containerStyle} className="gpu-layer">
        {children}
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, 
            rgba(212,160,74,${glowIntensity * 0.15}) 0%, 
            transparent 50%)`,
          opacity: glowIntensity,
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, 
            rgba(10,10,12,${overlayOpacity}) 0%, 
            rgba(10,10,12,${overlayOpacity * 0.8}) 100%)`,
        }}
      />
    </div>
  );
}

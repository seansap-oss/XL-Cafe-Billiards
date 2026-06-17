import { useRef, useEffect, type CSSProperties } from 'react';

interface VideoPlayerProps {
  className?: string;
  style?: CSSProperties;
}

export function VideoPlayer({ className = '', style }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      style={{ width: '100%', height: '100%', objectFit: 'cover', ...style }}
      loop muted playsInline preload="auto"
    >
      <source src="/video/hero-loop.mp4" type="video/mp4" />
    </video>
  );
}

export function VideoFallback({ className = '', style }: VideoPlayerProps) {
  return (
    <div
      className={className}
      style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #0a0a0c 0%, #141418 20%, #1c1c24 40%, #141418 60%, #0a0a0c 80%, #141418 100%)',
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 30% 40% at 30% 40%, rgba(212,160,74,0.08) 0%, transparent 100%),
            radial-gradient(ellipse 25% 35% at 70% 50%, rgba(139,92,246,0.05) 0%, transparent 100%),
            radial-gradient(ellipse 20% 30% at 50% 70%, rgba(59,130,246,0.04) 0%, transparent 100%)
          `,
          animation: 'ambientShift 12s ease-in-out infinite alternate',
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-3xl font-bold mb-2" style={{ fontFamily: "'Cinzel', serif", color: 'rgba(212,160,74,0.2)', letterSpacing: '0.1em' }}>XL</div>
          <div className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(212,160,74,0.1)' }}>Cafe & Billiards</div>
        </div>
      </div>
      <style>{`@keyframes ambientShift { 0% { transform: scale(1) rotate(0deg); } 50% { transform: scale(1.1) rotate(2deg); } 100% { transform: scale(1) rotate(-1deg); } }`}</style>
    </div>
  );
}

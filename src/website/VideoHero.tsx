import { useState, useEffect, useRef, useCallback } from 'react';

const VIDEOS = [
  '/video/1 Bartender_shaking_cocktail_shaker_202606180056.mp4',
  '/video/2 Hand_racking_billiard_balls_202606180056.mp4',
  '/video/3 Audio_engineer_adjusting_faders_202606180056.mp4',
  '/video/4 Friends_looking_at_smartphone_sc._202606180057.mp4',
  '/video/5 Finger_taps_play_button_202606180145.mp4',
  '/video/XL video 1.mp4',
  '/video/XLvideo 2.mp4',
];

export function VideoHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [fading, setFading] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const nextRef = useRef<HTMLVideoElement>(null);

  const advance = useCallback(() => {
    const next = (currentIndex + 1) % VIDEOS.length;
    setNextIndex(next);
    setFading(true);

    // After crossfade, swap
    setTimeout(() => {
      setCurrentIndex(next);
      setNextIndex(null);
      setFading(false);
    }, 600);
  }, [currentIndex]);

  // Handle video end
  useEffect(() => {
    const video = videoRef.current;
    if (!video || fading) return;
    const handler = () => advance();
    video.addEventListener('ended', handler);
    return () => video.removeEventListener('ended', handler);
  }, [advance, fading]);

  // Play current video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.load();
    video.play().catch(() => {});
  }, [currentIndex]);

  // Play incoming video
  useEffect(() => {
    if (nextIndex === null) return;
    const video = nextRef.current;
    if (!video) return;
    video.load();
    video.play().catch(() => {});
  }, [nextIndex]);

  const handleDotClick = (index: number) => {
    if (fading || index === currentIndex) return;
    setNextIndex(index);
    setFading(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setNextIndex(null);
      setFading(false);
    }, 600);
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {/* Current video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: fading ? 0 : 1,
          transition: 'opacity 600ms ease',
        }}
        muted
        playsInline
        preload="auto"
        key={`v-${currentIndex}`}
      >
        <source src={VIDEOS[currentIndex]} type="video/mp4" />
      </video>

      {/* Incoming video */}
      {nextIndex !== null && (
        <video
          ref={nextRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 1 }}
          muted
          playsInline
          preload="auto"
          key={`n-${nextIndex}`}
        >
          <source src={VIDEOS[nextIndex]} type="video/mp4" />
        </video>
      )}

      {/* Dark overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(180deg, rgba(10,10,12,0.35) 0%, rgba(10,10,12,0.1) 40%, rgba(10,10,12,0.75) 100%),
            linear-gradient(0deg, rgba(10,10,12,0.5) 0%, transparent 30%)
          `,
        }}
      />

      {/* XL label on rainmaker videos */}
      {currentIndex >= 5 && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
          <span
            className="text-[9px] tracking-[0.3em] uppercase px-3 py-1"
            style={{
              background: 'rgba(212,160,74,0.15)',
              border: '1px solid rgba(212,160,74,0.3)',
              color: '#d4a04a',
            }}
          >
            XL
          </span>
        </div>
      )}

      {/* Video counter */}
      <div className="absolute top-6 left-6 z-20">
        <span
          className="text-[10px] tracking-wider"
          style={{ color: 'rgba(212,160,74,0.5)', fontFamily: 'monospace' }}
        >
          {String(currentIndex + 1).padStart(2, '0')} / {String(VIDEOS.length).padStart(2, '0')}
        </span>
      </div>

      {/* Progress dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {VIDEOS.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            className="cursor-pointer transition-all duration-500"
            style={{
              width: i === currentIndex ? 32 : 12,
              height: 2,
              background: i === currentIndex ? '#d4a04a' : 'rgba(245,240,232,0.25)',
              border: 'none',
            }}
          />
        ))}
      </div>
    </div>
  );
}

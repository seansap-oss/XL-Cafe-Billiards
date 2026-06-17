import { useState, useEffect, useRef, useCallback } from 'react';

const VIDEOS = [
  '/video/1 Bartender_shaking_cocktail_shaker_202606180056.mp4',
  '/video/2 Hand_racking_billiard_balls_202606180056.mp4',
  '/video/3 Audio_engineer_adjusting_faders_202606180056.mp4',
  '/video/4 Friends_looking_at_smartphone_sc._202606180057.mp4',
  '/video/5 Finger_taps_play_button_202606180145.mp4',
];

export function VideoHero() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  const currentRef = useRef<HTMLVideoElement>(null);
  const nextRef = useRef<HTMLVideoElement>(null);
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const isMountedRef = useRef(true);

  const advance = useCallback(() => {
    if (!isMountedRef.current) return;
    setFading(true);
    setTimeout(() => {
      if (!isMountedRef.current) return;
      setIndex((prev) => (prev + 1) % VIDEOS.length);
      setFading(false);
    }, 800);
  }, []);

  const handleEnd = useCallback(() => {
    if (!fading) advance();
  }, [fading, advance]);

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => { isMountedRef.current = false; };
  }, []);

  // Play current video + set fallback
  useEffect(() => {
    if (!isMountedRef.current) return;
    
    clearTimeout(fallbackTimerRef.current);
    const video = currentRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.play().catch(() => {});

    fallbackTimerRef.current = setTimeout(() => {
      if (isMountedRef.current && !fading) advance();
    }, 30000);

    return () => clearTimeout(fallbackTimerRef.current);
  }, [index, fading]);

  // Preload next video
  useEffect(() => {
    if (!isMountedRef.current) return;
    nextRef.current?.load();
  }, [index]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {/* Current video */}
      <video
        ref={currentRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
        onEnded={handleEnd}
        style={{
          opacity: fading ? 0 : 1,
          transition: `opacity 800ms ease`,
          zIndex: fading ? 1 : 2,
        }}
        key={`cur-${index}`}
      >
        <source src={VIDEOS[index]} type="video/mp4" />
      </video>

      {/* Next video (preloaded, fades in) */}
      <video
        ref={nextRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
        onEnded={handleEnd}
        style={{
          opacity: fading ? 1 : 0,
          transition: `opacity 800ms ease`,
          zIndex: fading ? 2 : 1,
        }}
        key={`next-${(index + 1) % VIDEOS.length}`}
      >
        <source src={VIDEOS[(index + 1) % VIDEOS.length]} type="video/mp4" />
      </video>

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

      {/* Video counter */}
      <div className="absolute top-6 left-6 z-20">
        <span
          className="text-[10px] tracking-wider"
          style={{ color: 'rgba(212,160,74,0.5)', fontFamily: 'monospace' }}
        >
          {String(index + 1).padStart(2, '0')} / {String(VIDEOS.length).padStart(2, '0')}
        </span>
      </div>

      {/* Progress dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {VIDEOS.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              clearTimeout(fallbackTimerRef.current);
              setFading(false);
              setIndex(i);
            }}
            className="cursor-pointer transition-all duration-500"
            style={{
              width: i === index ? 32 : 12,
              height: 2,
              background: i === index ? '#d4a04a' : 'rgba(245,240,232,0.25)',
              border: 'none',
            }}
          />
        ))}
      </div>
    </div>
  );
}

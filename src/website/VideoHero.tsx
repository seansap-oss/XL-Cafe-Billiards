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

const FADE_MS = 600;
const FALLBACK_MS = 15000;

export function VideoHero() {
  const [index, setIndex] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const [activeIsA, setActiveIsA] = useState(true);

  const aRef = useRef<HTMLVideoElement>(null);
  const bRef = useRef<HTMLVideoElement>(null);
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const advance = useCallback(() => {
    setShowNext(true);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % VIDEOS.length);
      setShowNext(false);
      setActiveIsA((prev) => !prev);
    }, FADE_MS);
  }, [activeIsA]);

  // Play active video + set fallback timer
  useEffect(() => {
    const video = activeIsA ? aRef.current : bRef.current;
    if (!video) return;

    clearTimeout(fallbackTimerRef.current);
    video.currentTime = 0;
    video.play().catch(() => {});

    fallbackTimerRef.current = setTimeout(() => {
      if (!showNext) advance();
    }, FALLBACK_MS);

    return () => clearTimeout(fallbackTimerRef.current);
  }, [index, activeIsA, showNext, advance]);

  // Preload next video
  useEffect(() => {
    const nextVideo = activeIsA ? bRef.current : aRef.current;
    if (nextVideo) nextVideo.load();
  }, [index, activeIsA]);

  const currentSrc = VIDEOS[index];
  const nextSrc = VIDEOS[(index + 1) % VIDEOS.length];

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <video
        ref={aRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
        onEnded={() => !showNext && advance()}
        style={{
          opacity: activeIsA ? (showNext ? 0 : 1) : (showNext ? 1 : 0),
          transition: `opacity ${FADE_MS}ms ease`,
          zIndex: activeIsA ? (showNext ? 1 : 2) : (showNext ? 2 : 1),
        }}
        key={`a-${activeIsA ? index : (index + 1) % VIDEOS.length}`}
      >
        <source src={activeIsA ? currentSrc : nextSrc} type="video/mp4" />
      </video>

      <video
        ref={bRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
        onEnded={() => !showNext && advance()}
        style={{
          opacity: !activeIsA ? (showNext ? 0 : 1) : (showNext ? 1 : 0),
          transition: `opacity ${FADE_MS}ms ease`,
          zIndex: !activeIsA ? (showNext ? 1 : 2) : (showNext ? 2 : 1),
        }}
        key={`b-${!activeIsA ? index : (index + 1) % VIDEOS.length}`}
      >
        <source src={!activeIsA ? currentSrc : nextSrc} type="video/mp4" />
      </video>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(180deg, rgba(10,10,12,0.35) 0%, rgba(10,10,12,0.1) 40%, rgba(10,10,12,0.75) 100%),
            linear-gradient(0deg, rgba(10,10,12,0.5) 0%, transparent 30%)
          `,
        }}
      />

      {index >= 5 && (
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

      <div className="absolute top-6 left-6 z-20">
        <span
          className="text-[10px] tracking-wider"
          style={{ color: 'rgba(212,160,74,0.5)', fontFamily: 'monospace' }}
        >
          {String(index + 1).padStart(2, '0')} / {String(VIDEOS.length).padStart(2, '0')}
        </span>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {VIDEOS.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              clearTimeout(fallbackTimerRef.current);
              setShowNext(false);
              setIndex(i);
              setActiveIsA(true);
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

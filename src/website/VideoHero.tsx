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

const FADE_MS = 500;

export function VideoHero() {
  const [index, setIndex] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const [ready, setReady] = useState(false);

  const aRef = useRef<HTMLVideoElement>(null);
  const bRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const activeRef = useRef<'a' | 'b'>('a');

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % VIDEOS.length);
  }, []);

  // When "ready" flips, it means the incoming video can play
  useEffect(() => {
    if (!ready) return;
    const incoming = activeRef.current === 'a' ? aRef.current : bRef.current;
    if (!incoming) return;

    incoming.currentTime = 0;
    incoming.play().catch(() => {});

    // Fade in
    setShowNext(true);

    // After fade, hide old and reset
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setShowNext(false);
      setReady(false);
      activeRef.current = activeRef.current === 'a' ? 'b' : 'a';
    }, FADE_MS + 50);
  }, [ready]);

  // Handle "a" video ended
  const handleAEnd = useCallback(() => {
    if (activeRef.current !== 'a') return;
    next();
    setReady(true);
  }, [next]);

  // Handle "b" video ended
  const handleBEnd = useCallback(() => {
    if (activeRef.current !== 'b') return;
    next();
    setReady(true);
  }, [next]);

  // Play the active video when index changes
  useEffect(() => {
    clearTimeout(timerRef.current);
    setShowNext(false);
    setReady(false);

    const active = activeRef.current === 'a' ? aRef.current : bRef.current;
    if (!active) return;

    // Small delay to ensure DOM update
    const t = setTimeout(() => {
      active.currentTime = 0;
      active.play().catch(() => {});
    }, 50);
    return () => clearTimeout(t);
  }, [index]);

  // Cleanup
  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const activeSrc = VIDEOS[index];
  const nextIdx = (index + 1) % VIDEOS.length;
  const activeIsA = activeRef.current === 'a';

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {/* Video A */}
      <video
        ref={aRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
        onEnded={handleAEnd}
        style={{
          opacity: activeIsA ? 1 : showNext ? 0 : 1,
          transition: `opacity ${FADE_MS}ms ease`,
          zIndex: activeIsA ? 2 : 1,
        }}
        key={`a-${activeIsA ? index : nextIdx}`}
      >
        <source src={activeIsA ? activeSrc : VIDEOS[nextIdx]} type="video/mp4" />
      </video>

      {/* Video B */}
      <video
        ref={bRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
        onEnded={handleBEnd}
        style={{
          opacity: !activeIsA ? 1 : showNext ? 1 : 0,
          transition: `opacity ${FADE_MS}ms ease`,
          zIndex: !activeIsA ? 2 : 1,
        }}
        key={`b-${!activeIsA ? index : nextIdx}`}
      >
        <source src={!activeIsA ? activeSrc : VIDEOS[nextIdx]} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(180deg, rgba(10,10,12,0.35) 0%, rgba(10,10,12,0.1) 40%, rgba(10,10,12,0.75) 100%),
            linear-gradient(0deg, rgba(10,10,12,0.5) 0%, transparent 30%)
          `,
          zIndex: 3,
        }}
      />

      {/* XL label on rainmaker videos */}
      {index >= 5 && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2" style={{ zIndex: 4 }}>
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
      <div className="absolute top-6 left-6" style={{ zIndex: 4 }}>
        <span
          className="text-[10px] tracking-wider"
          style={{ color: 'rgba(212,160,74,0.5)', fontFamily: 'monospace' }}
        >
          {String(index + 1).padStart(2, '0')} / {String(VIDEOS.length).padStart(2, '0')}
        </span>
      </div>

      {/* Progress dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2" style={{ zIndex: 4 }}>
        {VIDEOS.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              clearTimeout(timerRef.current);
              setShowNext(false);
              setReady(false);
              setIndex(i);
              activeRef.current = 'a';
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

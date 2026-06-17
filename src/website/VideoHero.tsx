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

type TransitionType =
  | 'bend-up'
  | 'bend-down'
  | 'tilt-left'
  | 'tilt-right'
  | 'ripple'
  | 'zoom-in'
  | 'zoom-out'
  | 'slide-left'
  | 'slide-right'
  | 'flip'
  | 'spin'
  | 'glitch';

const TRANSITIONS: { type: TransitionType; css: string }[] = [
  { type: 'bend-up', css: 'perspective(800px) rotateX(-12deg) scale(1.08)' },
  { type: 'bend-down', css: 'perspective(800px) rotateX(12deg) scale(1.08)' },
  { type: 'tilt-left', css: 'perspective(800px) rotateY(-10deg) scale(1.05)' },
  { type: 'tilt-right', css: 'perspective(800px) rotateY(10deg) scale(1.05)' },
  { type: 'ripple', css: 'scale(1.1) skewX(2deg)' },
  { type: 'zoom-in', css: 'scale(1.2)' },
  { type: 'zoom-out', css: 'scale(0.85)' },
  { type: 'slide-left', css: 'translateX(-15%) scale(1.08)' },
  { type: 'slide-right', css: 'translateX(15%) scale(1.08)' },
  { type: 'flip', css: 'perspective(800px) rotateY(80deg)' },
  { type: 'spin', css: 'rotate(4deg) scale(1.1)' },
  { type: 'glitch', css: 'scale(1.03) skewX(-2deg)' },
];

function getRandomTransition() {
  return TRANSITIONS[Math.floor(Math.random() * TRANSITIONS.length)];
}

export function VideoHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [incomingIndex, setIncomingIndex] = useState<number | null>(null);
  const [transition, setTransition] = useState(TRANSITIONS[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const incomingRef = useRef<HTMLVideoElement>(null);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;

    const nextIndex = (currentIndex + 1) % VIDEOS.length;
    const newTransition = getRandomTransition();

    setTransition(newTransition);
    setIncomingIndex(nextIndex);
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setIncomingIndex(null);
      setIsTransitioning(false);
    }, 800);
  }, [currentIndex, isTransitioning]);

  // Handle video end
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handler = () => goToNext();
    video.addEventListener('ended', handler);
    return () => video.removeEventListener('ended', handler);
  }, [goToNext]);

  // Load and play current video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.load();
    video.play().catch(() => {});
  }, [currentIndex]);

  // Load incoming video
  useEffect(() => {
    if (incomingIndex === null) return;
    const video = incomingRef.current;
    if (!video) return;
    video.load();
    video.play().catch(() => {});
  }, [incomingIndex]);

  const handleDotClick = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    const newTransition = getRandomTransition();
    setTransition(newTransition);
    setIncomingIndex(index);
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentIndex(index);
      setIncomingIndex(null);
      setIsTransitioning(false);
    }, 800);
  };

  const isRainmaker = currentIndex >= 5;

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {/* Current video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transform: isTransitioning ? transition.css : 'none',
          transition: isTransitioning ? 'transform 800ms cubic-bezier(0.4, 0, 0.2, 1), opacity 800ms ease' : 'none',
          opacity: isTransitioning ? 0 : 1,
        }}
        muted
        playsInline
        preload="auto"
        key={`vid-${currentIndex}`}
      >
        <source src={VIDEOS[currentIndex]} type="video/mp4" />
      </video>

      {/* Incoming video */}
      {incomingIndex !== null && (
        <video
          ref={incomingRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
          key={`inc-${incomingIndex}`}
        >
          <source src={VIDEOS[incomingIndex]} type="video/mp4" />
        </video>
      )}

      {/* Dark overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(180deg, rgba(10,10,12,0.3) 0%, rgba(10,10,12,0.1) 40%, rgba(10,10,12,0.7) 100%),
            linear-gradient(0deg, rgba(10,10,12,0.5) 0%, transparent 30%)
          `,
        }}
      />

      {/* XL label on rainmaker */}
      {isRainmaker && (
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

      {/* Transition name label */}
      {isTransitioning && (
        <div
          className="absolute top-6 right-6 px-3 py-1 text-[9px] tracking-wider uppercase z-20"
          style={{
            background: 'rgba(212,160,74,0.15)',
            border: '1px solid rgba(212,160,74,0.3)',
            color: '#d4a04a',
          }}
        >
          {transition.type}
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

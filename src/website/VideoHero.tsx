import { useState, useEffect, useRef, useCallback } from 'react';

const VIDEOS = [
  '/video/1 Bartender_shaking_cocktail_shaker_202606180056.mp4',
  '/video/2 Hand_racking_billiard_balls_202606180056.mp4',
  '/video/3 Audio_engineer_adjusting_faders_202606180056.mp4',
  '/video/4 Friends_looking_at_smartphone_sc._202606180057.mp4',
  '/video/5 Finger_taps_play_button_202606180145.mp4',
  '/video/rainmaker video 1.mp4',
  '/video/rainmakervideo 2.mp4',
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
  {
    type: 'bend-up',
    css: 'perspective(800px) rotateX(-15deg) scale(1.1)',
  },
  {
    type: 'bend-down',
    css: 'perspective(800px) rotateX(15deg) scale(1.1)',
  },
  {
    type: 'tilt-left',
    css: 'perspective(800px) rotateY(-12deg) scale(1.05)',
  },
  {
    type: 'tilt-right',
    css: 'perspective(800px) rotateY(12deg) scale(1.05)',
  },
  {
    type: 'ripple',
    css: 'scale(1.15) skewX(3deg)',
  },
  {
    type: 'zoom-in',
    css: 'scale(1.3)',
  },
  {
    type: 'zoom-out',
    css: 'scale(0.8)',
  },
  {
    type: 'slide-left',
    css: 'translateX(-20%) scale(1.1)',
  },
  {
    type: 'slide-right',
    css: 'translateX(20%) scale(1.1)',
  },
  {
    type: 'flip',
    css: 'perspective(800px) rotateY(90deg) scale(0.9)',
  },
  {
    type: 'spin',
    css: 'rotate(5deg) scale(1.15)',
  },
  {
    type: 'glitch',
    css: 'scale(1.05) skewX(-2deg)',
  },
];

function getRandomTransition(): { type: TransitionType; css: string } {
  return TRANSITIONS[Math.floor(Math.random() * TRANSITIONS.length)];
}

function getTransitionDuration(_type: TransitionType): number {
  return 1200;
}

export function VideoHero() {
  const [current, setCurrent] = useState(0);
  const [incoming, setIncoming] = useState<number | null>(null);
  const [transition, setTransition] = useState(TRANSITIONS[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevVideoRef = useRef<HTMLVideoElement>(null);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;

    const nextIndex = (current + 1) % VIDEOS.length;
    const newTransition = getRandomTransition();

    setTransition(newTransition);
    setIncoming(nextIndex);
    setIsTransitioning(true);

    // After transition completes, swap videos
    setTimeout(() => {
      setCurrent(nextIndex);
      setIncoming(null);
      setIsTransitioning(false);
    }, getTransitionDuration(newTransition.type));
  }, [current, isTransitioning]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || isTransitioning) return;

    const handleEnded = () => goToNext();
    video.addEventListener('ended', handleEnded);

    return () => video.removeEventListener('ended', handleEnded);
  }, [current, goToNext, isTransitioning]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.load();
    const playPromise = video.play();
    if (playPromise) playPromise.catch(() => {});
  }, [current]);

  // Load incoming video
  useEffect(() => {
    if (incoming === null) return;
    const video = prevVideoRef.current;
    if (!video) return;
    video.load();
    const playPromise = video.play();
    if (playPromise) playPromise.catch(() => {});
  }, [incoming]);

  const handleDotClick = (index: number) => {
    if (isTransitioning || index === current) return;
    const newTransition = getRandomTransition();
    setTransition(newTransition);
    setIncoming(index);
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrent(index);
      setIncoming(null);
      setIsTransitioning(false);
    }, getTransitionDuration(newTransition.type));
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {/* Current video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transform: isTransitioning ? transition.css : 'none',
          transition: isTransitioning ? `transform ${getTransitionDuration(transition.type)}ms cubic-bezier(0.4, 0, 0.2, 1)` : 'none',
          opacity: isTransitioning ? 0 : 1,
        }}
        muted
        playsInline
        preload="auto"
        key={`current-${current}`}
      >
        <source src={VIDEOS[current]} type="video/mp4" />
      </video>

      {/* Incoming video */}
      {incoming !== null && (
        <video
          ref={prevVideoRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: 1,
          }}
          muted
          playsInline
          preload="auto"
          key={`incoming-${incoming}`}
        >
          <source src={VIDEOS[incoming]} type="video/mp4" />
        </video>
      )}

      {/* Transition flash effect */}
      {isTransitioning && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${50 + (Math.random() * 30 - 15)}% ${50 + (Math.random() * 30 - 15)}%, rgba(212,160,74,0.08) 0%, transparent 60%)`,
            animation: `flash ${getTransitionDuration(transition.type)}ms ease-out`,
          }}
        />
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

      {/* Transition name indicator (debug) */}
      {isTransitioning && (
        <div
          className="absolute top-6 right-6 px-3 py-1 text-[9px] tracking-wider uppercase z-20"
          style={{
            background: 'rgba(212,160,74,0.15)',
            border: '1px solid rgba(212,160,74,0.3)',
            color: '#d4a04a',
            animation: 'fade-in 0.2s ease',
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
          {String(current + 1).padStart(2, '0')} / {String(VIDEOS.length).padStart(2, '0')}
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
              width: i === current ? 32 : 12,
              height: 2,
              background: i === current ? '#d4a04a' : 'rgba(245,240,232,0.25)',
              border: 'none',
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes flash {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

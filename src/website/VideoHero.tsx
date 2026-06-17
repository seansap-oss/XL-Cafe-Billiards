import { useState, useEffect, useRef, useCallback } from 'react';

const VIDEOS = [
  '/video/1 Bartender_shaking_cocktail_shaker_202606180056.mp4',
  '/video/2 Hand_racking_billiard_balls_202606180056.mp4',
  '/video/3 Audio_engineer_adjusting_faders_202606180056.mp4',
  '/video/4 Friends_looking_at_smartphone_sc._202606180057.mp4',
  '/video/5 Finger_taps_play_button_202606180145.mp4',
];

const RAINMAKER_VIDEOS = [
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
  { type: 'bend-up', css: 'perspective(800px) rotateX(-15deg) scale(1.1)' },
  { type: 'bend-down', css: 'perspective(800px) rotateX(15deg) scale(1.1)' },
  { type: 'tilt-left', css: 'perspective(800px) rotateY(-12deg) scale(1.05)' },
  { type: 'tilt-right', css: 'perspective(800px) rotateY(12deg) scale(1.05)' },
  { type: 'ripple', css: 'scale(1.15) skewX(3deg)' },
  { type: 'zoom-in', css: 'scale(1.3)' },
  { type: 'zoom-out', css: 'scale(0.8)' },
  { type: 'slide-left', css: 'translateX(-20%) scale(1.1)' },
  { type: 'slide-right', css: 'translateX(20%) scale(1.1)' },
  { type: 'flip', css: 'perspective(800px) rotateY(90deg) scale(0.9)' },
  { type: 'spin', css: 'rotate(5deg) scale(1.15)' },
  { type: 'glitch', css: 'scale(1.05) skewX(-2deg)' },
];

function getRandomTransition() {
  return TRANSITIONS[Math.floor(Math.random() * TRANSITIONS.length)];
}

export function VideoHero() {
  const [phase, setPhase] = useState<'sequence' | 'rainmaker'>('sequence');
  const [sequenceIndex, setSequenceIndex] = useState(0);
  const [rainmakerIndex, setRainmakerIndex] = useState(0);
  const [incoming, setIncoming] = useState<number | null>(null);
  const [transition, setTransition] = useState(TRANSITIONS[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const incomingRef = useRef<HTMLVideoElement>(null);

  // Sequence videos 1-5: simple cuts
  const handleSequenceEnded = useCallback(() => {
    if (sequenceIndex < VIDEOS.length - 1) {
      setSequenceIndex((prev) => prev + 1);
    } else {
      // Done with 1-5, switch to rainmaker phase
      setPhase('rainmaker');
      setRainmakerIndex(0);
    }
  }, [sequenceIndex]);

  // Rainmaker videos: wild transitions
  const handleRainmakerEnded = useCallback(() => {
    if (rainmakerIndex < RAINMAKER_VIDEOS.length - 1) {
      const nextIndex = rainmakerIndex + 1;
      const newTransition = getRandomTransition();
      setTransition(newTransition);
      setIncoming(nextIndex);
      setIsTransitioning(true);

      setTimeout(() => {
        setRainmakerIndex(nextIndex);
        setIncoming(null);
        setIsTransitioning(false);
      }, 1200);
    } else {
      // Loop back to start
      setPhase('sequence');
      setSequenceIndex(0);
      setRainmakerIndex(0);
    }
  }, [rainmakerIndex]);

  // Load and play current video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.load();
    const playPromise = video.play();
    if (playPromise) playPromise.catch(() => {});
  }, [sequenceIndex, rainmakerIndex, phase]);

  // Load incoming video for rainmaker transitions
  useEffect(() => {
    if (incoming === null) return;
    const video = incomingRef.current;
    if (!video) return;
    video.load();
    const playPromise = video.play();
    if (playPromise) playPromise.catch(() => {});
  }, [incoming]);

  // Handle video end
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handler = () => {
      if (phase === 'sequence') {
        handleSequenceEnded();
      } else {
        handleRainmakerEnded();
      }
    };

    video.addEventListener('ended', handler);
    return () => video.removeEventListener('ended', handler);
  }, [phase, handleSequenceEnded, handleRainmakerEnded]);

  const currentSrc = phase === 'sequence' ? VIDEOS[sequenceIndex] : RAINMAKER_VIDEOS[rainmakerIndex];
  const totalCount = VIDEOS.length + RAINMAKER_VIDEOS.length;
  const currentIndex = phase === 'sequence' ? sequenceIndex : VIDEOS.length + rainmakerIndex;

  const handleDotClick = (index: number) => {
    if (index < VIDEOS.length) {
      setPhase('sequence');
      setSequenceIndex(index);
    } else {
      setPhase('rainmaker');
      setRainmakerIndex(index - VIDEOS.length);
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {/* Current video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transform: isTransitioning ? transition.css : 'none',
          transition: isTransitioning ? 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          opacity: isTransitioning ? 0 : 1,
        }}
        muted
        playsInline
        preload="auto"
        key={`${phase}-${phase === 'sequence' ? sequenceIndex : rainmakerIndex}`}
      >
        <source src={currentSrc} type="video/mp4" />
      </video>

      {/* Incoming video (rainmaker transitions only) */}
      {incoming !== null && (
        <video
          ref={incomingRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
          key={`incoming-${incoming}`}
        >
          <source src={RAINMAKER_VIDEOS[incoming]} type="video/mp4" />
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

      {/* Transition name (debug) */}
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
          {String(currentIndex + 1).padStart(2, '0')} / {String(totalCount).padStart(2, '0')}
        </span>
      </div>

      {/* Phase label */}
      {phase === 'rainmaker' && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
          <span
            className="text-[9px] tracking-[0.3em] uppercase px-3 py-1"
            style={{
              background: 'rgba(212,160,74,0.1)',
              border: '1px solid rgba(212,160,74,0.2)',
              color: '#d4a04a',
            }}
          >
            Rainmaker
          </span>
        </div>
      )}

      {/* Progress dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {Array.from({ length: totalCount }).map((_, i) => (
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

import { useState, useEffect, useRef, useCallback } from 'react';

const VIDEOS = [
  '/video/1 Bartender_shaking_cocktail_shaker_202606180056.mp4',
  '/video/2 Hand_racking_billiard_balls_202606180056.mp4',
  '/video/3 Audio_engineer_adjusting_faders_202606180056.mp4',
  '/video/4 Friends_looking_at_smartphone_sc._202606180057.mp4',
];

export function VideoHero() {
  const [current, setCurrent] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const goToNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % VIDEOS.length);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => goToNext();
    video.addEventListener('ended', handleEnded);

    // Fallback: if video fails to load, advance after 5s
    const fallback = setTimeout(() => {
      if (video.readyState < 3) goToNext();
    }, 5000);

    return () => {
      video.removeEventListener('ended', handleEnded);
      clearTimeout(fallback);
    };
  }, [current, goToNext]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.load();
    const playPromise = video.play();
    if (playPromise) playPromise.catch(() => {});
  }, [current]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Current video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
        key={current}
      >
        <source src={VIDEOS[current]} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, rgba(10,10,12,0.4) 0%, rgba(10,10,12,0.3) 40%, rgba(10,10,12,0.8) 100%),
            linear-gradient(0deg, rgba(10,10,12,0.6) 0%, transparent 30%)
          `,
        }}
      />

      {/* Progress dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {VIDEOS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="w-8 h-[2px] cursor-pointer transition-all duration-500"
            style={{
              background: i === current ? '#d4a04a' : 'rgba(245,240,232,0.2)',
              border: 'none',
            }}
          />
        ))}
      </div>
    </div>
  );
}

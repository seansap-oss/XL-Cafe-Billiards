import type { MorphState } from '../types';
import { useSmoothValue } from '../hooks';

interface PhoneRevealProps {
  morphState: MorphState;
}

const FRIENDS = [
  { x: 25, y: 35, rotation: -8, scale: 0.95, delay: 0 },
  { x: 42, y: 30, rotation: 5, scale: 1, delay: 0.05 },
  { x: 58, y: 32, rotation: -3, scale: 0.97, delay: 0.1 },
  { x: 72, y: 36, rotation: 7, scale: 0.93, delay: 0.15 },
];

export function PhoneReveal({ morphState }: PhoneRevealProps) {
  const { phase, cameraDepth } = morphState;
  const smoothDepth = useSmoothValue(cameraDepth, 0.04);

  const isVisible = phase === 'scene-reveal' || phase === 'zoom-approach' || phase === 'zoom-diving';
  if (!isVisible) return null;

  const sceneOpacity = phase === 'scene-reveal' ? Math.min(smoothDepth * 4, 1) : 1;
  const parallaxY = smoothDepth * -40;
  const groupScale = 1 + smoothDepth * 0.2;

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        opacity: sceneOpacity,
        willChange: 'opacity, transform',
      }}
    >
      {/* Dark moody background - billiard lounge */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, 
              rgba(10,10,12,0.95) 0%, 
              rgba(20,20,24,0.9) 30%,
              rgba(14,14,18,0.95) 100%
            )
          `,
          transform: `translateY(${parallaxY}px) scale(${groupScale})`,
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
      />

      {/* Ambient light sources - bar lights */}
      <div
        className="absolute"
        style={{
          top: '10%',
          left: '20%',
          width: '60%',
          height: '40%',
          background: 'radial-gradient(ellipse, rgba(212,160,74,0.06) 0%, transparent 70%)',
          transform: `translateY(${parallaxY * 0.5}px)`,
        }}
      />

      {/* Pool table green ambient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/3"
        style={{
          background: 'linear-gradient(0deg, rgba(16,80,40,0.12) 0%, transparent 100%)',
          transform: `translateY(${-parallaxY * 0.3}px)`,
        }}
      />

      {/* Friend silhouettes / figures */}
      {FRIENDS.map((friend, i) => {
        const friendOpacity = Math.min(
          Math.max((smoothDepth - friend.delay) * 5, 0),
          1
        );
        const friendParallax = (1 - smoothDepth) * 20;

        return (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${friend.x}%`,
              top: `${friend.y}%`,
              transform: `
                translate(-50%, -50%)
                rotate(${friend.rotation}deg)
                scale(${friend.scale})
                translateY(${friendParallax}px)
              `,
              opacity: friendOpacity,
              willChange: 'transform, opacity',
            }}
          >
            {/* Head */}
            <div
              className="mx-auto mb-1"
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: `linear-gradient(145deg, 
                  rgba(${60 + i * 10},${40 + i * 5},${30 + i * 8},0.9) 0%, 
                  rgba(${40 + i * 8},${30 + i * 5},${25 + i * 6},0.95) 100%)`,
                boxShadow: `
                  0 4px 12px rgba(0,0,0,0.5),
                  inset 0 2px 4px rgba(255,255,255,0.05)
                `,
              }}
            />
            {/* Shoulders / torso */}
            <div
              className="mx-auto"
              style={{
                width: 64,
                height: 80,
                borderRadius: '32px 32px 8px 8px',
                background: `linear-gradient(180deg, 
                  rgba(${30 + i * 15},${28 + i * 12},${35 + i * 10},0.9) 0%, 
                  rgba(${20 + i * 10},${18 + i * 8},${25 + i * 8},0.95) 100%)`,
                boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
              }}
            />
          </div>
        );
      })}

      {/* Central phone glow that the friends are looking at */}
      <div
        className="absolute"
        style={{
          left: '50%',
          top: '45%',
          transform: `translate(-50%, -50%) scale(${0.8 + smoothDepth * 0.4})`,
          width: 120,
          height: 120,
          background: 'radial-gradient(circle, rgba(212,160,74,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          opacity: sceneOpacity,
          willChange: 'transform, opacity',
        }}
      />
    </div>
  );
}

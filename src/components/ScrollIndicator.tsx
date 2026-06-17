import { useState, useEffect } from 'react';
import type { MorphState } from '../types';

interface ScrollIndicatorProps {
  morphState: MorphState;
}

export function ScrollIndicator({ morphState }: ScrollIndicatorProps) {
  const { phase } = morphState;
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (phase !== 'hero-initial') {
      setVisible(false);
    }
  }, [phase]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-3">
      <span
        className="text-xs tracking-[0.3em] uppercase"
        style={{
          fontFamily: "'Cinzel', serif",
          color: 'rgba(212,160,74,0.5)',
        }}
      >
        Scroll to Explore
      </span>

      <div
        className="relative"
        style={{
          width: 20,
          height: 32,
          border: '1px solid rgba(212,160,74,0.3)',
          borderRadius: 10,
        }}
      >
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: 6,
            width: 3,
            height: 8,
            borderRadius: 2,
            background: '#d4a04a',
            animation: 'scrollPulse 2s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { transform: translateX(-50%) translateY(0); opacity: 1; }
          50% { transform: translateX(-50%) translateY(8px); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}

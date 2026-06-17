import type { MorphState } from '../types';

interface PhaseIndicatorProps {
  morphState: MorphState;
}

const PHASE_LABELS: Record<string, string> = {
  'hero-initial': 'Immersive',
  'hero-morphing': 'Transforming',
  'hero-morphed': 'Vertical',
  'scene-reveal': 'Discover',
  'zoom-approach': 'Approaching',
  'zoom-diving': 'Diving',
  'zoom-complete': 'Arrived',
  'content-entrance': 'XL Experience',
};

export function PhaseIndicator({ morphState }: PhaseIndicatorProps) {
  const { phase } = morphState;
  const label = PHASE_LABELS[phase] || '';

  return (
    <div
      className="fixed top-6 left-6 z-50 flex items-center gap-3"
      style={{ opacity: 0.4 }}
    >
      <div
        className="w-1.5 h-1.5 rounded-full"
        style={{
          background: '#d4a04a',
          boxShadow: '0 0 8px rgba(212,160,74,0.5)',
        }}
      />
      <span
        className="text-[10px] tracking-[0.25em] uppercase"
        style={{
          fontFamily: "'Cinzel', serif",
          color: '#d4a04a',
        }}
      >
        {label}
      </span>
    </div>
  );
}

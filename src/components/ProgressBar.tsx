import type { MorphState } from '../types';
import { useSmoothValue } from '../hooks';

interface ProgressBarProps {
  morphState: MorphState;
}

export function ProgressBar({ morphState }: ProgressBarProps) {
  const { morphProgress, zoomProgress } = morphState;
  const overallProgress = Math.max(morphProgress, zoomProgress);
  const smoothProgress = useSmoothValue(overallProgress, 0.1);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2px]">
      <div
        className="h-full transition-none"
        style={{
          width: `${smoothProgress * 100}%`,
          background: 'linear-gradient(90deg, #d4a04a, #8b5cf6, #3b82f6)',
          boxShadow: '0 0 12px rgba(212,160,74,0.4)',
          willChange: 'width',
        }}
      />
    </div>
  );
}

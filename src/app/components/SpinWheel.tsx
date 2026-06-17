import { useState, useRef, useCallback } from 'react';

interface SpinWheelProps {
  canSpin: boolean;
  onResult: (points: number) => void;
}

const PRIZES = [
  { label: '10 Pts', points: 10, color: '#d4a04a', probability: 0.2 },
  { label: '25 Pts', points: 25, color: '#8b5cf6', probability: 0.2 },
  { label: '50 Pts', points: 50, color: '#3b82f6', probability: 0.15 },
  { label: '100 Pts', points: 100, color: '#22c55e', probability: 0.1 },
  { label: '200 Pts', points: 200, color: '#ec4899', probability: 0.05 },
  { label: 'Try Again', points: 0, color: '#6b7280', probability: 0.3 },
];

export function SpinWheel({ canSpin, onResult }: SpinWheelProps) {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const handleSpin = useCallback(() => {
    if (spinning || !canSpin) return;
    setResult(null);
    setSpinning(true);

    // Weighted random selection
    const rand = Math.random();
    let cumulative = 0;
    let selected = 0;
    for (let i = 0; i < PRIZES.length; i++) {
      cumulative += PRIZES[i].probability;
      if (rand <= cumulative) { selected = i; break; }
    }

    // Calculate rotation: 5 full spins + position
    const segmentAngle = 360 / PRIZES.length;
    const targetAngle = 360 - (selected * segmentAngle + segmentAngle / 2);
    const totalRotation = rotation + 1800 + targetAngle;

    setRotation(totalRotation);

    setTimeout(() => {
      setSpinning(false);
      const prize = PRIZES[selected];
      setResult(prize.label);
      if (prize.points > 0) {
        onResult(prize.points);
      }
    }, 4000);
  }, [spinning, rotation, canSpin, onResult]);

  const segmentAngle = 360 / PRIZES.length;

  return (
    <div className="flex flex-col items-center">
      {/* Wheel container */}
      <div className="relative mb-6">
        {/* Pointer */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-10"
          style={{
            width: 0,
            height: 0,
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: '14px solid #d4a04a',
          }}
        />

        {/* Wheel */}
        <div
          ref={wheelRef}
          className="w-56 h-56 rounded-full relative overflow-hidden"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
            boxShadow: '0 0 30px rgba(212,160,74,0.1)',
          }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {PRIZES.map((prize, i) => {
              const startAngle = i * segmentAngle;
              const endAngle = startAngle + segmentAngle;
              const startRad = (startAngle - 90) * Math.PI / 180;
              const endRad = (endAngle - 90) * Math.PI / 180;
              const x1 = 100 + 100 * Math.cos(startRad);
              const y1 = 100 + 100 * Math.sin(startRad);
              const x2 = 100 + 100 * Math.cos(endRad);
              const y2 = 100 + 100 * Math.sin(endRad);
              const midRad = ((startAngle + endAngle) / 2 - 90) * Math.PI / 180;
              const textX = 100 + 55 * Math.cos(midRad);
              const textY = 100 + 55 * Math.sin(midRad);
              const textRotation = (startAngle + endAngle) / 2;

              return (
                <g key={i}>
                  <path
                    d={`M100,100 L${x1},${y1} A100,100 0 0,1 ${x2},${y2} Z`}
                    fill={prize.color}
                    opacity={0.2}
                    stroke="rgba(10,10,12,0.8)"
                    strokeWidth="1"
                  />
                  <text
                    x={textX}
                    y={textY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#f5f0e8"
                    fontSize="8"
                    fontWeight="600"
                    transform={`rotate(${textRotation}, ${textX}, ${textY})`}
                  >
                    {prize.label}
                  </text>
                </g>
              );
            })}
            {/* Center circle */}
            <circle cx="100" cy="100" r="15" fill="#0a0a0c" stroke="#d4a04a" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="3" fill="#d4a04a" />
          </svg>
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="text-center mb-4 animate-fade-in">
          <div className="text-2xl font-bold mb-1" style={{ fontFamily: "'Cinzel', serif", color: '#d4a04a' }}>
            {result}
          </div>
          <p className="text-xs" style={{ color: 'rgba(245,240,232,0.35)' }}>
            {result !== 'Try Again' ? 'Added to your account!' : 'Better luck next time!'}
          </p>
        </div>
      )}

      {/* Spin button */}
      <button
        onClick={handleSpin}
        disabled={spinning || !canSpin}
        className="px-10 py-3 rounded-full text-sm tracking-wider uppercase font-semibold cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        style={{
          fontFamily: "'Cinzel', serif",
          background: spinning ? 'rgba(212,160,74,0.1)' : 'linear-gradient(135deg, #d4a04a, #b8922f)',
          color: spinning ? 'rgba(212,160,74,0.5)' : '#0a0a0c',
          border: 'none',
          transition: 'all 0.3s ease',
        }}
      >
        {spinning ? 'Spinning...' : canSpin ? 'Spin to Win' : 'Come Back Tomorrow'}
      </button>

      <p className="text-[9px] mt-3" style={{ color: 'rgba(245,240,232,0.2)' }}>
        1 free spin daily
      </p>
    </div>
  );
}

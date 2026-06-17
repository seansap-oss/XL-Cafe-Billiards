import { useState, useEffect, useRef, useCallback } from 'react';

interface ScanPageProps {
  onScanComplete: (code: string) => void;
}

export function ScanPage({ onScanComplete }: ScanPageProps) {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [code, setCode] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  // Simulated scan line animation
  useEffect(() => {
    if (!scanning) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let y = 0;
    const h = canvas.height;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, h);

      // Scan line
      const grad = ctx.createLinearGradient(0, y - 20, 0, y + 20);
      grad.addColorStop(0, 'transparent');
      grad.addColorStop(0.5, 'rgba(212,160,74,0.6)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, y - 20, canvas.width, 40);

      // Center line
      ctx.strokeStyle = 'rgba(212,160,74,0.8)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(20, y);
      ctx.lineTo(canvas.width - 20, y);
      ctx.stroke();

      y += 2;
      if (y > h + 20) y = -20;

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [scanning]);

  // Simulate scan detection after 3 seconds
  useEffect(() => {
    if (!scanning) return;
    const timer = setTimeout(() => {
      const fakeCode = `XL-${Date.now().toString(36).toUpperCase()}`;
      setCode(fakeCode);
      setScanned(true);
      setScanning(false);
      onScanComplete(fakeCode);
    }, 3000);
    return () => clearTimeout(timer);
  }, [scanning, onScanComplete]);

  const handleStartScan = useCallback(() => {
    setScanned(false);
    setCode('');
    setScanning(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="px-5 pt-6 pb-4 text-center">
        <h1 className="text-lg font-bold" style={{ fontFamily: "'Cinzel', serif", color: '#f5f0e8' }}>
          Scan & Earn
        </h1>
        <p className="text-xs mt-1" style={{ color: 'rgba(245,240,232,0.35)' }}>
          Point your camera at the barcode
        </p>
      </header>

      {/* Scanner area */}
      <div className="flex-1 flex flex-col items-center justify-center px-5">
        <div
          className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden mb-8"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '2px solid rgba(212,160,74,0.2)',
          }}
        >
          {/* Corner brackets */}
          {[
            { top: 12, left: 12 },
            { top: 12, right: 12 },
            { bottom: 12, left: 12 },
            { bottom: 12, right: 12 },
          ].map((pos, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                ...pos,
                width: 24,
                height: 24,
                borderTop: pos.top !== undefined ? '2px solid #d4a04a' : 'none',
                borderBottom: pos.bottom !== undefined ? '2px solid #d4a04a' : 'none',
                borderLeft: pos.left !== undefined ? '2px solid #d4a04a' : 'none',
                borderRight: pos.right !== undefined ? '2px solid #d4a04a' : 'none',
              }}
            />
          ))}

          {/* Scan animation canvas */}
          {scanning && (
            <canvas
              ref={canvasRef}
              width={300}
              height={300}
              className="absolute inset-0 w-full h-full"
            />
          )}

          {/* Default state */}
          {!scanning && !scanned && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(212,160,74,0.3)" strokeWidth="1" className="mx-auto mb-3">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <path d="M14 14h3v3h-3z" />
                  <rect x="17" y="17" width="4" height="4" />
                </svg>
                <p className="text-xs" style={{ color: 'rgba(245,240,232,0.25)' }}>Tap to start scanning</p>
              </div>
            </div>
          )}

          {/* Scanned state */}
          {scanned && (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.05)' }}>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: 'rgba(34,197,94,0.15)', border: '2px solid rgba(34,197,94,0.3)' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="text-sm font-semibold mb-1" style={{ color: '#22c55e' }}>Scan Successful!</p>
                <p className="text-[10px] font-mono" style={{ color: 'rgba(245,240,232,0.3)' }}>{code}</p>
              </div>
            </div>
          )}
        </div>

        {/* Points earned */}
        {scanned && (
          <div className="text-center mb-6 animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-xs" style={{ color: 'rgba(245,240,232,0.4)' }}>Points earned:</span>
              <span className="text-lg font-bold" style={{ color: '#d4a04a', fontFamily: "'Cinzel', serif" }}>+25</span>
            </div>
            <p className="text-[10px]" style={{ color: 'rgba(245,240,232,0.2)' }}>Silver tier: 1.5x multiplier applied</p>
          </div>
        )}

        {/* Scan button */}
        <button
          onClick={handleStartScan}
          disabled={scanning}
          className="w-full max-w-sm py-4 rounded-xl text-sm tracking-wider uppercase font-semibold cursor-pointer"
          style={{
            fontFamily: "'Cinzel', serif",
            background: scanning ? 'rgba(212,160,74,0.1)' : 'linear-gradient(135deg, #d4a04a, #b8922f)',
            color: scanning ? 'rgba(212,160,74,0.5)' : '#0a0a0c',
            border: 'none',
            opacity: scanning ? 0.7 : 1,
            transition: 'all 0.3s ease',
          }}
        >
          {scanning ? 'Scanning...' : scanned ? 'Scan Again' : 'Start Scan'}
        </button>

        {/* Recent scans */}
        <div className="w-full max-w-sm mt-8">
          <h3 className="text-[10px] tracking-wider uppercase mb-3" style={{ color: 'rgba(245,240,232,0.25)' }}>
            Recent Scans
          </h3>
          <div className="space-y-2">
            {[
              { location: 'XL Billiards', points: '+25', time: 'Today, 8:42 PM', spend: '$32.00' },
              { location: 'XL Cafe', points: '+15', time: 'Yesterday, 3:15 PM', spend: '$12.50' },
              { location: 'XL Live', points: '+30', time: 'Jun 14, 10:30 PM', spend: '$45.00' },
            ].map((scan, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3 px-4 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.03)' }}
              >
                <div>
                  <p className="text-xs font-semibold" style={{ color: '#f5f0e8' }}>{scan.location}</p>
                  <p className="text-[10px]" style={{ color: 'rgba(245,240,232,0.25)' }}>{scan.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold" style={{ color: '#d4a04a' }}>{scan.points}</p>
                  <p className="text-[10px]" style={{ color: 'rgba(245,240,232,0.2)' }}>{scan.spend}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

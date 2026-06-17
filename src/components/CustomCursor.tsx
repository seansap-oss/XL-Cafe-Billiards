import { useState, useEffect, useRef, useCallback } from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const [expanded, setExpanded] = useState(false);
  const [hidden, setHidden] = useState(true);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    targetRef.current = { x: e.clientX, y: e.clientY };
    if (hidden) setHidden(false);
  }, [hidden]);

  const handleMouseEnter = useCallback(() => setHidden(false), []);
  const handleMouseLeave = useCallback(() => setHidden(true), []);

  useEffect(() => {
    // Check if device has fine pointer (mouse)
    const mql = window.matchMedia('(pointer: fine)');
    if (!mql.matches) return;

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Detect interactive elements
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.closest('.cursor-expand') ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A'
      ) {
        setExpanded(true);
      }
    };

    const handleOut = () => setExpanded(false);

    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    // RAF loop for smooth following
    let raf: number;
    const tick = () => {
      const lerp = 0.12;
      posRef.current.x += (targetRef.current.x - posRef.current.x) * lerp;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * lerp;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${targetRef.current.x - 4}px, ${targetRef.current.y - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${posRef.current.x - 16}px, ${posRef.current.y - 16}px)`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      cancelAnimationFrame(raf);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  // Don't render on touch devices
  const [hasFinePointer, setHasFinePointer] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia('(pointer: fine)');
    setHasFinePointer(mql.matches);
  }, []);

  if (!hasFinePointer) return null;

  return (
    <>
      {/* Hide default cursor */}
      <style>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>

      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[200] pointer-events-none"
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#d4a04a',
          opacity: hidden ? 0 : 1,
          transition: 'opacity 0.3s ease, width 0.3s ease, height 0.3s ease, margin 0.3s ease',
          ...(expanded ? {
            width: 6,
            height: 6,
            margin: '1px',
            background: '#f5f0e8',
          } : {}),
          willChange: 'transform',
        }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[199] pointer-events-none"
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: `1px solid ${expanded ? 'rgba(245,240,232,0.3)' : 'rgba(212,160,74,0.3)'}`,
          opacity: hidden ? 0 : 1,
          transition: 'opacity 0.3s ease, width 0.4s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1), margin 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease',
          ...(expanded ? {
            width: 48,
            height: 48,
            margin: '-8px',
            borderColor: 'rgba(245,240,232,0.2)',
          } : {}),
          willChange: 'transform',
        }}
      />
    </>
  );
}

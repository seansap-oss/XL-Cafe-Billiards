import { useState, useEffect, useCallback } from 'react';

export function useIsMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);

  return isMobile;
}

export function useViewportSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const update = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return size;
}

export function useTouchDrag(onDrag: (deltaY: number) => void) {
  const touchStart = useCallback((e: TouchEvent) => {
    const startY = e.touches[0].clientY;

    const onTouchMove = (ev: TouchEvent) => {
      const deltaY = startY - ev.touches[0].clientY;
      onDrag(deltaY * 0.5);
    };

    const onTouchEnd = () => {
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };

    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
  }, [onDrag]);

  useEffect(() => {
    window.addEventListener('touchstart', touchStart, { passive: true });
    return () => window.removeEventListener('touchstart', touchStart);
  }, [touchStart]);
}

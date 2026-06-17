import { useState, useEffect, useRef } from 'react';

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);
  const rafId = useRef<number>(0);
  const lastScroll = useRef(0);

  useEffect(() => {
    const totalHeight = () => document.documentElement.scrollHeight - window.innerHeight;

    const onScroll = () => {
      lastScroll.current = window.scrollY;
    };

    const tick = () => {
      const maxScroll = totalHeight();
      if (maxScroll > 0) {
        setProgress(lastScroll.current / maxScroll);
      }
      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return progress;
}

export function useSmoothValue(target: number, stiffness: number = 0.08): number {
  const [current, setCurrent] = useState(target);
  const rafId = useRef<number>(0);
  const valueRef = useRef(target);

  useEffect(() => {
    valueRef.current = target;
  }, [target]);

  useEffect(() => {
    const tick = () => {
      setCurrent((prev) => {
        const diff = valueRef.current - prev;
        if (Math.abs(diff) < 0.0001) return valueRef.current;
        return prev + diff * stiffness;
      });
      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId.current);
  }, [stiffness]);

  return current;
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

export function useInView(threshold: number = 0.1): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

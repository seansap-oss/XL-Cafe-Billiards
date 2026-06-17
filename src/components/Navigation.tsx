import { useState, useCallback, useEffect } from 'react';
import type { ExperiencePhase } from '../types';

interface NavigationProps {
  phase: ExperiencePhase;
}

interface NavItem {
  label: string;
  subtitle: string;
  color: string;
  section: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'XL Live', subtitle: 'Premium Rock Venue', color: '#d4a04a', section: 'xl-live' },
  { label: 'XL Billiards', subtitle: 'Luxury Lounge', color: '#3b82f6', section: 'xl-billiards' },
  { label: 'XL Cafe', subtitle: 'Avant-Garde', color: '#8b5cf6', section: 'xl-cafe' },
  { label: 'Rock of Frame', subtitle: 'The Archive', color: '#ec4899', section: 'rock-of-frame' },
  { label: 'Events', subtitle: "What's On", color: '#22c55e', section: 'events' },
  { label: 'Rewards', subtitle: 'Your Membership', color: '#f59e0b', section: 'rewards' },
];

export function Navigation({ phase }: NavigationProps) {
  const [open, setOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const showNav = phase === 'content-entrance';

  const handleNavClick = useCallback((section: string) => {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setOpen(false);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  if (!showNav) return null;

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-6 right-6 z-[60] group"
        aria-label="Toggle navigation"
        style={{
          width: 44,
          height: 44,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 5,
          background: open ? 'rgba(212,160,74,0.15)' : 'rgba(255,255,255,0.03)',
          border: `1px solid ${open ? 'rgba(212,160,74,0.3)' : 'rgba(255,255,255,0.06)'}`,
          borderRadius: '50%',
          backdropFilter: 'blur(12px)',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        }}
      >
        <span
          className="block"
          style={{
            width: 16,
            height: 1.5,
            background: '#d4a04a',
            borderRadius: 1,
            transform: open ? 'rotate(45deg) translate(2px, 2px)' : 'none',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
        <span
          className="block"
          style={{
            width: 16,
            height: 1.5,
            background: '#d4a04a',
            borderRadius: 1,
            opacity: open ? 0 : 1,
            transform: open ? 'scaleX(0)' : 'scaleX(1)',
            transition: 'all 0.2s ease',
          }}
        />
        <span
          className="block"
          style={{
            width: 16,
            height: 1.5,
            background: '#d4a04a',
            borderRadius: 1,
            transform: open ? 'rotate(-45deg) translate(2px, -2px)' : 'none',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </button>

      {/* Overlay */}
      <div
        className="fixed inset-0 z-[55] pointer-events-none"
        style={{
          background: 'rgba(10,10,12,0.95)',
          backdropFilter: 'blur(20px)',
          opacity: open ? 1 : 0,
          transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        <div className="h-full flex flex-col items-center justify-center px-6">
          {/* Brand */}
          <div
            className="mb-12"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            <h2
              className="text-3xl font-bold text-center"
              style={{
                fontFamily: "'Cinzel', serif",
                color: '#d4a04a',
                letterSpacing: '0.08em',
              }}
            >
              XL
            </h2>
            <p
              className="text-[10px] tracking-[0.3em] uppercase text-center mt-1"
              style={{ color: 'rgba(212,160,74,0.4)' }}
            >
              Navigate
            </p>
          </div>

          {/* Nav items */}
          <nav className="space-y-1">
            {NAV_ITEMS.map((item, i) => (
              <button
                key={item.section}
                onClick={() => handleNavClick(item.section)}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="block w-full text-left px-8 py-4 rounded-lg cursor-pointer"
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? 'translateX(0)' : 'translateX(-30px)',
                  transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.15 + i * 0.06}s`,
                  background: hoveredIndex === i ? 'rgba(255,255,255,0.03)' : 'transparent',
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{
                      background: item.color,
                      boxShadow: hoveredIndex === i ? `0 0 12px ${item.color}60` : 'none',
                      transition: 'box-shadow 0.3s ease',
                    }}
                  />
                  <div>
                    <div
                      className="text-lg md:text-xl font-semibold"
                      style={{
                        fontFamily: "'Cinzel', serif",
                        color: hoveredIndex === i ? '#f5f0e8' : 'rgba(245,240,232,0.6)',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      className="text-xs tracking-wider"
                      style={{
                        color: hoveredIndex === i ? item.color : 'rgba(245,240,232,0.2)',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {item.subtitle}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </nav>

          {/* Bottom info */}
          <div
            className="mt-12 text-center"
            style={{
              opacity: open ? 1 : 0,
              transition: 'opacity 0.6s ease 0.6s',
            }}
          >
            <p
              className="text-[10px] tracking-wider"
              style={{ color: 'rgba(245,240,232,0.15)' }}
            >
              Press ESC to close
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

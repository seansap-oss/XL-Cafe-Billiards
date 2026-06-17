import type { MorphState } from '../types';
import { useInView } from '../hooks';

interface ContentEntranceProps {
  morphState: MorphState;
}

const VENUE_SPACES = [
  {
    name: 'XL Live',
    subtitle: 'Premium Rock Venue',
    description: 'Where legends take the stage. World-class acoustics meet raw energy.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
    color: '#d4a04a',
  },
  {
    name: 'XL Billiards',
    subtitle: 'Luxury Lounge',
    description: 'Championship tables. Craft cocktails. Elevated competition.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="3" />
        <line x1="12" y1="2" x2="12" y2="6" />
        <line x1="12" y1="18" x2="12" y2="22" />
      </svg>
    ),
    color: '#3b82f6',
  },
  {
    name: 'XL Cafe',
    subtitle: 'Avant-Garde',
    description: 'Artisanal blends. Experimental flavors. Creative sanctuary.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
    color: '#8b5cf6',
  },
];

export function ContentEntrance({ morphState }: ContentEntranceProps) {
  const { phase } = morphState;
  const [headerRef, headerInView] = useInView(0.2);

  const isVisible = phase === 'content-entrance';
  if (!isVisible) return null;

  return (
    <div className="relative min-h-screen bg-obsidian">
      {/* Background texture */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 50% 50% at 50% 50%, rgba(212,160,74,0.02) 0%, transparent 100%),
            repeating-linear-gradient(0deg, transparent, transparent 100px, rgba(255,255,255,0.005) 100px, rgba(255,255,255,0.005) 101px)
          `,
        }}
      />

      {/* Hero content after zoom */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <div ref={headerRef} className="text-center max-w-4xl mx-auto">
          <div
            className="mb-6"
            style={{
              opacity: headerInView ? 1 : 0,
              transform: headerInView ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <span
              className="text-xs tracking-[0.4em] uppercase block mb-4"
              style={{ color: '#d4a04a' }}
            >
              Welcome to
            </span>
            <h1
              className="text-6xl md:text-8xl font-bold mb-4"
              style={{
                fontFamily: "'Cinzel', serif",
                color: '#f5f0e8',
                letterSpacing: '-0.02em',
                textShadow: '0 0 80px rgba(212,160,74,0.15)',
              }}
            >
              XL
            </h1>
            <div
              className="w-24 h-[1px] mx-auto mb-6"
              style={{ background: 'linear-gradient(90deg, transparent, #d4a04a, transparent)' }}
            />
            <p
              className="text-sm tracking-[0.2em] uppercase"
              style={{ color: 'rgba(245,240,232,0.4)' }}
            >
              Cafe & Billiards
            </p>
          </div>
        </div>
      </div>

      {/* Venue spaces grid */}
      <div className="relative z-10 px-6 pb-32">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {VENUE_SPACES.map((space, i) => (
            <VenueCard key={space.name} space={space} index={i} inView={headerInView} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-12 px-6 text-center">
        <p
          className="text-xs tracking-[0.2em] uppercase"
          style={{ color: 'rgba(245,240,232,0.2)' }}
        >
          XL Cafe & Billiards &mdash; Where Moments Become Legends
        </p>
      </footer>
    </div>
  );
}

function VenueCard({
  space,
  index,
  inView,
}: {
  space: (typeof VENUE_SPACES)[number];
  index: number;
  inView: boolean;
}) {
  const delay = index * 150;

  return (
    <div
      className="group relative p-8 rounded-lg cursor-pointer"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.05)',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(60px)',
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      <div
        className="mb-6 transition-colors duration-500"
        style={{ color: space.color }}
      >
        {space.icon}
      </div>
      <h3
        className="text-lg font-semibold mb-1"
        style={{
          fontFamily: "'Cinzel', serif",
          color: '#f5f0e8',
        }}
      >
        {space.name}
      </h3>
      <p
        className="text-xs tracking-wider uppercase mb-4"
        style={{ color: space.color }}
      >
        {space.subtitle}
      </p>
      <p
        className="text-sm leading-relaxed"
        style={{ color: 'rgba(245,240,232,0.5)' }}
      >
        {space.description}
      </p>

      <div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${space.color}08 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}

import type React from 'react';
import type { MorphState } from '../types';
import { useInView } from '../hooks';

interface EventsProps {
  morphState: MorphState;
}

interface VenueEvent {
  id: number;
  type: 'concert' | 'tournament' | 'special' | 'night';
  title: string;
  date: string;
  time: string;
  space: string;
  accent: string;
  featured: boolean;
}

const EVENTS: VenueEvent[] = [
  {
    id: 1,
    type: 'concert',
    title: 'Neon Waves',
    date: 'FRI 20',
    time: '9PM',
    space: 'XL Live',
    accent: '#d4a04a',
    featured: true,
  },
  {
    id: 2,
    type: 'tournament',
    title: '8-Ball Championship',
    date: 'SAT 21',
    time: '3PM',
    space: 'XL Billiards',
    accent: '#3b82f6',
    featured: false,
  },
  {
    id: 3,
    type: 'special',
    title: 'Pour Over Masters',
    date: 'SAT 21',
    time: '11AM',
    space: 'XL Cafe',
    accent: '#8b5cf6',
    featured: false,
  },
  {
    id: 4,
    type: 'night',
    title: 'Velvet Hours',
    date: 'SAT 21',
    time: '10PM',
    space: 'All Spaces',
    accent: '#ec4899',
    featured: true,
  },
  {
    id: 5,
    type: 'concert',
    title: 'Crimson Tide',
    date: 'FRI 27',
    time: '8:30PM',
    space: 'XL Live',
    accent: '#ef4444',
    featured: false,
  },
  {
    id: 6,
    type: 'tournament',
    title: 'Break & Run Invitational',
    date: 'SAT 28',
    time: '2PM',
    space: 'XL Billiards',
    accent: '#22c55e',
    featured: false,
  },
];

const TYPE_LABELS: Record<string, string> = {
  concert: 'Live Music',
  tournament: 'Tournament',
  special: 'Special',
  night: 'Club Night',
};

const TYPE_ICONS: Record<string, React.ReactNode> = {
  concert: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  ),
  tournament: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  special: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
    </svg>
  ),
  night: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
};

export function Events({ morphState }: EventsProps) {
  const { phase } = morphState;
  const [headerRef, headerInView] = useInView(0.2);
  const [gridRef, gridInView] = useInView(0.1);

  const isVisible = phase === 'content-entrance';
  if (!isVisible) return null;

  return (
    <section className="relative py-24 px-6 md:px-12">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 30% at 50% 20%, rgba(212,160,74,0.02) 0%, transparent 100%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-14"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div>
            <span
              className="text-xs tracking-[0.4em] uppercase block mb-4"
              style={{ color: '#d4a04a' }}
            >
              What&apos;s On
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{
                fontFamily: "'Cinzel', serif",
                color: '#f5f0e8',
              }}
            >
              Upcoming
            </h2>
          </div>
          <a
            href="#"
            className="text-xs tracking-[0.2em] uppercase mt-4 md:mt-0 inline-block"
            style={{
              color: 'rgba(212,160,74,0.5)',
              borderBottom: '1px solid rgba(212,160,74,0.2)',
              paddingBottom: 2,
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#d4a04a'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(212,160,74,0.5)'; }}
          >
            View Calendar →
          </a>
        </div>

        {/* Divider */}
        <div
          className="h-[1px] mb-10"
          style={{
            background: 'linear-gradient(90deg, rgba(212,160,74,0.2), rgba(255,255,255,0.04), rgba(212,160,74,0.2))',
            opacity: headerInView ? 1 : 0,
            transition: 'opacity 0.8s ease 0.3s',
          }}
        />

        {/* Events list */}
        <div ref={gridRef} className="space-y-1">
          {EVENTS.map((event, i) => (
            <EventRow
              key={event.id}
              event={event}
              index={i}
              inView={gridInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function EventRow({
  event,
  index,
  inView,
}: {
  event: VenueEvent;
  index: number;
  inView: boolean;
}) {
  return (
    <div
      className="group flex items-center gap-4 md:gap-8 py-5 px-4 md:px-6 rounded-lg cursor-pointer"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateX(0)' : 'translateX(-30px)',
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 80}ms`,
        borderBottom: '1px solid rgba(255,255,255,0.03)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
      }}
    >
      {/* Date block */}
      <div className="w-16 md:w-20 flex-shrink-0 text-center">
        <div
          className="text-[10px] tracking-widest uppercase mb-0.5"
          style={{ color: 'rgba(245,240,232,0.3)' }}
        >
          {event.date.split(' ')[0]}
        </div>
        <div
          className="text-2xl md:text-3xl font-bold"
          style={{
            fontFamily: "'Cinzel', serif",
            color: '#f5f0e8',
          }}
        >
          {event.date.split(' ')[1]}
        </div>
      </div>

      {/* Accent line */}
      <div
        className="w-[2px] h-10 flex-shrink-0 rounded-full"
        style={{
          background: event.accent,
          opacity: 0.3,
        }}
      />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span style={{ color: event.accent, opacity: 0.6 }}>
            {TYPE_ICONS[event.type]}
          </span>
          <span
            className="text-[10px] tracking-wider uppercase"
            style={{ color: event.accent, opacity: 0.7 }}
          >
            {TYPE_LABELS[event.type]}
          </span>
          {event.featured && (
            <span
              className="text-[9px] tracking-widest uppercase px-1.5 py-0.5 rounded"
              style={{
                color: '#d4a04a',
                background: 'rgba(212,160,74,0.1)',
                border: '1px solid rgba(212,160,74,0.2)',
              }}
            >
              Featured
            </span>
          )}
        </div>
        <h3
          className="text-base md:text-lg font-semibold truncate"
          style={{
            fontFamily: "'Cinzel', serif",
            color: '#f5f0e8',
          }}
        >
          {event.title}
        </h3>
      </div>

      {/* Venue + time */}
      <div className="hidden md:block text-right flex-shrink-0">
        <div
          className="text-sm mb-0.5"
          style={{ color: 'rgba(245,240,232,0.5)' }}
        >
          {event.space}
        </div>
        <div
          className="text-xs"
          style={{ color: 'rgba(245,240,232,0.25)' }}
        >
          {event.time}
        </div>
      </div>

      {/* Arrow */}
      <div
        className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
        style={{
          transform: 'translateX(-8px)',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d4a04a" strokeWidth="1.5" strokeLinecap="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </div>
    </div>
  );
}

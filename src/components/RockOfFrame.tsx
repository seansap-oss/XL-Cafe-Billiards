import { useState } from 'react';
import type { MorphState } from '../types';
import { useInView } from '../hooks';

interface RockOfFrameProps {
  morphState: MorphState;
}

interface GalleryFrame {
  id: number;
  title: string;
  category: 'live' | 'lounge' | 'cafe' | 'nights';
  span: 'tall' | 'wide' | 'normal';
  gradient: string;
  accent: string;
  label: string;
  time: string;
}

const FRAMES: GalleryFrame[] = [
  {
    id: 1,
    title: 'Opening Night',
    category: 'live',
    span: 'tall',
    gradient: 'linear-gradient(160deg, #1a0a0a 0%, #2a1010 30%, #0a0a0c 100%)',
    accent: '#ef4444',
    label: 'XL Live',
    time: 'Mar 2024',
  },
  {
    id: 2,
    title: 'The Break',
    category: 'lounge',
    span: 'normal',
    gradient: 'linear-gradient(145deg, #0a1a0f 0%, #0f2a18 40%, #0a0a0c 100%)',
    accent: '#22c55e',
    label: 'XL Billiards',
    time: 'Apr 2024',
  },
  {
    id: 3,
    title: 'First Pour',
    category: 'cafe',
    span: 'normal',
    gradient: 'linear-gradient(135deg, #1a1408 0%, #2a1f0d 40%, #0a0a0c 100%)',
    accent: '#d4a04a',
    label: 'XL Cafe',
    time: 'Feb 2024',
  },
  {
    id: 4,
    title: 'After Hours',
    category: 'nights',
    span: 'wide',
    gradient: 'linear-gradient(180deg, #0a0a1a 0%, #10102a 40%, #0a0a0c 100%)',
    accent: '#8b5cf6',
    label: 'VIP Lounge',
    time: 'May 2024',
  },
  {
    id: 5,
    title: 'Sound Check',
    category: 'live',
    span: 'normal',
    gradient: 'linear-gradient(150deg, #1a0a10 0%, #2a0f1a 35%, #0a0a0c 100%)',
    accent: '#ec4899',
    label: 'XL Live',
    time: 'Jun 2024',
  },
  {
    id: 6,
    title: 'The Rack',
    category: 'lounge',
    span: 'tall',
    gradient: 'linear-gradient(170deg, #0a1520 0%, #0f2030 40%, #0a0a0c 100%)',
    accent: '#3b82f6',
    label: 'XL Billiards',
    time: 'Jul 2024',
  },
  {
    id: 7,
    title: 'Latte Art',
    category: 'cafe',
    span: 'normal',
    gradient: 'linear-gradient(125deg, #1a1510 0%, #2a2018 40%, #0a0a0c 100%)',
    accent: '#f59e0b',
    label: 'XL Cafe',
    time: 'Aug 2024',
  },
  {
    id: 8,
    title: 'Encore',
    category: 'live',
    span: 'wide',
    gradient: 'linear-gradient(190deg, #100a1a 0%, #1a102a 40%, #0a0a0c 100%)',
    accent: '#a855f7',
    label: 'XL Live',
    time: 'Sep 2024',
  },
  {
    id: 9,
    title: 'Last Call',
    category: 'nights',
    span: 'normal',
    gradient: 'linear-gradient(155deg, #0a0a18 0%, #10102a 40%, #0a0a0c 100%)',
    accent: '#6366f1',
    label: 'VIP Lounge',
    time: 'Oct 2024',
  },
  {
    id: 10,
    title: 'The Grind',
    category: 'cafe',
    span: 'tall',
    gradient: 'linear-gradient(140deg, #1a1208 0%, #2a1c0d 35%, #0a0a0c 100%)',
    accent: '#ca8a04',
    label: 'XL Cafe',
    time: 'Nov 2024',
  },
  {
    id: 11,
    title: 'Full House',
    category: 'nights',
    span: 'normal',
    gradient: 'linear-gradient(175deg, #0a0a1a 0%, #12122a 40%, #0a0a0c 100%)',
    accent: '#7c3aed',
    label: 'All Spaces',
    time: 'Dec 2024',
  },
  {
    id: 12,
    title: 'Cue Ball',
    category: 'lounge',
    span: 'normal',
    gradient: 'linear-gradient(165deg, #0a1a12 0%, #0f2a1c 40%, #0a0a0c 100%)',
    accent: '#10b981',
    label: 'XL Billiards',
    time: 'Jan 2025',
  },
];

function FrameVisual({ frame }: { frame: GalleryFrame }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: frame.gradient }}
      />

      {/* Atmospheric light */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 40%, ${frame.accent}12 0%, transparent 100%)`,
        }}
      />

      {/* Abstract visual element per category */}
      {frame.category === 'live' && (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
          {/* Sound waves */}
          {[0, 1, 2, 3, 4].map((i) => (
            <circle
              key={i}
              cx="200"
              cy="150"
              r={40 + i * 35}
              fill="none"
              stroke={frame.accent}
              strokeWidth="0.5"
              opacity={0.15 - i * 0.025}
            />
          ))}
          {/* Stage light beams */}
          <polygon points="180,0 160,300 240,300 200,0" fill={`${frame.accent}08`} />
          <polygon points="220,0 200,300 280,300 240,0" fill={`${frame.accent}05`} />
          {/* Mic stand silhouette */}
          <line x1="200" y1="80" x2="200" y2="220" stroke={`${frame.accent}30`} strokeWidth="2" />
          <circle cx="200" cy="75" r="12" fill="none" stroke={`${frame.accent}25`} strokeWidth="1.5" />
          <ellipse cx="200" cy="72" rx="6" ry="8" fill={`${frame.accent}15`} />
        </svg>
      )}

      {frame.category === 'lounge' && (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
          {/* Pool table felt */}
          <rect x="60" y="120" width="280" height="140" rx="6" fill={`${frame.accent}08`} />
          <rect x="60" y="120" width="280" height="140" rx="6" fill="none" stroke={`${frame.accent}15`} strokeWidth="1" />
          {/* Balls */}
          <circle cx="180" cy="180" r="10" fill={`${frame.accent}30`} />
          <circle cx="220" cy="195" r="10" fill={`${frame.accent}20`} />
          <circle cx="260" cy="175" r="10" fill={`${frame.accent}25`} />
          <circle cx="150" cy="210" r="11" fill={`${frame.accent}15`} />
          {/* Cue */}
          <line x1="100" y1="200" x2="175" y2="182" stroke={`${frame.accent}20`} strokeWidth="1.5" />
          {/* Rail highlights */}
          <line x1="60" y1="120" x2="340" y2="120" stroke={`${frame.accent}18`} strokeWidth="2" />
        </svg>
      )}

      {frame.category === 'cafe' && (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
          {/* Coffee cup */}
          <ellipse cx="200" cy="170" rx="50" ry="15" fill={`${frame.accent}10`} />
          <path d="M150,170 Q150,240 200,240 Q250,240 250,170" fill={`${frame.accent}08`} />
          <ellipse cx="200" cy="170" rx="50" ry="15" fill="none" stroke={`${frame.accent}20`} strokeWidth="1" />
          {/* Steam */}
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              d={`M${185 + i * 15},155 Q${180 + i * 15},130 ${190 + i * 15},110 Q${195 + i * 15},90 ${185 + i * 15},70`}
              fill="none"
              stroke={`${frame.accent}12`}
              strokeWidth="1"
            />
          ))}
          {/* Handle */}
          <path d="M250,180 Q280,180 280,200 Q280,220 250,220" fill="none" stroke={`${frame.accent}18`} strokeWidth="1.5" />
        </svg>
      )}

      {frame.category === 'nights' && (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
          {/* Ambient light orbs */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <circle
              key={i}
              cx={80 + i * 55}
              cy={100 + Math.sin(i * 1.2) * 60}
              r={20 + i * 5}
              fill={`${frame.accent}`}
              opacity={0.04 + i * 0.01}
            />
          ))}
          {/* Bar counter line */}
          <line x1="40" y1="220" x2="360" y2="220" stroke={`${frame.accent}12`} strokeWidth="1" />
          {/* Bottle silhouettes */}
          {[0, 1, 2, 3, 4].map((i) => (
            <rect
              key={i}
              x={80 + i * 65}
              y={180 - i * 3}
              width="12"
              height={40 + i * 5}
              rx="2"
              fill={`${frame.accent}10`}
            />
          ))}
        </svg>
      )}

      {/* Film grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px',
        }}
      />
    </div>
  );
}

export function RockOfFrame({ morphState }: RockOfFrameProps) {
  const { phase } = morphState;
  const [titleRef, titleInView] = useInView(0.15);
  const [gridRef, gridInView] = useInView(0.05);
  const [filter, setFilter] = useState<string>('all');
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const isVisible = phase === 'content-entrance';
  if (!isVisible) return null;

  const categories = [
    { key: 'all', label: 'All' },
    { key: 'live', label: 'Live' },
    { key: 'lounge', label: 'Lounge' },
    { key: 'cafe', label: 'Cafe' },
    { key: 'nights', label: 'Nights' },
  ];

  const filteredFrames = filter === 'all' ? FRAMES : FRAMES.filter((f) => f.category === filter);

  return (
    <section className="relative py-24 px-6 md:px-12">
      {/* Section header */}
      <div
        ref={titleRef}
        className="text-center mb-16 max-w-4xl mx-auto"
        style={{
          opacity: titleInView ? 1 : 0,
          transform: titleInView ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <span
          className="text-xs tracking-[0.4em] uppercase block mb-4"
          style={{ color: '#d4a04a' }}
        >
          The Archive
        </span>
        <h2
          className="text-4xl md:text-6xl font-bold mb-6"
          style={{
            fontFamily: "'Cinzel', serif",
            color: '#f5f0e8',
            letterSpacing: '-0.01em',
          }}
        >
          Rock of Frame
        </h2>
        <div
          className="w-20 h-[1px] mx-auto mb-6"
          style={{ background: 'linear-gradient(90deg, transparent, #d4a04a, transparent)' }}
        />
        <p
          className="text-sm md:text-base max-w-lg mx-auto"
          style={{ color: 'rgba(245,240,232,0.4)', lineHeight: 1.7 }}
        >
          Every frame tells a story. Every night writes a new chapter.
          These are the moments that define XL.
        </p>
      </div>

      {/* Filter bar */}
      <div
        className="flex items-center justify-center gap-2 mb-12 flex-wrap"
        style={{
          opacity: titleInView ? 1 : 0,
          transition: 'opacity 0.8s ease 0.3s',
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setFilter(cat.key)}
            className="px-4 py-2 rounded-full text-xs tracking-wider uppercase cursor-pointer"
            style={{
              fontFamily: "'Cinzel', serif",
              background: filter === cat.key ? 'rgba(212,160,74,0.15)' : 'transparent',
              border: `1px solid ${filter === cat.key ? 'rgba(212,160,74,0.3)' : 'rgba(255,255,255,0.06)'}`,
              color: filter === cat.key ? '#d4a04a' : 'rgba(245,240,232,0.35)',
              transition: 'all 0.3s ease',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <div
        ref={gridRef}
        className="max-w-6xl mx-auto grid gap-4 md:gap-5"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gridAutoRows: '220px',
        }}
      >
        {filteredFrames.map((frame, i) => (
          <FrameCard
            key={frame.id}
            frame={frame}
            index={i}
            inView={gridInView}
            isHovered={hoveredId === frame.id}
            onHover={() => setHoveredId(frame.id)}
            onLeave={() => setHoveredId(null)}
          />
        ))}
      </div>
    </section>
  );
}

function FrameCard({
  frame,
  index,
  inView,
  isHovered,
  onHover,
  onLeave,
}: {
  frame: GalleryFrame;
  index: number;
  inView: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const spanClass = frame.span === 'tall'
    ? 'row-span-2'
    : frame.span === 'wide'
    ? 'col-span-1 md:col-span-2'
    : '';

  return (
    <div
      className={`relative rounded-lg overflow-hidden cursor-pointer group ${spanClass}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(50px)',
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 80}ms`,
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <FrameVisual frame={frame} />

      {/* Hover overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `linear-gradient(180deg, transparent 30%, ${frame.accent}15 100%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Border glow on hover */}
      <div
        className="absolute inset-0 rounded-lg pointer-events-none transition-all duration-500"
        style={{
          border: `1px solid ${isHovered ? frame.accent + '40' : 'rgba(255,255,255,0.04)'}`,
          boxShadow: isHovered ? `0 0 30px ${frame.accent}10, inset 0 0 30px ${frame.accent}05` : 'none',
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-5">
        <div className="flex items-start justify-between">
          <span
            className="text-[10px] tracking-[0.2em] uppercase px-2 py-1 rounded"
            style={{
              color: frame.accent,
              background: `${frame.accent}10`,
              border: `1px solid ${frame.accent}20`,
            }}
          >
            {frame.label}
          </span>
          <span
            className="text-[10px] tracking-wider"
            style={{ color: 'rgba(245,240,232,0.25)' }}
          >
            {frame.time}
          </span>
        </div>

        <div>
          <h3
            className="text-lg font-semibold mb-1"
            style={{
              fontFamily: "'Cinzel', serif",
              color: '#f5f0e8',
              transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {frame.title}
          </h3>
          <div
            className="h-[1px] mb-2"
            style={{
              width: isHovered ? '40px' : '0px',
              background: frame.accent,
              opacity: 0.4,
              transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
          <p
            className="text-xs"
            style={{
              color: 'rgba(245,240,232,0.3)',
              transform: isHovered ? 'translateY(-2px)' : 'translateY(8px)',
              opacity: isHovered ? 1 : 0,
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            View moment →
          </p>
        </div>
      </div>
    </div>
  );
}

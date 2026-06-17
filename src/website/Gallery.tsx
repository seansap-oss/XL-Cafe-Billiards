import { useState } from 'react';
import { useInView } from '../hooks';

const FRAMES = [
  { id: 1, title: 'Neon Nights', category: 'events', color: '#d4a04a', aspect: 'tall' },
  { id: 2, title: 'The Break', category: 'billiards', color: '#3b82f6', aspect: 'wide' },
  { id: 3, title: 'Morning Blend', category: 'cafe', color: '#8b5cf6', aspect: 'square' },
  { id: 4, title: 'Crowd Surge', category: 'events', color: '#d4a04a', aspect: 'square' },
  { id: 5, title: 'Craft Hour', category: 'cafe', color: '#8b5cf6', aspect: 'tall' },
  { id: 6, title: 'Final Pot', category: 'billiards', color: '#3b82f6', aspect: 'wide' },
  { id: 7, title: 'Stage Lights', category: 'events', color: '#d4a04a', aspect: 'wide' },
  { id: 8, title: 'Latte Art', category: 'cafe', color: '#8b5cf6', aspect: 'square' },
  { id: 9, title: 'The Corner Pocket', category: 'billiards', color: '#3b82f6', aspect: 'tall' },
  { id: 10, title: 'Open Mic', category: 'events', color: '#d4a04a', aspect: 'square' },
  { id: 11, title: 'Espresso Shot', category: 'cafe', color: '#8b5cf6', aspect: 'tall' },
  { id: 12, title: 'Championship', category: 'billiards', color: '#3b82f6', aspect: 'wide' },
];

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'events', label: 'Events' },
  { key: 'billiards', label: 'Billiards' },
  { key: 'cafe', label: 'Cafe' },
];

export function Gallery() {
  const [headerRef, headerInView] = useInView(0.1);
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? FRAMES
    : FRAMES.filter((f) => f.category === activeCategory);

  return (
    <section id="gallery" className="py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div
          ref={headerRef}
          className="text-center mb-12 lg:mb-20"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <span className="text-xs tracking-[0.4em] uppercase block mb-4" style={{ color: '#d4a04a' }}>
            Rock of Frame
          </span>
          <h2
            className="text-3xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Cinzel', serif", color: '#f5f0e8' }}
          >
            Moments Captured
          </h2>
          <p className="text-sm lg:text-base max-w-xl mx-auto" style={{ color: 'rgba(245,240,232,0.35)' }}>
            The energy, the craft, the atmosphere — frozen in time.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex justify-center gap-2 mb-10 lg:mb-14">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className="px-4 py-2 rounded-full text-[10px] tracking-wider uppercase cursor-pointer transition-all duration-300"
              style={{
                background: activeCategory === cat.key ? 'rgba(212,160,74,0.12)' : 'transparent',
                border: `1px solid ${activeCategory === cat.key ? 'rgba(212,160,74,0.25)' : 'rgba(255,255,255,0.06)'}`,
                color: activeCategory === cat.key ? '#d4a04a' : 'rgba(245,240,232,0.3)',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="columns-2 lg:columns-3 gap-4 lg:gap-6">
          {filtered.map((frame, i) => (
            <FrameCard key={frame.id} frame={frame} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FrameCard({ frame, index }: { frame: (typeof FRAMES)[number]; index: number }) {
  const [ref, inView] = useInView(0.1);
  const height = frame.aspect === 'tall' ? 320 : frame.aspect === 'wide' ? 180 : 240;

  return (
    <div
      ref={ref}
      className="group relative rounded-xl overflow-hidden mb-4 lg:mb-6 break-inside-avoid cursor-pointer"
      style={{
        height,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.97)',
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.05}s`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.querySelector('.frame-overlay')!.textContent = frame.title;
        (e.currentTarget.querySelector('.frame-overlay') as HTMLElement).style.opacity = '1';
        (e.currentTarget.querySelector('.frame-bg') as HTMLElement).style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget.querySelector('.frame-overlay') as HTMLElement).style.opacity = '0';
        (e.currentTarget.querySelector('.frame-bg') as HTMLElement).style.transform = 'scale(1)';
      }}
    >
      {/* Placeholder background */}
      <div
        className="frame-bg absolute inset-0 transition-transform duration-700"
        style={{
          background: `linear-gradient(135deg, ${frame.color}10 0%, ${frame.color}05 100%)`,
        }}
      />

      {/* Pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(${frame.color}15 1px, transparent 1px)`,
          backgroundSize: '12px 12px',
        }} />
      </div>

      {/* Hover overlay */}
      <div
        className="frame-overlay absolute inset-0 flex items-end p-5 opacity-0 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, transparent 30%, ${frame.color}40 100%)`,
        }}
      >
        <span className="text-sm font-semibold" style={{ fontFamily: "'Cinzel', serif", color: '#f5f0e8' }}>
          {frame.title}
        </span>
      </div>
    </div>
  );
}

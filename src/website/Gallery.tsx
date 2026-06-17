import { useState } from 'react';
import { useInView } from '../hooks';

const FRAMES = [
  { id: 1, title: 'Neon Nights', category: 'events', color: '#d4a04a' },
  { id: 2, title: 'The Break', category: 'billiards', color: '#3b82f6' },
  { id: 3, title: 'Morning Blend', category: 'cafe', color: '#8b5cf6' },
  { id: 4, title: 'Crowd Surge', category: 'events', color: '#d4a04a' },
  { id: 5, title: 'Craft Hour', category: 'cafe', color: '#8b5cf6' },
  { id: 6, title: 'Final Pot', category: 'billiards', color: '#3b82f6' },
  { id: 7, title: 'Stage Lights', category: 'events', color: '#d4a04a' },
  { id: 8, title: 'Latte Art', category: 'cafe', color: '#8b5cf6' },
  { id: 9, title: 'Corner Pocket', category: 'billiards', color: '#3b82f6' },
  { id: 10, title: 'Open Mic', category: 'events', color: '#d4a04a' },
  { id: 11, title: 'Espresso Shot', category: 'cafe', color: '#8b5cf6' },
  { id: 12, title: 'Championship', category: 'billiards', color: '#3b82f6' },
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
    <section id="gallery" className="py-24 lg:py-32">
      {/* Header */}
      <div
        ref={headerRef}
        className="text-center px-6 mb-12 lg:mb-16"
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
          className="text-4xl lg:text-6xl font-bold mb-4"
          style={{ fontFamily: "'Cinzel', serif", color: '#f5f0e8' }}
        >
          Gallery
        </h2>
      </div>

      {/* Category filter */}
      <div className="flex justify-center gap-2 px-6 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className="px-5 py-2 text-[10px] tracking-wider uppercase cursor-pointer transition-all duration-300"
            style={{
              background: activeCategory === cat.key ? 'rgba(212,160,74,0.1)' : 'transparent',
              border: `1px solid ${activeCategory === cat.key ? 'rgba(212,160,74,0.3)' : 'rgba(255,255,255,0.06)'}`,
              color: activeCategory === cat.key ? '#d4a04a' : 'rgba(245,240,232,0.3)',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Full-bleed grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-1">
        {filtered.map((frame, i) => (
          <FrameCell key={frame.id} frame={frame} index={i} />
        ))}
      </div>
    </section>
  );
}

function FrameCell({ frame, index }: { frame: (typeof FRAMES)[number]; index: number }) {
  const [ref, inView] = useInView(0.05);
  const isLarge = index % 5 === 0;

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden cursor-pointer ${isLarge ? 'lg:col-span-2 lg:row-span-2' : ''}`}
      style={{
        aspectRatio: isLarge ? '16/9' : '1/1',
        opacity: inView ? 1 : 0,
        transition: `opacity 0.6s ease ${index * 0.05}s`,
      }}
    >
      {/* Background placeholder — replace with <img> */}
      <div
        className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
        style={{
          background: `
            linear-gradient(135deg, ${frame.color}08 0%, ${frame.color}03 100%)
          `,
        }}
      />

      {/* Hover overlay */}
      <div
        className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500"
        style={{
          background: `linear-gradient(180deg, transparent 40%, ${frame.color}30 100%)`,
        }}
      >
        <div>
          <span className="text-[9px] tracking-wider uppercase block mb-1" style={{ color: frame.color }}>
            {frame.category}
          </span>
          <span className="text-sm font-semibold" style={{ fontFamily: "'Cinzel', serif", color: '#f5f0e8' }}>
            {frame.title}
          </span>
        </div>
      </div>

      {/* Border on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ border: `1px solid ${frame.color}30` }}
      />
    </div>
  );
}

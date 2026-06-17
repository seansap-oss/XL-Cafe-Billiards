import { useState } from 'react';
import { useInView } from '../hooks';

const IMAGES = [
  { id: 1, src: '/images/639883476_18194566003342396_8288829428969507754_n.jpg', title: 'Venue Night', category: 'events', color: '#d4a04a' },
  { id: 2, src: '/images/640423585_18194591794342396_2730125327083066016_n.jpg', title: 'The Crowd', category: 'events', color: '#d4a04a' },
  { id: 3, src: '/images/642501477_18194592034342396_4449188990216561534_n.jpg', title: 'Live Energy', category: 'events', color: '#d4a04a' },
  { id: 4, src: '/images/642550276_18194592130342396_6768772885857340180_n.jpg', title: 'Stage Lights', category: 'events', color: '#d4a04a' },
  { id: 5, src: '/images/649425139_18195710482342396_1653008422813594670_n.jpg', title: 'Night Vibes', category: 'events', color: '#d4a04a' },
  { id: 6, src: '/images/649465097_18195710464342396_1921842175222718762_n.jpg', title: 'Atmosphere', category: 'events', color: '#d4a04a' },
  { id: 7, src: '/images/650286062_18195710473342396_7558392728160361024_n.jpg', title: 'The Space', category: 'venue', color: '#3b82f6' },
  { id: 8, src: '/images/651608947_18195710455342396_8987408853203398827_n.jpg', title: 'Setting', category: 'venue', color: '#3b82f6' },
  { id: 9, src: '/images/651709933_18196147723342396_4971046561711375604_n.jpg', title: 'Detail', category: 'venue', color: '#3b82f6' },
];

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'events', label: 'Events' },
  { key: 'venue', label: 'Venue' },
];

export function Gallery() {
  const [headerRef, headerInView] = useInView(0.1);
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? IMAGES
    : IMAGES.filter((f) => f.category === activeCategory);

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

function FrameCell({ frame, index }: { frame: (typeof IMAGES)[number]; index: number }) {
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
      {/* Real image */}
      <img
        src={frame.src}
        alt={frame.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />

      {/* Hover overlay */}
      <div
        className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500"
        style={{
          background: `linear-gradient(180deg, transparent 40%, ${frame.color}40 100%)`,
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

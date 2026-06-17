import { useInView } from '../hooks';

const VENUES = [
  {
    name: 'XL Live',
    subtitle: 'Premium Rock Venue',
    description: 'World-class acoustics meet raw energy. Intimate capacity, legendary performances. From emerging artists to headline acts — every show is a private experience.',
    features: ['300 Capacity', 'Dolby Atmos', 'VIP Balcony', 'Green Room'],
    color: '#d4a04a',
    hours: 'Mon–Thu 4PM–1AM, Fri–Sat 12PM–3AM',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    name: 'XL Billiards',
    subtitle: 'Luxury Lounge',
    description: 'Championship-grade tables. Handcrafted cocktails. The kind of place where deals are made and legends are born. Sophisticated competition, elevated atmosphere.',
    features: ['12 Tables', 'Craft Cocktails', 'Private Rooms', 'Tournament Ready'],
    color: '#3b82f6',
    hours: 'Mon–Thu 4PM–1AM, Fri–Sat 12PM–3AM',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="3" />
        <line x1="12" y1="2" x2="12" y2="6" />
        <line x1="12" y1="18" x2="12" y2="22" />
      </svg>
    ),
  },
  {
    name: 'XL Cafe',
    subtitle: 'Avant-Garde',
    description: 'Artisanal blends. Experimental flavors. A creative sanctuary where every cup tells a story. Part laboratory, part gallery, entirely unique.',
    features: ['Single Origin', 'Experimental Menu', 'Pastry Lab', 'Art Gallery'],
    color: '#8b5cf6',
    hours: 'Mon–Sun 7AM–11PM',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
];

export function Venues() {
  const [headerRef, headerInView] = useInView(0.1);

  return (
    <section id="venues" className="py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div
          ref={headerRef}
          className="text-center mb-16 lg:mb-24"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <span className="text-xs tracking-[0.4em] uppercase block mb-4" style={{ color: '#d4a04a' }}>
            Our Spaces
          </span>
          <h2
            className="text-3xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Cinzel', serif", color: '#f5f0e8' }}
          >
            Three Worlds. One Address.
          </h2>
          <p className="text-sm lg:text-base max-w-xl mx-auto" style={{ color: 'rgba(245,240,232,0.35)' }}>
            Each space is a destination unto itself. Together, they form something greater.
          </p>
        </div>

        {/* Venue cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {VENUES.map((venue, i) => (
            <VenueCard key={venue.name} venue={venue} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function VenueCard({ venue, index }: { venue: (typeof VENUES)[number]; index: number }) {
  const [ref, inView] = useInView(0.1);

  return (
    <div
      ref={ref}
      className="group relative rounded-2xl overflow-hidden transition-all duration-500"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.04)',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${venue.color}30`;
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Top accent line */}
      <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, transparent, ${venue.color}, transparent)` }} />

      <div className="p-8 lg:p-10">
        {/* Icon */}
        <div className="mb-6" style={{ color: venue.color }}>
          {venue.icon}
        </div>

        {/* Title */}
        <h3
          className="text-xl lg:text-2xl font-bold mb-1"
          style={{ fontFamily: "'Cinzel', serif", color: '#f5f0e8' }}
        >
          {venue.name}
        </h3>
        <p className="text-xs tracking-wider uppercase mb-4" style={{ color: venue.color }}>
          {venue.subtitle}
        </p>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(245,240,232,0.4)' }}>
          {venue.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-6">
          {venue.features.map((f) => (
            <span
              key={f}
              className="px-3 py-1 rounded-full text-[10px] tracking-wider"
              style={{
                background: `${venue.color}08`,
                border: `1px solid ${venue.color}15`,
                color: `${venue.color}cc`,
              }}
            >
              {f}
            </span>
          ))}
        </div>

        {/* Hours */}
        <div className="pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <p className="text-[10px] tracking-wider" style={{ color: 'rgba(245,240,232,0.2)' }}>
            {venue.hours}
          </p>
        </div>
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 50% 30% at 50% 0%, ${venue.color}06 0%, transparent 100%)`,
        }}
      />
    </div>
  );
}

import { useInView } from '../hooks';

const VENUES = [
  {
    name: 'XL Live',
    tagline: 'Premium Rock Venue',
    description: 'Where legends take the stage. World-class acoustics meet raw energy. An intimate setting that delivers unforgettable performances every night.',
    color: '#d4a04a',
    features: ['300 Capacity', 'Dolby Atmos', 'VIP Balcony'],
  },
  {
    name: 'XL Billiards',
    tagline: 'Luxury Lounge',
    description: 'Championship tables. Handcrafted cocktails. The kind of place where deals are made and legends are born. Sophisticated competition, elevated atmosphere.',
    color: '#3b82f6',
    features: ['12 Tables', 'Craft Cocktails', 'Private Rooms'],
  },
  {
    name: 'XL Cafe',
    tagline: 'Avant-Garde',
    description: 'Artisanal blends. Experimental flavors. A creative sanctuary where every cup tells a story. Part laboratory, part gallery, entirely unique.',
    color: '#8b5cf6',
    features: ['Single Origin', 'Experimental Menu', 'Art Gallery'],
  },
];

export function Venues() {
  const [headerRef, headerInView] = useInView(0.1);

  return (
    <section id="venue">
      {/* Section header */}
      <div
        ref={headerRef}
        className="py-24 lg:py-32 px-6 text-center"
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
          className="text-4xl lg:text-6xl font-bold mb-4"
          style={{ fontFamily: "'Cinzel', serif", color: '#f5f0e8' }}
        >
          The Venue
        </h2>
      </div>

      {/* Full-screen venue sections */}
      {VENUES.map((venue, i) => (
        <VenueSection key={venue.name} venue={venue} index={i} />
      ))}
    </section>
  );
}

function VenueSection({ venue, index }: { venue: (typeof VENUES)[number]; index: number }) {
  const [ref, inView] = useInView(0.15);
  const isReversed = index % 2 !== 0;

  return (
    <div
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        opacity: inView ? 1 : 0,
        transition: 'opacity 1s ease',
      }}
    >
      {/* Background — replace with real images */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(${isReversed ? '270deg' : '90deg'}, rgba(10,10,12,0.95) 0%, rgba(10,10,12,0.4) 50%, rgba(10,10,12,0.95) 100%),
            linear-gradient(180deg, #0a0a0c 0%, ${venue.color}08 50%, #0a0a0c 100%)
          `,
        }}
      />

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 -translate-y-1/2"
          style={{
            [isReversed ? 'right' : 'left']: '10%',
            width: 500,
            height: 500,
            background: `radial-gradient(circle, ${venue.color}08 0%, transparent 70%)`,
          }}
        />
      </div>

      <div className={`relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isReversed ? 'lg:direction-rtl' : ''}`}>
        {/* Text content */}
        <div className={`${isReversed ? 'lg:order-2 lg:text-right' : ''}`} style={{ direction: 'ltr' }}>
          <span
            className="text-xs tracking-[0.4em] uppercase block mb-4"
            style={{ color: venue.color }}
          >
            {venue.tagline}
          </span>

          <h2
            className="text-4xl lg:text-6xl font-bold mb-6 leading-tight"
            style={{
              fontFamily: "'Cinzel', serif",
              color: '#f5f0e8',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
            }}
          >
            {venue.name}
          </h2>

          <p
            className="text-sm lg:text-base leading-relaxed mb-8 max-w-md"
            style={{
              color: 'rgba(245,240,232,0.4)',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
              marginLeft: isReversed ? 'auto' : undefined,
            }}
          >
            {venue.description}
          </p>

          <div
            className={`flex flex-wrap gap-3 mb-8 ${isReversed ? 'justify-end' : ''}`}
            style={{
              opacity: inView ? 1 : 0,
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
            }}
          >
            {venue.features.map((f) => (
              <span
                key={f}
                className="px-4 py-2 text-[10px] tracking-wider uppercase"
                style={{
                  border: `1px solid ${venue.color}30`,
                  color: venue.color,
                }}
              >
                {f}
              </span>
            ))}
          </div>

          <a
            href="#enquire"
            className="inline-block px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-semibold no-underline transition-all duration-500"
            style={{
              border: `1px solid ${venue.color}40`,
              color: venue.color,
              fontFamily: "'Cinzel', serif",
              opacity: inView ? 1 : 0,
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = venue.color; e.currentTarget.style.color = '#0a0a0c'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = venue.color; }}
          >
            Find Out More
          </a>
        </div>

        {/* Image placeholder */}
        <div
          className={`${isReversed ? 'lg:order-1' : ''}`}
          style={{
            direction: 'ltr',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateX(0)' : `translateX(${isReversed ? '-40px' : '40px'})`,
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
          }}
        >
          <div
            className="aspect-[4/3] w-full rounded-none relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${venue.color}08 0%, ${venue.color}03 100%)`,
              border: `1px solid ${venue.color}10`,
            }}
          >
            {/* Placeholder text — replace with <img> */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs tracking-wider uppercase" style={{ color: `${venue.color}30` }}>
                [Photo: {venue.name}]
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

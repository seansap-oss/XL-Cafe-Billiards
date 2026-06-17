import { useInView } from '../hooks';

const EVENTS = [
  {
    date: { day: '21', month: 'Jun', year: '2026' },
    title: 'Neon Waves',
    subtitle: 'Live Electronic',
    venue: 'XL Live',
    time: '9PM – Late',
    accent: '#8b5cf6',
    featured: true,
  },
  {
    date: { day: '27', month: 'Jun', year: '2026' },
    title: 'B.A.M. Night',
    subtitle: 'Bring A Mate',
    venue: 'All Spaces',
    time: '8PM – Late',
    accent: '#d4a04a',
    featured: true,
  },
  {
    date: { day: '28', month: 'Jun', year: '2026' },
    title: 'The Midnight Session',
    subtitle: 'Jazz & Soul',
    venue: 'XL Live',
    time: '10PM – 2AM',
    accent: '#d4a04a',
    featured: false,
  },
  {
    date: { day: '22', month: 'Jun', year: '2026' },
    title: 'Saturday Showdown',
    subtitle: '8-Ball Tournament',
    venue: 'XL Billiards',
    time: '2PM – 8PM',
    accent: '#3b82f6',
    featured: false,
  },
  {
    date: { day: '29', month: 'Jun', year: '2026' },
    title: 'Championship Finals',
    subtitle: 'Annual Pool Tournament',
    venue: 'XL Billiards',
    time: '4PM – 10PM',
    accent: '#3b82f6',
    featured: true,
  },
  {
    date: { day: '23', month: 'Jun', year: '2026' },
    title: 'Latte Art Throwdown',
    subtitle: 'Barista Competition',
    venue: 'XL Cafe',
    time: '11AM – 2PM',
    accent: '#8b5cf6',
    featured: false,
  },
];

export function Events() {
  const [headerRef, headerInView] = useInView(0.1);

  return (
    <section id="events" className="py-24 lg:py-32">
      {/* Header */}
      <div
        ref={headerRef}
        className="text-center px-6 mb-16 lg:mb-24"
        style={{
          opacity: headerInView ? 1 : 0,
          transform: headerInView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <span className="text-xs tracking-[0.4em] uppercase block mb-4" style={{ color: '#d4a04a' }}>
          What&apos;s On
        </span>
        <h2
          className="text-4xl lg:text-6xl font-bold mb-4"
          style={{ fontFamily: "'Cinzel', serif", color: '#f5f0e8' }}
        >
          Upcoming Events
        </h2>
      </div>

      {/* Featured events — large */}
      <div className="px-6 lg:px-12 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {EVENTS.filter(e => e.featured).slice(0, 2).map((event, i) => (
            <FeaturedEventCard key={event.title} event={event} index={i} />
          ))}
        </div>
      </div>

      {/* Other events — smaller grid */}
      <div className="px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {EVENTS.filter(e => !e.featured).map((event, i) => (
            <EventCard key={event.title} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedEventCard({ event, index }: { event: (typeof EVENTS)[number]; index: number }) {
  const [ref, inView] = useInView(0.1);

  return (
    <div
      ref={ref}
      className="group relative min-h-[400px] flex items-end overflow-hidden cursor-pointer"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s`,
      }}
    >
      {/* Background placeholder */}
      <div
        className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
        style={{
          background: `
            linear-gradient(180deg, transparent 30%, rgba(10,10,12,0.95) 100%),
            linear-gradient(135deg, ${event.accent}08 0%, ${event.accent}03 100%)
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-8 lg:p-10 w-full">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="px-3 py-1 text-[9px] tracking-wider uppercase"
            style={{ border: `1px solid ${event.accent}40`, color: event.accent }}
          >
            Featured
          </div>
          <span className="text-[10px]" style={{ color: 'rgba(245,240,232,0.3)' }}>
            {event.venue}
          </span>
        </div>

        <h3
          className="text-3xl lg:text-4xl font-bold mb-2"
          style={{ fontFamily: "'Cinzel', serif", color: '#f5f0e8' }}
        >
          {event.title}
        </h3>
        <p className="text-sm mb-4" style={{ color: event.accent }}>
          {event.subtitle}
        </p>

        <div className="flex items-center gap-4">
          <div className="text-center">
            <span className="text-2xl font-bold block" style={{ fontFamily: "'Cinzel', serif", color: '#f5f0e8' }}>
              {event.date.day}
            </span>
            <span className="text-[9px] tracking-wider uppercase" style={{ color: 'rgba(245,240,232,0.3)' }}>
              {event.date.month}
            </span>
          </div>
          <div className="h-8 w-[1px]" style={{ background: 'rgba(255,255,255,0.08)' }} />
          <span className="text-xs" style={{ color: 'rgba(245,240,232,0.4)' }}>{event.time}</span>
        </div>
      </div>

      {/* Hover line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        style={{ background: event.accent }}
      />
    </div>
  );
}

function EventCard({ event, index }: { event: (typeof EVENTS)[number]; index: number }) {
  const [ref, inView] = useInView(0.1);

  return (
    <div
      ref={ref}
      className="group p-6 cursor-pointer transition-all duration-500"
      style={{
        background: 'rgba(255,255,255,0.01)',
        border: '1px solid rgba(255,255,255,0.04)',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${event.accent}25`; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'; }}
    >
      <div className="text-center mb-4">
        <span className="text-3xl font-bold block" style={{ fontFamily: "'Cinzel', serif", color: '#f5f0e8' }}>
          {event.date.day}
        </span>
        <span className="text-[9px] tracking-wider uppercase" style={{ color: event.accent }}>
          {event.date.month}
        </span>
      </div>

      <h3 className="text-sm font-bold text-center mb-1" style={{ color: '#f5f0e8' }}>
        {event.title}
      </h3>
      <p className="text-xs text-center mb-3" style={{ color: event.accent }}>
        {event.subtitle}
      </p>

      <div className="text-center">
        <span className="text-[10px]" style={{ color: 'rgba(245,240,232,0.25)' }}>
          {event.venue} • {event.time}
        </span>
      </div>
    </div>
  );
}

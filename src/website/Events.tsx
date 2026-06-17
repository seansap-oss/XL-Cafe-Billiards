import { useInView } from '../hooks';

const EVENTS = [
  {
    date: { day: '21', month: 'Jun' },
    title: 'Neon Waves',
    subtitle: 'Live Electronic',
    venue: 'XL Live',
    time: '9PM – Late',
    price: '$25',
    accent: '#8b5cf6',
    featured: true,
  },
  {
    date: { day: '22', month: 'Jun' },
    title: 'Saturday Showdown',
    subtitle: '8-Ball Tournament',
    venue: 'XL Billiards',
    time: '2PM – 8PM',
    price: '$10 entry',
    accent: '#3b82f6',
    featured: false,
  },
  {
    date: { day: '23', month: 'Jun' },
    title: 'Latte Art Throwdown',
    subtitle: 'Barista Competition',
    venue: 'XL Cafe',
    time: '11AM – 2PM',
    price: 'Free',
    accent: '#8b5cf6',
    featured: false,
  },
  {
    date: { day: '27', month: 'Jun' },
    title: 'B.A.M. Night',
    subtitle: 'Bring A Mate',
    venue: 'All Spaces',
    time: '8PM – Late',
    price: 'Free entry',
    accent: '#d4a04a',
    featured: true,
  },
  {
    date: { day: '28', month: 'Jun' },
    title: 'The Midnight Session',
    subtitle: 'Jazz & Soul',
    venue: 'XL Live',
    time: '10PM – 2AM',
    price: '$30',
    accent: '#d4a04a',
    featured: false,
  },
  {
    date: { day: '29', month: 'Jun' },
    title: 'Championship Finals',
    subtitle: 'Annual Pool Tournament',
    venue: 'XL Billiards',
    time: '4PM – 10PM',
    price: 'Spectator Free',
    accent: '#3b82f6',
    featured: true,
  },
];

export function Events() {
  const [headerRef, headerInView] = useInView(0.1);

  return (
    <section id="events" className="py-24 lg:py-32 px-6 lg:px-12" style={{ background: 'rgba(255,255,255,0.01)' }}>
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
            What&apos;s On
          </span>
          <h2
            className="text-3xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Cinzel', serif", color: '#f5f0e8' }}
          >
            Upcoming Events
          </h2>
          <p className="text-sm lg:text-base max-w-xl mx-auto" style={{ color: 'rgba(245,240,232,0.35)' }}>
            Every night is a different story. Don&apos;t miss what&apos;s next.
          </p>
        </div>

        {/* Events grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {EVENTS.map((event, i) => (
            <EventCard key={event.title} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EventCard({ event, index }: { event: (typeof EVENTS)[number]; index: number }) {
  const [ref, inView] = useInView(0.1);

  return (
    <div
      ref={ref}
      className="group relative rounded-xl overflow-hidden transition-all duration-500"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.04)',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${event.accent}25`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)';
      }}
    >
      <div className="flex items-start gap-5 p-6">
        {/* Date block */}
        <div
          className="flex-shrink-0 w-16 h-16 rounded-xl flex flex-col items-center justify-center"
          style={{ background: `${event.accent}10`, border: `1px solid ${event.accent}20` }}
        >
          <span className="text-xl font-bold leading-none" style={{ fontFamily: "'Cinzel', serif", color: event.accent }}>
            {event.date.day}
          </span>
          <span className="text-[9px] tracking-wider uppercase" style={{ color: `${event.accent}99` }}>
            {event.date.month}
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-bold truncate" style={{ color: '#f5f0e8' }}>
              {event.title}
            </h3>
            {event.featured && (
              <span className="flex-shrink-0 px-1.5 py-0.5 rounded text-[8px] tracking-wider uppercase" style={{ background: `${event.accent}15`, color: event.accent }}>
                Featured
              </span>
            )}
          </div>
          <p className="text-xs mb-2" style={{ color: `${event.accent}aa` }}>{event.subtitle}</p>
          <div className="flex items-center gap-3 text-[10px]" style={{ color: 'rgba(245,240,232,0.25)' }}>
            <span>{event.venue}</span>
            <span style={{ color: 'rgba(255,255,255,0.08)' }}>•</span>
            <span>{event.time}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex-shrink-0 text-right">
          <span className="text-xs font-semibold" style={{ color: '#f5f0e8' }}>
            {event.price}
          </span>
        </div>
      </div>
    </div>
  );
}

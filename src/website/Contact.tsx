import { useInView } from '../hooks';

export function Contact() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="contact" className="py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className="text-center mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <span className="text-xs tracking-[0.4em] uppercase block mb-4" style={{ color: '#d4a04a' }}>
            Find Us
          </span>
          <h2
            className="text-3xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Cinzel', serif", color: '#f5f0e8' }}
          >
            Come Visit
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Address */}
          <div
            className="rounded-2xl p-8 text-center"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.04)',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(212,160,74,0.1)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4a04a" strokeWidth="1.5" strokeLinecap="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold mb-2" style={{ color: '#f5f0e8', fontFamily: "'Cinzel', serif" }}>
              Address
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(245,240,232,0.4)' }}>
              123 Venue Street<br />
              Entertainment District<br />
              Open 7 days a week
            </p>
          </div>

          {/* Hours */}
          <div
            className="rounded-2xl p-8 text-center"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.04)',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
            }}
          >
            <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(59,130,246,0.1)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold mb-2" style={{ color: '#f5f0e8', fontFamily: "'Cinzel', serif" }}>
              Hours
            </h3>
            <div className="space-y-1.5 text-xs" style={{ color: 'rgba(245,240,232,0.4)' }}>
              <p>Mon – Thu: 4PM – 1AM</p>
              <p>Fri – Sat: 12PM – 3AM</p>
              <p>Sun: 12PM – 12AM</p>
              <p className="pt-1.5" style={{ color: 'rgba(245,240,232,0.25)' }}>Kitchen until 11PM</p>
            </div>
          </div>

          {/* Contact */}
          <div
            className="rounded-2xl p-8 text-center"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.04)',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
            }}
          >
            <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(139,92,246,0.1)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold mb-2" style={{ color: '#f5f0e8', fontFamily: "'Cinzel', serif" }}>
              Get In Touch
            </h3>
            <div className="space-y-1.5 text-xs" style={{ color: 'rgba(245,240,232,0.4)' }}>
              <p>+1 (234) 567-890</p>
              <p>hello@xlcafebilliards.com</p>
              <div className="flex justify-center gap-3 pt-3">
                {['IG', 'FB', 'G'].map((s) => (
                  <span
                    key={s}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[9px]"
                    style={{ border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(245,240,232,0.3)' }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

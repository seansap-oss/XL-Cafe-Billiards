export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image placeholder — replace with real photo */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, rgba(10,10,12,0.3) 0%, rgba(10,10,12,0.5) 50%, rgba(10,10,12,0.9) 100%),
            linear-gradient(135deg, #1a1520 0%, #0d0d12 50%, #0a0a0c 100%)
          `,
        }}
      />

      {/* Subtle grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")',
      }} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <p
          className="text-xs tracking-[0.5em] uppercase mb-8"
          style={{ color: 'rgba(212,160,74,0.6)' }}
        >
          Melbourne&apos;s Premier
        </p>

        <h1
          className="text-6xl sm:text-8xl lg:text-9xl font-bold mb-6 leading-[0.9]"
          style={{
            fontFamily: "'Cinzel', serif",
            color: '#f5f0e8',
            letterSpacing: '0.02em',
          }}
        >
          XL
        </h1>

        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-[1px] w-12" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,160,74,0.5))' }} />
          <p
            className="text-sm tracking-[0.4em] uppercase"
            style={{ color: 'rgba(212,160,74,0.7)', fontFamily: "'Cinzel', serif" }}
          >
            Cafe & Billiards
          </p>
          <div className="h-[1px] w-12" style={{ background: 'linear-gradient(90deg, rgba(212,160,74,0.5), transparent)' }} />
        </div>

        <p
          className="text-base sm:text-lg max-w-xl mx-auto mb-12 leading-relaxed"
          style={{ color: 'rgba(245,240,232,0.4)', fontWeight: 300 }}
        >
          Where music, billiards, and culture converge.
          <br />Three spaces. One unforgettable experience.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#venue"
            className="px-10 py-4 rounded-none text-xs tracking-[0.25em] uppercase font-semibold no-underline transition-all duration-500"
            style={{
              background: 'transparent',
              border: '1px solid rgba(212,160,74,0.4)',
              color: '#d4a04a',
              fontFamily: "'Cinzel', serif",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#d4a04a'; e.currentTarget.style.color = '#0a0a0c'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#d4a04a'; }}
          >
            Explore The Venue
          </a>
          <a
            href="#enquire"
            className="px-10 py-4 rounded-none text-xs tracking-[0.25em] uppercase font-semibold no-underline transition-all duration-500"
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(245,240,232,0.5)',
              fontFamily: "'Cinzel', serif",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(245,240,232,0.3)'; e.currentTarget.style.color = '#f5f0e8'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(245,240,232,0.5)'; }}
          >
            Enquire Now
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-[1px] h-12 mx-auto" style={{ background: 'linear-gradient(180deg, rgba(212,160,74,0.4), transparent)' }} />
      </div>
    </section>
  );
}

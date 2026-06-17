export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: '#0a0a0c' }} />

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: 600,
            height: 600,
            background: 'radial-gradient(circle, rgba(212,160,74,0.06) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-64"
          style={{ background: 'linear-gradient(180deg, transparent, #0a0a0c)' }}
        />
      </div>

      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="mb-6">
          <span
            className="text-xs tracking-[0.5em] uppercase block mb-6"
            style={{ color: 'rgba(212,160,74,0.5)' }}
          >
            Est. 2024
          </span>
        </div>

        <h1
          className="text-7xl sm:text-8xl lg:text-[10rem] font-bold mb-6 leading-none"
          style={{
            fontFamily: "'Cinzel', serif",
            background: 'linear-gradient(135deg, #d4a04a 0%, #f0c050 30%, #d4a04a 60%, #b8922f 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '0.05em',
            filter: 'drop-shadow(0 0 60px rgba(212,160,74,0.15))',
          }}
        >
          XL
        </h1>

        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-[1px] w-16 lg:w-24" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,160,74,0.4))' }} />
          <span
            className="text-sm lg:text-base tracking-[0.3em] uppercase"
            style={{ color: 'rgba(245,240,232,0.5)', fontFamily: "'Cinzel', serif" }}
          >
            Cafe & Billiards
          </span>
          <div className="h-[1px] w-16 lg:w-24" style={{ background: 'linear-gradient(90deg, rgba(212,160,74,0.4), transparent)' }} />
        </div>

        <p
          className="text-base lg:text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{ color: 'rgba(245,240,232,0.35)', fontWeight: 300 }}
        >
          Where music, billiards, and culture converge. Three distinct spaces. One unforgettable experience.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#venues"
            className="px-8 py-3.5 rounded-full text-xs tracking-[0.2em] uppercase font-semibold no-underline transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #d4a04a, #b8922f)',
              color: '#0a0a0c',
              fontFamily: "'Cinzel', serif",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 40px rgba(212,160,74,0.3)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
          >
            Explore Spaces
          </a>
          <a
            href="#events"
            className="px-8 py-3.5 rounded-full text-xs tracking-[0.2em] uppercase font-semibold no-underline transition-all duration-300"
            style={{
              background: 'transparent',
              border: '1px solid rgba(212,160,74,0.3)',
              color: '#d4a04a',
              fontFamily: "'Cinzel', serif",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(212,160,74,0.08)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            Upcoming Events
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(245,240,232,0.15)' }}>
          Scroll
        </span>
        <div className="w-[1px] h-8" style={{ background: 'linear-gradient(180deg, rgba(212,160,74,0.3), transparent)' }} />
      </div>
    </section>
  );
}

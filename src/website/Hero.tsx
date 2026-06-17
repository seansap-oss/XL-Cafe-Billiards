import { VideoHero } from './VideoHero';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video background */}
      <VideoHero />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <p
          className="text-xs tracking-[0.5em] uppercase mb-8"
          style={{ color: 'rgba(212,160,74,0.7)' }}
        >
          Imphal&apos;s Premier
        </p>

        <h1
          className="text-6xl sm:text-8xl lg:text-9xl font-bold mb-6 leading-[0.9]"
          style={{
            fontFamily: "'Cinzel', serif",
            color: '#f5f0e8',
            letterSpacing: '0.02em',
            textShadow: '0 0 80px rgba(0,0,0,0.5)',
          }}
        >
          XL
        </h1>

        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-[1px] w-12" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,160,74,0.5))' }} />
          <p
            className="text-sm tracking-[0.4em] uppercase"
            style={{ color: 'rgba(212,160,74,0.8)', fontFamily: "'Cinzel', serif" }}
          >
            Cafe & Billiards
          </p>
          <div className="h-[1px] w-12" style={{ background: 'linear-gradient(90deg, rgba(212,160,74,0.5), transparent)' }} />
        </div>

        <p
          className="text-base sm:text-lg max-w-xl mx-auto mb-12 leading-relaxed"
          style={{ color: 'rgba(245,240,232,0.5)', fontWeight: 300, textShadow: '0 0 40px rgba(0,0,0,0.5)' }}
        >
          Where music, billiards, and culture converge.
          <br />Three spaces. One unforgettable experience.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#venue"
            className="px-10 py-4 rounded-none text-xs tracking-[0.25em] uppercase font-semibold no-underline transition-all duration-500"
            style={{
              background: 'rgba(212,160,74,0.15)',
              border: '1px solid rgba(212,160,74,0.5)',
              color: '#d4a04a',
              fontFamily: "'Cinzel', serif",
              backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#d4a04a'; e.currentTarget.style.color = '#0a0a0c'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(212,160,74,0.15)'; e.currentTarget.style.color = '#d4a04a'; }}
          >
            Explore The Venue
          </a>
          <a
            href="#enquire"
            className="px-10 py-4 rounded-none text-xs tracking-[0.25em] uppercase font-semibold no-underline transition-all duration-500"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(245,240,232,0.6)',
              fontFamily: "'Cinzel', serif",
              backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(245,240,232,0.4)'; e.currentTarget.style.color = '#f5f0e8'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(245,240,232,0.6)'; }}
          >
            Enquire Now
          </a>
        </div>
      </div>
    </section>
  );
}

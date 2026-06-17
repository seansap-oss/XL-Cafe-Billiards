import { useInView } from '../hooks';

interface RewardsProps {
  onOpenApp: () => void;
}

const TIERS = [
  { name: 'Bronze', multiplier: '1x', color: '#cd7f32', points: '0' },
  { name: 'Silver', multiplier: '1.5x', color: '#c0c0c0', points: '500' },
  { name: 'Gold', multiplier: '2x', color: '#d4a04a', points: '2,000' },
  { name: 'Platinum', multiplier: '3x', color: '#e5e4e2', points: '5,000' },
  { name: 'Local', multiplier: '4x', color: '#f59e0b', points: '10,000' },
];

export function Rewards({ onOpenApp }: RewardsProps) {
  const [headerRef, headerInView] = useInView(0.1);
  const [contentRef, contentInView] = useInView(0.1);

  return (
    <section id="rewards" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{
        background: `
          linear-gradient(180deg, #0a0a0c 0%, rgba(212,160,74,0.02) 50%, #0a0a0c 100%)
        `,
      }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <div>
            <div
              ref={headerRef}
              style={{
                opacity: headerInView ? 1 : 0,
                transform: headerInView ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <span className="text-xs tracking-[0.4em] uppercase block mb-4" style={{ color: '#d4a04a' }}>
                XL Rewards
              </span>
              <h2
                className="text-4xl lg:text-6xl font-bold mb-6 leading-tight"
                style={{ fontFamily: "'Cinzel', serif", color: '#f5f0e8' }}
              >
                Earn.<br />Claim.<br />Repeat.
              </h2>
              <p
                className="text-sm lg:text-base leading-relaxed mb-8 max-w-md"
                style={{ color: 'rgba(245,240,232,0.4)' }}
              >
                Every dollar you spend earns points. Points unlock tiers. Tiers unlock perks. It&apos;s that simple.
              </p>

              <button
                onClick={onOpenApp}
                className="px-10 py-4 text-xs tracking-[0.25em] uppercase font-semibold cursor-pointer transition-all duration-500"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(212,160,74,0.4)',
                  color: '#d4a04a',
                  fontFamily: "'Cinzel', serif",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#d4a04a'; e.currentTarget.style.color = '#0a0a0c'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#d4a04a'; }}
              >
                Join Now — It&apos;s Free
              </button>
            </div>
          </div>

          {/* Right — tier cards */}
          <div
            ref={contentRef}
            style={{
              opacity: contentInView ? 1 : 0,
              transform: contentInView ? 'translateX(0)' : 'translateX(40px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
            }}
          >
            <div className="space-y-3">
              {TIERS.map((tier, i) => (
                <div
                  key={tier.name}
                  className="flex items-center gap-6 p-5 transition-all duration-500"
                  style={{
                    background: `${tier.color}04`,
                    border: `1px solid ${tier.color}12`,
                    opacity: contentInView ? 1 : 0,
                    transform: contentInView ? 'translateX(0)' : 'translateX(20px)',
                    transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + i * 0.1}s`,
                  }}
                >
                  <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center" style={{ background: `${tier.color}10` }}>
                    <span className="text-lg font-bold" style={{ color: tier.color, fontFamily: "'Cinzel', serif" }}>
                      {tier.name[0]}
                    </span>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-bold block" style={{ color: tier.color, fontFamily: "'Cinzel', serif" }}>
                      {tier.name}
                    </span>
                    <span className="text-[10px]" style={{ color: 'rgba(245,240,232,0.25)' }}>
                      {tier.points} points
                    </span>
                  </div>
                  <span className="text-xl font-bold" style={{ color: '#f5f0e8', fontFamily: "'Cinzel', serif" }}>
                    {tier.multiplier}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

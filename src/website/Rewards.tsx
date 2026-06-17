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

const PERKS = [
  { icon: '⚡', title: 'Happy Hour Boost', desc: 'Up to 3x points during happy hours, Mon–Fri' },
  { icon: '🎂', title: 'Birthday Reward', desc: 'Free meal during your birthday week, every tier' },
  { icon: '🎁', title: 'Refer a Mate', desc: 'Both get 100 bonus points when they sign up' },
  { icon: '🔥', title: 'Visit Streaks', desc: 'Consecutive daily visits earn milestone bonuses' },
  { icon: '🎰', title: 'Daily Spin', desc: 'Free spin every day for a chance to win prizes' },
  { icon: '📱', title: 'Scan & Earn', desc: 'Show your barcode at any counter, earn instantly' },
];

export function Rewards({ onOpenApp }: RewardsProps) {
  const [headerRef, headerInView] = useInView(0.1);
  const [tiersRef, tiersInView] = useInView(0.1);
  const [perksRef, perksInView] = useInView(0.1);

  return (
    <section id="rewards" className="py-24 lg:py-32 px-6 lg:px-12" style={{ background: 'rgba(255,255,255,0.01)' }}>
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
            XL Rewards
          </span>
          <h2
            className="text-3xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Cinzel', serif", color: '#f5f0e8' }}
          >
            Earn. Claim. Repeat.
          </h2>
          <p className="text-sm lg:text-base max-w-xl mx-auto mb-8" style={{ color: 'rgba(245,240,232,0.35)' }}>
            Every dollar you spend earns points. Points unlock tiers. Tiers unlock perks. It&apos;s that simple.
          </p>
          <button
            onClick={onOpenApp}
            className="px-8 py-3.5 rounded-full text-xs tracking-[0.2em] uppercase font-semibold cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #d4a04a, #b8922f)',
              color: '#0a0a0c',
              border: 'none',
              fontFamily: "'Cinzel', serif",
            }}
          >
            Join Now — It&apos;s Free
          </button>
        </div>

        {/* Tier ladder */}
        <div
          ref={tiersRef}
          className="mb-16 lg:mb-24"
          style={{
            opacity: tiersInView ? 1 : 0,
            transform: tiersInView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
          }}
        >
          <h3 className="text-center text-sm tracking-wider uppercase mb-8" style={{ fontFamily: "'Cinzel', serif", color: 'rgba(245,240,232,0.4)' }}>
            Membership Tiers
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
            {TIERS.map((tier, i) => (
              <div
                key={tier.name}
                className="rounded-xl p-5 text-center transition-all duration-500"
                style={{
                  background: `${tier.color}06`,
                  border: `1px solid ${tier.color}15`,
                  opacity: tiersInView ? 1 : 0,
                  transform: tiersInView ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + i * 0.1}s`,
                }}
              >
                <div className="w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: `${tier.color}15` }}>
                  <span className="text-sm font-bold" style={{ color: tier.color, fontFamily: "'Cinzel', serif" }}>
                    {tier.name[0]}
                  </span>
                </div>
                <p className="text-sm font-bold mb-1" style={{ color: tier.color, fontFamily: "'Cinzel', serif" }}>
                  {tier.name}
                </p>
                <p className="text-lg font-bold mb-1" style={{ color: '#f5f0e8' }}>
                  {tier.multiplier}
                </p>
                <p className="text-[9px]" style={{ color: 'rgba(245,240,232,0.25)' }}>
                  {tier.points} pts
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Perks grid */}
        <div
          ref={perksRef}
          style={{
            opacity: perksInView ? 1 : 0,
            transform: perksInView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
          }}
        >
          <h3 className="text-center text-sm tracking-wider uppercase mb-8" style={{ fontFamily: "'Cinzel', serif", color: 'rgba(245,240,232,0.4)' }}>
            How It Works
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {PERKS.map((perk, i) => (
              <div
                key={perk.title}
                className="flex items-start gap-4 p-5 rounded-xl transition-all duration-500"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.04)',
                  opacity: perksInView ? 1 : 0,
                  transform: perksInView ? 'translateX(0)' : 'translateX(-20px)',
                  transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + i * 0.1}s`,
                }}
              >
                <span className="text-xl flex-shrink-0">{perk.icon}</span>
                <div>
                  <h4 className="text-sm font-semibold mb-1" style={{ color: '#f5f0e8' }}>
                    {perk.title}
                  </h4>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(245,240,232,0.35)' }}>
                    {perk.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

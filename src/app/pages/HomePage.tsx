import { useInView } from '../../hooks';

export function HomePage() {
  const [heroRef, heroInView] = useInView(0.1);
  const [feedRef, feedInView] = useInView(0.1);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="px-5 pt-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(212,160,74,0.5)' }}>
              Welcome back
            </p>
            <h1 className="text-xl font-bold" style={{ fontFamily: "'Cinzel', serif", color: '#f5f0e8' }}>
              Sean
            </h1>
          </div>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #d4a04a, #b8922f)',
              color: '#0a0a0c',
              fontFamily: "'Cinzel', serif",
              fontWeight: 'bold',
              fontSize: 14,
            }}
          >
            S
          </div>
        </div>

        {/* Quick balance card */}
        <div
          ref={heroRef}
          className="rounded-2xl p-5 mb-6"
          style={{
            background: 'linear-gradient(135deg, rgba(212,160,74,0.08) 0%, rgba(139,92,246,0.05) 100%)',
            border: '1px solid rgba(212,160,74,0.12)',
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] tracking-wider uppercase" style={{ color: 'rgba(245,240,232,0.35)' }}>
              XL Credits
            </span>
            <span
              className="text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-full"
              style={{ color: '#d4a04a', background: 'rgba(212,160,74,0.1)', border: '1px solid rgba(212,160,74,0.2)' }}
            >
              Silver
            </span>
          </div>
          <div className="flex items-end gap-2 mb-4">
            <span className="text-4xl font-bold" style={{ fontFamily: "'Cinzel', serif", color: '#f5f0e8' }}>
              $47.50
            </span>
            <span className="text-xs mb-1" style={{ color: 'rgba(245,240,232,0.3)' }}>
              credit
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-[9px]" style={{ color: 'rgba(245,240,232,0.25)' }}>1,340 / 2,000 pts</span>
                <span className="text-[9px]" style={{ color: 'rgba(245,240,232,0.25)' }}>66%</span>
              </div>
              <div className="h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <div className="h-full rounded-full" style={{ width: '66%', background: 'linear-gradient(90deg, #d4a04a80, #d4a04a)', boxShadow: '0 0 8px rgba(212,160,74,0.3)' }} />
              </div>
            </div>
          </div>
          <p className="text-[9px] mt-2" style={{ color: 'rgba(245,240,232,0.2)' }}>660 pts to Gold</p>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Scan', sub: 'Earn pts', color: '#d4a04a', icon: '⊞' },
            { label: 'Spin', sub: 'Win prizes', color: '#8b5cf6', icon: '◎' },
            { label: 'Menu', sub: 'Order now', color: '#3b82f6', icon: '≡' },
          ].map((action) => (
            <button
              key={action.label}
              className="flex flex-col items-center py-4 rounded-xl cursor-pointer"
              style={{
                background: `${action.color}08`,
                border: `1px solid ${action.color}15`,
              }}
            >
              <span className="text-xl mb-1" style={{ color: action.color }}>{action.icon}</span>
              <span className="text-xs font-semibold" style={{ color: '#f5f0e8' }}>{action.label}</span>
              <span className="text-[9px]" style={{ color: 'rgba(245,240,232,0.3)' }}>{action.sub}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Feed */}
      <section ref={feedRef} className="px-5 pb-8">
        <h2
          className="text-sm tracking-wider uppercase mb-4"
          style={{
            fontFamily: "'Cinzel', serif",
            color: 'rgba(245,240,232,0.4)',
            opacity: feedInView ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        >
          Latest at XL
        </h2>

        <div className="space-y-3">
          {[
            {
              type: 'event',
              title: 'Neon Waves Live',
              detail: 'Tonight at 9PM — XL Live',
              accent: '#d4a04a',
              time: '2h ago',
            },
            {
              type: 'reward',
              title: 'Free Drink Earned',
              detail: 'You earned a free cocktail from 10 visits',
              accent: '#22c55e',
              time: '1d ago',
            },
            {
              type: 'promo',
              title: 'B.A.M. This Friday',
              detail: 'Bring a mate, drinks are on us',
              accent: '#8b5cf6',
              time: '2d ago',
            },
            {
              type: 'tier',
              title: 'Gold Tier Almost There',
              detail: '660 more points to unlock Gold benefits',
              accent: '#f59e0b',
              time: '3d ago',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-4 rounded-xl"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.04)',
                opacity: feedInView ? 1 : 0,
                transform: feedInView ? 'translateY(0)' : 'translateY(15px)',
                transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s`,
              }}
            >
              <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: item.accent }} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <h3 className="text-sm font-semibold" style={{ color: '#f5f0e8' }}>{item.title}</h3>
                  <span className="text-[9px] flex-shrink-0 ml-2" style={{ color: 'rgba(245,240,232,0.2)' }}>{item.time}</span>
                </div>
                <p className="text-xs" style={{ color: 'rgba(245,240,232,0.35)' }}>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

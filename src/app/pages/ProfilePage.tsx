export function ProfilePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold"
            style={{
              fontFamily: "'Cinzel', serif",
              background: 'linear-gradient(135deg, #d4a04a, #b8922f)',
              color: '#0a0a0c',
            }}
          >
            S
          </div>
          <div>
            <h1 className="text-lg font-bold" style={{ fontFamily: "'Cinzel', serif", color: '#f5f0e8' }}>
              Sean
            </h1>
            <p className="text-xs" style={{ color: 'rgba(245,240,232,0.35)' }}>Member since Feb 2024</p>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#c0c0c0' }} />
              <span className="text-[9px] tracking-wider uppercase" style={{ color: '#c0c0c0' }}>Silver Tier</span>
            </div>
          </div>
        </div>
      </header>

      {/* Stats grid */}
      <section className="px-5 mb-6">
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Total Spent', value: '$1,847', accent: '#d4a04a' },
            { label: 'Points Earned', value: '1,340', accent: '#8b5cf6' },
            { label: 'Visits', value: '42', accent: '#3b82f6' },
            { label: 'Rewards Claimed', value: '8', accent: '#22c55e' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-4 rounded-xl"
              style={{ background: `${stat.accent}06`, border: `1px solid ${stat.accent}12` }}
            >
              <p className="text-[9px] tracking-wider uppercase mb-1" style={{ color: 'rgba(245,240,232,0.3)' }}>
                {stat.label}
              </p>
              <p className="text-xl font-bold" style={{ fontFamily: "'Cinzel', serif", color: stat.accent }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Membership card */}
      <section className="px-5 mb-6">
        <div
          className="p-5 rounded-2xl relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%)',
            border: '1px solid rgba(192,192,192,0.15)',
          }}
        >
          <div className="absolute top-0 right-0 w-32 h-32" style={{ background: 'radial-gradient(circle, rgba(192,192,192,0.05) 0%, transparent 70%)' }} />
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs tracking-[0.2em] uppercase" style={{ color: '#c0c0c0', fontFamily: "'Cinzel', serif" }}>
                Silver Member
              </span>
              <span className="text-[9px] tracking-wider" style={{ color: 'rgba(245,240,232,0.2)' }}>
                XL Rewards
              </span>
            </div>
            <p className="text-lg font-bold mb-4" style={{ fontFamily: "'Cinzel', serif", color: '#f5f0e8', letterSpacing: '0.05em' }}>
              XL-2024-0847
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] tracking-wider uppercase" style={{ color: 'rgba(245,240,232,0.25)' }}>Valid Thru</p>
                <p className="text-xs" style={{ color: 'rgba(245,240,232,0.5)' }}>12/26</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] tracking-wider uppercase" style={{ color: 'rgba(245,240,232,0.25)' }}>Member</p>
                <p className="text-xs" style={{ color: 'rgba(245,240,232,0.5)' }}>Sean</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly summary */}
      <section className="px-5 mb-6">
        <h2 className="text-xs tracking-wider uppercase mb-3" style={{ fontFamily: "'Cinzel', serif", color: 'rgba(245,240,232,0.35)' }}>
          This Month
        </h2>
        <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs" style={{ color: 'rgba(245,240,232,0.4)' }}>June 2025</span>
            <span className="text-xs font-semibold" style={{ color: '#d4a04a' }}>$182.50</span>
          </div>
          <div className="space-y-2">
            {[
              { label: 'XL Billiards', visits: 4, spend: '$87.00' },
              { label: 'XL Cafe', visits: 3, spend: '$42.50' },
              { label: 'XL Live', visits: 2, spend: '$53.00' },
            ].map((venue) => (
              <div key={venue.label} className="flex items-center justify-between">
                <span className="text-[10px]" style={{ color: 'rgba(245,240,232,0.3)' }}>{venue.label}</span>
                <span className="text-[10px]" style={{ color: 'rgba(245,240,232,0.2)' }}>{venue.visits} visits • {venue.spend}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Settings links */}
      <section className="px-5 pb-8">
        <h2 className="text-xs tracking-wider uppercase mb-3" style={{ fontFamily: "'Cinzel', serif", color: 'rgba(245,240,232,0.35)' }}>
          Settings
        </h2>
        <div className="space-y-1">
          {[
            'Edit Profile',
            'Notification Preferences',
            'Payment Methods',
            'Privacy & Security',
            'Help & Support',
            'Sign Out',
          ].map((item) => (
            <button
              key={item}
              className="w-full flex items-center justify-between py-3.5 px-4 rounded-lg cursor-pointer"
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.03)',
              }}
            >
              <span className="text-sm" style={{ color: item === 'Sign Out' ? '#ef4444' : 'rgba(245,240,232,0.5)' }}>
                {item}
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(245,240,232,0.2)" strokeWidth="1.5" strokeLinecap="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

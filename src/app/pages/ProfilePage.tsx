import { TIER_CONFIG } from '../../types/rewards';
import type { MemberState } from '../useMember';

interface ProfilePageProps {
  member: MemberState;
  history: Array<{ amount: number; source: string; date: string }>;
}

export function ProfilePage({ member, history }: ProfilePageProps) {
  const tierInfo = TIER_CONFIG[member.tier];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold"
            style={{
              fontFamily: "'Cinzel', serif",
              background: `linear-gradient(135deg, ${tierInfo.color}, ${tierInfo.color}cc)`,
              color: '#0a0a0c',
            }}
          >
            {member.name[0]}
          </div>
          <div>
            <h1 className="text-lg font-bold" style={{ fontFamily: "'Cinzel', serif", color: '#f5f0e8' }}>
              {member.name}
            </h1>
            <p className="text-xs" style={{ color: 'rgba(245,240,232,0.35)' }}>Member since Feb 2024</p>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: tierInfo.color }} />
              <span className="text-[9px] tracking-wider uppercase" style={{ color: tierInfo.color }}>{tierInfo.label} Tier</span>
            </div>
          </div>
        </div>
      </header>

      {/* Stats grid */}
      <section className="px-5 mb-6">
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Total Spent', value: `$${(member.scanCount * 25).toLocaleString()}`, accent: '#d4a04a' },
            { label: 'Points Earned', value: member.points.toLocaleString(), accent: '#8b5cf6' },
            { label: 'Visits', value: String(member.scanCount), accent: '#3b82f6' },
            { label: 'Streak', value: `${member.streak} days`, accent: '#22c55e' },
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
            background: `linear-gradient(135deg, ${tierInfo.color}10 0%, ${tierInfo.color}05 100%)`,
            border: `1px solid ${tierInfo.color}20`,
          }}
        >
          <div className="absolute top-0 right-0 w-32 h-32" style={{ background: `radial-gradient(circle, ${tierInfo.color}08 0%, transparent 70%)` }} />
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs tracking-[0.2em] uppercase" style={{ color: tierInfo.color, fontFamily: "'Cinzel', serif" }}>
                {tierInfo.label} Member
              </span>
              <span className="text-[9px] tracking-wider" style={{ color: 'rgba(245,240,232,0.2)' }}>
                XL Rewards
              </span>
            </div>
            <p className="text-lg font-bold mb-4" style={{ fontFamily: "'Cinzel', serif", color: '#f5f0e8', letterSpacing: '0.05em' }}>
              {member.id}
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] tracking-wider uppercase" style={{ color: 'rgba(245,240,232,0.25)' }}>Valid Thru</p>
                <p className="text-xs" style={{ color: 'rgba(245,240,232,0.5)' }}>12/26</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] tracking-wider uppercase" style={{ color: 'rgba(245,240,232,0.25)' }}>Member</p>
                <p className="text-xs" style={{ color: 'rgba(245,240,232,0.5)' }}>{member.name}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Referral code */}
      <section className="px-5 mb-6">
        <div
          className="rounded-xl p-4"
          style={{ background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.12)' }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold" style={{ color: '#f5f0e8' }}>Your Referral Code</p>
            <span className="text-[9px]" style={{ color: 'rgba(245,240,232,0.25)' }}>{member.referredCount}/10 used</span>
          </div>
          <div
            className="py-2 px-3 rounded-lg text-center font-mono text-xs"
            style={{ background: 'rgba(0,0,0,0.3)', color: '#d4a04a', letterSpacing: '0.1em' }}
          >
            {member.referralCode}
          </div>
        </div>
      </section>

      {/* Recent scans */}
      <section className="px-5 mb-6">
        <h2 className="text-xs tracking-wider uppercase mb-3" style={{ fontFamily: "'Cinzel', serif", color: 'rgba(245,240,232,0.35)' }}>
          Recent Scans
        </h2>
        <div className="space-y-2">
          {history.length === 0 ? (
            <p className="text-xs py-4 text-center" style={{ color: 'rgba(245,240,232,0.2)' }}>
              No scans yet. Start earning points!
            </p>
          ) : (
            history.slice(0, 5).map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3 px-4 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.03)' }}
              >
                <div>
                  <p className="text-xs font-semibold" style={{ color: '#f5f0e8' }}>{item.source}</p>
                  <p className="text-[10px]" style={{ color: 'rgba(245,240,232,0.2)' }}>
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                </div>
                <span className="text-xs font-semibold" style={{ color: '#22c55e' }}>
                  +{item.amount}
                </span>
              </div>
            ))
          )}
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

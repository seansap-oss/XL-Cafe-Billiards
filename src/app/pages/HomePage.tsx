import { useMemo } from 'react';
import { useInView } from '../../hooks';
import { DAILY_DEALS, HAPPY_HOURS, SOCIAL_LINKS, TIER_CONFIG } from '../../types/rewards';
import type { MemberState } from '../useMember';

function isHappyHourNow(): { active: boolean; label: string; multiplier: number } {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  for (const hh of HAPPY_HOURS) {
    if (hh.dayOfWeek === day && hour >= hh.startHour && hour < hh.endHour) {
      return { active: true, label: hh.label, multiplier: hh.multiplier };
    }
  }
  return { active: false, label: '', multiplier: 1 };
}

function getTodayDeal() {
  const day = new Date().getDay();
  return DAILY_DEALS[day] || DAILY_DEALS[0];
}

function getPointsToNext(points: number): { next: string; needed: number; pct: number } {
  const tiers = [
    { name: 'Silver', min: 500 },
    { name: 'Gold', min: 2000 },
    { name: 'Platinum', min: 5000 },
    { name: 'Local', min: 10000 },
  ];
  for (const t of tiers) {
    if (points < t.min) {
      return { next: t.name, needed: t.min - points, pct: Math.round((points / t.min) * 100) };
    }
  }
  return { next: 'Max', needed: 0, pct: 100 };
}

interface HomePageProps {
  member: MemberState;
}

export function HomePage({ member }: HomePageProps) {
  const [heroRef, heroInView] = useInView(0.1);
  const [feedRef, feedInView] = useInView(0.1);
  const happyHour = useMemo(() => isHappyHourNow(), []);
  const todayDeal = useMemo(() => getTodayDeal(), []);
  const tierInfo = TIER_CONFIG[member.tier];
  const nextTier = getPointsToNext(member.points);

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
              {member.name}
            </h1>
          </div>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${tierInfo.color}, ${tierInfo.color}cc)`,
              color: '#0a0a0c',
              fontFamily: "'Cinzel', serif",
              fontWeight: 'bold',
              fontSize: 14,
            }}
          >
            {member.name[0]}
          </div>
        </div>

        {/* Happy Hour Banner */}
        {happyHour.active && (
          <div
            className="rounded-xl p-3 mb-4 flex items-center gap-3"
            style={{
              background: 'linear-gradient(135deg, rgba(212,160,74,0.12) 0%, rgba(245,158,11,0.08) 100%)',
              border: '1px solid rgba(212,160,74,0.2)',
              animation: 'fade-in 0.5s ease',
            }}
          >
            <div className="text-xl">⚡</div>
            <div className="flex-1">
              <p className="text-xs font-semibold" style={{ color: '#d4a04a' }}>{happyHour.label}</p>
              <p className="text-[10px]" style={{ color: 'rgba(245,240,232,0.4)' }}>{happyHour.multiplier}x points right now!</p>
            </div>
            <div
              className="px-2 py-1 rounded-full text-[9px] font-bold"
              style={{ background: 'rgba(212,160,74,0.2)', color: '#d4a04a' }}
            >
              ACTIVE
            </div>
          </div>
        )}

        {/* Streak Card */}
        <div
          className="rounded-xl p-4 mb-4"
          style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.12)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">🔥</span>
              <div>
                <p className="text-xs font-semibold" style={{ color: '#f59e0b' }}>Visit Streak</p>
                <p className="text-[10px]" style={{ color: 'rgba(245,240,232,0.3)' }}>Keep it going!</p>
              </div>
            </div>
            <span className="text-2xl font-bold" style={{ fontFamily: "'Cinzel', serif", color: '#f59e0b' }}>
              {member.streak}
            </span>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 h-2 rounded-full"
                style={{
                  background: i < member.streak ? '#f59e0b' : 'rgba(255,255,255,0.05)',
                  boxShadow: i < member.streak ? '0 0 6px rgba(245,158,11,0.3)' : 'none',
                }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[9px]" style={{ color: 'rgba(245,240,232,0.2)' }}>Next milestone: 7 days</span>
            <span className="text-[9px]" style={{ color: '#f59e0b' }}>+150 bonus pts</span>
          </div>
        </div>

        {/* Quick balance card */}
        <div
          ref={heroRef}
          className="rounded-2xl p-5 mb-4"
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
              style={{ color: tierInfo.color, background: `${tierInfo.color}15`, border: `1px solid ${tierInfo.color}25` }}
            >
              {tierInfo.label}
            </span>
          </div>
          <div className="flex items-end gap-2 mb-4">
            <span className="text-4xl font-bold" style={{ fontFamily: "'Cinzel', serif", color: '#f5f0e8' }}>
              ${member.credits.toFixed(2)}
            </span>
            <span className="text-xs mb-1" style={{ color: 'rgba(245,240,232,0.3)' }}>credit</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-[9px]" style={{ color: 'rgba(245,240,232,0.25)' }}>{member.points.toLocaleString()} pts</span>
                <span className="text-[9px]" style={{ color: 'rgba(245,240,232,0.25)' }}>{nextTier.pct}%</span>
              </div>
              <div className="h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <div className="h-full rounded-full" style={{ width: `${nextTier.pct}%`, background: `linear-gradient(90deg, ${tierInfo.color}80, ${tierInfo.color})`, boxShadow: `0 0 8px ${tierInfo.color}40` }} />
              </div>
            </div>
          </div>
          <p className="text-[9px] mt-2" style={{ color: 'rgba(245,240,232,0.2)' }}>{nextTier.needed.toLocaleString()} pts to {nextTier.next}</p>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-3 gap-3 mb-4">
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

      {/* Today's Deal */}
      <section className="px-5 mb-6">
        <div
          className="rounded-xl p-4 relative overflow-hidden"
          style={{
            background: `${todayDeal.accent}08`,
            border: `1px solid ${todayDeal.accent}20`,
          }}
        >
          <div className="absolute top-0 right-0 w-24 h-24" style={{ background: `radial-gradient(circle, ${todayDeal.accent}10 0%, transparent 70%)` }} />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-full" style={{ background: `${todayDeal.accent}15`, color: todayDeal.accent }}>
                Today&apos;s Deal
              </span>
              <span className="text-[9px]" style={{ color: 'rgba(245,240,232,0.2)' }}>Valid till {todayDeal.validUntil}</span>
            </div>
            <h3 className="text-sm font-bold mb-1" style={{ color: '#f5f0e8' }}>{todayDeal.title}</h3>
            <p className="text-xs mb-2" style={{ color: 'rgba(245,240,232,0.4)' }}>{todayDeal.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold" style={{ color: todayDeal.accent }}>{todayDeal.discount}</span>
              <span className="text-[10px]" style={{ color: 'rgba(245,240,232,0.25)' }}>{todayDeal.space}</span>
            </div>
          </div>
        </div>
      </section>

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
            { type: 'event', title: 'Neon Waves Live', detail: 'Tonight at 9PM — XL Live', accent: '#d4a04a', time: '2h ago' },
            { type: 'reward', title: 'Free Drink Earned', detail: 'You earned a free cocktail from 10 visits', accent: '#22c55e', time: '1d ago' },
            { type: 'promo', title: 'B.A.M. This Friday', detail: 'Bring a mate, drinks are on us', accent: '#8b5cf6', time: '2d ago' },
            { type: 'streak', title: `${member.streak}-Day Streak!`, detail: 'Keep visiting to hit 7 days for +150 bonus', accent: '#f59e0b', time: 'Today' },
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

        {/* Social Links */}
        <div className="mt-8">
          <h2 className="text-sm tracking-wider uppercase mb-4" style={{ fontFamily: "'Cinzel', serif", color: 'rgba(245,240,232,0.4)' }}>
            Follow XL
          </h2>
          <div className="flex gap-3">
            {[
              { label: 'Instagram', url: SOCIAL_LINKS.instagram, color: '#E4405F', icon: 'IG' },
              { label: 'Facebook', url: SOCIAL_LINKS.facebook, color: '#1877F2', icon: 'FB' },
              { label: 'Google Review', url: SOCIAL_LINKS.googleReview, color: '#4285F4', icon: 'G' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex flex-col items-center py-3 rounded-xl"
                style={{
                  background: `${social.color}08`,
                  border: `1px solid ${social.color}15`,
                  textDecoration: 'none',
                }}
              >
                <span className="text-lg font-bold mb-1" style={{ color: social.color }}>{social.icon}</span>
                <span className="text-[9px] tracking-wider" style={{ color: 'rgba(245,240,232,0.4)' }}>{social.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Refer a Friend */}
        <div
          className="mt-6 rounded-xl p-4"
          style={{ background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.12)' }}
        >
          <div className="flex items-center gap-3">
            <div className="text-2xl">🎁</div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold" style={{ color: '#f5f0e8' }}>Refer a Friend</h3>
              <p className="text-[10px]" style={{ color: 'rgba(245,240,232,0.35)' }}>Both get 100 bonus points</p>
            </div>
            <button
              className="px-3 py-1.5 rounded-full text-[9px] tracking-wider uppercase cursor-pointer"
              style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.25)', color: '#8b5cf6' }}
            >
              Share
            </button>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <div
              className="flex-1 py-2 px-3 rounded-lg text-center font-mono text-xs"
              style={{ background: 'rgba(0,0,0,0.3)', color: '#d4a04a', letterSpacing: '0.1em' }}
            >
              {member.referralCode}
            </div>
          </div>
          <p className="text-[9px] mt-2" style={{ color: 'rgba(245,240,232,0.2)' }}>{member.referredCount} of 10 referrals used</p>
        </div>
      </section>
    </div>
  );
}

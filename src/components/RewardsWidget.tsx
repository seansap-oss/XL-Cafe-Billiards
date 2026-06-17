import { useState } from 'react';
import type { MembershipTier, TierProgress } from '../types';
import { TIER_CONFIG } from '../types';
import { useInView } from '../hooks';

interface RewardsWidgetProps {
  visible: boolean;
}

const DEMO_PROGRESS: TierProgress = {
  current: 'silver',
  next: 'gold',
  currentPoints: 1340,
  pointsToNext: 660,
  benefits: [
    '1.5x points multiplier',
    'Priority table bookings',
    'Free birthday drink',
    'Exclusive event access',
  ],
};

export function RewardsWidget({ visible }: RewardsWidgetProps) {
  const [expanded, setExpanded] = useState(false);
  const [ref, inView] = useInView(0.1);

  if (!visible) return null;

  const progress = DEMO_PROGRESS;
  const tierColor = TIER_CONFIG[progress.current].color;
  const pct = progress.next
    ? (progress.currentPoints / (TIER_CONFIG[progress.current].minPoints + progress.pointsToNext)) * 100
    : 100;

  return (
    <section ref={ref} className="relative py-20 px-6 md:px-12">
      <div
        className="max-w-3xl mx-auto"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Section header */}
        <div className="text-center mb-10">
          <span
            className="text-xs tracking-[0.4em] uppercase block mb-4"
            style={{ color: tierColor }}
          >
            XL Rewards
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "'Cinzel', serif", color: '#f5f0e8' }}
          >
            Your Membership
          </h2>
          <p
            className="text-sm max-w-md mx-auto"
            style={{ color: 'rgba(245,240,232,0.35)' }}
          >
            Scan. Earn. Claim. The more you visit, the more you unlock.
          </p>
        </div>

        {/* Card */}
        <div
          className="relative rounded-2xl overflow-hidden cursor-pointer"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: `1px solid ${tierColor}20`,
            transition: 'all 0.4s ease',
          }}
          onClick={() => setExpanded(!expanded)}
        >
          {/* Card glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 60% 40% at 30% 20%, ${tierColor}08 0%, transparent 100%)`,
            }}
          />

          <div className="relative p-6 md:p-8">
            {/* Top row */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: tierColor, boxShadow: `0 0 8px ${tierColor}60` }}
                  />
                  <span
                    className="text-xs tracking-[0.2em] uppercase font-semibold"
                    style={{ color: tierColor, fontFamily: "'Cinzel', serif" }}
                  >
                    {progress.current} Member
                  </span>
                </div>
                <p className="text-xs" style={{ color: 'rgba(245,240,232,0.3)' }}>
                  ID: XL-2024-0847
                </p>
              </div>
              <div className="text-right">
                <div
                  className="text-2xl font-bold"
                  style={{ fontFamily: "'Cinzel', serif", color: '#f5f0e8' }}
                >
                  {progress.currentPoints.toLocaleString()}
                </div>
                <div className="text-[10px] tracking-wider" style={{ color: 'rgba(245,240,232,0.25)' }}>
                  points
                </div>
              </div>
            </div>

            {/* Progress bar */}
            {progress.next && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] tracking-wider" style={{ color: 'rgba(245,240,232,0.3)' }}>
                    Progress to {progress.next}
                  </span>
                  <span className="text-[10px]" style={{ color: 'rgba(245,240,232,0.2)' }}>
                    {progress.pointsToNext} pts to go
                  </span>
                </div>
                <div
                  className="h-1 rounded-full overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${pct}%`,
                      background: `linear-gradient(90deg, ${tierColor}80, ${tierColor})`,
                      boxShadow: `0 0 12px ${tierColor}40`,
                      transition: 'width 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />
                </div>
              </div>
            )}

            {/* Barcode placeholder */}
            <div
              className="flex items-center justify-center py-4 rounded-lg mb-4"
              style={{
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              <svg width="200" height="50" viewBox="0 0 200 50">
                {/* Barcode lines */}
                {Array.from({ length: 40 }).map((_, i) => (
                  <rect
                    key={i}
                    x={5 + i * 4.8}
                    y="5"
                    width={Math.random() > 0.5 ? 3 : 1.5}
                    height="35"
                    fill="#f5f0e8"
                    opacity={0.6 + Math.random() * 0.3}
                  />
                ))}
                <text x="100" y="48" textAnchor="middle" fill="rgba(245,240,232,0.3)" fontSize="5" fontFamily="monospace">
                  XL-2024-0847
                </text>
              </svg>
            </div>

            <p
              className="text-center text-[10px] tracking-wider"
              style={{ color: 'rgba(245,240,232,0.2)' }}
            >
              Scan at any XL location to earn points
            </p>
          </div>

          {/* Expanded benefits */}
          <div
            style={{
              maxHeight: expanded ? '300px' : '0',
              overflow: 'hidden',
              transition: 'max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div
              className="px-6 md:px-8 pb-6 md:pb-8"
              style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
            >
              <h4
                className="text-xs tracking-[0.2em] uppercase mt-6 mb-4"
                style={{ color: tierColor, fontFamily: "'Cinzel', serif" }}
              >
                Your Benefits
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {progress.benefits.map((benefit, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 py-2 px-3 rounded-lg"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                  >
                    <div
                      className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{ background: tierColor }}
                    />
                    <span className="text-xs" style={{ color: 'rgba(245,240,232,0.5)' }}>
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              {/* Tier ladder */}
              <div className="mt-6">
                <h4
                  className="text-xs tracking-[0.2em] uppercase mb-3"
                  style={{ color: 'rgba(245,240,232,0.3)', fontFamily: "'Cinzel', serif" }}
                >
                  Tier Ladder
                </h4>
                <div className="flex gap-2">
                  {(Object.keys(TIER_CONFIG) as MembershipTier[]).map((tier) => {
                    const cfg = TIER_CONFIG[tier];
                    const isActive = tier === progress.current;
                    const isPast = (Object.keys(TIER_CONFIG) as MembershipTier[]).indexOf(tier) < (Object.keys(TIER_CONFIG) as MembershipTier[]).indexOf(progress.current);
                    return (
                      <div
                        key={tier}
                        className="flex-1 py-2 px-2 rounded text-center"
                        style={{
                          background: isActive ? `${cfg.color}15` : 'rgba(255,255,255,0.02)',
                          border: `1px solid ${isActive ? cfg.color + '30' : 'rgba(255,255,255,0.04)'}`,
                          opacity: isPast ? 0.4 : 1,
                        }}
                      >
                        <div
                          className="text-[9px] tracking-wider uppercase"
                          style={{ color: isActive ? cfg.color : 'rgba(245,240,232,0.3)' }}
                        >
                          {cfg.label}
                        </div>
                        <div
                          className="text-[8px] mt-0.5"
                          style={{ color: 'rgba(245,240,232,0.15)' }}
                        >
                          {cfg.minPoints.toLocaleString()}+
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* App CTA */}
              <div className="mt-6 text-center">
                <p
                  className="text-xs mb-3"
                  style={{ color: 'rgba(245,240,232,0.25)' }}
                >
                  Full rewards experience on the XL app
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    className="px-5 py-2 rounded-full text-[10px] tracking-wider uppercase cursor-pointer"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'rgba(245,240,232,0.5)',
                    }}
                  >
                    App Store
                  </button>
                  <button
                    className="px-5 py-2 rounded-full text-[10px] tracking-wider uppercase cursor-pointer"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'rgba(245,240,232,0.5)',
                    }}
                  >
                    Google Play
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Expand indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(245,240,232,0.2)"
              strokeWidth="1.5"
              style={{
                transform: expanded ? 'rotate(180deg)' : 'rotate(0)',
                transition: 'transform 0.3s ease',
              }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

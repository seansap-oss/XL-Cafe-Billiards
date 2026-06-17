import { useState, useCallback } from 'react';
import { SpinWheel } from '../components/SpinWheel';
import { TIER_CONFIG } from '../../types/rewards';
import type { MemberState } from '../useMember';

interface RewardItem {
  id: string;
  title: string;
  cost: number;
  category: 'drink' | 'food' | 'merch';
  available: boolean;
}

const REWARDS_CATALOG: RewardItem[] = [
  { id: '1', title: 'Free Cocktail', cost: 200, category: 'drink', available: true },
  { id: '2', title: 'Free Coffee', cost: 100, category: 'drink', available: true },
  { id: '3', title: 'Free Appetizer', cost: 300, category: 'food', available: true },
  { id: '4', title: 'Free Main Course', cost: 500, category: 'food', available: true },
  { id: '5', title: 'XL T-Shirt', cost: 400, category: 'merch', available: true },
  { id: '6', title: 'XL Cap', cost: 250, category: 'merch', available: true },
];

interface RewardsPageProps {
  member: MemberState;
  onRedeem: (pointsCost: number) => boolean;
  canSpin: () => boolean;
  onSpinWin: (points: number) => MemberState;
}

export function RewardsPage({ member, onRedeem, canSpin, onSpinWin }: RewardsPageProps) {
  const [activeTab, setActiveTab] = useState<'catalog' | 'spin' | 'history'>('catalog');
  const [redeemMessage, setRedeemMessage] = useState('');

  const tierInfo = TIER_CONFIG[member.tier];

  const tabs = [
    { key: 'catalog' as const, label: 'Catalog' },
    { key: 'spin' as const, label: 'Spin' },
    { key: 'history' as const, label: 'History' },
  ];

  const handleRedeem = useCallback((cost: number, title: string) => {
    if (onRedeem(cost)) {
      setRedeemMessage(`Redeemed "${title}"! Show this at the counter.`);
      setTimeout(() => setRedeemMessage(''), 3000);
    } else {
      setRedeemMessage('Not enough points!');
      setTimeout(() => setRedeemMessage(''), 3000);
    }
  }, [onRedeem]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="px-5 pt-6 pb-4">
        <h1 className="text-lg font-bold mb-1" style={{ fontFamily: "'Cinzel', serif", color: '#f5f0e8' }}>
          Rewards
        </h1>
        <p className="text-xs" style={{ color: 'rgba(245,240,232,0.35)' }}>
          Redeem points for perks and prizes
        </p>

        {/* Points balance */}
        <div
          className="flex items-center justify-between mt-4 p-4 rounded-xl"
          style={{ background: 'rgba(212,160,74,0.06)', border: '1px solid rgba(212,160,74,0.1)' }}
        >
          <div>
            <p className="text-[10px] tracking-wider uppercase" style={{ color: 'rgba(245,240,232,0.3)' }}>Available Points</p>
            <p className="text-2xl font-bold" style={{ fontFamily: "'Cinzel', serif", color: '#d4a04a' }}>{member.points.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] tracking-wider uppercase" style={{ color: 'rgba(245,240,232,0.3)' }}>Tier</p>
            <p className="text-lg font-semibold" style={{ color: tierInfo.color }}>{tierInfo.label}</p>
          </div>
        </div>

        {/* Redeem message */}
        {redeemMessage && (
          <div
            className="mt-3 p-3 rounded-xl text-center text-xs"
            style={{
              background: redeemMessage.includes('Not enough') ? 'rgba(239,68,68,0.1)' : 'rgba(34,197,94,0.1)',
              border: `1px solid ${redeemMessage.includes('Not enough') ? 'rgba(239,68,68,0.2)' : 'rgba(34,197,94,0.2)'}`,
              color: redeemMessage.includes('Not enough') ? '#ef4444' : '#22c55e',
            }}
          >
            {redeemMessage}
          </div>
        )}
      </header>

      {/* Tabs */}
      <div className="flex px-5 gap-1 mb-5">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="flex-1 py-2.5 rounded-lg text-xs tracking-wider uppercase cursor-pointer"
            style={{
              fontFamily: "'Cinzel', serif",
              background: activeTab === tab.key ? 'rgba(212,160,74,0.12)' : 'transparent',
              border: `1px solid ${activeTab === tab.key ? 'rgba(212,160,74,0.2)' : 'rgba(255,255,255,0.04)'}`,
              color: activeTab === tab.key ? '#d4a04a' : 'rgba(245,240,232,0.3)',
              transition: 'all 0.2s ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="px-5 pb-8">
        {activeTab === 'catalog' && (
          <div className="space-y-3">
            {REWARDS_CATALOG.map((item) => {
              const canAfford = member.points >= item.cost;
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 rounded-xl"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.04)',
                    opacity: canAfford ? 1 : 0.5,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                      style={{
                        background: item.category === 'drink' ? 'rgba(212,160,74,0.1)' : item.category === 'food' ? 'rgba(34,197,94,0.1)' : 'rgba(139,92,246,0.1)',
                      }}
                    >
                      {item.category === 'drink' ? '🍸' : item.category === 'food' ? '🍔' : '👕'}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold" style={{ color: '#f5f0e8' }}>{item.title}</h3>
                      <p className="text-[10px]" style={{ color: 'rgba(245,240,232,0.25)' }}>{item.cost} points</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRedeem(item.cost, item.title)}
                    disabled={!canAfford}
                    className="px-4 py-2 rounded-full text-[10px] tracking-wider uppercase cursor-pointer disabled:cursor-not-allowed"
                    style={{
                      background: canAfford ? 'rgba(212,160,74,0.12)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${canAfford ? 'rgba(212,160,74,0.2)' : 'rgba(255,255,255,0.05)'}`,
                      color: canAfford ? '#d4a04a' : 'rgba(245,240,232,0.2)',
                    }}
                  >
                    {canAfford ? 'Redeem' : 'Locked'}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'spin' && (
          <SpinWheel
            canSpin={canSpin()}
            onResult={(pts) => onSpinWin(pts)}
          />
        )}

        {activeTab === 'history' && (
          <div className="space-y-2">
            <p className="text-[10px] tracking-wider uppercase mb-3" style={{ color: 'rgba(245,240,232,0.25)' }}>
              Recent activity
            </p>
            {[
              { title: 'Free Cocktail', points: -200, date: 'Jun 15, 2025', type: 'redeemed' },
              { title: 'Scan at Billiards', points: +25, date: 'Jun 15, 2025', type: 'earned' },
              { title: 'Spin: 50 Pts', points: +50, date: 'Jun 14, 2025', type: 'earned' },
              { title: 'Scan at Cafe', points: +15, date: 'Jun 14, 2025', type: 'earned' },
              { title: 'Scan at Live', points: +30, date: 'Jun 12, 2025', type: 'earned' },
              { title: 'Free Coffee', points: -100, date: 'Jun 10, 2025', type: 'redeemed' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3 px-4 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.03)' }}
              >
                <div>
                  <p className="text-xs font-semibold" style={{ color: '#f5f0e8' }}>{item.title}</p>
                  <p className="text-[10px]" style={{ color: 'rgba(245,240,232,0.2)' }}>{item.date}</p>
                </div>
                <span
                  className="text-xs font-semibold"
                  style={{ color: item.points > 0 ? '#22c55e' : '#ef4444' }}
                >
                  {item.points > 0 ? '+' : ''}{item.points}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

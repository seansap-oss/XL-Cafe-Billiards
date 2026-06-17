import { useState, useMemo, useCallback } from 'react';
import { HAPPY_HOURS, TIER_CONFIG } from '../../types/rewards';
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

function getNextHappyHour(): { day: string; start: string } | null {
  const now = new Date();
  const currentDay = now.getDay();
  const currentHour = now.getHours();

  const today = HAPPY_HOURS.filter(hh => hh.dayOfWeek === currentDay && currentHour < hh.endHour);
  if (today.length > 0) {
    const earliest = today.reduce((a, b) => a.startHour < b.startHour ? a : b);
    return { day: 'Today', start: `${earliest.startHour}:00` };
  }

  const upcoming = HAPPY_HOURS
    .filter(hh => hh.dayOfWeek > currentDay)
    .sort((a, b) => a.dayOfWeek - b.dayOfWeek);

  if (upcoming.length > 0) {
    const next = upcoming[0];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return { day: days[next.dayOfWeek], start: `${next.startHour}:00` };
  }
  return null;
}

const AMOUNTS = [5, 10, 15, 20, 30, 50];

interface ScanPageProps {
  member: MemberState;
  onScan: (amount: number, source: string) => MemberState;
  onStreak: () => void;
}

export function ScanPage({ member, onScan, onStreak }: ScanPageProps) {
  const [amount, setAmount] = useState('');
  const [scanned, setScanned] = useState(false);
  const [earned, setEarned] = useState(0);
  const [venue, setVenue] = useState<'xl-live' | 'xl-billiards' | 'xl-cafe'>('xl-cafe');

  const happyHour = useMemo(() => isHappyHourNow(), []);
  const nextHH = useMemo(() => getNextHappyHour(), []);
  const tierInfo = TIER_CONFIG[member.tier];

  const basePoints = parseFloat(amount) || 0;
  const multiplier = happyHour.multiplier * tierInfo.multiplier;
  const totalPoints = Math.round(basePoints * multiplier);

  const handleScan = useCallback(() => {
    if (basePoints > 0) {
      const venueLabels = { 'xl-cafe': 'XL Cafe', 'xl-billiards': 'XL Billiards', 'xl-live': 'XL Live' };
      onScan(totalPoints, venueLabels[venue]);
      onStreak();
      setEarned(totalPoints);
      setScanned(true);
    }
  }, [basePoints, totalPoints, venue, onScan, onStreak]);

  const handleReset = useCallback(() => {
    setAmount('');
    setScanned(false);
    setEarned(0);
  }, []);

  if (scanned) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
          style={{
            background: 'linear-gradient(135deg, #22c55e20, #22c55e08)',
            border: '2px solid #22c55e30',
            animation: 'scale-in 0.3s ease',
          }}
        >
          <span className="text-3xl">✓</span>
        </div>

        <h2
          className="text-3xl font-bold mb-2"
          style={{ fontFamily: "'Cinzel', serif", color: '#f5f0e8', animation: 'fade-in 0.5s ease 0.1s both' }}
        >
          +{earned}
        </h2>
        <p className="text-sm mb-1" style={{ color: 'rgba(245,240,232,0.5)', animation: 'fade-in 0.5s ease 0.2s both' }}>
          points earned
        </p>

        {happyHour.active && (
          <div
            className="flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full"
            style={{
              background: 'rgba(245,158,11,0.1)',
              border: '1px solid rgba(245,158,11,0.2)',
              animation: 'fade-in 0.5s ease 0.3s both',
            }}
          >
            <span className="text-xs">⚡</span>
            <span className="text-[10px] font-semibold" style={{ color: '#f59e0b' }}>
              {happyHour.multiplier}x Happy Hour + {tierInfo.multiplier}x {tierInfo.label} bonus!
            </span>
          </div>
        )}

        <div className="flex items-center gap-2 mb-8">
          <span className="text-xs" style={{ color: 'rgba(245,240,232,0.3)' }}>
            ${parseFloat(amount).toFixed(2)} spent
          </span>
          <span className="text-[9px]" style={{ color: 'rgba(245,240,232,0.15)' }}>×</span>
          <span className="text-[9px]" style={{ color: '#d4a04a' }}>{multiplier}x</span>
        </div>

        <div className="flex gap-3 w-full max-w-xs">
          <button
            onClick={handleReset}
            className="flex-1 py-3 rounded-xl text-xs tracking-wider uppercase cursor-pointer"
            style={{
              background: 'rgba(245,240,232,0.04)',
              border: '1px solid rgba(245,240,232,0.08)',
              color: 'rgba(245,240,232,0.5)',
            }}
          >
            Scan Again
          </button>
          <button
            className="flex-1 py-3 rounded-xl text-xs tracking-wider uppercase cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, rgba(212,160,74,0.15), rgba(212,160,74,0.05))',
              border: '1px solid rgba(212,160,74,0.25)',
              color: '#d4a04a',
            }}
          >
            View History
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-5 pt-6 pb-8">
      {/* Happy Hour Status */}
      {happyHour.active ? (
        <div
          className="rounded-xl p-4 mb-6 flex items-center gap-3"
          style={{
            background: 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(245,158,11,0.03))',
            border: '1px solid rgba(245,158,11,0.2)',
          }}
        >
          <div className="text-2xl">⚡</div>
          <div className="flex-1">
            <p className="text-sm font-semibold" style={{ color: '#f59e0b' }}>Happy Hour Active!</p>
            <p className="text-[10px]" style={{ color: 'rgba(245,240,232,0.4)' }}>
              {happyHour.label} — {happyHour.multiplier}x points on every dollar
            </p>
          </div>
          <div
            className="px-2 py-1 rounded-full text-[9px] font-bold"
            style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}
          >
            LIVE
          </div>
        </div>
      ) : nextHH && (
        <div
          className="rounded-xl p-3 mb-6 flex items-center gap-3"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <span className="text-sm">⏰</span>
          <div className="flex-1">
            <p className="text-[10px]" style={{ color: 'rgba(245,240,232,0.35)' }}>
              Happy Hour: {nextHH.day} at {nextHH.start}
            </p>
          </div>
        </div>
      )}

      {/* Current balance */}
      <div
        className="rounded-xl p-3 mb-6 flex items-center justify-between"
        style={{ background: 'rgba(212,160,74,0.04)', border: '1px solid rgba(212,160,74,0.08)' }}
      >
        <div>
          <p className="text-[9px] tracking-wider uppercase" style={{ color: 'rgba(245,240,232,0.25)' }}>Your Points</p>
          <p className="text-lg font-bold" style={{ fontFamily: "'Cinzel', serif", color: '#d4a04a' }}>{member.points.toLocaleString()}</p>
        </div>
        <div className="text-right">
          <p className="text-[9px] tracking-wider uppercase" style={{ color: 'rgba(245,240,232,0.25)' }}>Tier</p>
          <p className="text-sm font-semibold" style={{ color: tierInfo.color }}>{tierInfo.label}</p>
        </div>
      </div>

      {/* Venue selector */}
      <div className="mb-6">
        <p className="text-[10px] tracking-wider uppercase mb-3" style={{ color: 'rgba(245,240,232,0.3)' }}>
          Where are you?
        </p>
        <div className="flex gap-2">
          {([
            { id: 'xl-cafe' as const, label: 'Cafe', color: '#d4a04a' },
            { id: 'xl-billiards' as const, label: 'Billiards', color: '#3b82f6' },
            { id: 'xl-live' as const, label: 'Live', color: '#8b5cf6' },
          ]).map((v) => (
            <button
              key={v.id}
              onClick={() => setVenue(v.id)}
              className="flex-1 py-2.5 rounded-lg text-xs cursor-pointer"
              style={{
                background: venue === v.id ? `${v.color}15` : 'rgba(255,255,255,0.02)',
                border: `1px solid ${venue === v.id ? `${v.color}30` : 'rgba(255,255,255,0.05)'}`,
                color: venue === v.id ? v.color : 'rgba(245,240,232,0.4)',
                fontWeight: venue === v.id ? '600' : '400',
              }}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {/* Barcode display */}
      <div className="mb-8">
        <p className="text-[10px] tracking-wider uppercase mb-3" style={{ color: 'rgba(245,240,232,0.3)' }}>
          Show this barcode
        </p>
        <div
          className="rounded-xl p-6 flex flex-col items-center"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {/* Simulated barcode */}
          <div className="flex gap-[2px] mb-4" style={{ height: 60 }}>
            {[3,1,2,1,3,2,1,1,3,1,2,3,1,1,2,1,3,2,1,1,3,1,2,1,1,3,2,1,3,1,2,1,1,3,1,2,3,1,1,2].map((w, i) => (
              <div
                key={i}
                className="rounded-sm"
                style={{
                  width: w,
                  background: i % 3 === 0 ? '#d4a04a' : 'rgba(245,240,232,0.7)',
                  opacity: 0.8 + (Math.sin(i * 0.3) * 0.2),
                }}
              />
            ))}
          </div>
          <span className="text-[9px] tracking-[0.2em]" style={{ color: 'rgba(245,240,232,0.3)', fontFamily: 'monospace' }}>
            {member.id}
          </span>
        </div>
      </div>

      {/* Amount input */}
      <div className="mb-6">
        <p className="text-[10px] tracking-wider uppercase mb-3" style={{ color: 'rgba(245,240,232,0.3)' }}>
          Enter spend amount
        </p>
        <div
          className="flex items-center rounded-xl px-4 py-3 mb-3"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <span className="text-lg font-bold mr-2" style={{ color: 'rgba(245,240,232,0.3)' }}>$</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="flex-1 bg-transparent outline-none text-xl font-bold"
            style={{
              fontFamily: "'Cinzel', serif",
              color: '#f5f0e8',
            }}
          />
        </div>

        <div className="grid grid-cols-6 gap-2">
          {AMOUNTS.map((a) => (
            <button
              key={a}
              onClick={() => setAmount(String(a))}
              className="py-2 rounded-lg text-xs cursor-pointer"
              style={{
                background: amount === String(a) ? 'rgba(212,160,74,0.15)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${amount === String(a) ? 'rgba(212,160,74,0.3)' : 'rgba(255,255,255,0.05)'}`,
                color: amount === String(a) ? '#d4a04a' : 'rgba(245,240,232,0.4)',
              }}
            >
              ${a}
            </button>
          ))}
        </div>
      </div>

      {/* Points preview */}
      {basePoints > 0 && (
        <div
          className="rounded-xl p-4 mb-6"
          style={{
            background: happyHour.active ? 'rgba(245,158,11,0.06)' : 'rgba(212,160,74,0.04)',
            border: `1px solid ${happyHour.active ? 'rgba(245,158,11,0.12)' : 'rgba(212,160,74,0.1)'}`,
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] tracking-wider uppercase" style={{ color: 'rgba(245,240,232,0.3)' }}>
              Points to earn
            </span>
            <div className="flex items-center gap-2">
              {happyHour.active && (
                <span className="text-[9px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>
                  ⚡ {happyHour.multiplier}x
                </span>
              )}
              <span className="text-[9px] px-2 py-0.5 rounded-full" style={{ background: `${tierInfo.color}15`, color: tierInfo.color }}>
                {tierInfo.multiplier}x
              </span>
            </div>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold" style={{ fontFamily: "'Cinzel', serif", color: '#f5f0e8' }}>
              {totalPoints}
            </span>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs" style={{ color: 'rgba(245,240,232,0.3)' }}>
                {basePoints} base
              </span>
              <span className="text-[9px]" style={{ color: 'rgba(245,240,232,0.15)' }}>×</span>
              <span className="text-xs" style={{ color: '#d4a04a' }}>{multiplier}</span>
            </div>
          </div>
        </div>
      )}

      {/* Scan button */}
      <button
        onClick={handleScan}
        disabled={basePoints <= 0}
        className="w-full py-4 rounded-xl text-sm font-semibold tracking-wider uppercase cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        style={{
          background: 'linear-gradient(135deg, rgba(212,160,74,0.2), rgba(212,160,74,0.08))',
          border: '1px solid rgba(212,160,74,0.3)',
          color: '#d4a04a',
        }}
      >
        Confirm & Earn Points
      </button>
    </div>
  );
}

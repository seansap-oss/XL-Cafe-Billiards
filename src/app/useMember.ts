import { useState, useCallback } from 'react';
import { storage, KEYS } from './storage';

export interface MemberState {
  id: string;
  name: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'local';
  points: number;
  credits: number;
  streak: number;
  lastVisitDate: string | null;
  scanCount: number;
  referralCode: string;
  referredCount: number;
}

const DEFAULT_MEMBER: MemberState = {
  id: 'xl-2026-0001',
  name: 'Member',
  tier: 'bronze',
  points: 0,
  credits: 0,
  streak: 0,
  lastVisitDate: null,
  scanCount: 0,
  referralCode: 'XL-NEW-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
  referredCount: 0,
};

const TIER_THRESHOLDS: { tier: MemberState['tier']; minPoints: number }[] = [
  { tier: 'local', minPoints: 10000 },
  { tier: 'platinum', minPoints: 5000 },
  { tier: 'gold', minPoints: 2000 },
  { tier: 'silver', minPoints: 500 },
  { tier: 'bronze', minPoints: 0 },
];

function computeTier(points: number): MemberState['tier'] {
  for (const t of TIER_THRESHOLDS) {
    if (points >= t.minPoints) return t.tier;
  }
  return 'bronze';
}

export function useMember() {
  const [member, setMember] = useState<MemberState>(() =>
    storage.get(KEYS.member, DEFAULT_MEMBER)
  );

  const persist = useCallback((updated: MemberState) => {
    setMember(updated);
    storage.set(KEYS.member, updated);
  }, []);

  const addPoints = useCallback((amount: number, source: string) => {
    const now = new Date().toISOString();
    const updated = {
      ...member,
      points: member.points + amount,
      scanCount: member.scanCount + 1,
      lastVisitDate: now,
      tier: computeTier(member.points + amount),
    };
    persist(updated);

    // Also append to scan history
    const history = storage.get<Array<{ amount: number; source: string; date: string }>>(KEYS.scanHistory, []);
    history.unshift({ amount, source, date: now });
    storage.set(KEYS.scanHistory, history.slice(0, 50));

    return updated;
  }, [member, persist]);

  const addCredits = useCallback((amount: number) => {
    persist({ ...member, credits: member.credits + amount });
  }, [member, persist]);

  const redeemReward = useCallback((pointsCost: number) => {
    if (member.points < pointsCost) return false;
    persist({ ...member, points: member.points - pointsCost });
    return true;
  }, [member, persist]);

  const addSpinWin = useCallback((points: number) => {
    const today = new Date().toDateString();
    const updated = {
      ...member,
      points: member.points + points,
      tier: computeTier(member.points + points),
    };
    persist(updated);
    storage.set(KEYS.spinLastDate, today);
    return updated;
  }, [member, persist]);

  const canSpin = useCallback(() => {
    const lastDate = storage.get<string | null>(KEYS.spinLastDate, null);
    if (!lastDate) return true;
    return lastDate !== new Date().toDateString();
  }, []);

  const incrementStreak = useCallback(() => {
    const today = new Date().toDateString();
    const lastVisit = member.lastVisitDate ? new Date(member.lastVisitDate).toDateString() : null;

    if (lastVisit === today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const isConsecutive = lastVisit === yesterday.toDateString();

    const newStreak = isConsecutive ? member.streak + 1 : 1;
    persist({ ...member, streak: newStreak, lastVisitDate: new Date().toISOString() });
  }, [member, persist]);

  const getHistory = useCallback(() => {
    return storage.get<Array<{ amount: number; source: string; date: string }>>(KEYS.scanHistory, []);
  }, []);

  return {
    member,
    addPoints,
    addCredits,
    redeemReward,
    addSpinWin,
    canSpin,
    incrementStreak,
    getHistory,
  };
}

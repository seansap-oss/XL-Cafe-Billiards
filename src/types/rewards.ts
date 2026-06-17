export interface MemberProfile {
  id: string;
  userId: string;
  name: string;
  email: string;
  avatarUrl?: string;
  joinedAt: string;
  tier: MembershipTier;
  points: number;
  totalSpent: number;
  scanCount: number;
}

export type MembershipTier = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  category: 'drink' | 'food' | 'merch' | 'experience' | 'discount';
  icon: string;
  available: boolean;
  tierRequired: MembershipTier;
  expiresAt?: string;
}

export interface ClaimedReward {
  id: string;
  rewardId: string;
  memberId: string;
  claimedAt: string;
  redeemedAt?: string;
  barcode: string;
  status: 'claimed' | 'redeemed' | 'expired';
}

export interface ScanEvent {
  id: string;
  memberId: string;
  venueSpace: 'xl-live' | 'xl-billiards' | 'xl-cafe';
  timestamp: string;
  pointsEarned: number;
  spendAmount: number;
}

export interface TierProgress {
  current: MembershipTier;
  next: MembershipTier | null;
  currentPoints: number;
  pointsToNext: number;
  benefits: string[];
}

export const TIER_CONFIG: Record<MembershipTier, { label: string; color: string; minPoints: number; multiplier: number }> = {
  bronze:   { label: 'Bronze',   color: '#cd7f32', minPoints: 0,     multiplier: 1 },
  silver:   { label: 'Silver',   color: '#c0c0c0', minPoints: 500,   multiplier: 1.5 },
  gold:     { label: 'Gold',     color: '#d4a04a', minPoints: 2000,  multiplier: 2 },
  platinum: { label: 'Platinum', color: '#e5e4e2', minPoints: 5000,  multiplier: 3 },
};

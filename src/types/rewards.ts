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
  streak: VisitStreak;
  birthday: string | null;
  referralCode: string;
  referredBy: string | null;
}

export interface VisitStreak {
  currentDays: number;
  longestStreak: number;
  lastVisitDate: string;
  bonusPointsEarned: number;
}

export type MembershipTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'local';

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
  multiplier: number;
  isHappyHour: boolean;
  streakBonus: number;
}

export interface HappyHour {
  id: string;
  dayOfWeek: number; // 0-6
  startHour: number;
  endHour: number;
  multiplier: number;
  label: string;
  spaces: string[];
}

export interface Referral {
  id: string;
  referrerId: string;
  referredId: string;
  referredName: string;
  status: 'pending' | 'completed' | 'rewarded';
  createdAt: string;
  rewardedAt?: string;
  bonusPoints: number;
}

export interface TierProgress {
  current: MembershipTier;
  next: MembershipTier | null;
  currentPoints: number;
  pointsToNext: number;
  benefits: string[];
}

export interface DailyDeal {
  id: string;
  title: string;
  description: string;
  space: string;
  discount: string;
  validUntil: string;
  accent: string;
}

export const TIER_CONFIG: Record<MembershipTier, { label: string; color: string; minPoints: number; multiplier: number }> = {
  bronze:   { label: 'Bronze',   color: '#cd7f32', minPoints: 0,     multiplier: 1 },
  silver:   { label: 'Silver',   color: '#c0c0c0', minPoints: 500,   multiplier: 1.5 },
  gold:     { label: 'Gold',     color: '#d4a04a', minPoints: 2000,  multiplier: 2 },
  platinum: { label: 'Platinum', color: '#e5e4e2', minPoints: 5000,  multiplier: 3 },
  local:    { label: 'Local',    color: '#f59e0b', minPoints: 10000, multiplier: 4 },
};

export const HAPPY_HOURS: HappyHour[] = [
  {
    id: 'hh-1',
    dayOfWeek: 1, // Monday
    startHour: 14,
    endHour: 16,
    multiplier: 3,
    label: 'Monday Happy Hour',
    spaces: ['xl-cafe', 'xl-billiards'],
  },
  {
    id: 'hh-2',
    dayOfWeek: 2, // Tuesday
    startHour: 14,
    endHour: 16,
    multiplier: 3,
    label: 'Tuesday Happy Hour',
    spaces: ['xl-cafe', 'xl-billiards'],
  },
  {
    id: 'hh-3',
    dayOfWeek: 3, // Wednesday
    startHour: 14,
    endHour: 16,
    multiplier: 3,
    label: 'Wednesday Happy Hour',
    spaces: ['xl-cafe', 'xl-billiards'],
  },
  {
    id: 'hh-4',
    dayOfWeek: 4, // Thursday
    startHour: 14,
    endHour: 17,
    multiplier: 3,
    label: 'Thursday Extended Happy Hour',
    spaces: ['xl-cafe', 'xl-billiards', 'xl-live'],
  },
  {
    id: 'hh-5',
    dayOfWeek: 5, // Friday
    startHour: 15,
    endHour: 18,
    multiplier: 2,
    label: 'Friday Pre-Game',
    spaces: ['xl-cafe'],
  },
];

export const BIRTHDAY_REWARD = {
  title: 'Free Birthday Meal',
  description: 'Enjoy a complimentary meal on us during your birthday week',
  category: 'food' as const,
  pointsCost: 0,
  tierRequired: 'bronze' as MembershipTier,
};

export const REFERRAL_CONFIG = {
  bonusPoints: 100,
  maxReferrals: 10,
  doubleBonusEvents: ['friday'], // Double referral bonus on Fridays
};

export const STREAK_CONFIG = {
  bonusPerDay: 10,
  streakMilestones: [
    { days: 3, bonus: 50, label: '3-Day Streak' },
    { days: 7, bonus: 150, label: 'Weekly Warrior' },
    { days: 14, bonus: 300, label: 'Two-Week Legend' },
    { days: 30, bonus: 1000, label: 'Monthly Master' },
  ],
  resetGracePeriodHours: 36, // Visit within 36 hours to keep streak
};

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/xlcafebilliards',
  facebook: 'https://facebook.com/xlcafebilliards',
  googleReview: 'https://g.page/r/xlcafebilliards/review',
  website: 'https://xlcafebilliards.com',
};

export const DAILY_DEALS: DailyDeal[] = [
  {
    id: 'dd-1',
    title: 'Monday Motivation',
    description: 'Any coffee + pastry combo for $8',
    space: 'XL Cafe',
    discount: '$8 Combo',
    validUntil: '4PM',
    accent: '#8b5cf6',
  },
  {
    id: 'dd-2',
    title: 'Tuesday Table Time',
    description: '2 hours pool for $12 (normally $20)',
    space: 'XL Billiards',
    discount: '40% Off',
    validUntil: '6PM',
    accent: '#3b82f6',
  },
  {
    id: 'dd-3',
    title: 'Wednesday Warm-Up',
    description: 'Half-price appetizers after 5PM',
    space: 'XL Cafe & Billiards',
    discount: '50% Off',
    validUntil: '8PM',
    accent: '#22c55e',
  },
  {
    id: 'dd-4',
    title: 'Thursday Night Live',
    description: 'Free entry + first drink for members',
    space: 'XL Live',
    discount: 'Free Entry',
    validUntil: '9PM',
    accent: '#d4a04a',
  },
  {
    id: 'dd-5',
    title: 'Friday B.A.M.',
    description: 'Bring a mate — both get 2x points',
    space: 'All Spaces',
    discount: '2x Points',
    validUntil: '11PM',
    accent: '#ec4899',
  },
  {
    id: 'dd-6',
    title: 'Saturday Session',
    description: 'Bottomless coffee $12 before noon',
    space: 'XL Cafe',
    discount: '$12 Bottomless',
    validUntil: '12PM',
    accent: '#f59e0b',
  },
  {
    id: 'dd-7',
    title: 'Sunday Recovery',
    description: 'Free smoothie with any food order',
    space: 'XL Cafe',
    discount: 'Free Smoothie',
    validUntil: '3PM',
    accent: '#10b981',
  },
];

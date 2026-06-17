const STORAGE_PREFIX = 'xl_';

export const storage = {
  get<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(STORAGE_PREFIX + key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    } catch {
      // Storage full or blocked
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(STORAGE_PREFIX + key);
    } catch {
      // Ignore
    }
  },
};

// Keys
export const KEYS = {
  member: 'member_profile',
  points: 'points_balance',
  credits: 'credits_balance',
  streak: 'visit_streak',
  scanHistory: 'scan_history',
  claimedRewards: 'claimed_rewards',
  spinLastDate: 'spin_last_date',
  spinWins: 'spin_wins',
  referredCount: 'referral_count',
  settings: 'user_settings',
} as const;

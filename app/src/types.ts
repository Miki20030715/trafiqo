export type Mode = 'citizen' | 'control';

export type Role = 'driver' | 'taxi' | 'transit' | 'cyclist' | 'logistics';

export type AppUser = {
  id: string;
  email: string;
  name: string;
  organisation?: string;
};

export type Severity = 'info' | 'warning' | 'critical';

export type AppNotification = {
  id: string;
  severityKey: Severity;
  titleKey: string;
  bodyKey: string;
  delayKey?: string;
  altKey?: string;
  minutesAgo: number;
  read: boolean;
};

export type RewardAction = {
  id: string;
  points: number;
  roles?: Role[]; // if set, only shown for these roles
};

export type RewardItem = {
  id: string;
  cost: number;
};

export type Redemption = {
  id: string;
  itemId: string;
  cost: number;
  at: number;
};

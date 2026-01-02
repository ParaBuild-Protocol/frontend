// User types
export interface User {
  id: string;
  address: string;
  username: string;
  bio?: string;
  avatar: string;
  joinedAt: Date;
  isAdmin: boolean;
  socialLinks: {
    github?: string;
    twitter?: string;
    discord?: string;
  };
  // Extended fields for profile pages
  walletAddress?: string;
  tokenBalance?: number;
  totalPoints?: number;
  rank?: number;
  createdAt?: string;
  github?: string;
  twitter?: string;
  website?: string;
}

export interface UserStats {
  totalPBUILD: number;
  totalPoints: number;
  contributionsCount: number;
  rank: number;
  rewardsRedeemed: number;
  questsCompleted: number;
}

// Contribution types
export type ContributionType =
  | "hackathon_win"
  | "hackathon_participation"
  | "bounty"
  | "open_source_pr"
  | "open_source"
  | "tutorial"
  | "content"
  | "community_event"
  | "community";

export type ContributionStatus = "pending" | "approved" | "rejected";

export interface Contribution {
  id: string;
  userId: string;
  type: ContributionType;
  projectName: string;
  description: string;
  proofUrl: string;
  githubUrl?: string;
  placement?: string;
  prize?: string;
  status: ContributionStatus;
  pointsAwarded: number;
  tokensAwarded: number;
  tokensEarned?: number;
  submittedAt: Date;
  reviewedAt?: Date;
  reviewNotes?: string;
}

// Reward types
export type RewardCategory = "merch" | "tickets" | "tools" | "nft" | "other";
export type RewardType = "merch" | "ticket" | "tool" | "nft" | "experience";

export interface Reward {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  costPBUILD: number;
  costUsd: number;
  category: RewardCategory;
  type?: RewardType;
  stock: number;
  maxStock: number;
  remainingSupply?: number | null;
  sizes?: string[];
  isActive: boolean;
  createdAt: Date;
}

// Quest types
export type QuestType = "daily" | "weekly" | "one_time" | "onetime";

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: QuestType;
  pointsReward: number;
  requirements?: string;
  progress: number;
  maxProgress: number;
  isCompleted: boolean;
  expiresAt?: Date;
}

// Leaderboard types
export interface LeaderboardEntry {
  rank: number;
  user: User;
  stats: UserStats;
  // Flattened fields for easier access
  userId?: string;
  username?: string;
  avatar?: string;
  totalPBUILD?: number;
  totalPoints?: number;
  contributionsCount?: number;
}

// Activity types
export interface Activity {
  id: string;
  type: "contribution" | "reward" | "quest" | "points";
  title: string;
  description: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

// Notification types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
  read: boolean;
  createdAt: Date;
}

// Filter/Sort types
export interface ContributionFilters {
  status?: ContributionStatus;
  type?: ContributionType;
  dateRange?: { start: Date; end: Date };
}

export interface RewardFilters {
  category?: RewardCategory;
  priceRange?: { min: number; max: number };
  inStock?: boolean;
}

export type SortOrder = "asc" | "desc";

export interface PaginationParams {
  page: number;
  limit: number;
}

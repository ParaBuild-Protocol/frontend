// types/utils.ts - Type utilities and mappers

import { User, UserStats } from "./user.types";
import { Contribution } from "./contribution.types";

/**
 * Map backend User to frontend UserStats
 */
export const mapUserToStats = (user: User): UserStats => ({
  totalPBUILD: user.total_tokens,
  contributions: user.contributions,
  rank: user.global_rank,
  totalPoints: user.points_earned,
});

/**
 * Format wallet address for display
 */
export const formatAddress = (address: string): string => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

/**
 * Get user display name (username or truncated address)
 */
export const getUserDisplayName = (user: User | null | undefined): string => {
  if (!user) return "Anonymous";
  return user.username || formatAddress(user.wallet_address);
};

/**
 * Get user avatar initials
 */
export const getUserInitials = (user: User | null | undefined): string => {
  if (!user) return "?";
  if (user.username) {
    return user.username.slice(0, 2).toUpperCase();
  }
  return user.wallet_address.slice(2, 4).toUpperCase();
};

/**
 * Convert ISO date string to Date object
 */
export const parseDate = (dateString: string): Date => {
  return new Date(dateString);
};

/**
 * Format date for display
 */
export const formatDate = (date: Date | string): string => {
  const d = typeof date === "string" ? parseDate(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
 * Format relative time (e.g., "2 days ago")
 */
export const formatRelativeTime = (date: Date | string): string => {
  const d = typeof date === "string" ? parseDate(date) : date;
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - d.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
};

/**
 * Check if addresses match (case-insensitive)
 */
export const addressesMatch = (addr1?: string, addr2?: string): boolean => {
  if (!addr1 || !addr2) return false;
  return addr1.toLowerCase() === addr2.toLowerCase();
};

/**
 * Validate Ethereum address
 */
export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

/**
 * Calculate contribution completion percentage
 */
export const getContributionStats = (contributions: Contribution[]) => {
  const total = contributions.length;
  const approved = contributions.filter((c) => c.status === "approved").length;
  const pending = contributions.filter((c) => c.status === "pending").length;
  const rejected = contributions.filter((c) => c.status === "rejected").length;

  return {
    total,
    approved,
    pending,
    rejected,
    approvalRate: total > 0 ? (approved / total) * 100 : 0,
  };
};

/**
 * Sort contributions by date (newest first)
 */
export const sortByNewest = (contributions: Contribution[]): Contribution[] => {
  return [...contributions].sort(
    (a, b) => parseDate(b.created_at).getTime() - parseDate(a.created_at).getTime()
  );
};

/**
 * Sort contributions by tokens (highest first)
 */
export const sortByTokens = (contributions: Contribution[]): Contribution[] => {
  return [...contributions].sort((a, b) => b.tokens_won - a.tokens_won);
};

/**
 * Filter contributions by status
 */
export const filterByStatus = (
  contributions: Contribution[],
  status: string
): Contribution[] => {
  return contributions.filter((c) => c.status === status);
};

/**
 * Calculate total tokens from contributions
 */
export const calculateTotalTokens = (contributions: Contribution[]): number => {
  return contributions.reduce((sum, c) => sum + c.tokens_won, 0);
};

/**
 * Calculate total points from contributions
 */
export const calculateTotalPoints = (contributions: Contribution[]): number => {
  return contributions.reduce((sum, c) => sum + c.points, 0);
};

/**
 * Type-safe localStorage wrapper
 */
export const storage = {
  setItem: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Storage set error:", error);
    }
  },

  getItem: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Storage get error:", error);
      return null;
    }
  },

  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Storage remove error:", error);
    }
  },

  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Storage clear error:", error);
    }
  },
};

/**
 * Debounce function for search/input
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};
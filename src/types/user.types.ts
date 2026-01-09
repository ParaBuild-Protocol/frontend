// types/user.types.ts - User types matching backend
export interface User {
  _id: string;
  wallet_address: string;
  nonce: string;
  
  // Profile fields
  username?: string;
  bio?: string;
  profile_picture?: string;
  
  // Social links
  github_url?: string;
  twitter_url?: string;
  discord_username?: string;
  
  // Stats
  role: string;
  total_tokens: number;
  contributions: number;
  points_earned: number;
  global_rank: number;
  
  // Auth
  refresh_token?: string;
  created_at: string; // ISO date string from backend
}

// User stats for dashboard/profile
export interface UserStats {
  totalPBUILD: number;      // Maps to total_tokens
  contributions: number;    // Maps to contributions
  rank: number;             // Maps to global_rank
  totalPoints: number;      // Maps to points_earned
}

// User profile update DTO
export interface UpdateUserProfileDTO {
  username?: string;
  bio?: string;
  profile_picture?: string;
  github_url?: string;
  twitter_url?: string;
  discord_username?: string;
}

// Auth response from backend
export interface AuthResponse {
  user: User;
  access_token: string;
  refresh_token: string;
}

// Leaderboard user (minimal info)
export interface LeaderboardUser {
  wallet_address: string;
  username?: string;
  profile_picture?: string;
  total_tokens: number;
  contributions: number;
  global_rank: number;
}
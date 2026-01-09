// types/api.types.ts - API response types

import { User } from "./user.types";
import { Contribution } from "./contribution.types";

// Generic API response wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Paginated response
export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

// Auth API responses
export interface AuthNonceResponse {
  nonce: string;
  message: string;
}

export interface AuthVerifyResponse {
  success: boolean;
  user: User;
  access_token: string;
  refresh_token: string;
}

export interface AuthRefreshResponse {
  access_token: string;
}

// User API responses
export interface GetUserResponse extends ApiResponse<User> {}

export interface UpdateUserResponse extends ApiResponse<User> {}

export interface GetLeaderboardResponse extends ApiResponse<User[]> {}

// Contribution API responses
export interface GetContributionsResponse extends PaginatedResponse<Contribution> {}

export interface GetContributionResponse extends ApiResponse<Contribution> {}

export interface CreateContributionResponse extends ApiResponse<Contribution> {}

export interface UpdateContributionResponse extends ApiResponse<Contribution> {}

export interface DeleteContributionResponse extends ApiResponse<{ message: string }> {}

// Stats API responses
export interface UserStatsResponse extends ApiResponse<{
  total_tokens: number;
  contributions: number;
  points_earned: number;
  global_rank: number;
}> {}

export interface PlatformStatsResponse extends ApiResponse<{
  total_users: number;
  total_contributions: number;
  total_tokens_distributed: number;
  total_points_awarded: number;
}> {}

// Error response
export interface ErrorResponse {
  success: false;
  error: string;
  message: string;
  statusCode?: number;
}

// Type guard for error response
export const isErrorResponse = (response: any): response is ErrorResponse => {
  return response && response.success === false && 'error' in response;
};
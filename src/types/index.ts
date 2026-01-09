// types/index.ts - Main types export file

// User types
export type {
  User,
  UserStats,
  UpdateUserProfileDTO,
  AuthResponse,
  LeaderboardUser,
} from "./user.types";

// Contribution types
export {
  ContributionType,
  ContributionStatus,
  type Contribution,
  type CreateContributionDTO,
  type UpdateContributionDTO,
  type ContributionWithUser,
  type ContributionFilters,
  type ContributionStats,
  isContributionType,
  isContributionStatus,
  getStatusColor,
  getTypeColor,
} from "./contribution.types";

// API types
export type {
  ApiResponse,
  PaginatedResponse,
  AuthNonceResponse,
  AuthVerifyResponse,
  AuthRefreshResponse,
  GetUserResponse,
  UpdateUserResponse,
  GetLeaderboardResponse,
  GetContributionsResponse,
  GetContributionResponse,
  CreateContributionResponse,
  UpdateContributionResponse,
  DeleteContributionResponse,
  UserStatsResponse,
  PlatformStatsResponse,
  ErrorResponse,
  isErrorResponse,
} from "./api.types";

// Utility functions
export {
  mapUserToStats,
  formatAddress,
  getUserDisplayName,
  getUserInitials,
  parseDate,
  formatDate,
  formatRelativeTime,
  addressesMatch,
  isValidAddress,
  getContributionStats,
  sortByNewest,
  sortByTokens,
  filterByStatus,
  calculateTotalTokens,
  calculateTotalPoints,
  storage,
  debounce,
  truncateText,
} from "./utils";
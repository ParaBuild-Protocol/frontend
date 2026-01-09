// types/contribution.types.ts - Contribution types matching backend

// Contribution type enum (matches backend)
export enum ContributionType {
  HACKATHON_WIN = "Hackathon win",
  HACKATHON_PARTICIPATION = "Hackathon participation",
  OPEN_SOURCE = "Open source",
  TUTORIAL = "Tutorial",
  BOUNTY = "Bounty",
}

// Contribution status enum (matches backend)
export enum ContributionStatus {
  PENDING = "pending",
  PENDING_REVIEW = "pending review",
  APPROVED = "approved",
  REJECTED = "rejected",
}

// Main contribution interface
export interface Contribution {
  _id: string;
  user_id: string;
  wallet_address: string;
  
  // Form fields
  name: string;           // Project Name
  description: string;    // Description
  type: ContributionType; // Contribution Type
  proof_url: string;      // Proof URL (required)
  github_url?: string;    // GitHub Repository (optional)
  
  // Backend ID for on-chain linking
  backend_id: string;       // Unique ID for contract matching
  
  // On-chain fields
  contribution_id?: number; // On-chain contribution ID
  points: number;           // Points from blockchain
  tokens_won: number;       // PBUILD tokens earned
  tx_hash?: string;         // Transaction hash
  
  // Status
  status: ContributionStatus;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

// Create contribution DTO
export interface CreateContributionDTO {
  name: string;
  description: string;
  type: ContributionType;
  proof_url: string;
  github_url?: string;
}

// Update contribution DTO
export interface UpdateContributionDTO {
  name?: string;
  description?: string;
  type?: ContributionType;
  proof_url?: string;
  github_url?: string;
}

// Contribution with user details (for display)
export interface ContributionWithUser extends Contribution {
  user: {
    wallet_address: string;
    username?: string;
    profile_picture?: string;
  };
}

// Contribution filters
export interface ContributionFilters {
  status?: ContributionStatus;
  type?: ContributionType;
  wallet_address?: string;
  from_date?: string;
  to_date?: string;
}

// Contribution stats
export interface ContributionStats {
  total: number;
  approved: number;
  pending: number;
  rejected: number;
  total_points: number;
  total_tokens: number;
}

// Type guards
export const isContributionType = (value: string): value is ContributionType => {
  return Object.values(ContributionType).includes(value as ContributionType);
};

export const isContributionStatus = (value: string): value is ContributionStatus => {
  return Object.values(ContributionStatus).includes(value as ContributionStatus);
};

// Helper to get status color
export const getStatusColor = (status: ContributionStatus): string => {
  switch (status) {
    case ContributionStatus.APPROVED:
      return "success";
    case ContributionStatus.PENDING:
      return "warning";
    case ContributionStatus.PENDING_REVIEW:
      return "info";
    case ContributionStatus.REJECTED:
      return "destructive";
    default:
      return "muted";
  }
};

// Helper to get type badge color
export const getTypeColor = (type: ContributionType): string => {
  switch (type) {
    case ContributionType.HACKATHON_WIN:
      return "from-amber-500 to-orange-600";
    case ContributionType.HACKATHON_PARTICIPATION:
      return "from-blue-500 to-cyan-600";
    case ContributionType.OPEN_SOURCE:
      return "from-green-500 to-emerald-600";
    case ContributionType.TUTORIAL:
      return "from-purple-500 to-pink-600";
    case ContributionType.BOUNTY:
      return "from-rose-500 to-red-600";
    default:
      return "from-gray-500 to-gray-600";
  }
};
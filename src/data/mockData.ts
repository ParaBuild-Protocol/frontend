import type {
  User,
  UserStats,
  Contribution,
  Reward,
  Quest,
  LeaderboardEntry,
  Activity,
  Notification,
} from "@/types";

// Current user (mock authenticated user)
export const currentUser: User = {
  id: "user_1",
  wallet_address: "0x1234...5678",
  username: "PBuilder.eth",
  bio: "Full-stack Web3 developer | Building the future of decentralized applications | Hackathon enthusiast 🚀",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PBuilder",
  joinedAt: new Date("2024-01-15"),
  isAdmin: false,
  email: "pbuilder@example.com",
  github_url: "https://github.com/PBuilder",
  twitter_url: "https://twitter.com/PBuilder_eth",
  website_url: "https://pbuilder.dev",
  discord_username: "PBuilder#1234",
};

export const currentUserStats: UserStats = {
  totalPBUILD: 15750,
  totalPoints: 48500,
  contributionsCount: 23,
  rank: 42,
  rewardsRedeemed: 3,
  questsCompleted: 18,
};

// Mock users for leaderboard
export const mockUsers: User[] = [
  currentUser,
  {
    id: "user_2",
    wallet_address: "0x2345...6789",
    username: "defi_master",
    bio: "DeFi protocol architect",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=defi",
    joinedAt: new Date("2023-11-20"),
    isAdmin: false, github_url: "https://github.com/defimaster" },
  
  {
    id: "user_3",
    wallet_address: "0x3456...7890",
    username: "nft_queen",
    bio: "NFT artist & smart contract dev",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=nft",
    joinedAt: new Date("2023-12-05"),
    isAdmin: false,
    twitter_url: "https://twitter.com/nft_queen",
  },
  {
    id: "user_4",
    wallet_address: "0x4567...8901",
    username: "solidity_wizard",
    bio: "Smart contract security researcher",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=solidity",
    joinedAt: new Date("2023-10-01"),
    isAdmin: false,
  },
  {
    id: "user_5",
    wallet_address: "0x5678...9012",
    username: "dao_builder",
    bio: "Building governance tools",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dao",
    joinedAt: new Date("2024-02-01"),
    isAdmin: false,
  },
];

// Contributions
export const mockContributions: Contribution[] = [
  {
    id: "contrib_1",
    userId: "user_1",
    type: "hackathon_win",
    projectName: "DeFi Yield Optimizer",
    description:
      "Built an AI-powered yield optimization protocol that automatically rebalances liquidity across multiple DeFi protocols.",
    proofUrl: "https://devfolio.co/projects/defi-optimizer",
    githubUrl: "https://github.com/PBuilder/defi-optimizer",
    placement: "1st Place",
    prize: "$10,000 USDC",
    status: "approved",
    pointsAwarded: 5000,
    tokensAwarded: 2500,
    submittedAt: new Date("2024-03-15"),
    reviewedAt: new Date("2024-03-17"),
  },
  {
    id: "contrib_2",
    userId: "user_1",
    type: "bounty",
    projectName: "Uniswap V4 Hooks Integration",
    description:
      "Implemented custom hooks for Uniswap V4 enabling dynamic fee adjustment based on volatility.",
    proofUrl: "https://github.com/uniswap/bounties/issues/42",
    githubUrl: "https://github.com/PBuilder/uni-hooks",
    status: "approved",
    pointsAwarded: 3000,
    tokensAwarded: 1500,
    submittedAt: new Date("2024-03-10"),
    reviewedAt: new Date("2024-03-12"),
  },
  {
    id: "contrib_3",
    userId: "user_1",
    type: "open_source_pr",
    projectName: "Ethers.js Documentation",
    description:
      "Added comprehensive TypeScript examples for contract interaction patterns.",
    proofUrl: "https://github.com/ethers-io/ethers.js/pull/1234",
    githubUrl: "https://github.com/ethers-io/ethers.js/pull/1234",
    status: "pending",
    pointsAwarded: 0,
    tokensAwarded: 0,
    submittedAt: new Date("2024-03-20"),
  },
  {
    id: "contrib_4",
    userId: "user_1",
    type: "tutorial",
    projectName: "Zero-Knowledge Proofs for Beginners",
    description:
      "Created an interactive tutorial series explaining ZK proofs with hands-on Circom examples.",
    proofUrl: "https://mirror.xyz/PBuilder.eth/zk-tutorial",
    status: "approved",
    pointsAwarded: 2000,
    tokensAwarded: 1000,
    submittedAt: new Date("2024-02-28"),
    reviewedAt: new Date("2024-03-02"),
  },
  {
    id: "contrib_5",
    userId: "user_1",
    type: "hackathon_participation",
    projectName: "Cross-chain Bridge UI",
    description:
      "Participated in ETH Denver 2024 building a user-friendly bridge interface.",
    proofUrl: "https://ethdenver.com/projects/bridge-ui",
    placement: "Finalist",
    status: "approved",
    pointsAwarded: 1500,
    tokensAwarded: 750,
    submittedAt: new Date("2024-02-25"),
    reviewedAt: new Date("2024-02-27"),
  },
  {
    id: "contrib_6",
    userId: "user_1",
    type: "community_event",
    projectName: "Web3 Mumbai Meetup",
    description:
      "Organized and spoke at the Web3 Mumbai developer meetup about account abstraction.",
    proofUrl: "https://lu.ma/web3-mumbai",
    status: "rejected",
    pointsAwarded: 0,
    tokensAwarded: 0,
    submittedAt: new Date("2024-03-18"),
    reviewedAt: new Date("2024-03-19"),
    reviewNotes:
      "Event not verified. Please provide additional proof of attendance/organization.",
  },
];

// Rewards
export const mockRewards: Reward[] = [
  {
    id: "reward_1",
    name: "ParaBuild Premium Hoodie",
    description:
      "Ultra-soft, limited edition hoodie with embroidered ParaBuild logo. Made from 100% organic cotton.",
    imageUrl:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
    costPBUILD: 5000,
    costUsd: 75,
    category: "merch",
    stock: 50,
    maxStock: 100,
    sizes: ["S", "M", "L", "XL", "XXL"],
    isActive: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "reward_2",
    name: "ETH Denver 2025 Ticket",
    description:
      "Full access pass to ETH Denver 2025 including all workshops, talks, and networking events.",
    imageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=400&fit=crop",
    costPBUILD: 25000,
    costUsd: 500,
    category: "tickets",
    stock: 10,
    maxStock: 20,
    isActive: true,
    createdAt: new Date("2024-02-01"),
  },
  {
    id: "reward_3",
    name: "GitHub Copilot Pro (1 Year)",
    description:
      "One year subscription to GitHub Copilot Pro with advanced AI coding assistance.",
    imageUrl:
      "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&h=400&fit=crop",
    costPBUILD: 8000,
    costUsd: 120,
    category: "tools",
    stock: 100,
    maxStock: 100,
    isActive: true,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "reward_4",
    name: "Exclusive Builder NFT",
    description:
      "Unique generative art NFT that evolves based on your contribution history. Grants access to private Discord channels.",
    imageUrl:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=400&fit=crop",
    costPBUILD: 3000,
    costUsd: 50,
    category: "nft",
    stock: 500,
    maxStock: 1000,
    isActive: true,
    createdAt: new Date("2024-02-15"),
  },
  {
    id: "reward_5",
    name: "Ledger Nano X",
    description:
      "Premium hardware wallet for secure crypto storage. Includes ParaBuild custom engraving.",
    imageUrl:
      "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=400&h=400&fit=crop",
    costPBUILD: 12000,
    costUsd: 180,
    category: "tools",
    stock: 25,
    maxStock: 50,
    isActive: true,
    createdAt: new Date("2024-01-20"),
  },
  {
    id: "reward_6",
    name: "ParaBuild T-Shirt Pack",
    description:
      "Set of 3 premium t-shirts with unique Web3-themed designs. Soft cotton blend.",
    imageUrl:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    costPBUILD: 2500,
    costUsd: 40,
    category: "merch",
    stock: 200,
    maxStock: 300,
    sizes: ["S", "M", "L", "XL"],
    isActive: true,
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "reward_7",
    name: "Devcon 2024 VIP Pass",
    description:
      "VIP access to Devcon 2024 with backstage access and speaker meet-and-greets.",
    imageUrl:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=400&fit=crop",
    costPBUILD: 50000,
    costUsd: 1000,
    category: "tickets",
    stock: 5,
    maxStock: 10,
    isActive: true,
    createdAt: new Date("2024-03-01"),
  },
  {
    id: "reward_8",
    name: "ParaBuild Sticker Pack",
    description:
      "Collection of 20 holographic stickers featuring ParaBuild and Web3 memes.",
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    costPBUILD: 500,
    costUsd: 10,
    category: "merch",
    stock: 500,
    maxStock: 1000,
    isActive: true,
    createdAt: new Date("2024-01-05"),
  },
];

// Quests
export const mockQuests: Quest[] = [
  {
    id: "quest_1",
    title: "Daily Check-in",
    description: "Visit the platform and check your dashboard",
    type: "daily",
    pointsReward: 50,
    requirements: "Login to your account",
    progress: 1,
    maxProgress: 1,
    isCompleted: true,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
  {
    id: "quest_2",
    title: "Share on Twitter",
    description: "Share your ParaBuild profile on Twitter",
    type: "daily",
    pointsReward: 100,
    requirements: "Post a tweet with your profile link",
    progress: 0,
    maxProgress: 1,
    isCompleted: false,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
  {
    id: "quest_3",
    title: "Submit 3 Contributions",
    description: "Submit at least 3 contributions this week",
    type: "weekly",
    pointsReward: 500,
    requirements: "Get 3 contributions approved",
    progress: 2,
    maxProgress: 3,
    isCompleted: false,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: "quest_4",
    title: "Refer a Friend",
    description: "Invite a friend to join ParaBuild",
    type: "weekly",
    pointsReward: 300,
    requirements: "Friend must connect wallet and complete profile",
    progress: 0,
    maxProgress: 1,
    isCompleted: false,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: "quest_5",
    title: "Complete Your Profile",
    description: "Add all social links and bio to your profile",
    type: "one_time",
    pointsReward: 200,
    requirements: "Fill in GitHub, Twitter, Discord, and bio",
    progress: 3,
    maxProgress: 4,
    isCompleted: false,
  },
  {
    id: "quest_6",
    title: "First Hackathon Win",
    description: "Win your first hackathon",
    type: "one_time",
    pointsReward: 1000,
    requirements: "Submit an approved hackathon win contribution",
    progress: 1,
    maxProgress: 1,
    isCompleted: true,
  },
  {
    id: "quest_7",
    title: "Redeem Your First Reward",
    description: "Use your $PBUILD tokens to claim a reward",
    type: "one_time",
    pointsReward: 250,
    requirements: "Successfully redeem any reward from the catalog",
    progress: 1,
    maxProgress: 1,
    isCompleted: true,
  },
  {
    id: "quest_8",
    title: "Top 100 Contributor",
    description: "Reach the top 100 on the leaderboard",
    type: "one_time",
    pointsReward: 2000,
    requirements: "Rank within top 100 based on total points",
    progress: 1,
    maxProgress: 1,
    isCompleted: true,
  },
];

// Leaderboard
export const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    user: mockUsers[1],
    stats: {
      totalPBUILD: 85000,
      totalPoints: 250000,
      contributionsCount: 87,
      rank: 1,
      rewardsRedeemed: 12,
      questsCompleted: 45,
    },
  },
  {
    rank: 2,
    user: mockUsers[2],
    stats: {
      totalPBUILD: 72000,
      totalPoints: 210000,
      contributionsCount: 65,
      rank: 2,
      rewardsRedeemed: 8,
      questsCompleted: 38,
    },
  },
  {
    rank: 3,
    user: mockUsers[3],
    stats: {
      totalPBUILD: 68000,
      totalPoints: 195000,
      contributionsCount: 72,
      rank: 3,
      rewardsRedeemed: 10,
      questsCompleted: 42,
    },
  },
  ...Array.from({ length: 47 }, (_, i) => ({
    rank: i + 4,
    user: {
      id: `user_${i + 6}`,
      address: `0x${(i + 6).toString(16).padStart(4, "0")}...${(9999 - i)
        .toString(16)
        .padStart(4, "0")}`,
      username: `builder_${i + 4}`,
      bio: "Web3 developer",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=builder${i + 4}`,
      joinedAt: new Date(2024, 0, Math.floor(Math.random() * 90) + 1),
      isAdmin: false,
      socialLinks: {},
    },
    stats: {
      totalPBUILD: Math.floor(65000 - i * 1000 + Math.random() * 500),
      totalPoints: Math.floor(180000 - i * 3000 + Math.random() * 1500),
      contributionsCount: Math.floor(60 - i + Math.random() * 10),
      rank: i + 4,
      rewardsRedeemed: Math.floor(Math.random() * 8),
      questsCompleted: Math.floor(30 - i * 0.5 + Math.random() * 10),
    },
  })),
  {
    rank: 42,
    user: currentUser,
    stats: currentUserStats,
  },
];

// Sort leaderboard by rank
mockLeaderboard.sort((a, b) => a.rank - b.rank);

// Recent activity
export const mockActivity: Activity[] = [
  {
    id: "activity_1",
    type: "contribution",
    title: "Contribution Approved",
    description: 'Your "DeFi Yield Optimizer" submission was approved!',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    metadata: { contributionId: "contrib_1", tokensAwarded: 2500 },
  },
  {
    id: "activity_2",
    type: "reward",
    title: "Reward Redeemed",
    description: 'You claimed "ParaBuild Sticker Pack"',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    metadata: { rewardId: "reward_8", cost: 500 },
  },
  {
    id: "activity_3",
    type: "quest",
    title: "Quest Completed",
    description: 'You completed "Daily Check-in"',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    metadata: { questId: "quest_1", pointsEarned: 50 },
  },
  {
    id: "activity_4",
    type: "points",
    title: "Points Earned",
    description: "+5000 points from hackathon win",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    metadata: { amount: 5000 },
  },
  {
    id: "activity_5",
    type: "contribution",
    title: "Contribution Submitted",
    description: 'Your "Ethers.js Documentation" is under review',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    metadata: { contributionId: "contrib_3" },
  },
];

// Notifications
export const mockNotifications: Notification[] = [
  {
    id: "notif_1",
    title: "Contribution Approved!",
    message:
      "Your DeFi Yield Optimizer submission earned you 2,500 $PBUILD tokens.",
    type: "success",
    read: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "notif_2",
    title: "New Quest Available",
    message:
      "Weekly challenge: Submit 3 contributions to earn 500 bonus points!",
    type: "info",
    read: false,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
  },
  {
    id: "notif_3",
    title: "Reward Shipped",
    message: "Your ParaBuild Sticker Pack is on its way!",
    type: "success",
    read: true,
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
  },
];

// Contribution type labels
export const contributionTypeLabels: Record<string, string> = {
  hackathon_win: "Hackathon Win",
  hackathon_participation: "Hackathon Participation",
  bounty: "Bounty Completion",
  open_source_pr: "Open Source PR",
  tutorial: "Tutorial/Content",
  community_event: "Community Event",
};

// Platform stats for landing page
export const platformStats = {
  totalContributors: 12500,
  totalRewardsDistributed: 850,
  totalPBuildEarned: 2500000,
  activeProjects: 340,
};

// Admin stats
export const adminStats = {
  pendingContributions: 23,
  totalUsers: 12500,
  totalContributions: 45600,
  totalRewardsRedeemed: 850,
  activeQuests: 8,
  tokensDistributed: 2500000,
};

// Pending contributions for admin review
export const pendingContributions: Contribution[] = mockContributions.filter(
  (c) => c.status === "pending"
);

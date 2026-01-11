// Full Contract ABI matching actual ContributionTracker.sol
export const CONTRIBUTION_TRACKER_ABI = [
  // submitContribution
  {
    inputs: [
      {
        internalType: "enum IContributionTracker.ContributionType",
        name: "contribType",
        type: "uint8",
      },
      { internalType: "uint256", name: "points", type: "uint256" },
      { internalType: "string", name: "proofUrl", type: "string" },
      { internalType: "bytes", name: "nonce", type: "bytes" },
    ],
    name: "submitContribution",
    outputs: [
      { internalType: "uint256", name: "contributionId", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  // getBasePoints
  {
    inputs: [
      {
        internalType: "enum IContributionTracker.ContributionType",
        name: "contribType",
        type: "uint8",
      },
    ],
    name: "getBasePoints",
    outputs: [{ internalType: "uint256", name: "points", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  // getContribution
  {
    inputs: [
      { internalType: "uint256", name: "contributionId", type: "uint256" },
    ],
    name: "getContribution",
    outputs: [
      {
        components: [
          { internalType: "address", name: "contributor", type: "address" },
          {
            internalType: "enum IContributionTracker.ContributionType",
            name: "contribType",
            type: "uint8",
          },
          { internalType: "uint256", name: "points", type: "uint256" },
          { internalType: "uint256", name: "timestamp", type: "uint256" },
          { internalType: "string", name: "proofUrl", type: "string" },
          {
            internalType: "enum IContributionTracker.ContributionStatus",
            name: "status",
            type: "uint8",
          },
          { internalType: "address", name: "verifiedBy", type: "address" },
          { internalType: "uint256", name: "verifiedAt", type: "uint256" },
        ],
        internalType: "struct IContributionTracker.Contribution",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  // pointsToTokenRatio
  {
    inputs: [],
    name: "pointsToTokenRatio",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  // Events
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "contributionId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "contributor",
        type: "address",
      },
      {
        indexed: true,
        internalType: "enum IContributionTracker.ContributionType",
        name: "contribType",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "points",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "proofUrl",
        type: "string",
      },
      { indexed: false, internalType: "bytes", name: "nonce", type: "bytes" },
    ],
    name: "ContributionSubmitted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "contributionId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "contributor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "pbuildAmount",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "verifier",
        type: "address",
      },
    ],
    name: "ContributionVerified",
    type: "event",
  },
];

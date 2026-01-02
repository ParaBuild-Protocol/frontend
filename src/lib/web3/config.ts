// src/lib/web3/config.ts
import { createAppKit } from "@reown/appkit/react";
import { mainnet, sepolia } from "@reown/appkit/networks";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { QueryClient } from "@tanstack/react-query";

// 1. Get projectId from https://cloud.reown.com
export const projectId =
  import.meta.env.VITE_REOWN_PROJECT_ID || "c76aa6407eb4e1ce55c2a94c47fde81d";

if (!projectId) {
  throw new Error("VITE_REOWN_PROJECT_ID is not set");
}

// 2. Set up Wagmi adapter
export const networks = [mainnet, sepolia];

export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
});

// 3. Create modal
export const metadata = {
  name: "ParaBuild",
  description: "Platform for contributing to open source projects",
  url: "https://ParaBuild.com",
  icons: ["https://ParaBuild.com/icon.png"],
};

// Token addresses for PYUSD and USDC
export const TOKEN_ADDRESSES = {
  PYUSD: {
    mainnet: "0x6c3ea9036406852006290770BEdFcAbA0e23A0e8",
    sepolia: "0x", // Add sepolia address if available
  },
  USDC: {
    mainnet: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    sepolia: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
  },
} as const;

export const createWeb3Modal = () => {
  return createAppKit({
    adapters: [wagmiAdapter],
    networks,
    projectId,
    metadata,
    features: {
      analytics: true,
      email: false,
      socials: false,
      emailShowWallets: true,
    },
    themeMode: "dark",
    themeVariables: {
      "--w3m-accent": "hsl(var(--primary))",
      "--w3m-border-radius-master": "8px",
    },
  });
};

export const queryClient = new QueryClient();

// context/AuthContext.tsx
'use client';

import React, { createContext, useContext } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface User {
  id: string;
  wallet_address: string;
  username?: string;
  bio?: string;
  avatar?: string;
  github_url?: string;
  twitter_url?: string;
  discord_username?: string;
  created_at: string;
}

interface UserStats {
  totalPBUILD: number;
  totalContributions: number;
  verifiedContributions: number;
  pendingContributions: number;
  rank: number;
}

interface AuthContextType {
  user: User | null;
  stats: UserStats | null;
  loading: boolean;
  authenticating: boolean;
  error: string | null;
  isAuthenticated: boolean;
  address: string | undefined;
  isConnected: boolean;
  authenticate: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<User>;
  logout: () => void;
  fetchUserProfile: () => Promise<void>;
  fetchUserStats: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
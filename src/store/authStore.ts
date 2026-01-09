import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BrowserProvider } from 'ethers';
import { authApi } from '@/lib/api/auth';
import { userApi } from '@/lib/api/user';
import { toast } from 'sonner';

interface User {
  id: string;
  wallet_address: string;
  username?: string;
  bio?: string;
  avatar?: string;
  github_url?: string;
  twitter_url?: string;
  website_url?: string;
  email?: string;
  discord_username?: string;
  isAdmin?: boolean;
  created_at: string;
  updated_at: string;
}

interface UserStats {
  totalPBUILD: number;
  totalContributions: number;
  totalAttestations: number;
  verifiedContributions: number;
  pendingContributions: number;
  rank: number;
}

interface AuthState {
  // State
  user: User | null;
  stats: UserStats | null;
  accessToken: string | null;
  refreshToken: string | null;
  walletAddress: string | null;
  loading: boolean;
  authenticating: boolean;
  error: string | null;
  
  // Computed
  isAuthenticated: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setStats: (stats: UserStats | null) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  setWalletAddress: (address: string) => void;
  setLoading: (loading: boolean) => void;
  setAuthenticating: (authenticating: boolean) => void;
  setError: (error: string | null) => void;
  
  // Async Actions
  authenticate: (address: string, provider: BrowserProvider) => Promise<void>;
  fetchUserProfile: () => Promise<void>;
  fetchUserStats: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<User>;
  logout: () => void;
  
  // Initialize from localStorage
  initialize: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial State
      user: null,
      stats: null,
      accessToken: null,
      refreshToken: null,
      walletAddress: null,
      loading: false,
      authenticating: false,
      error: null,
      isAuthenticated: false,

      // Setters
      setUser: (user) => set({ 
        user,
        isAuthenticated: !!user && !!get().accessToken 
      }),
      
      setStats: (stats) => set({ stats }),
      
      setTokens: (accessToken, refreshToken) => {
        // Also update localStorage for API client
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        
        set({ 
          accessToken, 
          refreshToken,
          isAuthenticated: !!get().user && !!accessToken
        });
      },
      
      setWalletAddress: (address) => {
        localStorage.setItem('wallet_address', address);
        set({ walletAddress: address });
      },
      
      setLoading: (loading) => set({ loading }),
      setAuthenticating: (authenticating) => set({ authenticating }),
      setError: (error) => set({ error }),

      // Authenticate with wallet signature
      authenticate: async (address: string, provider: BrowserProvider) => {
        set({ authenticating: true, error: null });

        try {
          // Step 1: Get nonce
          const { nonce } = await authApi.getNonce(address);

          // Step 2: Sign message
          const signature = await authApi.signMessage(nonce, provider);

          // Step 3: Verify signature
          const result = await authApi.verifySignature(address, signature);

          // Step 4: Store tokens and address
          get().setTokens(result.access_token, result.refresh_token);
          get().setWalletAddress(result.wallet);

          toast.success('Authentication successful!');

          // Step 5: Fetch user profile
          await get().fetchUserProfile();
          await get().fetchUserStats();
        } catch (err: any) {
          console.error('Authentication error:', err);
          const errorMessage = err.response?.data?.error || 'Authentication failed';
          set({ error: errorMessage });
          toast.error(errorMessage);
          throw err;
        } finally {
          set({ authenticating: false });
        }
      },

      // Fetch user profile
      fetchUserProfile: async () => {
        if (!get().accessToken) {
          return;
        }

        set({ loading: true });
        try {
          const profile = await userApi.getProfile();
          get().setUser(profile);
        } catch (err: any) {
          console.error('Failed to fetch profile:', err);
          
          // If 401, user needs to re-authenticate
          if (err.response?.status === 401) {
            get().logout();
          }
        } finally {
          set({ loading: false });
        }
      },

      // Fetch user stats
      fetchUserStats: async () => {
        if (!get().accessToken) {
          return;
        }

        try {
          const dashboard = await userApi.getDashboard();
          get().setStats({
            totalPBUILD: dashboard.total_tokens || 0,
            totalContributions: dashboard.total_contributions || 0,
            totalAttestations: dashboard.total_attestations || 0,
            verifiedContributions: dashboard.verified_contributions || 0,
            pendingContributions: dashboard.pending_contributions || 0,
            rank: dashboard.rank || 0,
          });
        } catch (err) {
          console.error('Failed to fetch stats:', err);
        }
      },

      // Update user profile
      updateProfile: async (data: Partial<User>) => {
        try {
          const updated = await userApi.updateProfile(data);
          get().setUser(updated);
          toast.success('Profile updated successfully!');
          return updated;
        } catch (err: any) {
          const errorMessage = err.response?.data?.error || 'Failed to update profile';
          toast.error(errorMessage);
          throw err;
        }
      },

      // Logout
      logout: () => {
        // Clear localStorage
        authApi.logout();
        
        // Clear Zustand state
        set({
          user: null,
          stats: null,
          accessToken: null,
          refreshToken: null,
          walletAddress: null,
          isAuthenticated: false,
          error: null,
        });
        
        toast.success('Logged out successfully');
      },

      // Initialize from localStorage
      initialize: () => {
        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');
        const walletAddress = localStorage.getItem('wallet_address');

        if (accessToken && refreshToken && walletAddress) {
          set({
            accessToken,
            refreshToken,
            walletAddress,
          });

          // Fetch user data
          get().fetchUserProfile();
          get().fetchUserStats();
        }
      },
    }),
    {
      name: 'auth-storage', // localStorage key
      partialize: (state) => ({
        // Only persist these fields
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        walletAddress: state.walletAddress,
      }),
    }
  )
);

// Initialize on app load
if (typeof window !== 'undefined') {
  useAuthStore.getState().initialize();
}
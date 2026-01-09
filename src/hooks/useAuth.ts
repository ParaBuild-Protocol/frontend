// hooks/useAuth.ts - Updated with centralized types
import { useEffect, useCallback } from 'react';
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import { BrowserProvider } from 'ethers';
import { useAuthStore } from '@/store/authStore';
import { User, UserStats, UpdateUserProfileDTO, addressesMatch } from '@/types';

interface UseAuthOptions {
  /**
   * Whether to automatically authenticate when wallet connects
   * @default true
   */
  autoAuthenticate?: boolean;
}

interface UseAuthReturn {
  // State
  user: User | null;
  stats: UserStats | null;
  accessToken: string | null;
  loading: boolean;
  authenticating: boolean;
  error: string | null;
  isAuthenticated: boolean;
  address: string | undefined;
  isConnected: boolean;

  // Actions
  authenticate: () => Promise<void>;
  updateProfile: (data: UpdateUserProfileDTO) => Promise<User>;
  logout: () => void;
  fetchUserProfile: () => Promise<void>;
  fetchUserStats: () => Promise<void>;
}

/**
 * Custom hook for authentication with Reown AppKit + Zustand
 * 
 * @param options - Configuration options
 * @param options.autoAuthenticate - Whether to automatically authenticate on wallet connection (default: true)
 * 
 * @returns Authentication state and methods
 * 
 * @example
 * ```tsx
 * // Auto-authenticate (default)
 * const { user, isAuthenticated, logout } = useAuth();
 * 
 * // Manual authentication
 * const { authenticate, authenticating } = useAuth({ autoAuthenticate: false });
 * 
 * // Usage in component
 * if (authenticating) return <Spinner />;
 * if (!isAuthenticated) return <ConnectButton />;
 * return <Dashboard user={user} />;
 * ```
 */
export function useAuth(options: UseAuthOptions = {}): UseAuthReturn {
  const { autoAuthenticate = true } = options;
  
  // Reown AppKit hooks
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider('eip155');
  
  // Get auth state and actions from Zustand store
  const {
    user,
    stats,
    accessToken,
    walletAddress,
    loading,
    authenticating,
    error,
    isAuthenticated,
    authenticate: authStoreAuthenticate,
    fetchUserProfile,
    fetchUserStats,
    updateProfile,
    logout,
  } = useAuthStore();

  /**
   * Manual authentication function
   * Can be called from button click or programmatically
   * 
   * @throws {Error} If wallet is not connected
   */
  const authenticateManually = useCallback(async () => {
    if (!address || !walletProvider) {
      throw new Error('Wallet not connected. Please connect your wallet first.');
    }

    const provider = new BrowserProvider(walletProvider);
    await authStoreAuthenticate(address, provider);
  }, [address, walletProvider, authStoreAuthenticate]);

  /**
   * Handle wallet connection and authentication
   * Auto-authenticate if autoAuthenticate is true
   */
  useEffect(() => {
    if (!isConnected || !address || !walletProvider) {
      return;
    }

    const storedWallet = walletAddress;

    // Case 1: Authenticated with same wallet - just refresh data
    if (isAuthenticated && addressesMatch(storedWallet, address)) {
      fetchUserProfile();
      fetchUserStats();
      return;
    }

    // Case 2: Wallet changed - always re-authenticate
    if (isAuthenticated && storedWallet && !addressesMatch(storedWallet, address)) {
      const provider = new BrowserProvider(walletProvider);
      authStoreAuthenticate(address, provider);
      return;
    }

    // Case 3: Not authenticated - auto-authenticate if enabled
    if (!isAuthenticated && autoAuthenticate) {
      // Small delay to ensure wallet is fully connected
      const timer = setTimeout(async () => {
        try {
          const provider = new BrowserProvider(walletProvider);
          await authStoreAuthenticate(address, provider);
        } catch (error) {
          console.error('Auto-authentication failed:', error);
          // Error is already handled by authStoreAuthenticate
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [
    isConnected,
    address,
    walletProvider,
    isAuthenticated,
    walletAddress,
    autoAuthenticate,
    authStoreAuthenticate,
    fetchUserProfile,
    fetchUserStats,
  ]);

  /**
   * Refresh stats periodically when authenticated
   * Updates every 30 seconds
   */
  useEffect(() => {
    if (!user || !isAuthenticated) return;

    const interval = setInterval(() => {
      fetchUserStats();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [user, isAuthenticated, fetchUserStats]);

  return {
    // State
    user,
    stats,
    accessToken,
    loading,
    authenticating,
    error,
    isAuthenticated,
    address,
    isConnected,

    // Actions
    authenticate: authenticateManually,
    updateProfile,
    logout,
    fetchUserProfile,
    fetchUserStats,
  };
}
// hooks/useAuth.ts - Updated to use Zustand with manual authentication option
import { useEffect, useCallback } from 'react';
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import { BrowserProvider } from 'ethers';
import { useAuthStore } from '@/store/authStore';

/**
 * Custom hook for authentication with Reown AppKit + Zustand
 * Supports both automatic and manual authentication
 */
export function useAuth(options?: { autoAuthenticate?: boolean }) {
  const { autoAuthenticate = true } = options || {};
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
   * Can be called from button click
   */
  const authenticateManually = useCallback(async () => {
    if (!address || !walletProvider) {
      throw new Error('Wallet not connected');
    }

    const provider = new BrowserProvider(walletProvider);
    await authStoreAuthenticate(address, provider);
  }, [address, walletProvider, authStoreAuthenticate]);

  /**
   * Handle wallet connection and authentication
   * Auto-authenticate if autoAuthenticate is true
   */
  useEffect(() => {
    if (isConnected && address && walletProvider) {
      const storedWallet = walletAddress;

      // If authenticated with same wallet, just fetch fresh data
      if (isAuthenticated && storedWallet?.toLowerCase() === address.toLowerCase()) {
        fetchUserProfile();
        fetchUserStats();
      } 
      // If connected but not authenticated, auto-authenticate (if enabled)
      else if (!isAuthenticated && autoAuthenticate) {
        // Small delay to ensure wallet is fully connected
        const timer = setTimeout(async () => {
          try {
            const provider = new BrowserProvider(walletProvider);
            await authStoreAuthenticate(address, provider);
          } catch (error) {
            console.error('Auto-authentication failed:', error);
          }
        }, 500);
        
        return () => clearTimeout(timer);
      }
      // If wallet changed, always re-authenticate
      else if (isAuthenticated && storedWallet?.toLowerCase() !== address.toLowerCase()) {
        const provider = new BrowserProvider(walletProvider);
        authStoreAuthenticate(address, provider);
      }
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
   * Refresh stats periodically (every 30 seconds)
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
    authenticate: authenticateManually, // Manual authentication
    updateProfile,
    logout,
    fetchUserProfile,
    fetchUserStats,
  };
}
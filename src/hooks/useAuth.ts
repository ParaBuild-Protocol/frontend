// hooks/useAuth.ts - Updated to use Zustand
import { useEffect } from 'react';
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import { BrowserProvider } from 'ethers';
import { useAuthStore } from '@/store/authStore';

/**
 * Custom hook for authentication with Reown AppKit + Zustand
 * Automatically handles wallet connection and authentication
 */
export function useAuth() {
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
    authenticate,
    fetchUserProfile,
    fetchUserStats,
    updateProfile,
    logout,
  } = useAuthStore();

  /**
   * Handle wallet connection and authentication
   */
  useEffect(() => {
    if (isConnected && address && walletProvider) {
      const storedWallet = walletAddress;

      // If authenticated with same wallet, fetch profile
      if (isAuthenticated && storedWallet?.toLowerCase() === address.toLowerCase()) {
        fetchUserProfile();
        fetchUserStats();
      } 
      // If connected but not authenticated, or wallet changed, authenticate
      else if (!isAuthenticated || storedWallet?.toLowerCase() !== address.toLowerCase()) {
        const provider = new BrowserProvider(walletProvider);
        authenticate(address, provider);
      }
    }
  }, [
    isConnected,
    address,
    walletProvider,
    isAuthenticated,
    walletAddress,
    authenticate,
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
    authenticate: (addr: string, provider: BrowserProvider) => 
      authenticate(addr, provider),
    updateProfile,
    logout,
    fetchUserProfile,
    fetchUserStats,
  };
}
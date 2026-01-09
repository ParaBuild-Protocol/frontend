// lib/api/user.ts
import { Contribution, CreateContributionDTO, User } from '@/types';
import { apiClient } from './auth';


export const userApi = {
  /**
   * Get user profile
   */
  getProfile: async (): Promise<User> => {
    const response = await apiClient.get('/user/profile');
    return response.data;
  },

  /**
   * Update user profile
   */
  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await apiClient.put('/user/profile', data);
    return response.data;
  },

  /**
   * Get user dashboard data
   */
  getDashboard: async (): Promise<User> => {
    const response = await apiClient.get('/user/dashboard');
    return response.data;
  },

  /**
   * Generate backend ID for new contribution
   * This should be called BEFORE submitting to smart contract
   */
  generateBackendId: async (): Promise<{ backend_id: string }> => {
    const response = await apiClient.post('/user/contributions/generate-id');
    return response.data;
  },

  /**
   * Submit contribution (after smart contract call)
   * Flow:
   * 1. Call generateBackendId()
   * 2. Submit to smart contract with backend_id
   * 3. Call submitContribution() with form data + backend_id
   */
  submitContribution: async (data: CreateContributionDTO): Promise<Contribution> => {
    const response = await apiClient.post('/user/contributions', data);
    return response.data;
  },

  /**
   * Get all user contributions
   */
  getContributions: async (): Promise<Contribution[]> => {
    const response = await apiClient.get('/user/contributions');
    return response.data;
  },

  /**
   * Get contribution by ID
   */
  getContribution: async (id: string): Promise<Contribution> => {
    const response = await apiClient.get(`/user/contributions/${id}`);
    return response.data;
  },
};

export default userApi;
// store/contributionsStore.ts - Updated with centralized types
import { create } from 'zustand';
import { userApi } from '@/lib/api/user';
import { toast } from 'sonner';
import {
  Contribution,
  ContributionStatus,
  ContributionType,
  CreateContributionDTO,
  ContributionFilters,
  ContributionStats,
} from '@/types';

interface ContributionsState {
  // State
  contributions: Contribution[];
  currentContribution: Contribution | null;
  loading: boolean;
  submitting: boolean;
  generatingId: boolean;
  error: string | null;
  
  // Filters
  statusFilter: ContributionStatus | 'all';
  typeFilter: ContributionType | null;
  searchQuery: string;
  
  // Actions
  setContributions: (contributions: Contribution[]) => void;
  setCurrentContribution: (contribution: Contribution | null) => void;
  setLoading: (loading: boolean) => void;
  setSubmitting: (submitting: boolean) => void;
  setGeneratingId: (generating: boolean) => void;
  setError: (error: string | null) => void;
  
  // Filters
  setStatusFilter: (status: ContributionStatus | 'all') => void;
  setTypeFilter: (type: ContributionType | null) => void;
  setSearchQuery: (query: string) => void;
  
  // Async Actions
  fetchContributions: (filters?: ContributionFilters) => Promise<void>;
  fetchContribution: (id: string) => Promise<void>;
  generateBackendId: () => Promise<string>;
  submitContribution: (data: CreateContributionDTO) => Promise<Contribution>;
  
  // Computed
  getFilteredContributions: () => Contribution[];
  getStats: () => ContributionStats;
}

export const useContributionsStore = create<ContributionsState>((set, get) => ({
  // Initial State
  contributions: [],
  currentContribution: null,
  loading: false,
  submitting: false,
  generatingId: false,
  error: null,
  statusFilter: 'all',
  typeFilter: null,
  searchQuery: '',

  // Setters
  setContributions: (contributions) => set({ contributions }),
  setCurrentContribution: (contribution) => set({ currentContribution: contribution }),
  setLoading: (loading) => set({ loading }),
  setSubmitting: (submitting) => set({ submitting }),
  setGeneratingId: (generating) => set({ generatingId: generating }),
  setError: (error) => set({ error }),
  
  // Filters
  setStatusFilter: (status) => set({ statusFilter: status }),
  setTypeFilter: (type) => set({ typeFilter: type }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Fetch all contributions
  fetchContributions: async () => {
    set({ loading: true, error: null });
    try {
      const contributions = await userApi.getContributions();
      set({ contributions });
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to fetch contributions';
      set({ error: errorMessage });
      toast.error(errorMessage);
    } finally {
      set({ loading: false });
    }
  },

  // Fetch single contribution
  fetchContribution: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const contribution = await userApi.getContribution(id);
      set({ currentContribution: contribution });
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to fetch contribution';
      set({ error: errorMessage });
      toast.error(errorMessage);
    } finally {
      set({ loading: false });
    }
  },

  // Generate backend ID (Step 1 of submission)
  generateBackendId: async () => {
    set({ generatingId: true, error: null });
    try {
      const { backend_id } = await userApi.generateBackendId();
      return backend_id;
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to generate backend ID';
      set({ error: errorMessage });
      toast.error(errorMessage);
      throw err;
    } finally {
      set({ generatingId: false });
    }
  },

  // Submit contribution (Step 3 of submission, after smart contract)
  submitContribution: async (data: CreateContributionDTO) => {
    set({ submitting: true, error: null });
    try {
      const contribution = await userApi.submitContribution(data);
      
      // Add to contributions list
      set((state) => ({
        contributions: [contribution, ...state.contributions],
      }));
      
      toast.success('Contribution submitted successfully!');
      return contribution;
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to submit contribution';
      set({ error: errorMessage });
      toast.error(errorMessage);
      throw err;
    } finally {
      set({ submitting: false });
    }
  },

  // Get filtered contributions
  getFilteredContributions: () => {
    const { contributions, statusFilter, typeFilter, searchQuery } = get();
    
    return contributions.filter((contribution) => {
      // Status filter
      if (statusFilter !== 'all' && contribution.status !== statusFilter) {
        return false;
      }
      
      // Type filter
      if (typeFilter && contribution.type !== typeFilter) {
        return false;
      }
      
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          contribution.name.toLowerCase().includes(query) ||
          contribution.description.toLowerCase().includes(query) ||
          contribution.type.toLowerCase().includes(query)
        );
      }
      
      return true;
    });
  },

  // Get contribution stats
  getStats: () => {
    const { contributions } = get();
    
    const stats: ContributionStats = {
      total: contributions.length,
      approved: contributions.filter((c) => c.status === ContributionStatus.APPROVED).length,
      pending: contributions.filter((c) => c.status === ContributionStatus.PENDING).length,
      rejected: contributions.filter((c) => c.status === ContributionStatus.REJECTED).length,
      total_points: contributions.reduce((sum, c) => sum + c.points, 0),
      total_tokens: contributions.reduce((sum, c) => sum + c.tokens_won, 0),
    };
    
    return stats;
  },
}));
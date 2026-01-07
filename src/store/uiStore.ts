// store/uiStore.ts
import { create } from 'zustand';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
}

interface UIState {
  // Sidebar
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  
  // Modals
  connectWalletModalOpen: boolean;
  profileEditModalOpen: boolean;
  contributionModalOpen: boolean;
  
  // Search
  searchOpen: boolean;
  searchQuery: string;
  
  // Notifications
  notifications: Notification[];
  unreadNotificationsCount: number;
  
  // Loading states
  globalLoading: boolean;
  
  // Actions - Sidebar
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebarCollapsed: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  
  // Actions - Modals
  setConnectWalletModalOpen: (open: boolean) => void;
  setProfileEditModalOpen: (open: boolean) => void;
  setContributionModalOpen: (open: boolean) => void;
  
  // Actions - Search
  toggleSearch: () => void;
  setSearchOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  
  // Actions - Notifications
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  clearNotifications: () => void;
  
  // Actions - Loading
  setGlobalLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  // Initial State
  sidebarOpen: true,
  sidebarCollapsed: false,
  connectWalletModalOpen: false,
  profileEditModalOpen: false,
  contributionModalOpen: false,
  searchOpen: false,
  searchQuery: '',
  notifications: [],
  unreadNotificationsCount: 0,
  globalLoading: false,

  // Sidebar Actions
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebarCollapsed: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

  // Modal Actions
  setConnectWalletModalOpen: (open) => set({ connectWalletModalOpen: open }),
  setProfileEditModalOpen: (open) => set({ profileEditModalOpen: open }),
  setContributionModalOpen: (open) => set({ contributionModalOpen: open }),

  // Search Actions
  toggleSearch: () => set((state) => ({ searchOpen: !state.searchOpen })),
  setSearchOpen: (open) => set({ searchOpen: open }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Notification Actions
  addNotification: (notification) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}-${Math.random()}`,
      timestamp: new Date().toISOString(),
    };
    
    set((state) => ({
      notifications: [newNotification, ...state.notifications],
      unreadNotificationsCount: state.unreadNotificationsCount + 1,
    }));
  },
  
  markNotificationAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      ),
      unreadNotificationsCount: Math.max(0, state.unreadNotificationsCount - 1),
    }));
  },
  
  markAllNotificationsAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((notif) => ({ ...notif, read: true })),
      unreadNotificationsCount: 0,
    }));
  },
  
  clearNotifications: () => {
    set({
      notifications: [],
      unreadNotificationsCount: 0,
    });
  },

  // Loading Actions
  setGlobalLoading: (loading) => set({ globalLoading: loading }),
}));
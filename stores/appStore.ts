import { create } from 'zustand';

interface AppState {
  isLoading: boolean;
  activeTab: string;
  setLoading: (loading: boolean) => void;
  setActiveTab: (tab: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isLoading: false,
  activeTab: 'home',
  setLoading: (isLoading) => set({ isLoading }),
  setActiveTab: (activeTab) => set({ activeTab }),
}));

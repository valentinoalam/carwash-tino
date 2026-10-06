import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface TabState {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const useTabStore = create<TabState>()(
  persist(
    (set) => ({
      activeTab: 'booking', // Default tab
      setActiveTab: (tab) => set({ activeTab: tab }),
    }),
    {
      name: 'active-tab-storage', // Kunci penyimpanan di localStorage
      storage: createJSONStorage(() => localStorage), // (Opsional) Gunakan sessionStorage jika ingin reset saat tab browser ditutup
    }
  )
);
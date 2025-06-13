import { create } from 'zustand';

export const useWidgetStore = create((set) => ({
    showSidebarIcon: true,
    setShowSidebarIcon: (showSidebarIcon) => set({ showSidebarIcon }),
}));
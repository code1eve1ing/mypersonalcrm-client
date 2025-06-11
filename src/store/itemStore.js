import { create } from 'zustand';

export const useItemStore = create((set) => ({
    items: null,
    setItems: (items) => set({ items }),
}));
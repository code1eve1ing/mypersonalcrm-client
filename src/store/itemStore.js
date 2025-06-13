import { create } from "zustand";

const items = localStorage.getItem("items") || "[]";


"id, name, buy, sell, quantity, deleted(0-1) seperator |\|"

export const useItemStore = create((set) => ({
    items: JSON.parse(items),

    addItem: (item) =>
        set((state) => ({
            items: [{ id: state.items.length + 1, item }, ...state.items],
        })),

    updateItem: (id, key, value) =>
        set((state) => ({
            items: state.items.map((item) =>
                item.id === id ? { ...item, [key]: value } : item
            ),
        })),

    deleteItem: (id) =>
        set((state) => ({
            items: state.items.filter((item) => item.id !== id),
        })),
}));

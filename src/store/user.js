import { create } from 'zustand'

export const useStore = create((set) => (
    {
        user: "akshay",
        setUser: (user) => set({ user }),
        logout: () => set({ user: null })
    }
))
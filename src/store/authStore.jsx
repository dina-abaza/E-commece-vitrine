
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null, 
      token: null,

      setUser: (userData) => set({ user: userData }),
      setToken: (token) => set({ token }),

      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "auth-storage", 
    }
  )
);

export default useAuthStore;

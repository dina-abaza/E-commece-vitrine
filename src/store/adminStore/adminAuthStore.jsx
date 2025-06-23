
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const AdminUseAuthStore = create(
  persist(
    (set) => ({
      token: null,
      isAdmin: false,
      user: null,
      setToken: (token) => set({ token }),
      setAdmin: (isAdmin) => set({ isAdmin }),
      setUser: (user) => set({ user }),
      logout: () => set({ token: null, isAdmin: false, user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default AdminUseAuthStore;

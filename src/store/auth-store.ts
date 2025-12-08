import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User } from "@/lib/types"

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
  updateUser: (user: Partial<User>) => void
}

const defaultUser: User = {
  id: "1",
  name: "Admin User",
  email: "admin@assessai.com",
  role: "admin",
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: defaultUser,
      isAuthenticated: true,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
    }),
    {
      name: "auth-storage",
    }
  )
)


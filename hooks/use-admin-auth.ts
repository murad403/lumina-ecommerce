import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface AdminUser {
  id: string
  name: string
  email: string
  phone: string
  role: "admin" | "manager"
  avatar?: string
  createdAt: string
}

interface AdminAuthStore {
  admin: AdminUser | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  updateProfile: (data: Partial<AdminUser>) => void
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>
}

// Demo admin credentials
const DEMO_ADMIN = {
  username: "admin",
  password: "admin123",
  name: "Admin User",
  email: "admin@luxestore.com",
  phone: "+1 (555) 000-0000",
  role: "admin" as const,
}

export const useAdminAuth = create<AdminAuthStore>()(
  persist(
    (set, get) => ({
      admin: null,
      isAuthenticated: false,

      login: async (username: string, password: string) => {
        // Demo authentication
        if (username === DEMO_ADMIN.username && password === DEMO_ADMIN.password) {
          const adminUser: AdminUser = {
            id: "1",
            name: DEMO_ADMIN.name,
            email: DEMO_ADMIN.email,
            phone: DEMO_ADMIN.phone,
            role: DEMO_ADMIN.role,
            createdAt: new Date().toISOString(),
          }
          set({ admin: adminUser, isAuthenticated: true })
          return true
        }
        return false
      },

      logout: () => {
        set({ admin: null, isAuthenticated: false })
      },

      updateProfile: (data) => {
        set((state) => ({
          admin: state.admin ? { ...state.admin, ...data } : null,
        }))
      },

      changePassword: async (currentPassword: string, newPassword: string) => {
        // Demo password change
        if (currentPassword === DEMO_ADMIN.password) {
          // In real app, would hash and save new password
          return true
        }
        return false
      },
    }),
    {
      name: "admin-auth-storage",
    },
  ),
)

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Address {
  id: string
  name: string
  street: string
  city: string
  state: string
  zip: string
  country: string
  isDefault: boolean
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  addresses: Address[]
}

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, phone: string, name: string) => void
  logout: () => void
  updateUser: (user: Partial<User>) => void
  addAddress: (address: Omit<Address, 'id'>) => void
  updateAddress: (id: string, address: Partial<Address>) => void
  deleteAddress: (id: string) => void
  setDefaultAddress: (id: string) => void
}

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (email: string, phone: string, name: string) => {
        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          name,
          email,
          phone,
          addresses: [
            {
              id: '1',
              name: 'Home',
              street: '123 Luxury Lane',
              city: 'Minimalist City',
              state: 'CA',
              zip: '90210',
              country: 'Bangladesh',
              isDefault: true,
            },
          ],
        }
        set({ user: newUser, isAuthenticated: true })
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },

      updateUser: (updatedData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedData } : null,
        }))
      },

      addAddress: (address) => {
        set((state) => {
          if (!state.user) return state
          const newAddress: Address = {
            ...address,
            id: Math.random().toString(36).substr(2, 9),
          }
          return {
            user: {
              ...state.user,
              addresses: [...state.user.addresses, newAddress],
            },
          }
        })
      },

      updateAddress: (id, updatedAddress) => {
        set((state) => {
          if (!state.user) return state
          return {
            user: {
              ...state.user,
              addresses: state.user.addresses.map((addr) =>
                addr.id === id ? { ...addr, ...updatedAddress } : addr
              ),
            },
          }
        })
      },

      deleteAddress: (id) => {
        set((state) => {
          if (!state.user) return state
          return {
            user: {
              ...state.user,
              addresses: state.user.addresses.filter((addr) => addr.id !== id),
            },
          }
        })
      },

      setDefaultAddress: (id) => {
        set((state) => {
          if (!state.user) return state
          return {
            user: {
              ...state.user,
              addresses: state.user.addresses.map((addr) => ({
                ...addr,
                isDefault: addr.id === id,
              })),
            },
          }
        })
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)




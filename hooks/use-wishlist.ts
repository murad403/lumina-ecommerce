"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product } from "@/lib/data"

interface WishlistStore {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (id: string) => void
  isInWishlist: (id: string) => boolean
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const currentItems = get().items
        if (!currentItems.find((item) => item.id === product.id)) {
          set({ items: [...currentItems, product] })
        }
      },
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) })
      },
      isInWishlist: (id) => {
        return !!get().items.find((item) => item.id === id)
      },
    }),
    {
      name: "lumina-wishlist-storage",
    },
  ),
)

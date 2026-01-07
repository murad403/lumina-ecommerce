"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product } from "@/lib/data"

interface CartItem extends Product {
  quantity: number
  selectedColor?: string
  selectedSize?: string
}

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, quantity?: number, options?: { color?: string; size?: string }) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  totalItems: () => number
  totalPrice: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1, options) => {
        const currentItems = get().items
        const itemKey = `${product.id}-${options?.color || ""}-${options?.size || ""}`
        const existingItem = currentItems.find(
          (item) => `${item.id}-${item.selectedColor || ""}-${item.selectedSize || ""}` === itemKey,
        )

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              `${item.id}-${item.selectedColor || ""}-${item.selectedSize || ""}` === itemKey
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            ),
          })
        } else {
          set({
            items: [
              ...currentItems,
              {
                ...product,
                quantity,
                selectedColor: options?.color,
                selectedSize: options?.size,
              },
            ],
          })
        }
      },
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) })
      },
      updateQuantity: (id, quantity) => {
        set({
          items: get().items.map((item) => (item.id == id ? { ...item, quantity: Math.max(1, quantity) } : item)),
        })
      },
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
      totalPrice: () => get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
    {
      name: "lumina-cart-storage",
    },
  ),
)

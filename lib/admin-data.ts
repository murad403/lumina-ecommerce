export interface OrderItem {
  productId: string
  productName: string
  productImage: string
  quantity: number
  price: number
  selectedColor?: string
  selectedSize?: string
}

export interface Order {
  id: string
  orderNumber: string
  customerName: string
  customerEmail: string
  customerPhone: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  total: number
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentMethod: "bkash" | "nagad" | "bank" | "cod"
  paymentStatus: "pending" | "verified" | "failed"
  transactionId: string
  shippingAddress: {
    street: string
    city: string
    postalCode: string
  }
  createdAt: string
  updatedAt: string
  notes?: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  totalOrders: number
  totalSpent: number
  tier: "regular" | "silver" | "gold" | "platinum"
  joinedAt: string
  lastOrder?: string
  addresses: Array<{
    street: string
    city: string
    postalCode: string
    isDefault: boolean
  }>
}

export interface ProductVariant {
  id: string
  color?: string
  size?: string
  sku: string
  stock: number
  price?: number // Optional price override - if set, this price is used instead of base product price
  image?: string // Optional variant-specific image
}

export interface ProductInventory {
  id: string
  sku: string
  stock: number
  lowStockThreshold: number
  status: "in_stock" | "low_stock" | "out_of_stock"
  variants?: ProductVariant[]
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  productCount: number
  image?: string
  isActive: boolean
  createdAt: string
}

export interface SiteSettings {
  storeName: string
  storeEmail: string
  storePhone: string
  currency: string
  shippingCost: number
  taxRate: number
  bkashNumber: string
  nagadNumber: string
  bankDetails: string
  socialMedia: {
    facebook?: string
    instagram?: string
    twitter?: string
  }
}

// Mock data for demo
export const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-0001",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    customerPhone: "01712345678",
    items: [
      {
        productId: "ethereal-chronograph",
        productName: "Ethereal Chronograph",
        productImage: "/luxury-gold-watch-minimalist-dark-background.jpg",
        quantity: 1,
        price: 299,
        selectedColor: "Gold",
        selectedSize: "42mm",
      },
    ],
    subtotal: 299,
    shipping: 60,
    total: 359,
    status: "pending",
    paymentMethod: "bkash",
    paymentStatus: "pending",
    transactionId: "TRX-BK12345",
    shippingAddress: {
      street: "123 Main Street, Gulshan",
      city: "Dhaka",
      postalCode: "1212",
    },
    createdAt: "2024-01-25T10:30:00Z",
    updatedAt: "2024-01-25T10:30:00Z",
  },
  {
    id: "2",
    orderNumber: "ORD-2024-0002",
    customerName: "Sarah Ahmed",
    customerEmail: "sarah@example.com",
    customerPhone: "01812345678",
    items: [
      {
        productId: "noir-leather-wallet",
        productName: "Noir Leather Wallet",
        productImage: "/minimalist-black-leather-wallet-premium.jpg",
        quantity: 2,
        price: 89,
      },
    ],
    subtotal: 178,
    shipping: 60,
    total: 238,
    status: "confirmed",
    paymentMethod: "nagad",
    paymentStatus: "verified",
    transactionId: "TRX-NG67890",
    shippingAddress: {
      street: "456 Park Avenue, Banani",
      city: "Dhaka",
      postalCode: "1213",
    },
    createdAt: "2024-01-24T15:20:00Z",
    updatedAt: "2024-01-25T09:00:00Z",
  },
]

export const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "01712345678",
    totalOrders: 5,
    totalSpent: 1499,
    tier: "gold",
    joinedAt: "2023-11-15T00:00:00Z",
    lastOrder: "2024-01-25T10:30:00Z",
    addresses: [
      {
        street: "123 Main Street, Gulshan",
        city: "Dhaka",
        postalCode: "1212",
        isDefault: true,
      },
    ],
  },
]

export const mockInventory: Record<string, ProductInventory> = {
  "ethereal-chronograph": {
    id: "ethereal-chronograph",
    sku: "EC-001",
    stock: 45,
    lowStockThreshold: 10,
    status: "in_stock",
    variants: [
      { id: "1", color: "Gold", size: "40mm", sku: "EC-001-G-40", stock: 15 },
      { id: "2", color: "Gold", size: "42mm", sku: "EC-001-G-42", stock: 15 },
      { id: "3", color: "Silver", size: "40mm", sku: "EC-001-S-40", stock: 8 },
      { id: "4", color: "Silver", size: "42mm", sku: "EC-001-S-42", stock: 7 },
      { id: "5", color: "Space Black", size: "40mm", sku: "EC-001-B-40", stock: 0 },
    ],
  },
  "noir-leather-wallet": {
    id: "noir-leather-wallet",
    sku: "NLW-002",
    stock: 23,
    lowStockThreshold: 15,
    status: "low_stock",
    variants: [
      { id: "6", color: "Onyx", sku: "NLW-002-ONX", stock: 10 },
      { id: "7", color: "Cognac", sku: "NLW-002-COG", stock: 8 },
      { id: "8", color: "Emerald", sku: "NLW-002-EMR", stock: 5 },
    ],
  },
}

export const mockCategories: Category[] = [
  {
    id: "1",
    name: "Timepieces",
    slug: "timepieces",
    description: "Luxury watches and chronographs",
    productCount: 12,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Leather Goods",
    slug: "leather-goods",
    description: "Premium leather accessories",
    productCount: 8,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "3",
    name: "Audio",
    slug: "audio",
    description: "High-end audio equipment",
    productCount: 6,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
  },
]

export interface TCartProduct {
  id: number
  product: Product
  color: Color2
  size: Size2
  quantity: number
  subtotal: number
}

export interface Product {
  id: string
  title: string
  slug: string
  description: string
  main_image: string
  price: string
  discount_price: string
  current_price: number
  category: Category
  colors: Color[]
  sizes: Size[]
  material: Material
  origin: string
  warranty: string
  stock_quantity: number
  average_rating: number
  review_count: number
  badge: string
  is_in_stock: boolean
  is_active: boolean
  is_wishlisted: boolean
  created_at: string
  updated_at: string
}

export interface Category {
  id: number
  name: string
  slug: string
  description: string
  image: string
  is_active: boolean
  product_count: number
  created_at: string
  updated_at: string
}

export interface Color {
  id: number
  name: string
  hex_code: string
}

export interface Size {
  id: number
  name: string
}

export interface Material {
  id: number
  name: string
  description: string
}

export interface Color2 {
  id: number
  name: string
  hex_code: string
}

export interface Size2 {
  id: number
  name: string
}
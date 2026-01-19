export type TProduct = {
  id: string;
  title: string;
  slug: string;
  description: string;
  main_image: string;
  price: string;
  discount_price: string;
  current_price: number;
  category: {
    id: number;
    name: string;
    slug: string;
    description: string;
    image: string | null;
    is_active: boolean;
    product_count: number;
    created_at: string;
    updated_at: string;
  };
  colors: Array<{
    id: number;
    name: string;
    hex_code: string;
  }>;
  sizes: Array<{
    id: number;
    name: string;
  }>;
  material: {
    id: number;
    name: string;
    description: string;
  };
  origin: string;
  warranty: string;
  stock_quantity: number;
  average_rating: number;
  review_count: number;
  badge: string;
  is_in_stock: boolean;
  is_active: boolean;
  is_wishlisted: boolean;
  created_at: string;
  updated_at: string;
}


export interface ProductImage {
  id: number;
  image: string;
  alt_text: string;
  display_order: number;
}
interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  is_active: boolean;
  product_count: number;
  created_at: string;
  updated_at: string;
}
export interface TColor {
  id: number;
  name: string;
  hex_code: string;
}
export interface TSize {
  id: number;
  name: string;
}
interface TMaterial {
  id: number;
  name: string;
  description: string;
}
interface TFeature {
  id: number;
  feature: string;
  display_order: number;
}
export type TProductDetails = {
  id: string;
  title: string;
  slug: string;
  description: string;
  main_image: string;
  images: ProductImage[];
  price: string;
  discount_price: string;
  current_price: number;
  category: Category;
  colors: TColor[];
  sizes: TSize[];
  material: TMaterial;
  origin: string;
  warranty: string;
  stock_quantity: number;
  is_in_stock: boolean;
  badge: string | null;
  features: TFeature[];
  specifications: {
    category: string;
    material: string;
    origin: string;
    warranty: string;
  };
  average_rating: number;
  review_count: number;
  reviews: any[];
  is_wishlisted: boolean;
  related_products: any[];
  created_at: string;
  updated_at?: string;
}
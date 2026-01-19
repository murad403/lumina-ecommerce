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

export type TProductDetails = {
  id: string;
  title: string;
  slug: string;
  main_image: string;
  images: { id: number; image: string }[];
  current_price: number;
  discount_price?: string;
  price: string;
  category: { id: number; name: string; slug: string };
  colors: { name: string; hex_code: string }[];
  sizes: { name: string }[];
  stock_quantity: number;
  is_in_stock: boolean;
  badge?: string;
  features: { feature: string }[];
  average_rating: number;
  is_wishlisted: boolean;
}
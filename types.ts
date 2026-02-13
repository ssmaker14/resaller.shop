
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  description: string;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  stock: number;
  brand: string;
  featured?: boolean;
  bestSeller?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'shipped' | 'delivered';
}

export enum SortOption {
  PRICE_ASC = 'Price: Low to High',
  PRICE_DESC = 'Price: High to Low',
  NEWEST = 'Newest Arrivals',
  POPULARITY = 'Popularity'
}


import { Product } from './types';

export const CATEGORIES = ['All', 'Electronics', 'Footwear', 'Apparel', 'Accessories', 'Home & Living'];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Air Max Pro v2',
    price: 189.99,
    originalPrice: 249.99,
    category: 'Footwear',
    description: 'High-performance athletic footwear designed for maximum comfort and speed. Featuring breathable mesh and responsive cushioning.',
    image: 'https://picsum.photos/seed/shoe1/800/800',
    images: ['https://picsum.photos/seed/shoe1/800/800', 'https://picsum.photos/seed/shoe2/800/800'],
    rating: 4.8,
    reviews: 124,
    stock: 15,
    brand: 'Nike',
    featured: true,
    bestSeller: true
  },
  {
    id: '2',
    name: 'Ultra-Quiet Keyboard',
    price: 89.99,
    category: 'Electronics',
    description: 'Mechanical keyboard with silent switches. Perfect for late-night coding sessions and open-office environments.',
    image: 'https://picsum.photos/seed/keyboard/800/800',
    images: ['https://picsum.photos/seed/keyboard/800/800'],
    rating: 4.5,
    reviews: 89,
    stock: 45,
    brand: 'Logitech',
    featured: true
  },
  {
    id: '3',
    name: 'Denim Comfort Jacket',
    price: 120.00,
    originalPrice: 150.00,
    category: 'Apparel',
    description: 'Sustainable denim jacket crafted from organic cotton. Timeless style meets eco-friendly materials.',
    image: 'https://picsum.photos/seed/jacket/800/800',
    images: ['https://picsum.photos/seed/jacket/800/800'],
    rating: 4.2,
    reviews: 56,
    stock: 20,
    brand: 'Levi\'s',
    bestSeller: true
  },
  {
    id: '4',
    name: 'Noise Cancelling Headphones',
    price: 299.99,
    category: 'Electronics',
    description: 'Industry-leading noise cancellation. Hear every detail in your music without the distractions of the outside world.',
    image: 'https://picsum.photos/seed/headphones/800/800',
    images: ['https://picsum.photos/seed/headphones/800/800'],
    rating: 4.9,
    reviews: 210,
    stock: 12,
    brand: 'Sony',
    featured: true
  },
  {
    id: '5',
    name: 'Leather Minimalist Wallet',
    price: 45.00,
    category: 'Accessories',
    description: 'Handcrafted leather wallet with RFID protection. Slim profile to keep your pockets light.',
    image: 'https://picsum.photos/seed/wallet/800/800',
    images: ['https://picsum.photos/seed/wallet/800/800'],
    rating: 4.7,
    reviews: 145,
    stock: 100,
    brand: 'Bellroy'
  },
  {
    id: '6',
    name: 'Smart Home Hub',
    price: 129.00,
    category: 'Home & Living',
    description: 'Central control for all your smart devices. Voice-activated and easy to set up.',
    image: 'https://picsum.photos/seed/homehub/800/800',
    images: ['https://picsum.photos/seed/homehub/800/800'],
    rating: 4.4,
    reviews: 78,
    stock: 30,
    brand: 'Google'
  }
];

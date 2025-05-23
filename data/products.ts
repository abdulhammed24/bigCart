import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: 1,
    name: 'Fresh Peach',
    price: 8.0,
    unit: '1 lb',
    image: require('@/assets/images/products/peach.png'),
    category: 'Fruits',
    rating: 4.5,
    description: 'Sweet and juicy organic peaches',
    inStock: true,
  },
  {
    id: 2,
    name: 'Avocado',
    price: 3.0,
    unit: 'dozen',
    image: require('@/assets/images/products/avocado.png'),
    category: 'Fruits',
    status: 'new',
    rating: 4.8,
    inStock: true,
  },
  {
    id: 3,
    name: 'Pineapple',
    price: 8.0,
    unit: '1 lb',
    image: require('@/assets/images/products/pineapple.png'),
    category: 'Fruits',
    rating: 4.2,
    inStock: true,
  },
  {
    id: 4,
    name: 'Black Grapes',
    price: 8.0,
    unit: '1 lb',
    image: require('@/assets/images/products/grapes.png'),
    category: 'Fruits',

    discountPercentage: 16,
    rating: 4.6,
    inStock: true,
  },
  {
    id: 5,
    name: 'Pomegranate',
    price: 3.0,
    unit: '1 lb',
    image: require('@/assets/images/products/pomegranate.png'),
    category: 'Fruits',
    status: 'new',
    rating: 4.3,
    inStock: true,
  },
  {
    id: 6,
    name: 'Fresh Broccoli',
    price: 8.0,
    unit: '1 lb',
    image: require('@/assets/images/products/broccoli.png'),
    category: 'Vegetables',
    rating: 4.1,
    description: 'Organic fresh broccoli florets',
    inStock: true,
  },
  {
    id: 7,
    name: 'Organic Carrots',
    price: 2.5,
    unit: '1 lb',
    image: require('@/assets/images/products/broccoli.png'),
    category: 'Vegetables',
    rating: 4.7,
    inStock: true,
  },
  {
    id: 8,
    name: 'Italian Pasta',
    price: 4.99,
    unit: '16 oz',
    image: require('@/assets/images/products/broccoli.png'),
    category: 'Grocery',
    rating: 4.4,
    inStock: true,
  },
];

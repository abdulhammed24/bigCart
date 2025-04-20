export type Product = {
  id: number;
  name: string;
  price: number;
  unit: string;
  image: any;
  bgColor: string;
  category: string;
  status?: 'new' | 'sale' | 'popular' | 'featured';
  discountPercentage?: number;
  rating?: number;
  description?: string;
  inStock?: boolean;
};

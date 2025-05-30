import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Models, Query } from 'react-native-appwrite';
import { databases } from '@/lib/appwriteconfig';

interface Product {
  $id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  image?: string;
  status?: string;
  discountPercentage?: number;
}

interface FeaturedProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: (category?: string, limit?: number) => Promise<void>;
  refreshProducts: (category?: string, limit?: number) => Promise<void>;
}

export const useFeaturedProductsStore = create<FeaturedProductsState>()(
  persist(
    (set, get) => ({
      products: [],
      loading: false,
      error: null,
      fetchProducts: async (category?: string, limit?: number) => {
        try {
          set({ loading: true, error: null });
          console.log(
            'Fetching products with category:',
            category,
            'limit:',
            limit,
          );

          const databaseId = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID;
          const collectionId =
            process.env.EXPO_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID;
          if (!databaseId || !collectionId) {
            throw new Error('Missing Appwrite configuration.');
          }

          const queries = category ? [Query.equal('category', category)] : [];
          const response = await databases.listDocuments(
            databaseId,
            collectionId,
            queries,
          );
          console.log('Fetched documents:', response.documents);

          const mappedProducts: Product[] = response.documents.map(
            (doc: Models.Document) => ({
              $id: doc.$id,
              name: doc.name as string,
              category: doc.category as string,
              price: doc.price as number,
              unit: doc.unit as string,
              image: doc.image as string | undefined,
              status: doc.status as string | undefined,
              discountPercentage: doc.discountPercentage as number | undefined,
            }),
          );

          const filteredProducts =
            limit !== undefined
              ? mappedProducts.slice(0, limit)
              : mappedProducts;
          set({ products: filteredProducts, loading: false, error: null });
        } catch (error: any) {
          console.error('Error fetching products:', error.message || error);
          set({ error: 'Failed to load products', loading: false });
        }
      },
      refreshProducts: async (category?: string, limit?: number) => {
        try {
          set({ loading: true, error: null });
          console.log('Starting refresh for products');
          await get().fetchProducts(category, limit);
          console.log('Refresh completed');
        } finally {
          set({ loading: false });
          console.log('Loading state reset after refresh');
        }
      },
    }),
    {
      name: 'products-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ products: state.products }),
    },
  ),
);

// Initialize store by fetching all products on app load
useFeaturedProductsStore.getState().fetchProducts();

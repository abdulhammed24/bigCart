import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Models } from 'react-native-appwrite';
import { databases } from '@/lib/appwriteconfig';

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  category: string;
  status?: string;
  discountPercentage?: number;
  rating: number;
  description: string;
  inStock: boolean;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  refreshProducts: () => Promise<void>;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: [],
      loading: false,
      error: null,
      fetchProducts: async () => {
        const { loading, products } = get();
        if (loading) return;
        if (products.length > 0) return;

        try {
          set({ loading: true, error: null });

          const databaseId = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID;
          const collectionId =
            process.env.EXPO_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID;
          if (!databaseId || !collectionId) {
            throw new Error('Missing Appwrite configuration.');
          }

          const response = await databases.listDocuments(
            databaseId,
            collectionId,
          );
          const mappedProducts: Product[] = response.documents.map(
            (doc: Models.Document) => ({
              id: doc.$id,
              name: doc.name as string,
              price: doc.price as number,
              unit: doc.unit as string,
              image: doc.image as string,
              category: doc.category as string,
              status: doc.status as string | undefined,
              discountPercentage: doc.discountPercentage as number | undefined,
              rating: doc.rating as number,
              description: doc.description as string,
              inStock: doc.inStock as boolean,
            }),
          );
          set({ products: mappedProducts, loading: false, error: null });
        } catch (error: any) {
          // console.error('Error fetching products:', error.message || error);
          set({ error: 'Failed to load products', loading: false });
        }
      },
      refreshProducts: async () => {
        try {
          set({ loading: true, error: null });
          const databaseId = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID;
          const collectionId =
            process.env.EXPO_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID;
          if (!databaseId || !collectionId) {
            throw new Error('Missing Appwrite configuration.');
          }

          const response = await databases.listDocuments(
            databaseId,
            collectionId,
          );
          const mappedProducts: Product[] = response.documents.map(
            (doc: Models.Document) => ({
              id: doc.$id,
              name: doc.name as string,
              price: doc.price as number,
              unit: doc.unit as string,
              image: doc.image as string,
              category: doc.category as string,
              status: doc.status as string | undefined,
              discountPercentage: doc.discountPercentage as number | undefined,
              rating: doc.rating as number,
              description: doc.description as string,
              inStock: doc.inStock as boolean,
            }),
          );
          set({ products: mappedProducts, loading: false, error: null });
        } catch (error: any) {
          // console.error('Error refreshing products:', error.message || error);
          set({ error: 'Failed to refresh products', loading: false });
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

// Initialize store
useProductStore.getState().fetchProducts();

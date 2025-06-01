import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Models } from 'react-native-appwrite';
import { databases } from '@/lib/appwriteconfig';
import { Query } from 'react-native-appwrite';

// Define a single type for Appwrite document attributes
interface ProductDocument extends Models.Document {
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
  products: ProductDocument[];
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
        const { loading } = get();
        if (loading) return;

        try {
          set({ loading: true, error: null });

          const databaseId = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID;
          const collectionId =
            process.env.EXPO_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID;
          if (!databaseId || !collectionId) {
            throw new Error('Missing Appwrite configuration.');
          }

          const response = await databases.listDocuments<ProductDocument>(
            databaseId,
            collectionId,
            [Query.limit(100)],
          );
          const mappedProducts: ProductDocument[] = response.documents.map(
            (doc: ProductDocument) => ({
              ...doc,
              name: doc.name || 'Unnamed Product',
              price: doc.price || 0,
              unit: doc.unit || 'N/A',
              image: doc.image || 'https://via.placeholder.com/100x80',
              category: doc.category || 'Uncategorized',
              status: doc.status,
              discountPercentage: doc.discountPercentage,
              rating: doc.rating || 0,
              description: doc.description || 'No description',
              inStock: doc.inStock ?? true,
            }),
          );
          set({ products: mappedProducts, loading: false, error: null });
        } catch (error: any) {
          const errorMsg = error.message || 'Unknown error';
          set({
            error: `Failed to load products: ${errorMsg}`,
            loading: false,
          });
        }
      },
      refreshProducts: async () => {
        try {
          set({ loading: true, error: null });
          await get().fetchProducts();
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: 'products-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ products: state.products }),
      version: 1,
    },
  ),
);

// Initialize store
useProductStore.getState().fetchProducts();

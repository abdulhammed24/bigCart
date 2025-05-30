import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Models } from 'react-native-appwrite';
import { databases } from '@/lib/appwriteconfig';

interface Category {
  $id: string;
  name: string;
  icon?: string;
  backgroundColor?: string;
}

interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  refreshCategories: () => Promise<void>;
}

export const useCategoriesStore = create<CategoriesState>()(
  persist(
    (set, get) => ({
      categories: [],
      loading: false,
      error: null,
      fetchCategories: async () => {
        const { loading } = get();
        if (loading) return;
        try {
          set({ loading: true, error: null });

          const databaseId = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID;
          const collectionId =
            process.env.EXPO_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID;
          if (!databaseId || !collectionId) {
            throw new Error('Missing Appwrite configuration.');
          }

          const response = await databases.listDocuments(
            databaseId,
            collectionId,
          );
          const mappedCategories: Category[] = response.documents.map(
            (doc: Models.Document) => ({
              $id: doc.$id,
              name: doc.name as string,
              icon: doc.icon as string | undefined,
              backgroundColor: doc.backgroundColor as string | undefined,
            }),
          );
          set({ categories: mappedCategories, loading: false, error: null });
        } catch (error: any) {
          console.error('Error fetching categories:', error.message || error);
          set({ error: 'Failed to load categories', loading: false });
        }
      },
      refreshCategories: async () => {
        try {
          set({ loading: true, error: null });
          await get().fetchCategories();
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: 'categories-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ categories: state.categories }),
    },
  ),
);

// Initialize store
useCategoriesStore.getState().fetchCategories();

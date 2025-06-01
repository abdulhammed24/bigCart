import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Models } from 'react-native-appwrite';
import { databases, account } from '@/lib/appwriteconfig';
import { Query } from 'react-native-appwrite';

interface FavoriteDocument extends Models.Document {
  userId: string;
  productId: string;
}

interface FavoriteState {
  favorites: string[]; // Store product IDs
  loading: boolean;
  error: string | null;
  fetchFavorites: () => Promise<void>;
  addFavorite: (productId: string) => Promise<void>;
  removeFavorite: (productId: string) => Promise<void>;
  isFavorite: (productId: string) => boolean;
}

export const useFavoritesStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],
      loading: false,
      error: null,
      fetchFavorites: async () => {
        if (get().loading) return;
        try {
          set({ loading: true, error: null });
          const user = await account.get();
          const response = await databases.listDocuments<FavoriteDocument>(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.EXPO_PUBLIC_APPWRITE_FAVORITES_COLLECTION_ID!,
            [Query.equal('userId', user.$id), Query.limit(100)],
          );
          const favoriteIds = response.documents.map((doc) => doc.productId);
          set({ favorites: favoriteIds, loading: false, error: null });
        } catch (error: any) {
          set({
            error: `Failed to load favorites: ${
              error.message || 'Unknown error'
            }`,
            loading: false,
          });
        }
      },
      addFavorite: async (productId: string) => {
        try {
          set({ loading: true, error: null });
          const user = await account.get();
          await databases.createDocument(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.EXPO_PUBLIC_APPWRITE_FAVORITES_COLLECTION_ID!,
            'unique()',
            { userId: user.$id, productId },
          );
          set((state) => ({
            favorites: [...state.favorites, productId],
            loading: false,
            error: null,
          }));
        } catch (error: any) {
          set({
            error: `Failed to add favorite: ${
              error.message || 'Unknown error'
            }`,
            loading: false,
          });
        }
      },
      removeFavorite: async (productId: string) => {
        try {
          set({ loading: true, error: null });
          const user = await account.get();
          const response = await databases.listDocuments<FavoriteDocument>(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.EXPO_PUBLIC_APPWRITE_FAVORITES_COLLECTION_ID!,
            [
              Query.equal('userId', user.$id),
              Query.equal('productId', productId),
            ],
          );
          if (response.documents.length > 0) {
            await databases.deleteDocument(
              process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
              process.env.EXPO_PUBLIC_APPWRITE_FAVORITES_COLLECTION_ID!,
              response.documents[0].$id,
            );
            set((state) => ({
              favorites: state.favorites.filter((id) => id !== productId),
              loading: false,
              error: null,
            }));
          }
        } catch (error: any) {
          set({
            error: `Failed to remove favorite: ${
              error.message || 'Unknown error'
            }`,
            loading: false,
          });
        }
      },
      isFavorite: (productId: string) => get().favorites.includes(productId),
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ favorites: state.favorites }),
      version: 1,
    },
  ),
);

// Initialize store
useFavoritesStore.getState().fetchFavorites();

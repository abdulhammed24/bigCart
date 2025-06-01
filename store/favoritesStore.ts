// store/favoritesStore.ts
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
  favorites: string[];
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
          // console.log('Fetching favorites for user:', user.$id);
          const response = await databases.listDocuments<FavoriteDocument>(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.EXPO_PUBLIC_APPWRITE_FAVORITES_COLLECTION_ID!,
            [Query.equal('userId', user.$id), Query.limit(100)],
          );
          const favoriteIds = response.documents.map((doc) => doc.productId);
          // console.log('Fetched favorites:', favoriteIds);
          set({ favorites: favoriteIds, loading: false, error: null });
        } catch (error: any) {
          console.error('Error fetching favorites:', error);
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
          // console.log('Adding favorite:', { userId: user.$id, productId });
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
          // console.log('Favorite added:', productId);
        } catch (error: any) {
          console.error('Error adding favorite:', error);
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
          // console.log('Removing favorite:', { userId: user.$id, productId });
          const response = await databases.listDocuments<FavoriteDocument>(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.EXPO_PUBLIC_APPWRITE_FAVORITES_COLLECTION_ID!,
            [
              Query.equal('userId', user.$id),
              Query.equal('productId', productId),
            ],
          );
          // console.log('Found favorite documents:', response.documents);
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
            // console.log('Favorite removed:', productId);
          } else {
            console.warn('No favorite document found for product:', productId);
            set({ loading: false, error: null });
          }
        } catch (error: any) {
          console.error('Error removing favorite:', error);
          set({
            error: `Failed to remove favorite: ${
              error.message || 'Unknown error'
            }`,
            loading: false,
          });
        }
      },
      isFavorite: (productId: string) => {
        const isFav = get().favorites.includes(productId);
        // console.log('Checking isFavorite:', { productId, isFav });
        return isFav;
      },
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

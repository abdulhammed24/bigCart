import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Models } from 'react-native-appwrite';
import { databases, account } from '@/lib/appwriteconfig';
import { Query } from 'react-native-appwrite';

interface CartDocument extends Models.Document {
  userId: string;
  productId: string;
  quantity: number;
}

interface CartItem {
  id: string; // Document ID
  productId: string;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  loading: boolean;
  updating: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  isInCart: (productId: string) => boolean;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      loading: false,
      updating: false,
      error: null,
      fetchCart: async () => {
        if (get().loading) return;
        try {
          set({ loading: true, error: null });
          const user = await account.get();
          if (!user?.$id) {
            throw new Error('User not authenticated');
          }
          const response = await databases.listDocuments<CartDocument>(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.EXPO_PUBLIC_APPWRITE_CART_COLLECTION_ID!,
            [Query.equal('userId', user.$id), Query.limit(100)],
          );
          const items = response.documents.map((doc) => ({
            id: doc.$id,
            productId: doc.productId,
            quantity: doc.quantity,
          }));
          set({ cartItems: items, loading: false, error: null });
        } catch (error: any) {
          const errorMsg = error.message || 'Unknown error';
          set({
            error: `Failed to load cart: ${errorMsg}`,
            loading: false,
          });
          console.log('Fetch cart error:', errorMsg);
        } finally {
          set((state) => (state.loading ? { loading: false } : {}));
        }
      },
      addToCart: async (productId: string, quantity = 1) => {
        try {
          set({ loading: true, error: null });
          const user = await account.get();
          const existingItem = get().cartItems.find(
            (item) => item.productId === productId,
          );
          if (existingItem) {
            await databases.updateDocument(
              process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
              process.env.EXPO_PUBLIC_APPWRITE_CART_COLLECTION_ID!,
              existingItem.id,
              { quantity: existingItem.quantity + quantity },
            );
            set((state) => ({
              cartItems: state.cartItems.map((item) =>
                item.productId === productId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item,
              ),
              loading: false,
              error: null,
            }));
          } else {
            const response = await databases.createDocument(
              process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
              process.env.EXPO_PUBLIC_APPWRITE_CART_COLLECTION_ID!,
              'unique()',
              { userId: user.$id, productId, quantity },
            );
            set((state) => ({
              cartItems: [
                ...state.cartItems,
                { id: response.$id, productId, quantity },
              ],
              loading: false,
              error: null,
            }));
          }
        } catch (error: any) {
          set({
            error: `Failed to add to cart: ${error.message || 'Unknown error'}`,
            loading: false,
          });
        } finally {
          set((state) => (state.loading ? { loading: false } : {}));
        }
      },
      updateQuantity: async (productId: string, quantity: number) => {
        if (quantity < 1) return;
        try {
          set({ updating: true, error: null });
          const item = get().cartItems.find(
            (item) => item.productId === productId,
          );
          if (item) {
            await databases.updateDocument(
              process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
              process.env.EXPO_PUBLIC_APPWRITE_CART_COLLECTION_ID!,
              item.id,
              { quantity },
            );
            set((state) => ({
              cartItems: state.cartItems.map((i) =>
                i.productId === productId ? { ...i, quantity } : i,
              ),
              updating: false,
              error: null,
            }));
          }
        } catch (error: any) {
          set({
            error: `Failed to update quantity: ${
              error.message || 'Unknown error'
            }`,
            updating: false,
          });
        } finally {
          set((state) => (state.updating ? { updating: false } : {}));
        }
      },
      removeFromCart: async (productId: string) => {
        try {
          set({ updating: true, error: null });
          const item = get().cartItems.find(
            (item) => item.productId === productId,
          );
          if (item) {
            await databases.deleteDocument(
              process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
              process.env.EXPO_PUBLIC_APPWRITE_CART_COLLECTION_ID!,
              item.id,
            );
            set((state) => ({
              cartItems: state.cartItems.filter(
                (i) => i.productId !== productId,
              ),
              updating: false,
              error: null,
            }));
          }
        } catch (error: any) {
          set({
            error: `Failed to remove from cart: ${
              error.message || 'Unknown error'
            }`,
            updating: false,
          });
        } finally {
          set((state) => (state.updating ? { updating: false } : {}));
        }
      },
      clearCart: async () => {
        try {
          set({ loading: true, error: null });
          const user = await account.get();
          const response = await databases.listDocuments<CartDocument>(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.EXPO_PUBLIC_APPWRITE_CART_COLLECTION_ID!,
            [Query.equal('userId', user.$id)],
          );
          await Promise.all(
            response.documents.map((doc) =>
              databases.deleteDocument(
                process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
                process.env.EXPO_PUBLIC_APPWRITE_CART_COLLECTION_ID!,
                doc.$id,
              ),
            ),
          );
          set({ cartItems: [], loading: false, error: null });
        } catch (error: any) {
          set({
            error: `Failed to clear cart: ${error.message || 'Unknown error'}`,
            loading: false,
          });
        } finally {
          set((state) => (state.loading ? { loading: false } : {}));
        }
      },
      isInCart: (productId: string) =>
        get().cartItems.some((item) => item.productId === productId),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ cartItems: state.cartItems }),
      version: 1,
    },
  ),
);

// Initialize store
// useCartStore.getState().fetchCart();

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Models } from 'react-native-appwrite';
import { databases, account } from '@/lib/appwriteconfig';
import { Query } from 'react-native-appwrite';

interface TrackingStep {
  label: string;
  date: string;
  done: boolean;
}

interface OrderDocument extends Models.Document {
  userId: string;
  orderNumber: string;
  placedOn: string;
  items: number;
  amount: number;
  tracking: string[];
}

interface Order {
  id: string;
  orderNumber: string;
  placedOn: string;
  items: number;
  amount: number;
  tracking: TrackingStep[];
}

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
  addOrder: (order: Omit<Order, 'id'>) => Promise<void>;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      loading: false,
      error: null,
      fetchOrders: async () => {
        if (get().loading) return;
        try {
          set({ loading: true, error: null });
          const user = await account.get();
          const response = await databases.listDocuments<OrderDocument>(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.EXPO_PUBLIC_APPWRITE_ORDERS_COLLECTION_ID!,
            [Query.equal('userId', user.$id), Query.limit(100)],
          );
          const orders: Order[] = response.documents
            .map((doc) => {
              const trackingSteps: TrackingStep[] = doc.tracking.map(
                (label) => ({
                  label,
                  date: '',
                  done: false,
                }),
              );
              return {
                id: doc.$id,
                orderNumber: doc.orderNumber,
                placedOn: doc.placedOn,
                items: doc.items,
                amount: doc.amount || 0,
                tracking: trackingSteps,
              };
            })
            .reverse();
          set({ orders, loading: false, error: null });
        } catch (error: any) {
          // console.error('Error fetching orders:', error);
          set({
            error: `Failed to load orders: ${error.message || 'Unknown error'}`,
            loading: false,
          });
        }
      },
      addOrder: async (order) => {
        try {
          set({ loading: true, error: null });
          const user = await account.get();
          const newOrder = {
            userId: user.$id,
            orderNumber: order.orderNumber,
            placedOn: order.placedOn,
            items: order.items,
            amount: order.amount,
            tracking: order.tracking.map((step) => step.label),
          };
          // console.log('New order being saved:', newOrder);
          const response = await databases.createDocument<OrderDocument>(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.EXPO_PUBLIC_APPWRITE_ORDERS_COLLECTION_ID!,
            'unique()',
            newOrder,
          );
          const addedOrder: Order = {
            id: response.$id,
            orderNumber: order.orderNumber,
            placedOn: order.placedOn,
            items: order.items,
            amount: order.amount,
            tracking: order.tracking,
          };
          set((state) => ({
            orders: [
              addedOrder,
              ...state.orders.filter((o) => o.id !== addedOrder.id),
            ].reverse(),
            loading: false,
            error: null,
          }));
        } catch (error: any) {
          // console.error('Error adding order:', error);
          set({
            error: `Failed to add order: ${error.message || 'Unknown error'}`,
            loading: false,
          });
          throw error;
        }
      },
    }),
    {
      name: 'order-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ orders: state.orders }),
      version: 1,
    },
  ),
);

useOrderStore.getState().fetchOrders();

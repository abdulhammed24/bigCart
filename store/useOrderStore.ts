import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Models } from 'react-native-appwrite';
import { databases, account } from '@/lib/appwriteconfig';
import { Query } from 'react-native-appwrite';
import { format, toZonedTime } from 'date-fns-tz';

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
  tracking: string;
  paymentMethod: 'mastercard' | 'paypal' | 'visa';
  cardName: string;
}

interface Order {
  id: string;
  orderNumber: string;
  placedOn: string;
  items: number;
  amount: number;
  tracking: TrackingStep[];
  paymentMethod: 'mastercard' | 'paypal' | 'visa';
  cardName: string;
}

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
  addOrder: (order: Partial<Omit<Order, 'id'>>) => Promise<void>;
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
              const trackingSteps: TrackingStep[] = doc.tracking
                ? JSON.parse(doc.tracking)
                : [];
              return {
                id: doc.$id,
                orderNumber: doc.orderNumber,
                placedOn: doc.placedOn,
                items: doc.items,
                amount: doc.amount || 0,
                tracking: trackingSteps,
                paymentMethod: doc.paymentMethod || 'mastercard',
                cardName: doc.cardName || 'Default Card',
              };
            })
            .reverse();
          set({ orders, loading: false, error: null });
        } catch (error: any) {
          console.error('Error fetching orders:', error);
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
          const now = format(
            toZonedTime(new Date(), 'Africa/Lagos'),
            'MMM d yyyy',
          );
          const defaultTracking: TrackingStep[] = [
            { label: 'Order placed', date: now, done: true },
            { label: 'Order confirmed', date: '', done: false },
            { label: 'Order shipped', date: '', done: false },
            { label: 'Out for delivery', date: '', done: false },
            { label: 'Order delivered', date: '', done: false },
          ];
          const newOrder = {
            userId: user.$id,
            orderNumber: order.orderNumber || `ORD-${Date.now()}`,
            placedOn:
              order.placedOn ||
              format(
                toZonedTime(new Date(), 'Africa/Lagos'),
                "MMMM d, yyyy 'at' hh:mm a z",
              ),
            items: order.items || 0,
            amount: order.amount || 0,
            tracking: JSON.stringify(defaultTracking),
            paymentMethod: order.paymentMethod || 'mastercard',
            cardName: order.cardName || 'Default Card',
          };
          console.log('New order being saved:', newOrder);
          const response = await databases.createDocument<OrderDocument>(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.EXPO_PUBLIC_APPWRITE_ORDERS_COLLECTION_ID!,
            'unique()',
            newOrder,
          );
          const addedOrder: Order = {
            id: response.$id,
            orderNumber: newOrder.orderNumber,
            placedOn: newOrder.placedOn,
            items: newOrder.items,
            amount: newOrder.amount,
            tracking: defaultTracking,
            paymentMethod: newOrder.paymentMethod,
            cardName: newOrder.cardName,
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
          console.error('Error adding order:', error);
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

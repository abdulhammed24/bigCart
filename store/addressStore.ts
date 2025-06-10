import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Models } from 'react-native-appwrite';
import { databases, account } from '@/lib/appwriteconfig';
import { Query } from 'react-native-appwrite';

interface AddressDocument extends Models.Document {
  userId: string;
  name: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

interface Address {
  id: string;
  name: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

interface AddressState {
  addresses: Address[];
  loading: boolean;
  error: string | null;
  fetchAddresses: () => Promise<void>;
  addAddress: (address: Omit<Address, 'id'>) => Promise<void>;
  updateAddress: (
    id: string,
    address: Partial<Omit<Address, 'id'>>,
  ) => Promise<void>;
  setDefaultAddress: (id: string) => Promise<void>;
}

export const useAddressStore = create<AddressState>()(
  persist(
    (set, get) => ({
      addresses: [],
      loading: false,
      error: null,
      fetchAddresses: async () => {
        if (get().loading) return;
        try {
          set({ loading: true, error: null });
          const user = await account.get();
          const response = await databases.listDocuments<AddressDocument>(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.EXPO_PUBLIC_APPWRITE_ADDRESSES_COLLECTION_ID!,
            [Query.equal('userId', user.$id), Query.limit(100)],
          );
          const addresses: Address[] = response.documents.map(
            (doc: Models.Document) => ({
              id: doc.$id,
              name: doc.name,
              email: doc.email,
              address: doc.address,
              city: doc.city,
              zipCode: doc.zipCode,
              country: doc.country,
              phone: doc.phone,
              isDefault: doc.isDefault,
            }),
          );
          set({ addresses, loading: false, error: null });
        } catch (error: any) {
          console.error('Error fetching addresses:', error);
          set({
            error: `Failed to load addresses: ${
              error.message || 'Unknown error'
            }`,
            loading: false,
          });
        }
      },
      addAddress: async (address) => {
        try {
          set({ loading: true, error: null });
          const user = await account.get();
          const newAddress = {
            userId: user.$id,
            name: address.name,
            email: address.email,
            address: address.address,
            city: address.city,
            zipCode: address.zipCode,
            country: address.country,
            phone: address.phone,
            isDefault: address.isDefault || false,
          };
          const response = await databases.createDocument<AddressDocument>(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.EXPO_PUBLIC_APPWRITE_ADDRESSES_COLLECTION_ID!,
            'unique()',
            newAddress,
          );
          const addedAddress: Address = {
            id: response.$id,
            ...newAddress,
          };
          set((state) => ({
            addresses: addedAddress.isDefault
              ? [
                  ...state.addresses.map((a) => ({ ...a, isDefault: false })),
                  addedAddress,
                ]
              : [...state.addresses, addedAddress],
            loading: false,
            error: null,
          }));
        } catch (error: any) {
          console.error('Error adding address:', error);
          set({
            error: `Failed to add address: ${error.message || 'Unknown error'}`,
            loading: false,
          });
          throw error;
        }
      },
      updateAddress: async (id, address) => {
        try {
          set({ loading: true, error: null });
          await databases.updateDocument(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.EXPO_PUBLIC_APPWRITE_ADDRESSES_COLLECTION_ID!,
            id,
            address,
          );
          set((state) => ({
            addresses: state.addresses.map((addr) =>
              addr.id === id ? { ...addr, ...address } : addr,
            ),
            loading: false,
            error: null,
          }));
        } catch (error: any) {
          console.error('Error updating address:', error);
          set({
            error: `Failed to update address: ${
              error.message || 'Unknown error'
            }`,
            loading: false,
          });
          throw error;
        }
      },
      setDefaultAddress: async (id) => {
        try {
          set({ loading: true, error: null });
          // Set all addresses to non-default
          const updatePromises = get()
            .addresses.filter((addr) => addr.id !== id)
            .map((addr) =>
              databases.updateDocument(
                process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
                process.env.EXPO_PUBLIC_APPWRITE_ADDRESSES_COLLECTION_ID!,
                addr.id,
                { isDefault: false },
              ),
            );
          await Promise.all(updatePromises);
          // Set selected address to default
          await databases.updateDocument(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.EXPO_PUBLIC_APPWRITE_ADDRESSES_COLLECTION_ID!,
            id,
            { isDefault: true },
          );
          set((state) => ({
            addresses: state.addresses.map((addr) => ({
              ...addr,
              isDefault: addr.id === id,
            })),
            loading: false,
            error: null,
          }));
        } catch (error: any) {
          console.error('Error setting default address:', error);
          set({
            error: `Failed to set default address: ${
              error.message || 'Unknown error'
            }`,
            loading: false,
          });
          throw error;
        }
      },
    }),
    {
      name: 'address-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ addresses: state.addresses }),
      version: 1,
    },
  ),
);

// Initialize store
useAddressStore.getState().fetchAddresses();

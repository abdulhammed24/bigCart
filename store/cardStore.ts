import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Models } from 'react-native-appwrite';
import { Query } from 'react-native-appwrite';
import { account, databases } from '@/lib/appwriteconfig';

interface CardDocument extends Models.Document {
  userId: string;
  name: string;
  cardNumber: string; // Should be encrypted in production
  expiry: string;
  cvv: string; // Should be encrypted in production
  isDefault: boolean;
}

interface Card {
  id: string;
  name: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  isDefault: boolean;
}

interface CardState {
  cards: Card[];
  loading: boolean;
  error: string | null;
  fetchCards: () => Promise<void>;
  addCard: (card: Omit<Card, 'id'>) => Promise<void>;
  updateCard: (id: string, card: Partial<Omit<Card, 'id'>>) => Promise<void>;
  setDefaultCard: (id: string) => Promise<void>;
}

export const useCardStore = create<CardState>()(
  persist(
    (set, get) => ({
      cards: [],
      loading: false,
      error: null,
      fetchCards: async () => {
        if (get().loading) return;
        try {
          set({ loading: true, error: null });
          const user = await account.get();
          const response = await databases.listDocuments<CardDocument>(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.EXPO_PUBLIC_APPWRITE_CARDS_COLLECTION_ID!,
            [Query.equal('userId', user.$id), Query.limit(100)],
          );
          const cards: Card[] = response.documents.map((doc) => ({
            id: doc.$id,
            name: doc.name,
            cardNumber: doc.cardNumber,
            expiry: doc.expiry,
            cvv: doc.cvv,
            isDefault: doc.isDefault,
          }));
          set({ cards, loading: false, error: null });
        } catch (error: any) {
          console.error('Error fetching cards:', error);
          set({
            error: `Failed to load cards: ${error.message || 'Unknown error'}`,
            loading: false,
          });
        }
      },
      addCard: async (card) => {
        try {
          set({ loading: true, error: null });
          const user = await account.get();
          const newCard = {
            userId: user.$id,
            name: card.name,
            cardNumber: card.cardNumber.replace(/\s/g, ''),
            expiry: card.expiry,
            cvv: card.cvv,
            isDefault: card.isDefault || false,
          };
          const response = await databases.createDocument<CardDocument>(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.EXPO_PUBLIC_APPWRITE_CARDS_COLLECTION_ID!,
            'unique()',
            newCard,
          );
          const addedCard: Card = {
            id: response.$id,
            ...newCard,
          };
          set((state) => ({
            cards: addedCard.isDefault
              ? [
                  ...state.cards.map((c) => ({ ...c, isDefault: false })),
                  addedCard,
                ]
              : [...state.cards, addedCard],
            loading: false,
            error: null,
          }));
        } catch (error: any) {
          console.error('Error adding card:', error);
          set({
            error: `Failed to add card: ${error.message || 'Unknown error'}`,
            loading: false,
          });
          throw error;
        }
      },
      updateCard: async (id, card) => {
        try {
          set({ loading: true, error: null });
          // Find the existing card to preserve unchanged fields
          const existingCard = get().cards.find((c) => c.id === id);
          if (!existingCard) {
            throw new Error('Card not found');
          }
          // Only update provided fields, preserve others
          const updateData: Partial<CardDocument> = {
            name: card.name ?? existingCard.name,
            cardNumber: card.cardNumber
              ? card.cardNumber.replace(/\s/g, '')
              : existingCard.cardNumber,
            expiry: card.expiry ?? existingCard.expiry,
            cvv: card.cvv ?? existingCard.cvv,
            isDefault: card.isDefault ?? existingCard.isDefault,
          };
          await databases.updateDocument(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.EXPO_PUBLIC_APPWRITE_CARDS_COLLECTION_ID!,
            id,
            updateData,
          );
          set((state) => ({
            cards: state.cards.map((c) =>
              c.id === id ? { ...c, ...updateData } : c,
            ),
            loading: false,
            error: null,
          }));
        } catch (error: any) {
          console.error('Error updating card:', error);
          set({
            error: `Failed to update card: ${error.message || 'Unknown error'}`,
            loading: false,
          });
          throw error;
        }
      },
      setDefaultCard: async (id) => {
        try {
          set({ loading: true, error: null });
          const updatePromises = get()
            .cards.filter((c) => c.id !== id)
            .map((c) =>
              databases.updateDocument(
                process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
                process.env.EXPO_PUBLIC_APPWRITE_CARDS_COLLECTION_ID!,
                c.id,
                { isDefault: false },
              ),
            );
          await Promise.all(updatePromises);
          await databases.updateDocument(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.EXPO_PUBLIC_APPWRITE_CARDS_COLLECTION_ID!,
            id,
            { isDefault: true },
          );
          set((state) => ({
            cards: state.cards.map((c) => ({
              ...c,
              isDefault: c.id === id,
            })),
            loading: false,
            error: null,
          }));
        } catch (error: any) {
          console.error('Error setting default card:', error);
          set({
            error: `Failed to set default card: ${
              error.message || 'Unknown error'
            }`,
            loading: false,
          });
          throw error;
        }
      },
    }),
    {
      name: 'card-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ cards: state.cards }),
      version: 1,
    },
  ),
);

// Initialize store
// useCardStore.getState().fetchCards();

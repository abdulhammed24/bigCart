import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { account, databases } from '../lib/appwriteconfig';
import { useRouter } from 'expo-router';

interface User {
  userId: string;
  email: string;
  name?: string;
  phoneNumber?: string;
}
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

const router = useRouter();

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: async () => {
        try {
          await account.deleteSession('current');
        } catch (error) {
          console.warn('Logout error:', error);
        }
        set({ user: null, isAuthenticated: false });
        router.replace('/(screens)/(auth)/login');
      },
      checkSession: async () => {
        try {
          const userData = await account.get();
          const userDoc = await databases.getDocument(
            process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
            userData.$id,
          );
          set({
            user: {
              userId: userData.$id,
              email: userData.email,
              name: userData.name,
              phoneNumber: userDoc.phoneNumber || '',
            },
            isAuthenticated: true,
          });
        } catch (error) {
          set({ user: null, isAuthenticated: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

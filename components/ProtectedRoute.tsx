import { useRouter } from 'expo-router';
import { useAuthStore } from '../store/authStore';
import { useEffect } from 'react';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/(screens)/(auth)/login');
    }
  }, [isAuthenticated]);

  return isAuthenticated ? <>{children}</> : null;
}

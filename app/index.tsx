import { useRouter } from 'expo-router';
import { useEffect, useState, useCallback } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
import { useAuthStore } from '../store/authStore';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function Index() {
  const router = useRouter();
  const [appIsReady, setAppIsReady] = useState(false);
  const { isAuthenticated, checkSession } = useAuthStore();

  useEffect(() => {
    const prepare = async () => {
      try {
        // Load fonts
        await Font.loadAsync({
          'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
          'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
          'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
          'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
        });

        // Check for an active session
        await checkSession();
      } catch (e) {
        console.warn('Error during app preparation:', e);
      } finally {
        setAppIsReady(true);
      }
    };

    prepare();
  }, [checkSession]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
      // Redirect based on authentication status
      if (isAuthenticated) {
        router.replace('/(tabs)/homepage');
      } else {
        router.replace('/(screens)/onboarding');
      }
    }
  }, [appIsReady, isAuthenticated]);

  if (!appIsReady) return null;

  return <View style={{ flex: 1 }} onLayout={onLayoutRootView} />;
}

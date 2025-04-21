import { useRouter } from 'expo-router';
import { useEffect, useState, useCallback } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function Index() {
  const router = useRouter();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync({
          'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
          'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
          'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
          'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
        });
      } catch (e) {
        console.warn('Font loading error:', e);
      } finally {
        setAppIsReady(true);
      }
    };

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
      router.replace('/(screens)/onboarding');
    }
  }, [appIsReady]);

  if (!appIsReady) return null;

  return <View style={{ flex: 1 }} onLayout={onLayoutRootView} />;
}

import { Redirect } from 'expo-router';
import { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(
    null,
  );
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  // Load fonts
  const loadFonts = async () => {
    await Font.loadAsync({
      'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
      'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
      'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
      'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    });
  };

  // Initialize app state
  useEffect(() => {
    const initialize = async () => {
      try {
        await loadFonts();
        const onboardingValue = await AsyncStorage.getItem('hasSeenOnboarding');
        const loggedInValue = await AsyncStorage.getItem('isLoggedIn');
        setHasSeenOnboarding(onboardingValue === 'true');
        setIsLoggedIn(loggedInValue === 'true');
      } catch (e) {
        console.warn('Error during initialization:', e);
      } finally {
        setAppIsReady(true);
      }
    };
    initialize();
  }, []);

  // Hide splash screen when app is ready
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  // Early return if app isn't ready
  if (!appIsReady) {
    return null;
  }

  // Define redirect path with explicit type
  let redirectPath:
    | '/(screens)/onboarding'
    | '/(tabs)/homepage'
    | '/(screens)/(auth)/login' = '/(screens)/onboarding';
  if (hasSeenOnboarding) {
    redirectPath = isLoggedIn ? '/(tabs)/homepage' : '/(screens)/(auth)/login';
  }

  return (
    <View onLayout={onLayoutRootView}>
      <Redirect href={redirectPath} />
    </View>
  );
}

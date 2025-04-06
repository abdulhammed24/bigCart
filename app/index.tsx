import { Redirect } from 'expo-router';
import { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(
    null,
  );
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
      'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
      'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
      'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    const initialize = async () => {
      await loadFonts();
      const value = await AsyncStorage.getItem('hasSeenOnboarding');
      setHasSeenOnboarding(value === 'true');
    };
    initialize();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && hasSeenOnboarding !== null) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, hasSeenOnboarding]);

  if (!fontsLoaded || hasSeenOnboarding === null) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView}>
      <Redirect
        href={
          hasSeenOnboarding
            ? '/(screens)/(auth)/login'
            : '/(screens)/onboarding'
        }
      />
    </View>
  );
}

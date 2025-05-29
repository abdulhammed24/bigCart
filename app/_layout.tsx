import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '@/app/global.css';
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(screens)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
      <Toast position="bottom" />
    </SafeAreaProvider>
  );
}

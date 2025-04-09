import { Stack } from 'expo-router';
import '@/app/global.css';
import { StatusBar } from 'react-native';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* <StatusBar barStyle="default" /> */}
      <Stack.Screen name="index" />
      <Stack.Screen name="(screens)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

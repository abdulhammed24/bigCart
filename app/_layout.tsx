import { Stack } from 'expo-router';
import '@/app/global.css';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(srceens)" />
      {/* <Stack.Screen name="(tabs)" /> */}
    </Stack>
  );
}

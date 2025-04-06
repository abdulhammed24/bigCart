import { Stack } from 'expo-router';

export default function ScreensLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="onboarding" />
      {/* <Stack.Screen name="checkout" />
      <Stack.Screen name="cart" />
      <Stack.Screen name="product/[id]" /> */}
    </Stack>
  );
}

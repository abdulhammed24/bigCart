import { Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function MainScreensLayout() {
  const insets = useSafeAreaInsets();

  return (
    <>
      <View className="bg-white left-0 right-0 top-0 absolute h-44" />
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}

import { Stack } from 'expo-router';
import React from 'react';
import ReusableStatusBar from '@/components/ReusableStatusBar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MainScreensLayout() {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        <ReusableStatusBar
          style="dark"
          backgroundColor="white"
          translucent={false}
        />

        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaView>
    </>
  );
}

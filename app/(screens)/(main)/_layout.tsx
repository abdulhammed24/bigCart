import { Stack } from 'expo-router';
import React from 'react';
import ReusableStatusBar from '@/components/ReusableStatusBar';

export default function MainScreensLayout() {
  return (
    <>
      <ReusableStatusBar
        style="dark"
        backgroundColor="white"
        translucent={false}
      />

      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}

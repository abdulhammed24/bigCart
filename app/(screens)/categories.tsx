import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

export default function Categories() {
  const router = useRouter();
  return (
    <View className="flex-1">
      <View className="px-6 pt-6">
        <View className="flex justify-between flex-row">
          <TouchableOpacity onPress={() => router.push('/(tabs)/homepage')}>
            <Image
              source={require('@/assets/icons/back-arrow-blk.svg')}
              style={{ width: 23, height: 16 }}
              contentFit="contain"
            />
          </TouchableOpacity>

          <Text className="font-poppinsBold text-[18px]">Categories</Text>
        </View>
      </View>
      <View className="px-6 pt-6">
        <Text className="text-[40px]">Categories</Text>
      </View>
    </View>
  );
}

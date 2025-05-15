import React from 'react';
import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import { PrimaryBtn } from '@/components/PrimaryBtn';
import { useRouter } from 'expo-router';

export const EmptyFavorites: React.FC = () => {
  const router = useRouter();

  return (
    <View className="flex-1 px-6 justify-between bg-offWhite py-6">
      <View className="flex flex-1 flex-col gap-5 items-center justify-center">
        {/* <Image
          source={require('@/assets/images/heart.png')} 
          contentFit="contain"
          style={{ width: 100, height: 100 }}
        /> */}
        <Text className="text-center font-poppinsBold text-[24px]">
          Your favorites are empty!
        </Text>
        <Text className="text-center font-poppinsMedium text-[18px] text-gray">
          Add some items to your favorites to get started.
        </Text>
      </View>
      <View>
        <PrimaryBtn
          title="Start Shopping"
          onPress={() => router.replace('/(tabs)/homepage')}
        />
      </View>
    </View>
  );
};

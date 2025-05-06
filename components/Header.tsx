import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

interface HeaderProps {
  title: string;
  rightComponent?: React.ReactNode;
  onBackPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  rightComponent,
  onBackPress,
}) => {
  const router = useRouter();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View className="p-6 bg-white">
      <View className="flex flex-row items-center justify-between">
        <Pressable onPress={handleBackPress}>
          <Image
            source={require('@/assets/icons/back-arrow-blk.svg')}
            style={{ width: 24, height: 24 }}
            contentFit="contain"
          />
        </Pressable>
        <Text className="text-center font-poppinsBold text-[24px]">
          {title}
        </Text>
        {rightComponent || <View style={{ width: 24 }} />}
      </View>
    </View>
  );
};

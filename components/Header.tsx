import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

interface HeaderProps {
  title?: string;
  backgroundColor?: string;
  rightComponent?: React.ReactNode;
  onBackPress?: () => void;
  showBackButton?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  rightComponent,
  backgroundColor = 'bg-white',
  onBackPress,
  showBackButton = true,
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
    <View className={`p-6 ${backgroundColor}`}>
      <View className="flex flex-row items-center justify-between">
        {showBackButton ? (
          <Pressable onPress={handleBackPress}>
            <Image
              source={require('@/assets/icons/back-arrow-blk.svg')}
              style={{ width: 24, height: 24 }}
              contentFit="contain"
            />
          </Pressable>
        ) : (
          <View style={{ width: 24 }} />
        )}

        {title ? (
          <Text className="text-center font-poppinsBold text-[24px]">
            {title}
          </Text>
        ) : (
          <View style={{ flex: 1 }} />
        )}

        {rightComponent || <View style={{ width: 24 }} />}
      </View>
    </View>
  );
};

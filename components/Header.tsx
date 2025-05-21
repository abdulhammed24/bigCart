import React from 'react';
import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { IconButton } from 'react-native-paper';

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
          <IconButton
            icon={() => (
              <Image
                source={require('@/assets/icons/back-arrow-blk.svg')}
                style={{ width: 24, height: 24 }}
                contentFit="contain"
              />
            )}
            size={24}
            onPress={handleBackPress}
            accessibilityLabel="Go back"
            rippleColor="rgba(0, 0, 0, 0.1)"
            style={{ margin: -8 }}
            className="rounded-full"
          />
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

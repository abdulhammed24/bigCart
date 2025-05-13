import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
interface HeaderProps {
  title?: string;
  backgroundColor?: string;
  rightComponent?: React.ReactNode;
  onBackPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  rightComponent,
  backgroundColor = 'bg-white',
  onBackPress,
}) => {
  const router = useRouter();
  // const { colorScheme, toggleColorScheme } = useColorScheme();

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
        <Pressable onPress={handleBackPress}>
          <Image
            source={require('@/assets/icons/back-arrow-blk.svg')}
            style={{ width: 24, height: 24 }}
            contentFit="contain"
          />
        </Pressable>

        {/* <Pressable
          className="p-4 bg-white dark:bg-black"
          onPress={toggleColorScheme}
        >
          <Text className="text-black dark:text-white">
            Click me to {colorScheme === 'dark' ? 'light' : 'dark'} mode!
          </Text>
        </Pressable> */}

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

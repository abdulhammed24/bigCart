import React, { forwardRef } from 'react';
import {
  Text,
  View,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';

interface PrimaryButtonProps {
  title: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  leftIcon?: ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
  iconSize?: number;
  iconColor?: string;
}

// 👇 Wrap with forwardRef to support ref from <Link asChild>
export const PrimaryBtn = forwardRef<View, PrimaryButtonProps>(
  (
    {
      title,
      onPress,
      style,
      leftIcon,
      rightIcon,
      iconSize = 24,
      iconColor = 'white',
    },
    ref,
  ) => {
    return (
      <Pressable onPress={onPress} ref={ref}>
        <LinearGradient
          colors={['#aedc81', '#6cc51d']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[{ borderRadius: 6 }, style]}
          className="flex w-full flex-row p-4 items-center h-[60px] shadow-md"
        >
          {/* Left Icon */}
          {leftIcon && (
            <Image
              source={leftIcon}
              style={{ width: iconSize, height: iconSize, marginRight: 10 }}
              contentFit="contain"
            />
          )}

          {/* Text */}
          <View className="flex-1 items-center">
            <Text className="text-white text-center text-[16px] font-poppinsMedium">
              {title}
            </Text>
          </View>

          {/* Right Icon */}
          {rightIcon && (
            <Image
              source={rightIcon}
              style={{ width: iconSize, height: iconSize, marginRight: 10 }}
              contentFit="contain"
            />
          )}
        </LinearGradient>
      </Pressable>
    );
  },
);

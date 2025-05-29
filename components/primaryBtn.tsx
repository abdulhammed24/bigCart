import React, { forwardRef, useState } from 'react';
import {
  Text,
  View,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
  Pressable,
  Animated,
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
  isLoading?: boolean;
  loadingText?: string;
  disabled?: boolean;
}

export const PrimaryBtn = forwardRef<View, PrimaryButtonProps>(
  (
    {
      title,
      onPress,
      style,
      leftIcon,
      rightIcon,
      iconSize = 24,
      isLoading = false,
      loadingText = 'Loading..',
      disabled = false,
    },
    ref,
  ) => {
    const [pressed, setPressed] = useState(false);
    const scaleAnim = React.useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
      if (!isLoading && !disabled) {
        setPressed(true);
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 150,
          useNativeDriver: true,
        }).start();
      }
    };

    const handlePressOut = () => {
      if (!isLoading && !disabled) {
        setPressed(false);
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }).start();
      }
    };

    return (
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        ref={ref}
        disabled={isLoading || disabled}
      >
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <LinearGradient
            colors={
              isLoading || disabled
                ? ['#cccccc', '#999999']
                : pressed
                ? ['#96c66e', '#5aad18']
                : ['#aedc81', '#6cc51d']
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[{ borderRadius: 6 }, style]}
            className="flex w-full flex-row p-4 items-center h-[50px] shadow-md"
          >
            {leftIcon && !isLoading && (
              <Image
                source={leftIcon}
                style={{ width: iconSize, height: iconSize, marginRight: 10 }}
                contentFit="contain"
              />
            )}
            <View className="flex-1 items-center">
              <Text className="text-white text-center text-[14px] font-poppinsMedium">
                {isLoading ? loadingText : title}
              </Text>
            </View>
            {rightIcon && !isLoading && (
              <Image
                source={rightIcon}
                style={{ width: iconSize, height: iconSize, marginRight: 10 }}
                contentFit="contain"
              />
            )}
          </LinearGradient>
        </Animated.View>
      </Pressable>
    );
  },
);

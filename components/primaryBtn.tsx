import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const PrimaryBtn: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={['#aedc81', '#6cc51d']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ borderRadius: 6 }}
        className="flex w-full flex-row p-4  items-center h-[60px]"
      >
        <View className="flex-1 items-center">
          <Text className="text-white text-center text-[16px] font-poppinsMedium">
            {title}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

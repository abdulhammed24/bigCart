import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { sharedStyles } from '../styles/sharedStyles';

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
    <TouchableOpacity onPress={onPress} style={style}>
      <LinearGradient
        colors={['#aedc81', '#6cc51d']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={sharedStyles.primaryBtn}
        className="flex w-full flex-row"
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

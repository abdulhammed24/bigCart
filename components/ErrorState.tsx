import React from 'react';
import { Text, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <View className="flex-1 justify-center items-center bg-offWhite">
      <Text className="text-red-500 font-poppinsMedium text-[16px]">
        {message}
      </Text>
      <TouchableRipple
        onPress={onRetry}
        className="mt-4 py-2 px-5 bg-green-600 rounded"
      >
        <Text className="text-white font-poppinsMedium">Retry</Text>
      </TouchableRipple>
    </View>
  );
};

import { View, Text } from 'react-native';

interface EmptyStateProps {
  message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  return (
    <View className="flex-1 justify-center items-center bg-offWhite">
      <Text className="text-gray-500 text-center font-poppinsRegular">
        {message}
      </Text>
    </View>
  );
};

import { View, ActivityIndicator, Text } from 'react-native';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message }) => {
  return (
    <View className="flex-1 justify-center items-center bg-offWhite">
      <ActivityIndicator size="large" color="#6CC51D" />
      {message && (
        <>
          <Text className="text-black font-poppinsMedium text-[16px] mt-2">
            {message}
          </Text>
        </>
      )}
    </View>
  );
};

import { View, Text, TextInput, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function ForgotPassword() {
  return (
    <View className="flex-1 bg-gray-100 p-6 justify-center">
      <Text className="text-3xl font-bold mb-8 text-center">
        Reset Password
      </Text>
      <Text className="text-gray-600 text-center mb-4">
        Enter your email to receive a reset link
      </Text>
      <TextInput
        className="bg-white p-4 rounded-lg border border-gray-300 mb-4"
        placeholder="Email"
      />
      <Pressable className="bg-blue-500 p-4 rounded-lg mb-4">
        <Text className="text-white text-center font-semibold">
          Send Reset Link
        </Text>
      </Pressable>
      <Link
        href="/"
        // href="/(screens)/(auth)/login"
        className="text-blue-500 text-center"
      >
        Back to Login
      </Link>
    </View>
  );
}

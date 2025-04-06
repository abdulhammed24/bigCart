import {
  View,
  Text,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { PrimaryBtn } from '@/components/PrimaryBtn';

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Define the onPress handler for the button
  const handleSignUp = () => {
    console.log('Sign up with:', { email, phoneNumber, password });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}
    >
      <View className="flex-1">
        {/* Image Background Section */}
        <View className="h-[350px]">
          <ImageBackground
            source={require('@/assets/images/onboarding/signup.png')}
            resizeMode="cover"
            className="flex-1 justify-start p-6"
          >
            <View className="flex flex-row items-center justify-between">
              <TouchableOpacity
                onPress={() => router.push('/(srceens)/(auth)/login')}
              >
                <Image
                  source={require('@/assets/icons/back-arrow.svg')}
                  style={{ width: 24, height: 24 }}
                  contentFit="contain"
                />
              </TouchableOpacity>
              <View className="flex-1 items-center">
                <Text className="text-[40px] font-poppinsBold text-white">
                  Welcome
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* Content Section */}
        <View className="flex-1 h-[400px] bg-offWhite rounded-t-[10px] -mt-8 p-6">
          <View className="mb-6">
            <Text className="text-[24px] font-poppinsBold text-black mb-2">
              Create account
            </Text>
            <Text className="text-gray text-[16px] font-poppinsMedium">
              Quickly create account
            </Text>
          </View>
          <View className="mb-6 flex flex-col gap-2">
            {/* Email Input */}
            <View className="bg-white relative rounded-md px-5 py-3 flex flex-row items-center h-[60px]">
              <Image
                source={require('@/assets/icons/mail.svg')}
                style={{ width: 24, height: 24 }}
                contentFit="contain"
                className="absolute left-5 top-1/2"
              />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email Address"
                className="flex-1 text-[16px] text-black font-poppinsMedium px-6 h-[60px]"
                placeholderTextColor="#868889"
              />
            </View>

            {/* Phone Number Input */}
            <View className="bg-white relative rounded-md px-5 py-3 flex flex-row items-center h-[60px]">
              <Image
                source={require('@/assets/icons/phone.svg')}
                style={{ width: 24, height: 24 }}
                contentFit="contain"
                className="absolute left-5 top-1/2"
              />
              <TextInput
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                className="flex-1 text-[16px] text-black font-poppinsMedium px-6 h-[60px]"
                placeholderTextColor="#868889"
              />
            </View>

            {/* Password Input */}
            <View className="bg-white relative rounded-md px-5 py-3 flex flex-row items-center h-[60px]">
              <Image
                source={require('@/assets/icons/lock.svg')}
                style={{ width: 24, height: 24 }}
                contentFit="contain"
                className="absolute left-5 top-1/2"
              />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry={!showPassword}
                className="flex-1 text-[16px] text-black font-poppinsMedium px-6 h-[60px]"
                placeholderTextColor="#868889"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2"
              >
                <Ionicons
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={24}
                  color="#868889"
                />
              </TouchableOpacity>
            </View>

            {/* Sign Up Button */}
            <PrimaryBtn title="Sign Up" onPress={handleSignUp} />
          </View>

          {/* Sign Up Link */}
          <View className="items-center">
            <Text className="text-gray text-[16px] font-poppinsRegular">
              Already have an account ?{' '}
              <Link
                href="/(srceens)/(auth)/login"
                className="text-black font-poppinsBold"
              >
                Login
              </Link>
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

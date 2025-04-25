import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Pressable,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { PrimaryBtn } from '@/components/PrimaryBtn';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomToggle from '@/components/CustomToggle';

// Define the type for the login form state
interface LoginFormState {
  email: string;
  password: string;
  rememberMe: boolean;
  showPassword: boolean;
}

export default function Login() {
  const router = useRouter();
  const [formState, setFormState] = useState<LoginFormState>({
    email: '',
    password: '',
    rememberMe: false,
    showPassword: false,
  });

  // Type-safe handler for input changes
  const handleInputChange = (
    field: keyof Omit<LoginFormState, 'rememberMe' | 'showPassword'>,
    value: string,
  ) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  // Handler for toggling rememberMe
  const handleRememberMeToggle = (value: boolean) => {
    setFormState((prev) => ({ ...prev, rememberMe: value }));
  };

  // Handler for toggling showPassword
  const toggleShowPassword = () => {
    setFormState((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };

  // Handle login
  const handleLogin = () => {
    console.log('Sign up with:', {
      email: formState.email,
      password: formState.password,
      rememberMe: formState.rememberMe,
    });
    router.push('/(tabs)/homepage');
  };

  return (
    <KeyboardAwareScrollView>
      <View className="flex-1">
        {/* Status Bar */}
        <StatusBar style="light" translucent backgroundColor="transparent" />

        {/* Image Background Section */}
        <View className="h-[350px]">
          <ImageBackground
            source={require('@/assets/images/onboarding/login.png')}
            resizeMode="cover"
            className="flex-1 justify-start p-6"
          >
            <View className="absolute inset-0 bg-black opacity-70" />
            <View className="flex flex-row mt-5 items-center justify-between">
              <Pressable
                onPress={() => router.push('/(screens)/(auth)/welcome')}
              >
                <Image
                  source={require('@/assets/icons/back-arrow.svg')}
                  style={{ width: 24, height: 24 }}
                  contentFit="contain"
                />
              </Pressable>
              <View className="flex-1 items-center">
                <Text className="text-[40px] font-poppinsBold text-white">
                  Welcome
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* Content Section */}
        <View className="flex-1 bg-offWhite rounded-t-[10px] -mt-8 p-6">
          <View className="mb-6">
            <Text className="text-[24px] font-poppinsBold text-black mb-2">
              Welcome back!
            </Text>
            <Text className="text-gray text-[16px] font-poppinsMedium">
              Sign in to your account
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
                value={formState.email}
                onChangeText={(text) => handleInputChange('email', text)}
                placeholder="Email Address"
                className="flex-1 text-[16px] text-black font-poppinsMedium px-6 h-[60px]"
                placeholderTextColor="#868889"
                keyboardType="email-address"
                autoCapitalize="none"
                accessibilityLabel="Email Address"
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
                value={formState.password}
                onChangeText={(text) => handleInputChange('password', text)}
                placeholder="Password"
                secureTextEntry={!formState.showPassword}
                className="flex-1 text-[16px] text-black font-poppinsMedium px-6 h-[60px]"
                placeholderTextColor="#868889"
                autoCapitalize="none"
                accessibilityLabel="Password"
              />
              <Pressable
                onPress={toggleShowPassword}
                className="absolute right-3 top-1/2"
                accessibilityLabel={
                  formState.showPassword ? 'Hide password' : 'Show password'
                }
              >
                <Ionicons
                  name={formState.showPassword ? 'eye' : 'eye-off'}
                  size={24}
                  color="#868889"
                />
              </Pressable>
            </View>

            {/* Remember Me & Forgot Password */}
            <View className="flex-row justify-between my-3">
              <View className="flex-row items-center">
                <CustomToggle
                  value={formState.rememberMe}
                  onValueChange={handleRememberMeToggle}
                />
                <Text className="text-gray text-[14px] font-poppinsMedium ml-2">
                  Remember me
                </Text>
              </View>
              <Pressable>
                <Text className="text-blue text-[14px] font-poppinsMedium">
                  Forgot password
                </Text>
              </Pressable>
            </View>

            {/* Login Button */}
            <PrimaryBtn title="Login" onPress={handleLogin} />
          </View>

          {/* Sign Up Link */}
          <View className="items-center">
            <Text className="text-gray text-[16px] font-poppinsRegular">
              Don’t have an account?{' '}
              <Link
                href="/(screens)/(auth)/register"
                className="text-black font-poppinsBold"
              >
                Sign up
              </Link>
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

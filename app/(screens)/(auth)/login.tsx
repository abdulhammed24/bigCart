import { View, Text, ImageBackground, Pressable } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { useState } from 'react';
import { InputField } from '@/components/InputField';
import { PasswordInput } from '@/components/PasswordInput';
import { PrimaryBtn } from '@/components/PrimaryBtn';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomToggle from '@/components/CustomToggle';

interface LoginFormState {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function Login() {
  const router = useRouter();
  const [formState, setFormState] = useState<LoginFormState>({
    email: '',
    password: '',
    rememberMe: false,
  });

  // Type-safe handler for input changes
  const handleInputChange = (field: keyof LoginFormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  // Handler for toggling rememberMe
  const handleRememberMeToggle = (value: boolean) => {
    setFormState((prev) => ({ ...prev, rememberMe: value }));
  };

  // Handle login
  const handleLogin = () => {
    console.log('Login with:', {
      email: formState.email,
      password: formState.password,
      rememberMe: formState.rememberMe,
    });
    router.push('/(tabs)/homepage');
  };

  return (
    <KeyboardAwareScrollView className="flex-1 bg-offWhite">
      <View className="flex-1">
        <StatusBar style="light" translucent />
        <View className="h-[400px]">
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
            <InputField
              iconSource={require('@/assets/icons/mail.svg')}
              placeholder="Email Address"
              value={formState.email}
              onChangeText={(text) => handleInputChange('email', text)}
              backgroundColor="bg-white"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <PasswordInput
              iconSource={require('@/assets/icons/lock.svg')}
              placeholder="Password"
              value={formState.password}
              onChangeText={(text) => handleInputChange('password', text)}
              backgroundColor="bg-white"
              autoCapitalize="none"
            />
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
              <Pressable
                onPress={() => router.push('/(screens)/(auth)/forgot-password')}
              >
                <Text className="text-blue text-[14px] font-poppinsMedium">
                  Forgot password
                </Text>
              </Pressable>
            </View>
            <PrimaryBtn title="Login" onPress={handleLogin} />
          </View>

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

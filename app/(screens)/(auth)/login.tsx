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

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  //
  const handleLogin = () => {
    console.log('Sign up with:', { email, password });
    router.push('/(tabs)/homepage');
  };

  return (
    <KeyboardAwareScrollView>
      <View className="flex-1">
        {/*  */}
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
              Welcome back !
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
                value={email}
                onChangeText={setEmail}
                placeholder="Email Address"
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
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2"
              >
                <Ionicons
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={24}
                  color="#868889"
                />
              </Pressable>
            </View>

            {/* Remember Me & Forgot Password */}
            <View className="flex-row justify-between my-3">
              <Pressable
                onPress={() => setRememberMe(!rememberMe)}
                className="flex-row items-center"
              >
                <Ionicons
                  name={rememberMe ? 'checkbox' : 'checkbox-outline'}
                  size={24}
                  color={rememberMe ? '#6CC51D' : '#868889'}
                />
                <Text className="text-gray text-[14px] font-poppinsMedium ml-2">
                  Remember me
                </Text>
              </Pressable>
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
              Don’t have an account ?{' '}
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

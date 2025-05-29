import {
  View,
  Text,
  ImageBackground,
  Pressable,
  StatusBar,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { useState } from 'react';
import { Formik } from 'formik';
import { InputField } from '@/components/InputField';
import { PasswordInput } from '@/components/PasswordInput';
import { PrimaryBtn } from '@/components/PrimaryBtn';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomToggle from '@/components/CustomToggle';
import Toast from 'react-native-toast-message';
import { useAuthStore } from '../../../store/authStore';
import { loginSchema } from '../../../lib/validationSchemas';
import { account } from '../../../lib/appwriteconfig';

export default function Login() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    await account.createEmailPasswordSession(email, password);
    const userData = await account.get();
    setUser({
      userId: userData.$id,
      email: userData.email,
    });
  };

  const handleLogin = async (values: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => {
    setIsLoading(true);
    try {
      await login(values.email, values.password);

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Logged in successfully!',
      });
      router.replace('/(tabs)/homepage');
    } catch (error: any) {
      console.log('Login Error:', error.code, error.message, error);
      let errorMessage = 'Failed to log in';
      if (error.code === 401) {
        errorMessage = 'Invalid email or password';
      } else if (error.code === 429) {
        errorMessage = 'Too many requests. Please try again in a few minutes.';
      } else if (error.code === 412) {
        errorMessage = 'A session is already active. Please log out first.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      className="flex-1 bg-offWhite"
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={true}
      extraScrollHeight={90}
    >
      <View className="flex-1">
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
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

          <Formik
            initialValues={{ email: '', password: '', rememberMe: false }}
            validationSchema={loginSchema}
            onSubmit={handleLogin}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <View className="mb-6 flex flex-col gap-2">
                <InputField
                  iconSource={require('@/assets/icons/mail.svg')}
                  placeholder="Email Address"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  backgroundColor="bg-white"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {touched.email && errors.email && (
                  <Text className="text-red-500 text-[12px] font-poppinsRegular">
                    {errors.email}
                  </Text>
                )}

                <PasswordInput
                  iconSource={require('@/assets/icons/lock.svg')}
                  placeholder="Password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  backgroundColor="bg-white"
                  autoCapitalize="none"
                />
                {touched.password && errors.password && (
                  <Text className="text-red-500 text-[12px] font-poppinsRegular">
                    {errors.password}
                  </Text>
                )}

                <View className="flex-row justify-between my-3">
                  <View className="flex-row items-center">
                    <CustomToggle
                      value={values.rememberMe}
                      onValueChange={(value) =>
                        handleChange('rememberMe')(value ? 'true' : 'false')
                      }
                    />
                    <Text className="text-gray-500 text-[14px] font-poppinsMedium ml-2">
                      Remember me
                    </Text>
                  </View>
                  <Pressable
                    onPress={() =>
                      router.push('/(screens)/(auth)/forgot-password')
                    }
                  >
                    <Text className="text-blue text-[14px] font-poppinsMedium">
                      Forgot password
                    </Text>
                  </Pressable>
                </View>

                <PrimaryBtn
                  title="Continue"
                  onPress={handleSubmit}
                  isLoading={isLoading}
                  loadingText="Logging in..."
                  disabled={isLoading}
                />
              </View>
            )}
          </Formik>

          <View className="items-center">
            <Text className="text-gray-700 text-[14px] font-poppinsRegular">
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

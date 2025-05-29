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
import Toast from 'react-native-toast-message';
import { account, databases, ID } from '../../../lib/appwriteconfig';
import { registerSchema } from '../../../lib/validationSchemas';
import { useAuthStore } from '@/store/authStore';

export default function Register() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignUp = async (values: {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
  }) => {
    setIsLoading(true);
    try {
      // Create user account with Appwrite
      const user = await account.create(
        ID.unique(), // Unique user ID
        values.email,
        values.password,
        values.name,
      );

      // Store additional user data in the database
      await databases.createDocument(
        process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
        user.$id,
        {
          userId: user.$id,
          name: values.name,
          phoneNumber: values.phoneNumber || null,
          email: values.email,
        },
      );

      // Update Zustand store
      useAuthStore.getState().setUser({
        userId: user.$id,
        email: user.email,
      });

      // Show success toast
      Toast.show({
        type: 'success',
        text1: 'Registration Successful',
        text2: 'Please log in to continue.',
      });

      // Redirect to login screen
      router.replace('/(screens)/(auth)/login');
    } catch (error: any) {
      // Show error toast
      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2: error.message || 'An error occurred during registration.',
      });
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-offWhite"
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-1">
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <View className="h-[350px]">
          <ImageBackground
            source={require('@/assets/images/onboarding/signup.png')}
            resizeMode="cover"
            className="flex-1 justify-start p-6"
          >
            <View className="absolute inset-0 bg-black opacity-70" />
            <View className="flex mt-5 flex-row items-center justify-between">
              <Pressable onPress={() => router.push('/(screens)/(auth)/login')}>
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

        <View className="flex-1 p-6 bg-offWhite rounded-t-[10px] -mt-8">
          <View className="mb-6">
            <Text className="text-[24px] font-poppinsBold text-black mb-2">
              Create account
            </Text>
            <Text className="text-gray text-[16px] font-poppinsMedium">
              Quickly create account
            </Text>
          </View>

          <Formik
            initialValues={{
              email: '',
              password: '',
              phoneNumber: '',
              name: '',
            }}
            validationSchema={registerSchema}
            onSubmit={handleSignUp}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <View className="mb-6 flex flex-col gap-2">
                <InputField
                  iconSource={require('@/assets/icons/my-address/user.svg')}
                  placeholder="Full Name"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  backgroundColor="bg-white"
                  autoCapitalize="words"
                />
                {touched.name && errors.name && (
                  <Text className="text-red-500 text-[12px] font-poppinsRegular">
                    {errors.name}
                  </Text>
                )}

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

                <InputField
                  iconSource={require('@/assets/icons/phone.svg')}
                  placeholder="Phone Number"
                  value={values.phoneNumber}
                  onChangeText={handleChange('phoneNumber')}
                  backgroundColor="bg-white"
                  keyboardType="phone-pad"
                />
                {touched.phoneNumber && errors.phoneNumber && (
                  <Text className="text-red-500 text-[12px] font-poppinsRegular">
                    {errors.phoneNumber}
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

                <PrimaryBtn
                  title="Sign Up"
                  onPress={handleSubmit}
                  isLoading={isLoading}
                  loadingText="Signing..."
                  disabled={isLoading}
                />
              </View>
            )}
          </Formik>

          <View className="items-center">
            <Text className="text-gray text-[16px] font-poppinsRegular">
              Already have an account?{' '}
              <Link
                href="/(screens)/(auth)/login"
                className="text-black font-poppinsBold"
              >
                Login
              </Link>
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

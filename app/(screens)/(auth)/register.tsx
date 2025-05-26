import { View, Text, ImageBackground, Pressable } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { useState } from 'react';
import { InputField } from '@/components/InputField';
import { PasswordInput } from '@/components/PasswordInput';
import { PrimaryBtn } from '@/components/PrimaryBtn';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignUp = () => {
    console.log('Sign up with:', { email, phoneNumber, password });
    router.push('/(tabs)/homepage');
  };

  return (
    <KeyboardAwareScrollView className="flex-1 bg-offWhite">
      <View className="flex-1">
        <StatusBar style="light" translucent />
        <View className="h-[400px]">
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
          <View className="mb-6 flex flex-col gap-2">
            <InputField
              iconSource={require('@/assets/icons/mail.svg')}
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              backgroundColor="bg-white"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <InputField
              iconSource={require('@/assets/icons/phone.svg')}
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              backgroundColor="bg-white"
              keyboardType="phone-pad"
            />
            <PasswordInput
              iconSource={require('@/assets/icons/lock.svg')}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              backgroundColor="bg-white"
              autoCapitalize="none"
            />
            <PrimaryBtn title="Sign Up" onPress={handleSignUp} />
          </View>
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

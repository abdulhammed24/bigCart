import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { PrimaryBtn } from '@/components/PrimaryBtn';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSignUp = () => {
    console.log('Sign up with:', { email, phoneNumber, password });
    router.push('/(tabs)/homepage');
  };

  return (
    <KeyboardAwareScrollView>
      <View className="flex-1">
        {/* StatusBar */}
        <StatusBar style="light" translucent backgroundColor="transparent" />

        {/* Image Background Section */}
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

        {/* Red Background Section */}
        <View className="flex-1  p-6 bg-offWhite rounded-t-[10px] -mt-8">
          <View className="mb-6">
            <Text className="text-[24px] font-poppinsBold text-black mb-2">
              Create account
            </Text>
            <Text className="text-gray text-[16px] font-poppinsMedium">
              Quickly create account
            </Text>
          </View>
          <View className="mb-6 flex flex-col gap-2">
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

            <PrimaryBtn title="Sign Up" onPress={handleSignUp} />
          </View>
          <View className="items-center">
            <Text className="text-gray text-[16px] font-poppinsRegular">
              Already have an account ?{' '}
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

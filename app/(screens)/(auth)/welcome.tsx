import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { sharedStyles } from '@/styles/sharedStyles';

export default function Welcome() {
  return (
    <View className="flex-1">
      {/* Image Background Section */}
      <View className="h-[60%]">
        <ImageBackground
          source={require('@/assets/images/onboarding/welcome.png')}
          resizeMode="cover"
          className="flex-1 justify-start p-6"
        >
          <View className="flex flex-row items-center justify-between">
            {/* <TouchableOpacity>
              <Image
                source={require('@/assets/icons/back-arrow.svg')}
                style={{ width: 24, height: 24 }}
                contentFit="contain"
              />
            </TouchableOpacity> */}
            <View className="flex-1 items-center">
              <Text className="text-[40px] font-poppinsBold text-white">
                Welcome
              </Text>
            </View>
            {/* <View style={{ width: 24 }} /> */}
          </View>
        </ImageBackground>
      </View>

      {/* Content Section */}
      <View className="flex-1 bg-offWhite rounded-t-[10px] -mt-8 p-6">
        <View className="mb-6">
          <Text className="text-[24px] font-poppinsBold text-black mb-2">
            Welcome
          </Text>
          <Text className="text-gray text-[16px] font-poppinsMedium">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy
          </Text>
        </View>

        {/* Buttons */}
        <View className="mb-6 flex flex-col gap-2">
          <TouchableOpacity className="flex w-full bg-white flex-row p-4 rounded-md items-center h-[60px]">
            <Image
              source={require('@/assets/icons/google.svg')}
              style={{ width: 24, height: 24, marginRight: 10 }}
              contentFit="contain"
            />
            <View className="flex-1 items-center">
              <Text className="text-black text-[16px] font-poppinsMedium">
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <LinearGradient
              colors={['#aedc81', '#6cc51d']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ borderRadius: 6 }}
              className="flex w-full flex-row p-4  items-center h-[60px]"
            >
              <Image
                source={require('@/assets/icons/user.svg')}
                style={{ width: 24, height: 24, marginRight: 10 }}
                contentFit="contain"
              />

              <View className="flex-1 items-center">
                <Text className="text-white text-center text-[16px] font-poppinsMedium">
                  Create an account
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Login Link */}
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
  );
}

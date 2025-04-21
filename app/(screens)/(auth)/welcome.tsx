import { View, Text, ImageBackground, Pressable } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { PrimaryBtn } from '@/components/PrimaryBtn';

export default function Welcome() {
  const router = useRouter();
  return (
    <View className="flex-1">
      {/* StatusBar  */}
      <StatusBar style="light" translucent backgroundColor="transparent" />

      {/* Image Background Section */}
      <View className="h-[60%]">
        <ImageBackground
          source={require('@/assets/images/onboarding/welcome.png')}
          resizeMode="cover"
          className="flex-1 justify-start p-6"
        >
          <View className="absolute inset-0 bg-black opacity-70" />
          <View className="flex flex-row mt-5 items-center justify-between">
            {/* <Pressable>
              <Image
                source={require('@/assets/icons/back-arrow.svg')}
                style={{ width: 24, height: 24 }}
                contentFit="contain"
              />
            </Pressable> */}
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
            Welcome
          </Text>
          <Text className="text-gray text-[16px] font-poppinsMedium">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy
          </Text>
        </View>

        <View className="mb-6 flex flex-col gap-2">
          <Pressable
            // onPress={() => router.push('/(screens)/onboarding')}
            className="flex w-full bg-white flex-row p-4 rounded-md items-center h-[60px]"
          >
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
          </Pressable>

          <PrimaryBtn
            title="Create an account"
            onPress={() => router.push('/(screens)/(auth)/register')}
            leftIcon={require('@/assets/icons/user.svg')}
          />
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
  );
}

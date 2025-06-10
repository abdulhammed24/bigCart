import { Header } from '@/components/Header';
import { PrimaryBtn } from '@/components/PrimaryBtn';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { View, Text, Pressable, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrderSuccess() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      {/* Header */}
      <Header title="Order Success" showBackButton={false} />

      <View className="flex-1 px-6 justify-between bg-offWhite py-6">
        <View className="flex flex-1 flex-col gap-5 items-center justify-center">
          <Image
            source={require('@/assets/images/cart.png')}
            contentFit="contain"
            style={{ width: 100, height: 100 }}
          />
          <Text className="text-center font-poppinsBold text-[24px]">
            Your order was successful !
          </Text>
          <Text className="text-center font-poppinsMedium text-[18px] text-gray">
            You will get a response within a few minutes.
          </Text>
        </View>
        <View>
          <PrimaryBtn
            title="Track order"
            onPress={() => router.push('/(screens)/(main)/my-orders')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

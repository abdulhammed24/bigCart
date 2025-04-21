import { PrimaryBtn } from '@/components/PrimaryBtn';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrderSuccess() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View className="p-6 bg-white">
        <View className="flex flex-row items-center justify-between">
          <Pressable onPress={() => router.back()}>
            <Image
              source={require('@/assets/icons/back-arrow-blk.svg')}
              style={{ width: 24, height: 24 }}
              contentFit="contain"
            />
          </Pressable>
          <Text className="text-center font-poppinsBold text-[24px]">
            Order Success
          </Text>
          <View style={{ width: 24 }} />
        </View>
      </View>

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
            title="Start Shopping"
            onPress={() => console.log('Start Shopping')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

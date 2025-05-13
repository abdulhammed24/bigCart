import { Header } from '@/components/Header';
import { PrimaryBtn } from '@/components/PrimaryBtn';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Cart() {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      {/* Header */}
      <Header title="Shopping Cart" />

      <View className="flex-1 px-6 justify-between bg-offWhite py-6">
        <View className="flex flex-1 flex-col gap-5 items-center justify-center">
          <Image
            source={require('@/assets/images/cart.png')}
            contentFit="contain"
            style={{ width: 100, height: 100 }}
          />
          <Text className="text-center font-poppinsBold text-[24px]">
            Your cart is empty !
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

      <ScrollView
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
        className="flex-1 px-6 bg-offWhite py-6"
      >
        <View className="flex flex-col gap-3">
          <View className="flex flex-row gap-5 p-3 justify-between items-center bg-white">
            <View className="flex flex-row gap-5 items-center flex-[0.7]">
              <View>
                <Image
                  source={require('@/assets/images/products/broccoli.png')}
                  style={{ width: 50, height: 50 }}
                  contentFit="contain"
                />
              </View>
              <View>
                <Text className="text-primary font-poppinsMedium text-[12px]">
                  $2.22 x 4
                </Text>
                <Text className=" text-black font-poppinsBold text-[16px]">
                  Fresh Broccoli
                </Text>
                <Text className="text-black font-poppinsRegular text-[12px]">
                  1.50 lbs
                </Text>
              </View>
            </View>
            <View className="flex-[0.3] flex items-end">
              <View className="flex-col items-center justify-between  overflow-hidden">
                <Pressable
                  onPress={incrementQuantity}
                  className="flex items-center justify-center"
                >
                  <Ionicons name="add" size={24} color="#6CC51D" />
                </Pressable>
                <Text className="text-black text-[20px] w-[50px] text-center font-poppinsBold h-11 bg-red-700">
                  {quantity}
                </Text>

                <Pressable
                  onPress={decrementQuantity}
                  className="flex items-center justify-center"
                >
                  <Ionicons name="remove" size={24} color="#6CC51D" />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="flex-1 px-6 justify-between bg-white py-6">
        <View className="flex flex-col gap-6">
          <View className="flex flex-col gap-3">
            <View className="flex flex-row justify-between items-center">
              <Text className=" text-gray font-poppinsRegular text-[12px]">
                Total
              </Text>
              <Text className=" text-gray font-poppinsRegular text-[12px]">
                $58.2
              </Text>
            </View>

            <View className="flex flex-row justify-between items-center">
              <Text className=" text-gray font-poppinsRegular text-[12px]">
                Total
              </Text>
              <Text className=" text-gray font-poppinsRegular text-[12px]">
                $58.2
              </Text>
            </View>
          </View>
          <View className="h-[1px] w-full bg-[#EBEBEB]" />

          <View className="flex flex-row justify-between items-center">
            <Text className=" text-black font-poppinsBold text-[16px]">
              Total
            </Text>
            <Text className=" text-black font-poppinsBold text-[16px]">
              $58.2
            </Text>
          </View>
          <View>
            <PrimaryBtn
              title="Checkout"
              onPress={() => router.push('/(screens)/shipping-method')}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

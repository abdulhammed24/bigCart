import React from 'react';
import { View, Text } from 'react-native';
import { PrimaryBtn } from '@/components/PrimaryBtn';
import { useRouter } from 'expo-router';

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  total: number;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  shipping,
  total,
}) => {
  const router = useRouter();

  return (
    <View className="px-6 bg-white py-6">
      <View className="flex flex-col gap-6">
        <View className="flex flex-col gap-3">
          <View className="flex flex-row justify-between items-center">
            <Text className="text-gray font-poppinsRegular text-[12px]">
              Subtotal
            </Text>
            <Text className="text-gray font-poppinsRegular text-[12px]">
              ${subtotal.toFixed(2)}
            </Text>
          </View>
          <View className="flex flex-row justify-between items-center">
            <Text className="text-gray font-poppinsRegular text-[12px]">
              Shipping Charges
            </Text>
            <Text className="text-gray font-poppinsRegular text-[12px]">
              ${shipping.toFixed(2)}
            </Text>
          </View>
        </View>
        <View className="h-[1px] w-full bg-[#EBEBEB]" />
        <View className="flex flex-row justify-between items-center">
          <Text className="text-black font-poppinsBold text-[16px]">Total</Text>
          <Text className="text-black font-poppinsBold text-[16px]">
            ${total.toFixed(2)}
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
  );
};

import { View, Text } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

interface PaymentOption {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const paymentOptions: PaymentOption[] = [
  { id: '1', name: 'PayPal', icon: 'logo-paypal' },
  { id: '2', name: 'Credit Card', icon: 'card' },
  { id: '3', name: 'Apple Pay', icon: 'logo-apple' },
];

export const PaymentOptions = ({}) => {
  return (
    <View className="px-6 bg-offWhite py-6">
      <View className="flex flex-row gap-5 items-center justify-center">
        {paymentOptions.map((option) => (
          <View
            key={option.id}
            className="h-28 w-28 rounded shadow-gray bg-white justify-center items-center flex"
          >
            <View className="flex-col gap-5 items-center">
              <Ionicons name={option.icon} size={32} color="#868889" />
              <Text className="font-poppinsRegular text-[10px] text-gray">
                {option.name}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

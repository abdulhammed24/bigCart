import { View, Text, ScrollView, Pressable, StatusBar } from 'react-native';
import React from 'react';
import { Header } from '@/components/Header';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Transaction {
  id: string;
  paymentMethod: 'mastercard' | 'paypal' | 'visa';
  cardName: string;
  date: string;
  amount: number;
}

const transactions: Transaction[] = [
  {
    id: '1',
    paymentMethod: 'mastercard',
    cardName: 'Master Card',
    date: 'Dec 12 2021 at 10:00 pm',
    amount: 89,
  },
  {
    id: '2',
    paymentMethod: 'paypal',
    cardName: 'PayPal',
    date: 'Jan 15 2022 at 3:30 pm',
    amount: 45,
  },
  {
    id: '3',
    paymentMethod: 'visa',
    cardName: 'Visa',
    date: 'Feb 20 2022 at 8:45 am',
    amount: 120,
  },
  {
    id: '4',
    paymentMethod: 'mastercard',
    cardName: 'Master Card',
    date: 'Mar 10 2022 at 12:15 pm',
    amount: 65,
  },
  {
    id: '5',
    paymentMethod: 'paypal',
    cardName: 'PayPal',
    date: 'Apr 5 2022 at 6:00 pm',
    amount: 2000,
  },
];

const getCardIcon = (paymentMethod: Transaction['paymentMethod']) => {
  switch (paymentMethod) {
    case 'mastercard':
      return require('@/assets/icons/mastercard.svg');
    case 'paypal':
      return require('@/assets/icons/paypal.svg');
    case 'visa':
      return require('@/assets/icons/visa.svg');
    default:
      return require('@/assets/icons/mastercard.svg');
  }
};

export default function Transactions() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <StatusBar backgroundColor="#fff" barStyle="default" />
      <Header title="Transactions" />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
        className="flex-1 px-6 bg-offWhite py-6"
      >
        <View className="flex flex-col gap-3">
          {transactions.map((transaction) => (
            <View
              key={transaction.id}
              className="flex flex-row gap-5 p-6 justify-between items-center bg-white"
            >
              <View className="flex flex-row gap-5 items-center flex-[0.7]">
                <View className="w-14 h-14 bg-offWhite rounded-full flex items-center justify-center">
                  <Image
                    source={getCardIcon(transaction.paymentMethod)}
                    style={{ width: 32, height: 18 }}
                    contentFit="contain"
                  />
                </View>
                <View>
                  <Text className="text-black font-poppinsBold text-[16px]">
                    {transaction.cardName}
                  </Text>
                  <Text className="text-black font-poppinsRegular text-[12px]">
                    {transaction.date}
                  </Text>
                </View>
              </View>
              <View className="flex-[0.3] flex items-end">
                <Text className="text-primary font-poppinsBold text-[16px]">
                  ${transaction.amount.toLocaleString('en')}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

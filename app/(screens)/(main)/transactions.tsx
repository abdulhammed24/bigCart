import { View, Text, ScrollView, StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import { Header } from '@/components/Header';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useOrderStore } from '@/store/useOrderStore';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { EmptyState } from '@/components/EmptyState';

interface Transaction {
  id: string;
  paymentMethod: 'mastercard' | 'paypal' | 'visa';
  cardName: string;
  date: string;
  amount: number;
}

//
const getCardNameFromPaymentMethod = (
  paymentMethod: 'mastercard' | 'paypal' | 'visa',
) => {
  switch (paymentMethod) {
    case 'mastercard':
      return 'Master Card';
    case 'paypal':
      return 'PayPal';
    case 'visa':
      return 'Visa';
    default:
      return 'Master Card';
  }
};

export default function Transactions() {
  const router = useRouter();
  const { orders, fetchOrders, loading, error } = useOrderStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const transactions: Transaction[] = orders.map((order) => ({
    id: order.id,
    paymentMethod: order.paymentMethod,
    cardName: getCardNameFromPaymentMethod(order.paymentMethod),
    date: order.placedOn,
    amount: order.amount || 0,
  }));

  const getCardIcon = (paymentMethod: Transaction['paymentMethod']) => {
    switch (paymentMethod) {
      case 'mastercard':
        return require('@/assets/icons/mastercard.svg');
      case 'paypal':
        return require('@/assets/icons/paypal.svg');
      case 'visa':
        return require('@/assets/icons/visa.svg');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Header title="Transactions" onBackPress={() => router.back()} />

      {loading ? (
        <LoadingState message="Loading transactions..." />
      ) : error ? (
        <ErrorState message={error} onRetry={fetchOrders} />
      ) : transactions.length === 0 ? (
        <EmptyState message="No transactions found. Start shopping to see your history!" />
      ) : (
        <>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 50 }}
            showsVerticalScrollIndicator={false}
            className="flex-1 px-6 bg-offWhite py-6"
          >
            <View className="flex flex-col gap-3">
              {transactions.map((transaction) => (
                <View
                  key={transaction.id}
                  className="flex flex-row gap-5 p-6 justify-between items-center bg-white rounded-lg"
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
        </>
      )}
    </SafeAreaView>
  );
}

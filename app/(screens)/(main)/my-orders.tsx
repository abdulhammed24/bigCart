import React, { useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';
import OrderCard from '@/components/OrderCard';
import { StatusBar } from 'react-native';
import { useOrderStore } from '@/store/useOrderStore';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';

export default function MyOrders() {
  const { orders, fetchOrders, loading, error } = useOrderStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Header title="My Orders" />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
        className="flex-1 px-6 bg-offWhite py-6"
      >
        {error && <ErrorState message={error} onRetry={fetchOrders} />}
        {loading ? (
          <LoadingState message="Loading orders..." />
        ) : orders.length === 0 ? (
          <Text className="text-center text-gray-500 text-[14px] font-poppinsRegular">
            No orders found.
          </Text>
        ) : (
          <View className="flex flex-col gap-5">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

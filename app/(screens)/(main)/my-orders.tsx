import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';
import OrderCard from '@/components/OrderCard';
import { StatusBar } from 'react-native';

// Define the orders array (as created above)
const orders = [
  {
    orderNumber: '#90897',
    placedOn: 'October 19, 2021',
    items: 10,
    amount: 16.9,
    tracking: [
      { label: 'Order placed', date: 'Oct 19 2021', done: true },
      { label: 'Order confirmed', date: 'Oct 20 2021', done: true },
      { label: 'Order shipped', date: 'Oct 20 2021', done: true },
      { label: 'Out for delivery', date: 'pending', done: false },
      { label: 'Order delivered', date: 'pending', done: false },
    ],
  },
  {
    orderNumber: '#91234',
    placedOn: 'January 15, 2022',
    items: 5,
    amount: 45.5,
    tracking: [
      { label: 'Order placed', date: 'Jan 15 2022', done: true },
      { label: 'Order confirmed', date: 'Jan 16 2022', done: true },
      { label: 'Order shipped', date: 'Jan 17 2022', done: true },
      { label: 'Out for delivery', date: 'Jan 18 2022', done: true },
      { label: 'Order delivered', date: 'Jan 19 2022', done: true },
    ],
  },
  {
    orderNumber: '#92345',
    placedOn: 'March 10, 2023',
    items: 3,
    amount: 29.99,
    tracking: [
      { label: 'Order placed', date: 'Mar 10 2023', done: true },
      { label: 'Order confirmed', date: 'Mar 11 2023', done: true },
      { label: 'Order shipped', date: 'pending', done: false },
      { label: 'Out for delivery', date: 'pending', done: false },
      { label: 'Order delivered', date: 'pending', done: false },
    ],
  },
  {
    orderNumber: '#93456',
    placedOn: 'August 25, 2024',
    items: 7,
    amount: 89.0,
    tracking: [
      { label: 'Order placed', date: 'Aug 25 2024', done: true },
      { label: 'Order confirmed', date: 'Aug 26 2024', done: true },
      { label: 'Order shipped', date: 'Aug 27 2024', done: true },
      { label: 'Out for delivery', date: 'Aug 28 2024', done: true },
      { label: 'Order delivered', date: 'pending', done: false },
    ],
  },
  {
    orderNumber: '#94567',
    placedOn: 'April 5, 2025',
    items: 2,
    amount: 15.75,
    tracking: [
      { label: 'Order placed', date: 'Apr 5 2025', done: true },
      { label: 'Order confirmed', date: 'Apr 6 2025', done: true },
      { label: 'Order shipped', date: 'pending', done: false },
      { label: 'Out for delivery', date: 'pending', done: false },
      { label: 'Order delivered', date: 'pending', done: false },
    ],
  },
];

export default function MyOrders() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      {/* Header */}
      <Header title="My Orders" />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
        className="flex-1 px-6 bg-offWhite py-6"
      >
        <View className="flex flex-col gap-5">
          {/* Render Order Cards */}
          {orders.map((order, index) => (
            <OrderCard key={index} order={order} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

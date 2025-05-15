// screens/Cart.tsx
import { Header } from '@/components/Header';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SwipeListView } from 'react-native-swipe-list-view';
import { CartItem, HiddenCartItem } from '@/components/Cart/CartItem';
import { CartSummary } from '@/components/Cart/CartSummary';
import { EmptyCart } from '@/components/Cart/EmptyCart';

// Define the CartItem interface
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  weight: string;
  image: any;
}

// Dummy data array
const cartItems: CartItem[] = [
  {
    id: '1',
    name: 'Fresh Broccoli',
    price: 2.22,
    quantity: 4,
    weight: '1.50 lbs',
    image: require('@/assets/images/products/broccoli.png'),
  },
  {
    id: '2',
    name: 'Organic Apples',
    price: 3.15,
    quantity: 2,
    weight: '2.00 lbs',
    image: require('@/assets/images/products/broccoli.png'),
  },
  {
    id: '3',
    name: 'Carrots',
    price: 1.99,
    quantity: 3,
    weight: '1.00 lbs',
    image: require('@/assets/images/products/broccoli.png'),
  },
  {
    id: '4',
    name: 'Carrots',
    price: 1.99,
    quantity: 3,
    weight: '1.00 lbs',
    image: require('@/assets/images/products/broccoli.png'),
  },
];

export default function Cart() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>(cartItems);

  const incrementQuantity = (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decrementQuantity = (id: string) => {
    setItems((prevItems) => {
      const item = prevItems.find((i) => i.id === id);
      if (item && item.quantity === 1) {
        return prevItems.filter((i) => i.id !== id);
      }
      return prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
      );
    });
  };

  const deleteItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Calculate totals
  const subtotal: number = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping: number = 5.0;
  const total: number = subtotal + shipping;

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <Header title="Shopping Cart" />
      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <SwipeListView
            data={items}
            renderItem={({ item }) => (
              <CartItem
                item={item}
                onIncrement={incrementQuantity}
                onDecrement={decrementQuantity}
                onDelete={deleteItem}
              />
            )}
            renderHiddenItem={({ item }) => (
              <HiddenCartItem item={item} onDelete={deleteItem} />
            )}
            rightOpenValue={-75}
            disableRightSwipe
            friction={9}
            tension={40}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              paddingBottom: 50,
              paddingHorizontal: 24,
              paddingTop: 24,
            }}
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: '#F5F5F5' }}
            ItemSeparatorComponent={() => <View className="h-3" />}
          />
          <CartSummary subtotal={subtotal} shipping={shipping} total={total} />
        </>
      )}
    </SafeAreaView>
  );
}

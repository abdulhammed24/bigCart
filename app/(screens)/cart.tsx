import { Header } from '@/components/Header';
import { PrimaryBtn } from '@/components/PrimaryBtn';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  // Calculate totals
  const subtotal: number = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping: number = 5.0; // Example flat shipping rate
  const total: number = subtotal + shipping;

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      {/* Header */}
      <Header title="Shopping Cart" />

      {items.length === 0 ? (
        <View className="flex-1 px-6 justify-between bg-offWhite py-6">
          <View className="flex flex-1 flex-col gap-5 items-center justify-center">
            <Image
              source={require('@/assets/images/cart.png')}
              contentFit="contain"
              style={{ width: 100, height: 100 }}
            />
            <Text className="text-center font-poppinsBold text-[24px]">
              Your cart is empty!
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
      ) : (
        <>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 50 }}
            showsVerticalScrollIndicator={false}
            className="flex-1 px-6 bg-offWhite py-6"
          >
            <View className="flex flex-col gap-3">
              {items.map((item) => (
                <View
                  key={item.id}
                  className="flex flex-row gap-5 p-3 justify-between items-center bg-white"
                >
                  <View className="flex flex-row gap-5 items-center flex-[0.7]">
                    <View>
                      <Image
                        source={item.image}
                        style={{ width: 50, height: 50 }}
                        contentFit="contain"
                      />
                    </View>
                    <View>
                      <Text className="text-primary font-poppinsMedium text-[12px]">
                        ${item.price.toFixed(2)} x {item.quantity}
                      </Text>
                      <Text className="text-black font-poppinsBold text-[16px]">
                        {item.name}
                      </Text>
                      <Text className="text-gray font-poppinsRegular text-[12px]">
                        {item.weight}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-[0.3] flex items-end">
                    <View className="flex-col items-center justify-between overflow-hidden">
                      <Pressable
                        onPress={() => incrementQuantity(item.id)}
                        className="flex items-center justify-center"
                      >
                        <Ionicons name="add" size={24} color="#6CC51D" />
                      </Pressable>
                      <Text
                        className="text-gray text-[20px]  h-[40px] rounded-full font-poppinsBold text-center"
                        style={{ lineHeight: 60 }}
                      >
                        {item.quantity}
                      </Text>
                      <Pressable
                        onPress={() => decrementQuantity(item.id)}
                        className="flex items-center justify-center"
                      >
                        <Ionicons name="remove" size={24} color="#6CC51D" />
                      </Pressable>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>

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
                <Text className="text-black font-poppinsBold text-[16px]">
                  Total
                </Text>
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
        </>
      )}
    </SafeAreaView>
  );
}

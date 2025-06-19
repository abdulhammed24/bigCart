import { View, Text, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryBtn } from '@/components/PrimaryBtn';
import { Ionicons } from '@expo/vector-icons';
import { ProgressSteps } from '@/components/ProgressSteps';
import { useRouter } from 'expo-router';
import { useCartStore } from '@/store/cartStore';
import { useProductStore } from '@/store/featuredProductsStore';
import { TouchableRipple } from 'react-native-paper';

interface ShippingOptionProps {
  title: string;
  description: string;
  price: string;
  priceValue: number;
  isSelected: boolean;
  onSelect: () => void;
}

const ShippingOption: React.FC<ShippingOptionProps> = ({
  title,
  description,
  price,
  isSelected,
  onSelect,
}) => (
  <TouchableRipple
    onPress={onSelect}
    rippleColor="rgba(0, 0, 0, 0.1)"
    borderless={true}
  >
    <View className="flex flex-row gap-5 p-6 justify-between items-center bg-white">
      <View className="flex gap-2 flex-[0.9]">
        <View className="flex flex-row items-center gap-2">
          <Text className="text-black font-poppinsBold text-[16px]">
            {title}
          </Text>
          {isSelected && (
            <Ionicons name="checkmark-circle" size={20} color="#6CC51D" />
          )}
        </View>
        <Text className="text-gray font-poppinsRegular text-[12px]">
          {description}
        </Text>
      </View>
      <View className="flex-[0.1]">
        <Text className="text-primary font-poppinsBold text-[16px]">
          {price}
        </Text>
      </View>
    </View>
  </TouchableRipple>
);

// Main ShippingMethod Component
export default function ShippingMethod() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] =
    useState<string>('Standard Delivery');
  const {
    cartItems,
    loading: cartLoading,
    error: cartError,
    fetchCart,
  } = useCartStore();
  const {
    products,
    loading: productsLoading,
    error: productsError,
    fetchProducts,
  } = useProductStore();
  const [dataFetched, setDataFetched] = useState(false);

  // Static shipping options
  const shippingOptions = [
    {
      title: 'Standard Delivery',
      description:
        'Order will be delivered between 3 - 4 business days straight to your doorstep.',
      price: '$3',
      priceValue: 3,
    },
    {
      title: 'Next Day Delivery (Premium)',
      description:
        'Order will be delivered the next business day to your doorstep.',
      price: '$5',
      priceValue: 5,
    },
    {
      title: 'Next Day Delivery (Standard)',
      description:
        'Order will be delivered the next business day to your doorstep.',
      price: '$3',
      priceValue: 3,
    },
  ];

  // Fetch cart and products on mount
  useEffect(() => {
    if (
      !dataFetched &&
      !cartLoading &&
      !cartError &&
      !productsLoading &&
      !productsError
    ) {
      Promise.all([fetchCart(), fetchProducts()]).then(() =>
        setDataFetched(true),
      );
    }
  }, [
    dataFetched,
    cartLoading,
    cartError,
    productsLoading,
    productsError,
    fetchCart,
    fetchProducts,
  ]);

  // Calculate subtotal
  const displayItems = cartItems
    .map((cartItem) => {
      const product = products.find((p) => p.$id === cartItem.productId);
      if (!product) return null;
      return {
        productId: cartItem.productId,
        price: product.price,
        quantity: cartItem.quantity,
      };
    })
    .filter(
      (item): item is { productId: string; price: number; quantity: number } =>
        item !== null,
    );

  const subtotal: number = displayItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // Get selected shipping price
  const selectedShipping = shippingOptions.find(
    (option) => option.title === selectedOption,
  );
  const shipping: number = selectedShipping ? selectedShipping.priceValue : 3;
  // Calculate total
  const total: number = subtotal + shipping;

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Header */}
      <Header title="Shipping Method" />

      {/* Progress Steps */}
      <ProgressSteps currentStep="Delivery" />

      {/* Shipping Options */}
      <View className="flex-1 px-6 bg-offWhite py-6">
        <View className="flex flex-col gap-5">
          {shippingOptions.map((option) => (
            <ShippingOption
              key={option.title}
              title={option.title}
              description={option.description}
              price={option.price}
              priceValue={option.priceValue}
              isSelected={selectedOption === option.title}
              onSelect={() => setSelectedOption(option.title)}
            />
          ))}
        </View>
      </View>

      {/* Cart Summary */}
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
              onPress={() =>
                router.push({
                  pathname: '/(screens)/(main)/shipping-address',
                  params: {
                    subtotal: subtotal.toString(),
                    shipping: shipping.toString(),
                    total: total.toString(),
                  },
                })
              }
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

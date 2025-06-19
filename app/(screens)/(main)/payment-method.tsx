import React, { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';
import { ProgressSteps } from '@/components/ProgressSteps';
import PaymentForm from '@/components/PaymentMethod/PaymentForm';
import { PaymentOptions } from '@/components/PaymentMethod/PaymentOption';
import { StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';
import { useCartStore } from '@/store/cartStore';
import { useProductStore } from '@/store/featuredProductsStore';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { useOrderStore } from '@/store/useOrderStore';

export default function PaymentMethod() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const { addOrder } = useOrderStore();
  const { cartItems, clearCart } = useCartStore();
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    if (!products.length) {
      fetchProducts();
    }
  }, [fetchProducts, products.length]);

  const handleProceed = async (values: any) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const now = toZonedTime(new Date(), 'America/New_York');
      const orderNumber = `ORD-${Date.now()}`;
      const placedOn = format(now, "MMMM d, yyyy 'at' hh:mm a z");
      const itemsCount =
        cartItems.reduce((sum, item) => sum + item.quantity, 0) || 0;

      // Use total from params as amount, with fallback to calculated value
      const totalFromParams = Number(params.total) || 0;
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
          (
            item,
          ): item is { productId: string; price: number; quantity: number } =>
            item !== null,
        );
      const subtotalFromCart =
        displayItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        ) || 0;
      const subtotalFromParams = Number(params.subtotal) || 0;
      const shippingFromParams = Number(params.shipping) || 0;
      const amount =
        totalFromParams ||
        subtotalFromParams + shippingFromParams ||
        subtotalFromCart + shippingFromParams ||
        0;

      const currentDate = format(now, 'MMM d yyyy');
      const trackingSteps = [
        { label: 'Order placed', date: currentDate, done: true },
        { label: 'Order confirmed', date: '', done: false },
        { label: 'Order shipped', date: 'pending', done: false },
        { label: 'Out for delivery', date: 'pending', done: false },
        { label: 'Order delivered', date: 'pending', done: false },
      ];

      await addOrder({
        orderNumber,
        placedOn,
        items: itemsCount,
        amount,
        tracking: trackingSteps,
      });

      await clearCart();

      Toast.show({
        type: 'success',
        text1: 'Payment Processed',
        text2: 'Your payment method has been successfully added.',
      });

      router.replace({
        pathname: '/(screens)/(main)/order-success',
        params: {
          paymentMethod: 'Credit Card',
          paymentDetails: JSON.stringify(values),
          address: params.newAddress,
        },
      });
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to process payment. Please try again.',
      });
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Header title="Payment Method" />
      <ProgressSteps currentStep="Payment" />
      <PaymentOptions />
      <PaymentForm handleProceed={handleProceed} isLoading={isLoading} />
    </SafeAreaView>
  );
}

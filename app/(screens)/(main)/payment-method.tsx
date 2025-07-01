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
import { useCardStore } from '@/store/cardStore';

export default function PaymentMethod() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const { addOrder } = useOrderStore();
  const { cartItems, clearCart } = useCartStore();
  const { products, fetchProducts } = useProductStore();
  const { cards, fetchCards } = useCardStore();

  useEffect(() => {
    if (!products.length) fetchProducts();
    if (!cards.length) fetchCards();
  }, [fetchProducts, products.length, fetchCards, cards.length]);

  const handleProceed = async (values: any) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const now = toZonedTime(new Date(), 'Africa/Lagos');
      const orderNumber = `ORD-${Date.now()}`;
      const placedOn = format(now, "MMMM d, yyyy 'at' hh:mm a z");
      const itemsCount =
        cartItems.reduce((sum, item) => sum + item.quantity, 0) || 0;

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
      if (amount === 0) {
        console.warn(
          'Amount is 0, falling back to cart subtotal or defaulting:',
          {
            totalFromParams,
            subtotalFromParams,
            shippingFromParams,
            subtotalFromCart,
          },
        );
      }

      const cardNumber = values.cardNumber;

      const paymentMethod = getCardBrandFromCardNumber(cardNumber);
      const cardName = values.name;

      await addOrder({
        orderNumber,
        placedOn,
        items: itemsCount,
        amount,
        paymentMethod,
        cardName,
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
          paymentMethod,
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

  const getCardBrandFromCardNumber = (
    cardNumber: string,
  ): 'mastercard' | 'paypal' | 'visa' => {
    const cleanedNumber = cardNumber.replace(/\s/g, '');
    // console.log('Checking card number:', cleanedNumber);
    if (cleanedNumber.startsWith('4')) return 'visa';
    if (cleanedNumber.startsWith('5')) return 'mastercard';
    if (cleanedNumber.startsWith('3')) return 'paypal';
    console.warn('Unknown card type, defaulting to mastercard:', cleanedNumber);
    return 'mastercard';
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

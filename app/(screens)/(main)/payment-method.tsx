import { Text } from 'react-native';
import React, { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';
import { ProgressSteps } from '@/components/ProgressSteps';
import PaymentForm from '@/components/PaymentMethod/PaymentForm';
import { PaymentOptions } from '@/components/PaymentMethod/PaymentOption';
import { StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';

export default function PaymentMethod() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const handleProceed = async (values: any) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
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

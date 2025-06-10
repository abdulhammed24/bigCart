import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';
import { StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useCardStore } from '@/store/cardStore';
import Toast from 'react-native-toast-message';
import PaymentForm from '@/components/PaymentMethod/PaymentForm';

export default function AddCard() {
  const router = useRouter();
  const { addCard } = useCardStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleProceed = async (values: any) => {
    setIsLoading(true);
    try {
      await addCard(values);
      Toast.show({
        type: 'success',
        text1: 'Card Added',
        text2: 'Your card has been successfully saved.',
      });
      router.back();
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to add card. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Header title="Add Credit Card" />
      <PaymentForm
        handleProceed={handleProceed}
        isLoading={isLoading}
        buttonTitle="Add card"
      />
    </SafeAreaView>
  );
}

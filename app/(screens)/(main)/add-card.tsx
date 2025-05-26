import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';
import { PaymentForm } from '@/components/PaymentMethod/PaymentForm';

// Define the PaymentFormData interface (copied from PaymentForm for type safety)
interface PaymentFormData {
  name: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  isDefault?: boolean;
}

export default function AddCard() {
  // Dummy formData to satisfy PaymentForm props
  const formData: PaymentFormData = {
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    isDefault: false,
  };

  // Dummy handler functions to satisfy PaymentForm props
  const handleInputChange = (key: keyof PaymentFormData, value: string) => {};
  const handleToggleChange = (value: boolean) => {};
  const handleProceed = () => {};

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <Header title="Add Credit Card" />
      <PaymentForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleToggleChange={handleToggleChange}
        handleProceed={handleProceed}
      />
    </SafeAreaView>
  );
}

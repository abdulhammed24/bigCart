import { View } from 'react-native';
import React, { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '@/components/Header';
import { ProgressSteps } from '@/components/ProgressSteps';
import { PaymentForm } from '@/components/PaymentMethod/PaymentForm';
import { PaymentOptions } from '@/components/PaymentMethod/PaymentOption';

interface PaymentOption {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
}

interface PaymentFormData {
  name: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  isDefault?: boolean;
}

export default function PaymentMethod() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [formData, setFormData] = useState<PaymentFormData>({
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    isDefault: false,
  });

  const paymentOptions: PaymentOption[] = [
    { id: '1', name: 'PayPal', icon: 'logo-paypal' },
    { id: '2', name: 'Credit Card', icon: 'card' },
    { id: '3', name: 'Apple Pay', icon: 'logo-apple' },
  ];

  const handleInputChange = (key: keyof PaymentFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleToggleChange = (value: boolean) => {
    setFormData((prev) => ({ ...prev, isDefault: value }));
  };

  const handleProceed = () => {
    // Validate form fields for Credit Card
    if (
      !formData.name ||
      !formData.cardNumber ||
      !formData.expiry ||
      !formData.cvv
    ) {
      alert('Please fill in all card details');
      return;
    }
    // Basic validation for card number (16 digits), expiry (MM/YY), and CVV (3-4 digits)
    if (!/^\d{16}$/.test(formData.cardNumber)) {
      alert('Card number must be 16 digits');
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) {
      alert('Expiry must be in MM/YY format');
      return;
    }
    if (!/^\d{3,4}$/.test(formData.cvv)) {
      alert('CVV must be 3 or 4 digits');
      return;
    }

    // Navigate to order confirmation, passing payment method and form data
    router.push({
      // pathname: '/(screens)/order-confirmation',
      pathname: '/',
      params: {
        paymentMethod: 'Credit Card',
        paymentDetails: JSON.stringify(formData),
        address: params.newAddress,
      },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <Header title="Payment Method" />

      {/* Progress Steps */}
      <ProgressSteps currentStep="Payment" />

      <PaymentOptions paymentOptions={paymentOptions} />

      <PaymentForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleToggleChange={handleToggleChange}
        handleProceed={handleProceed}
      />
    </SafeAreaView>
  );
}

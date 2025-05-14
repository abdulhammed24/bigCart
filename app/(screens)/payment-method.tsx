import { View } from 'react-native';
import React, { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '@/components/Header';
import { ProgressSteps } from '@/components/ProgressSteps';
import { PaymentForm } from '@/components/PaymentMethod/PaymentForm';
import {
  formatCardNumber,
  formatExpiry,
  validateCardNumber,
  validateExpiry,
  validateCVV,
} from '../utils/paymentUtils';
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
    let formattedValue = value;
    if (key === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (key === 'expiry') {
      formattedValue = formatExpiry(value);
    } else if (key === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }
    setFormData((prev) => ({ ...prev, [key]: formattedValue }));
  };

  const handleToggleChange = (value: boolean) => {
    setFormData((prev) => ({ ...prev, isDefault: value }));
  };

  const handleProceed = () => {
    if (!formData.name.trim()) {
      alert('Please enter the name on card');
      return;
    }
    if (!validateCardNumber(formData.cardNumber)) {
      alert('Invalid card number (must be 16 digits and pass Luhn check)');
      return;
    }
    if (!validateExpiry(formData.expiry)) {
      alert('Invalid or expired expiry date (must be MM/YY, not in past)');
      return;
    }
    if (!validateCVV(formData.cvv)) {
      alert('CVV must be exactly 3 digits');
      return;
    }

    router.push({
      // pathname: '/(screens)/order-confirmation',
      pathname: '/',
      params: {
        paymentMethod: 'Credit Card',
        paymentDetails: JSON.stringify({
          ...formData,
          cardNumber: formData.cardNumber.replace(/\s/g, ''), // Store without spaces
        }),
        address: params.newAddress,
      },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <Header title="Payment Method" />

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

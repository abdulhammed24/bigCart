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
} from '@/utils/paymentUtils';
import { PaymentOptions } from '@/components/PaymentMethod/PaymentOption';

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

  const handleInputChange = (key: keyof PaymentFormData, value: string) => {
    let formattedValue = value;

    if (key === 'cardNumber') {
      // Remove non-digits and limit to 16 before formatting
      const digits = value.replace(/\D/g, '').slice(0, 16);
      formattedValue = formatCardNumber(digits);
    } else if (key === 'expiry') {
      // Remove non-digits and limit to 4 before formatting
      const digits = value.replace(/\D/g, '').slice(0, 4);
      formattedValue = formatExpiry(digits);
    } else if (key === 'cvv') {
      // Remove non-digits and limit to 4 (for Amex)
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }

    setFormData((prev) => ({ ...prev, [key]: formattedValue }));
  };

  const handleToggleChange = (value: boolean) => {
    setFormData((prev) => ({ ...prev, isDefault: value }));
  };

  const handleProceed = () => {
    // if (!formData.name.trim()) {
    //   alert('Please enter the name on card');
    //   return;
    // }
    // if (!validateCardNumber(formData.cardNumber)) {
    //   alert('Invalid card number (must be 16 digits and pass validation)');
    //   return;
    // }
    // if (!validateExpiry(formData.expiry)) {
    //   alert('Invalid or expired expiry date (must be MM/YY, not in past)');
    //   return;
    // }
    // if (!validateCVV(formData.cvv, formData.cardNumber)) {
    //   alert('Invalid CVV (must be 3 or 4 digits based on card type)');
    //   return;
    // }

    router.replace({
      pathname: '/(screens)/(main)/order-success',
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
      {/*  */}
      <ProgressSteps currentStep="Payment" />

      {/*  */}
      <PaymentOptions />

      <PaymentForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleToggleChange={handleToggleChange}
        handleProceed={handleProceed}
      />
    </SafeAreaView>
  );
}

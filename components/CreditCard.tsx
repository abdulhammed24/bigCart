import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { InputField } from '@/components/InputField';
import CustomToggle from '@/components/CustomToggle';
import { Image } from 'expo-image';

// Define the Card interface
interface Card {
  name: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  isDefault?: boolean;
}

// Define the FormData interface for the form
interface FormData {
  name: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

// Props for the CreditCard component
interface CardCardProps {
  card: Card;
  onSave: (updatedCard: Card) => void; // Callback to save updated card
  onMakeDefault?: () => void; // Optional callback to set as default
}

// Helper function to detect card brand based on card number
const getCardBrandIcon = (cardNumber: string) => {
  const cleanedNumber = cardNumber.replace(/\s/g, '');
  if (/^4/.test(cleanedNumber)) {
    return require('@/assets/icons/visa.svg');
  } else if (/^5[1-5]/.test(cleanedNumber)) {
    return require('@/assets/icons/mastercard.svg');
  } else if (/^3[47]/.test(cleanedNumber)) {
    return require('@/assets/icons/paypal.svg');
  } else {
    return require('@/assets/icons/my-address/credit-card.svg');
  }
};

const CreditCard: React.FC<CardCardProps> = ({
  card,
  onSave,
  onMakeDefault,
}) => {
  // State for form data, initialized with the provided card
  const [formData, setFormData] = useState<FormData>({
    name: card.name,
    cardNumber: card.cardNumber,
    expiry: card.expiry,
    cvv: card.cvv,
  });

  // State to track whether the form is expanded or collapsed
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Type-safe handler for input changes
  const handleInputChange = (field: keyof FormData, value: string) => {
    // Format card number with spaces (e.g., 1234 5678 9012 3456)
    if (field === 'cardNumber') {
      const cleaned = value.replace(/\D/g, '');
      value = cleaned.replace(/(.{4})/g, '$1 ').trim();
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Toggle the expanded/collapsed state
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  // Handle saving the updated card
  const handleSave = () => {
    // Basic validation
    const cleanedCardNumber = formData.cardNumber.replace(/\s/g, '');
    if (!/^\d{15,16}$/.test(cleanedCardNumber)) {
      alert('Invalid card number');
      return;
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiry)) {
      alert('Invalid expiry date');
      return;
    }
    if (!/^\d{3,4}$/.test(formData.cvv)) {
      alert('Invalid CVV');
      return;
    }
    onSave({ ...formData, isDefault: card.isDefault });
  };

  // Format card number for display (e.g., **** **** **** 1234)
  const formatCardNumber = (number: string) => {
    const cleaned = number.replace(/\s/g, '');
    if (cleaned.length <= 4) return cleaned;
    return `**** **** **** ${cleaned.slice(-4)}`;
  };

  return (
    <View className="bg-white gap-5 p-6 rounded-lg shadow-sm">
      {/* Default Label */}
      {card.isDefault && (
        <View className="absolute top-0 left-0 px-2 z-10 py-[2px] rounded-sm bg-[#EBFFD7]">
          <Text className="text-xs font-poppinsMedium text-primary">
            DEFAULT
          </Text>
        </View>
      )}

      {/* Card Summary (Always Visible) */}
      <Pressable
        onPress={toggleExpand}
        accessibilityLabel={isExpanded ? 'Collapse form' : 'Expand form'}
        className="flex flex-row gap-5 items-center justify-between"
      >
        <View className="flex-[0.2] items-center">
          <View className="w-14 h-14 bg-offWhite rounded-full flex items-center justify-center">
            <Image
              source={getCardBrandIcon(card.cardNumber)}
              style={{ width: 32, height: 18 }}
              contentFit="contain"
            />
          </View>
        </View>

        <View className="flex-[0.75] px-4 space-y-2">
          <Text className="font-poppinsBold text-[16px]">{card.name}</Text>
          <Text className="font-poppinsRegular text-[12px] text-gray">
            {formatCardNumber(card.cardNumber)}
          </Text>
          <Text className="font-poppinsBold text-[12px]">
            Expires {formData.expiry}
          </Text>
        </View>

        {/* Collapse/Expand Toggle */}
        <View className="flex-[0.05] items-center">
          <Image
            source={require('@/assets/icons/my-address/collapse.svg')}
            style={{
              width: 18,
              height: 18,
              transform: [{ rotate: isExpanded ? '0deg' : '180deg' }],
            }}
            contentFit="contain"
          />
        </View>
      </Pressable>

      {/* Conditionally Render Form Fields */}
      {isExpanded && (
        <>
          <View className="h-[1px] w-full bg-[#EBEBEB]" />

          <View className="flex flex-col gap-2">
            {/* Cardholder Name */}
            <InputField
              iconSource={require('@/assets/icons/my-address/user.svg')}
              placeholder="Name on Card"
              value={formData.name}
              onChangeText={(text) => handleInputChange('name', text)}
              accessibilityLabel="Cardholder name"
            />

            {/* Card Number */}
            <InputField
              iconSource={getCardBrandIcon(formData.cardNumber)}
              placeholder="Card Number"
              value={formData.cardNumber}
              onChangeText={(text) => handleInputChange('cardNumber', text)}
              keyboardType="numeric"
              maxLength={19}
              accessibilityLabel="Card number"
            />

            {/* Expiry and CVV (Row) */}
            <View className="flex flex-row gap-2 items-center">
              <View className="flex-[0.5]">
                <InputField
                  iconSource={require('@/assets/icons/my-address/calendar.svg')}
                  placeholder="MM/YY"
                  value={formData.expiry}
                  onChangeText={(text) => handleInputChange('expiry', text)}
                  keyboardType="numeric"
                  maxLength={5}
                  accessibilityLabel="Expiry date"
                />
              </View>
              <View className="flex-[0.5]">
                <InputField
                  iconSource={require('@/assets/icons/lock.svg')}
                  placeholder="CVV"
                  value={formData.cvv}
                  onChangeText={(text) => handleInputChange('cvv', text)}
                  keyboardType="numeric"
                  maxLength={4}
                  secureTextEntry
                  accessibilityLabel="CVV"
                />
              </View>
            </View>
          </View>

          <View className="flex flex-row gap-2 items-center">
            <CustomToggle
              onValueChange={onMakeDefault}
              value={card.isDefault || false}
            />
            <Text className="font-poppinsMedium text   text-[12px]">
              Make default
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default CreditCard;

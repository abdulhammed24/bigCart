import { View, Text, Pressable, Animated } from 'react-native';
import React, { useState, useRef } from 'react';
import { Header } from '@/components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryBtn } from '@/components/PrimaryBtn';
import { Ionicons } from '@expo/vector-icons';
import { ProgressSteps } from '@/components/ProgressSteps';
import { useRouter } from 'expo-router';

// ShippingOption Component
interface ShippingOptionProps {
  title: string;
  description: string;
  price: string;
  isSelected: boolean;
  onSelect: () => void;
}

const ShippingOption: React.FC<ShippingOptionProps> = ({
  title,
  description,
  price,
  isSelected,
  onSelect,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      friction: 6,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 6,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onSelect}
    >
      <Animated.View
        style={{ transform: [{ scale: scaleAnim }] }}
        className="flex flex-row gap-5 p-6 justify-between items-center bg-white"
      >
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
      </Animated.View>
    </Pressable>
  );
};

// Main ShippingMethod Component
export default function ShippingMethod() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] =
    useState<string>('Standard Delivery');

  const shippingOptions = [
    {
      title: 'Standard Delivery',
      description:
        'Order will be delivered between 3 - 4 business days straight to your doorstep.',
      price: '$3',
    },
    {
      title: 'Next Day Delivery (Premium)',
      description:
        'Order will be delivered the next business day to your doorstep.',
      price: '$5',
    },
    {
      title: 'Next Day Delivery (Standard)',
      description:
        'Order will be delivered the next business day to your doorstep.',
      price: '$3',
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
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
              isSelected={selectedOption === option.title}
              onSelect={() => setSelectedOption(option.title)}
            />
          ))}
        </View>
      </View>

      {/* Save Button */}
      <View className="px-6 pb-6 bg-offWhite">
        <PrimaryBtn
          title="Save settings"
          // onPress={() => console.log('Save settings', selectedOption)}
          onPress={() => router.push('/(screens)/(main)/shipping-address')}
        />
      </View>
    </SafeAreaView>
  );
}

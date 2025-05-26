import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';
import { Image } from 'expo-image';
import { ScrollView } from 'moti';
import { PrimaryBtn } from '@/components/PrimaryBtn';
import { useRouter } from 'expo-router';
import CreditCard from '@/components/CreditCard';

// Define the Card interface
interface Card {
  name: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  isDefault?: boolean;
}

// Dummy data for cards
const initialCards: Card[] = [
  {
    name: 'Russell Austin',
    cardNumber: '4532015112830366', // Visa
    expiry: '12/26',
    cvv: '123',
    isDefault: true,
  },
  {
    name: 'Emily Carter',
    cardNumber: '5555555555554444', // Mastercard
    expiry: '09/25',
    cvv: '456',
    isDefault: false,
  },
  {
    name: 'Liam Brown',
    cardNumber: '378282246310005', // PayPal/Amex
    expiry: '06/27',
    cvv: '7890',
    isDefault: false,
  },
];

export default function MyCards() {
  const router = useRouter();

  // State to manage the list of cards
  const [cards, setCards] = useState<Card[]>(initialCards);

  // Handle saving an updated card
  const handleSaveCard = (index: number) => (updatedCard: Card) => {
    setCards((prev) =>
      prev.map((card, i) => (i === index ? updatedCard : card)),
    );
  };

  // Handle making a card the default
  const handleMakeDefault = (index: number) => () => {
    setCards((prev) =>
      prev.map((card, i) => ({
        ...card,
        isDefault: i === index,
      })),
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      {/* Header */}
      <Header
        title="My Cards"
        rightComponent={
          <Pressable onPress={() => router.push('/(screens)/(main)/add-card')}>
            <Image
              source={require('@/assets/icons/add.svg')}
              style={{ width: 24, height: 24 }}
              contentFit="contain"
            />
          </Pressable>
        }
      />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
        className="flex-1 px-6 bg-offWhite py-6"
      >
        <View className="flex flex-col gap-5">
          {/* Render CreditCard Components */}
          {cards.map((card, index) => (
            <CreditCard
              key={index}
              card={card}
              onSave={handleSaveCard(index)}
              onMakeDefault={handleMakeDefault(index)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Save Button */}
      <View className="px-6 pb-6 bg-offWhite">
        <PrimaryBtn
          title="Save settings"
          onPress={() => console.log('Saved cards:', cards)}
        />
      </View>
    </SafeAreaView>
  );
}

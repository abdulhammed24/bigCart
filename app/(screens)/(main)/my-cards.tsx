import { View, Text, Pressable, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';
import { Image } from 'expo-image';
import { ScrollView } from 'moti';
import { PrimaryBtn } from '@/components/PrimaryBtn';
import { useRouter } from 'expo-router';
import CreditCard from '@/components/CreditCard';
import { useCardStore } from '@/store/cardStore';
import Toast from 'react-native-toast-message';

interface Card {
  name: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  isDefault?: boolean;
}

export default function MyCards() {
  const router = useRouter();
  const { cards, fetchCards, updateCard, setDefaultCard, loading, error } =
    useCardStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const handleSaveCard =
    (index: number) => async (updatedCard: Partial<Card>) => {
      try {
        await updateCard(cards[index].id, updatedCard);
      } catch (err) {
        // Toast handled in CreditCard
      }
    };

  const handleMakeDefault = (index: number) => async () => {
    try {
      await setDefaultCard(cards[index].id);
      Toast.show({
        type: 'success',
        text1: 'Default Card Set',
        text2: `${cards[index].name}'s card is now the default.`,
      });
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to set default card. Please try again.',
      });
    }
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      Toast.show({
        type: 'success',
        text1: 'Settings Saved',
        text2: 'Your card settings have been saved.',
      });
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to save settings. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
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
        {error && (
          <Text className="text-destructive text-center text-[12px] font-poppinsRegular mb-4">
            {error}
          </Text>
        )}
        {cards.length === 0 && !loading && !error ? (
          <Text className="text-center text-gray-500 text-[14px] font-poppinsRegular">
            No cards found. Add a new card.
          </Text>
        ) : (
          <View className="flex flex-col gap-5">
            {cards.map((card, index) => (
              <CreditCard
                key={card.id}
                card={card}
                onSave={handleSaveCard(index)}
                onMakeDefault={handleMakeDefault(index)}
              />
            ))}
          </View>
        )}
      </ScrollView>

      <View className="px-6 pb-6 bg-offWhite">
        <PrimaryBtn
          title="Save settings"
          onPress={handleSaveSettings}
          isLoading={isLoading}
          loadingText="Saving..."
          disabled={isLoading}
        />
      </View>
    </SafeAreaView>
  );
}

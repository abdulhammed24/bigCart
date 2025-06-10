import { View, Text, Pressable, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { PrimaryBtn } from '@/components/PrimaryBtn';
import { useRouter } from 'expo-router';
import AddressCard from '@/components/AddressCard';
import { Header } from '@/components/Header';
import { StatusBar } from 'react-native';
import { useAddressStore } from '@/store/addressStore';
import Toast from 'react-native-toast-message';

//
interface Address {
  name: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

export default function MyAddress() {
  const router = useRouter();
  const {
    addresses,
    fetchAddresses,
    updateAddress,
    setDefaultAddress,
    loading,
    error,
  } = useAddressStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const handleSaveAddress =
    (index: number) => async (updatedAddress: Partial<Address>) => {
      try {
        await updateAddress(addresses[index].id, updatedAddress);
      } catch (err) {
        // Toast handled in AddressCard
      }
    };

  const handleMakeDefault = (index: number) => async () => {
    try {
      await setDefaultAddress(addresses[index].id);
      Toast.show({
        type: 'success',
        text1: 'Default Address Set',
        text2: `${addresses[index].name}'s address is now the default.`,
      });
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to set default address. Please try again.',
      });
    }
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      // No-op for now; addresses are saved individually
      Toast.show({
        type: 'success',
        text1: 'Settings Saved',
        text2: 'Your address settings have been saved.',
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
        title="My Address"
        rightComponent={
          <Pressable
            onPress={() => router.push('/(screens)/(main)/add-address')}
          >
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
        {addresses.length === 0 && !loading && !error ? (
          <Text className="text-center text-gray-500 text-[14px] font-poppinsRegular">
            No addresses found. Add a new address.
          </Text>
        ) : (
          <View className="flex flex-col gap-5">
            {addresses.map((address, index) => (
              <AddressCard
                key={address.id}
                address={address}
                onSave={handleSaveAddress(index)}
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

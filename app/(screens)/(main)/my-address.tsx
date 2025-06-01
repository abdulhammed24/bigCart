import { View, Text, Pressable, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { PrimaryBtn } from '@/components/PrimaryBtn';
import { useRouter } from 'expo-router';
import AddressCard from '@/components/AddressCard';
import { Header } from '@/components/Header';
import { StatusBar } from 'react-native';

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

// Dummy data
const initialAddresses: Address[] = [
  {
    name: 'Russell Austin',
    address: '2811 Crescent Day',
    city: 'LA Port California',
    zipCode: '77571',
    country: 'United States',
    phone: '+1 202 555 0142',
    isDefault: true,
  },
  {
    name: 'Emily Carter',
    address: '142 Maple Street',
    city: 'New York',
    zipCode: '10001',
    country: 'United States',
    phone: '+1 212 555 0198',
    isDefault: false,
  },
  {
    name: 'Liam Brown',
    address: '789 Pine Road',
    city: 'Chicago',
    zipCode: '60601',
    country: 'United States',
    phone: '+1 312 555 0123',
    isDefault: false,
  },
];

export default function MyAddress() {
  // State to manage the list of addresses
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);

  const router = useRouter();

  // Handle saving an updated address
  const handleSaveAddress = (index: number) => (updatedAddress: Address) => {
    setAddresses((prev) =>
      prev.map((addr, i) => (i === index ? updatedAddress : addr)),
    );
  };

  // Handle making an address the default
  const handleMakeDefault = (index: number) => () => {
    setAddresses((prev) =>
      prev.map((addr, i) => ({
        ...addr,
        isDefault: i === index,
      })),
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      {/* Header */}

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
        <View className="flex flex-col gap-5">
          {/* Render Address Cards */}
          {addresses.map((address, index) => (
            <AddressCard
              key={index}
              address={address}
              onSave={handleSaveAddress(index)}
              onMakeDefault={handleMakeDefault(index)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Save Button */}
      <View className="px-6 pb-6 bg-offWhite">
        <PrimaryBtn
          title="Save settings"
          onPress={() => console.log('Saved addresses:', addresses)}
        />
      </View>
    </SafeAreaView>
  );
}

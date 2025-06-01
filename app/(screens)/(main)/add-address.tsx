import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { InputField } from '@/components/InputField';
import { PrimaryBtn } from '@/components/PrimaryBtn';
import CustomToggle from '@/components/CustomToggle';
import { Header } from '@/components/Header';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StatusBar } from 'react-native';

interface Address {
  name: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

export default function AddAddress() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Form state for the new address
  const [formData, setFormData] = useState<Address>({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    phone: '',
    isDefault: false,
  });

  // Handle input changes
  const handleInputChange = (key: keyof Address, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Handle toggle for setting default address
  const handleToggleChange = (value: boolean) => {
    setFormData((prev) => ({ ...prev, isDefault: value }));
  };

  // Handle saving the address
  const handleSave = () => {
    // Validate form data
    if (
      !formData.name ||
      !formData.email ||
      !formData.address ||
      !formData.city ||
      !formData.zipCode ||
      !formData.country ||
      !formData.phone
    ) {
      alert('Please fill in all fields');
      return;
    }

    // Navigate back and pass the new address
    router.back();
    router.setParams({ newAddress: JSON.stringify(formData) });
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Header title="Add Address" />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        className="flex-1 bg-offWhite"
      >
        <View className="px-6 flex-1 py-6 flex flex-col gap-4">
          <View className="flex flex-col gap-2">
            <InputField
              iconSource={require('@/assets/icons/my-address/user.svg')}
              placeholder="Name"
              value={formData.name}
              onChangeText={(text) => handleInputChange('name', text)}
              backgroundColor="bg-white"
            />
            <InputField
              iconSource={require('@/assets/icons/mail.svg')}
              placeholder="Email Address"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              backgroundColor="bg-white"
              keyboardType="email-address"
            />
            <InputField
              iconSource={require('@/assets/icons/my-address/telephone.svg')}
              placeholder="Phone Number"
              value={formData.phone}
              onChangeText={(text) => handleInputChange('phone', text)}
              backgroundColor="bg-white"
              keyboardType="phone-pad"
            />
            <InputField
              iconSource={require('@/assets/icons/my-address/address.svg')}
              placeholder="Address"
              value={formData.address}
              onChangeText={(text) => handleInputChange('address', text)}
              backgroundColor="bg-white"
            />
            <InputField
              iconSource={require('@/assets/icons/my-address/zip.svg')}
              placeholder="Zip Code"
              value={formData.zipCode}
              onChangeText={(text) => handleInputChange('zipCode', text)}
              backgroundColor="bg-white"
              keyboardType="numeric"
            />
            <InputField
              iconSource={require('@/assets/icons/my-address/city.svg')}
              placeholder="City"
              value={formData.city}
              onChangeText={(text) => handleInputChange('city', text)}
              backgroundColor="bg-white"
            />
            <InputField
              iconSource={require('@/assets/icons/my-address/globe.svg')}
              placeholder="Country"
              value={formData.country}
              onChangeText={(text) => handleInputChange('country', text)}
              backgroundColor="bg-white"
            />
          </View>

          <View className="flex flex-row items-center gap-2">
            <CustomToggle
              onValueChange={handleToggleChange}
              value={formData.isDefault || false}
            />
            <Text className="font-poppinsMedium text-[12px]">
              Set as default address
            </Text>
          </View>
        </View>

        {/*  */}
        <View className="px-6 pb-6 bg-offWhite mt-auto">
          <PrimaryBtn title="Add address" onPress={handleSave} />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

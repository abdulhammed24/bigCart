import { View, Text, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { InputField } from '@/components/InputField';
import { Header } from '@/components/Header';
import { useAuthStore } from '@/store/authStore';

interface PersonalDetails {
  name: string;
  email: string;
  phone: string;
}

export default function About() {
  const router = useRouter();
  const { user, checkSession } = useAuthStore();

  // State for Personal Details with user data
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phoneNumber || '',
  });

  // Fetch user session on mount
  useEffect(() => {
    checkSession();
  }, [checkSession]);

  // Update personalDetails when user changes
  useEffect(() => {
    setPersonalDetails({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phoneNumber || '',
    });
  }, [user]);

  useEffect(() => {
    console.log('User data:', user);
  }, [user]);

  // Handle input changes for Personal Details
  const handlePersonalInputChange = (
    key: keyof PersonalDetails,
    value: string,
  ) => {
    setPersonalDetails((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Header title="About me" />

      <View className="flex-1 px-6 bg-offWhite py-6">
        <View className="flex flex-col gap-6">
          {/* Personal Details */}
          <View>
            <Text className="font-poppinsBold text-[18px] mb-4">
              Personal Details
            </Text>
            <View className="flex flex-col gap-2">
              <InputField
                iconSource={require('@/assets/icons/my-address/user.svg')}
                placeholder="Name"
                value={personalDetails.name}
                onChangeText={(text) => handlePersonalInputChange('name', text)}
                backgroundColor="bg-white"
              />
              <InputField
                iconSource={require('@/assets/icons/mail.svg')}
                placeholder="Email Address"
                value={personalDetails.email}
                onChangeText={(text) =>
                  handlePersonalInputChange('email', text)
                }
                backgroundColor="bg-white"
                keyboardType="email-address"
              />
              <InputField
                iconSource={require('@/assets/icons/my-address/telephone.svg')}
                placeholder="Phone Number"
                value={personalDetails.phone}
                onChangeText={(text) =>
                  handlePersonalInputChange('phone', text)
                }
                backgroundColor="bg-white"
                keyboardType="phone-pad"
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { InputField } from '@/components/InputField';
import { PasswordInput } from '@/components/PasswordInput';
import { PrimaryBtn } from '@/components/PrimaryBtn';
import { Header } from '@/components/Header';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface PersonalDetails {
  name: string;
  email: string;
  phone: string;
}

interface PasswordDetails {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export default function About() {
  const router = useRouter();

  // State for Personal Details with default values
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    name: 'Olivia Austin',
    email: 'oliviaaustin@gmail.com',
    phone: '+1 202 555 0142',
  });

  // State for Password Details
  const [passwordDetails, setPasswordDetails] = useState<PasswordDetails>({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  // Handle input changes for Personal Details
  const handlePersonalInputChange = (
    key: keyof PersonalDetails,
    value: string,
  ) => {
    setPersonalDetails((prev) => ({ ...prev, [key]: value }));
  };

  // Handle input changes for Password Details
  const handlePasswordInputChange = (
    key: keyof PasswordDetails,
    value: string,
  ) => {
    setPasswordDetails((prev) => ({ ...prev, [key]: value }));
  };

  // Handle save action
  const handleSave = () => {
    // Validate Personal Details
    if (
      !personalDetails.name ||
      !personalDetails.email ||
      !personalDetails.phone
    ) {
      alert('Please fill in all personal details');
      return;
    }

    // Validate Password Details (if provided)
    if (
      passwordDetails.currentPassword ||
      passwordDetails.newPassword ||
      passwordDetails.confirmNewPassword
    ) {
      if (passwordDetails.newPassword !== passwordDetails.confirmNewPassword) {
        alert('New password and confirm password do not match');
        return;
      }
      if (!passwordDetails.currentPassword) {
        alert('Please enter your current password');
        return;
      }
    }

    // Log or process the form data
    console.log('Personal Details:', personalDetails);
    console.log('Password Details:', {
      currentPassword: passwordDetails.currentPassword,
      newPassword: passwordDetails.newPassword,
    });

    alert('Settings saved successfully');
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      {/*  */}
      <Header title="About me" />
      <KeyboardAwareScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        className="flex-1 bg-offWhite"
      >
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
                  onChangeText={(text) =>
                    handlePersonalInputChange('name', text)
                  }
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

            {/* Change Password */}
            <View>
              <Text className="font-poppinsBold text-[18px] mb-4">
                Change Password
              </Text>
              <View className="flex flex-col gap-2">
                <PasswordInput
                  iconSource={require('@/assets/icons/lock.svg')}
                  placeholder="Current Password"
                  value={passwordDetails.currentPassword}
                  onChangeText={(text) =>
                    handlePasswordInputChange('currentPassword', text)
                  }
                  backgroundColor="bg-white"
                />
                <PasswordInput
                  iconSource={require('@/assets/icons/lock.svg')}
                  placeholder="New Password"
                  value={passwordDetails.newPassword}
                  onChangeText={(text) =>
                    handlePasswordInputChange('newPassword', text)
                  }
                  backgroundColor="bg-white"
                />
                <PasswordInput
                  iconSource={require('@/assets/icons/lock.svg')}
                  placeholder="Confirm New Password"
                  value={passwordDetails.confirmNewPassword}
                  onChangeText={(text) =>
                    handlePasswordInputChange('confirmNewPassword', text)
                  }
                  backgroundColor="bg-white"
                />
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <View className="px-6 pb-6 bg-offWhite">
        <PrimaryBtn title="Save Settings" onPress={handleSave} />
      </View>
    </SafeAreaView>
  );
}

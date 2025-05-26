import { View, Text, TextInput, Pressable } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { InputField } from '@/components/InputField';
import { PrimaryBtn } from '@/components/PrimaryBtn';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

interface FormData {
  email: string;
}

export default function ForgotPassword() {
  const router = useRouter();
  // Form state for password recovery
  const [formData, setFormData] = useState<FormData>({
    email: '',
  });

  // Handle input changes
  const handleInputChange = (key: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Handle saving the form
  const handleSave = () => {
    // Validate email for password recovery
    if (!formData.email) {
      alert('Please enter an email address');
      return;
    }
    // Add logic to send password recovery link
    console.log('Sending recovery link to:', formData.email);
    router.push('/(screens)/(auth)/verify-email');
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <StatusBar style="dark" translucent />
      <Header title="Password Recovery" backgroundColor="bg-offWhite" />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        className="flex-1 bg-offWhite"
      >
        <View className="flex-1 px-6 py-6 pt-24 flex flex-col gap-4">
          <View className="mb-6 flex items-center">
            <Text className="text-[24px]  text-center font-poppinsBold text-black mb-2">
              Forgot Password
            </Text>
            <Text className="text-gray text-center text-[16px] font-poppinsMedium">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy
            </Text>
          </View>
          <View className="flex flex-col gap-2">
            <InputField
              iconSource={require('@/assets/icons/mail.svg')}
              placeholder="Email Address"
              value={formData.email}
              onChangeText={(text: string) => handleInputChange('email', text)}
              backgroundColor="bg-white"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {/*  */}
            <PrimaryBtn title="Send Link" onPress={handleSave} />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

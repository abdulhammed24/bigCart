import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Header } from '@/components/Header';
import { InputField } from '@/components/InputField';
import { PrimaryBtn } from '@/components/PrimaryBtn';
import { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

// Define the type for form data
interface FormData {
  code: string;
}

export default function VerifyCode() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>(); // Get email from ForgotPassword

  // Form state for verification code
  const [formData, setFormData] = useState<FormData>({
    code: '',
  });

  // Handle input changes
  const handleInputChange = (key: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Handle code verification
  const handleVerify = () => {
    // Validate code
    if (!formData.code) {
      alert('Please enter the verification code');
      return;
    }
    // Add logic to verify code with backend (e.g., using RTK Query)
    console.log('Verifying code:', formData.code, 'for email:', email);
    // On success, navigate to password reset
    router.push({
      pathname: '/reset-password',
      params: { email, code: formData.code }, // Pass email and code
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <Header backgroundColor="bg-offWhite" />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        className="flex-1 bg-offWhite"
      >
        <View className="flex-1 px-6 py-6 pt-24 flex flex-col gap-4">
          <View className="mb-6 flex items-center">
            <Text className="text-[24px] text-balance  text-center font-poppinsBold text-black mb-2">
              Verify Code
            </Text>

            <Text className="text-gray text-center text-[16px] font-poppinsMedium">
              Enter the verification code sent to {email}
            </Text>
          </View>

          <View className="flex flex-col gap-2">
            <InputField
              // iconSource={require('@/assets/icons/code.svg')}
              placeholder="Verification Code"
              value={formData.code}
              onChangeText={(text: string) => handleInputChange('code', text)}
              backgroundColor="bg-white"
              keyboardType="numeric"
              autoCapitalize="none"
            />
            {/*  */}
            <PrimaryBtn title="Verify Code" onPress={handleVerify} />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

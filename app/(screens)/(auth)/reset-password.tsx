import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Header } from '@/components/Header';
import { InputField } from '@/components/InputField';
import { PrimaryBtn } from '@/components/PrimaryBtn';
import { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

interface FormData {
  newPassword: string;
  confirmNewPassword: string;
}

export default function ResetPassword() {
  const router = useRouter();
  const { email, code } = useLocalSearchParams<{
    email: string;
    code: string;
  }>();

  const [formData, setFormData] = useState<FormData>({
    newPassword: '',
    confirmNewPassword: '',
  });

  const handleInputChange = (key: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    if (!formData.newPassword || !formData.confirmNewPassword) {
      alert('Please fill in all fields');
      return;
    }
    if (formData.newPassword !== formData.confirmNewPassword) {
      alert('Passwords do not match');
      return;
    }
    if (formData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    // Add RTK Query logic to reset password
    console.log('Resetting password for:', email, 'with code:', code);
    // On success, navigate to login
    router.push('/login');
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <StatusBar style="dark" translucent />
      <Header backgroundColor="bg-offWhite" />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        className="flex-1 bg-offWhite"
      >
        <View className="flex-1 px-6 py-6 flex flex-col gap-4">
          <View className="mb-6 flex items-center">
            <Text className="text-[24px]  text-center font-poppinsBold text-black mb-2">
              Reset Password
            </Text>
            <Text className="text-gray text-center text-[16px] font-poppinsMedium">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy
            </Text>
          </View>

          <View className="flex flex-col gap-2">
            <InputField
              iconSource={require('@/assets/icons/lock.svg')}
              placeholder="New Password"
              value={formData.newPassword}
              onChangeText={(text: string) =>
                handleInputChange('newPassword', text)
              }
              backgroundColor="bg-white"
              secureTextEntry
              autoCapitalize="none"
            />
            <InputField
              iconSource={require('@/assets/icons/lock.svg')}
              placeholder="Confirm New Password"
              value={formData.confirmNewPassword}
              onChangeText={(text: string) =>
                handleInputChange('confirmNewPassword', text)
              }
              backgroundColor="bg-white"
              secureTextEntry
              autoCapitalize="none"
            />
            {/*  */}
            <PrimaryBtn title="Reset Password" onPress={handleSave} />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import CustomToggle from '@/components/CustomToggle';
import { Header } from '@/components/Header';
import { PrimaryBtn } from '@/components/PrimaryBtn';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Notifications() {
  const router = useRouter();

  // State to manage toggle values
  const [toggles, setToggles] = useState({
    allowNotifications: false,
    emailNotifications: false,
    orderNotifications: false,
    generalNotifications: false,
  });

  // Handler for toggle changes
  const handleToggleChange =
    (key: keyof typeof toggles) => (value: boolean) => {
      setToggles((prev) => ({ ...prev, [key]: value }));
    };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      {/* Header */}
      <Header title="Notifications" />

      <View className="flex-1 px-6 bg-offWhite py-6">
        <View className="flex flex-col gap-5">
          {/* Allow Notifications */}
          <View className="flex flex-row gap-5 p-6 bg-white">
            <View className="flex gap-2 flex-[0.9]">
              <Text className="text-black font-poppinsBold text-[16px]">
                Allow Notifications
              </Text>
              <Text className="text-gray font-poppinsRegular text-[12px]">
                Lorem ipsum dolor sit amet, consetetur sadi pscing elitr, sed
                diam nonumym
              </Text>
            </View>
            <View className="flex-[0.1]">
              <CustomToggle
                onValueChange={handleToggleChange('allowNotifications')}
                value={toggles.allowNotifications}
              />
            </View>
          </View>

          {/* Email Notifications */}
          <View className="flex flex-row gap-5 p-6 bg-white">
            <View className="flex gap-2 flex-[0.9]">
              <Text className="text-black font-poppinsBold text-[16px]">
                Email Notifications
              </Text>
              <Text className="text-gray font-poppinsRegular text-[12px]">
                Lorem ipsum dolor sit amet, consetetur sadi pscing elitr, sed
                diam nonumym
              </Text>
            </View>
            <View className="flex-[0.1]">
              <CustomToggle
                onValueChange={handleToggleChange('emailNotifications')}
                value={toggles.emailNotifications}
              />
            </View>
          </View>

          {/* Order Notifications */}
          <View className="flex flex-row gap-5 p-6 bg-white">
            <View className="flex gap-2 flex-[0.9]">
              <Text className="text-black font-poppinsBold text-[16px]">
                Order Notifications
              </Text>
              <Text className="text-gray font-poppinsRegular text-[12px]">
                Receive updates about your order status and delivery.
              </Text>
            </View>
            <View className="flex-[0.1]">
              <CustomToggle
                onValueChange={handleToggleChange('orderNotifications')}
                value={toggles.orderNotifications}
              />
            </View>
          </View>

          {/* General Notifications */}
          <View className="flex flex-row gap-5 p-6 bg-white">
            <View className="flex gap-2 flex-[0.9]">
              <Text className="text-black font-poppinsBold text-[16px]">
                General Notifications
              </Text>
              <Text className="text-gray font-poppinsRegular text-[12px]">
                Stay informed about promotions, news, and updates.
              </Text>
            </View>
            <View className="flex-[0.1]">
              <CustomToggle
                onValueChange={handleToggleChange('generalNotifications')}
                value={toggles.generalNotifications}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Save Button */}
      <View className="px-6 pb-6 bg-offWhite">
        <PrimaryBtn
          title="Save settings"
          onPress={() => console.log('Save settings')}
        />
      </View>
    </SafeAreaView>
  );
}

import { View, Text } from 'react-native';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { InputField } from '@/components/InputField';
import { PrimaryBtn } from '@/components/PrimaryBtn';
import CustomToggle from '@/components/CustomToggle';

interface PaymentFormData {
  name: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  isDefault?: boolean;
}

interface PaymentFormProps {
  formData: PaymentFormData;
  handleInputChange: (key: keyof PaymentFormData, value: string) => void;
  handleToggleChange: (value: boolean) => void;
  handleProceed: () => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  formData,
  handleInputChange,
  handleToggleChange,
  handleProceed,
}) => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-offWhite"
    >
      <View className="px-6 flex-1 py-6 flex flex-col gap-4">
        <View className="flex flex-col gap-2">
          <InputField
            iconSource={require('@/assets/icons/my-address/user.svg')}
            placeholder="Name on Card"
            value={formData.name}
            onChangeText={(text) => handleInputChange('name', text)}
            backgroundColor="bg-white"
          />
          <InputField
            iconSource={require('@/assets/icons/my-address/credit-card.svg')}
            placeholder="Card Number"
            value={formData.cardNumber}
            onChangeText={(text) => handleInputChange('cardNumber', text)}
            backgroundColor="bg-white"
            maxLength={19}
            keyboardType="numeric"
          />
          <View className="flex flex-row gap-2">
            <View className="flex-1">
              <InputField
                iconSource={require('@/assets/icons/my-address/calendar.svg')}
                placeholder="MM/YY"
                value={formData.expiry}
                onChangeText={(text) => handleInputChange('expiry', text)}
                backgroundColor="bg-white"
                maxLength={5}
                keyboardType="numeric"
              />
            </View>
            <View className="flex-1">
              <InputField
                iconSource={require('@/assets/icons/lock.svg')}
                placeholder="CVV"
                value={formData.cvv}
                onChangeText={(text) => handleInputChange('cvv', text)}
                backgroundColor="bg-white"
                keyboardType="numeric"
                maxLength={4}
                secureTextEntry
              />
            </View>
          </View>
        </View>

        <View className="flex flex-row items-center gap-2">
          <CustomToggle
            onValueChange={handleToggleChange}
            value={formData.isDefault || false}
          />
          <Text className="font-poppinsMedium text-[12px]">Save this card</Text>
        </View>
      </View>

      <View className="px-6 pb-6 bg-offWhite mt-auto">
        <PrimaryBtn title="Make a payment" onPress={handleProceed} />
      </View>
    </KeyboardAwareScrollView>
  );
};

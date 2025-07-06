import { View, Text } from 'react-native';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { InputField } from '@/components/InputField';
import { PrimaryBtn } from '@/components/PrimaryBtn';
import CustomToggle from '@/components/CustomToggle';
import { Formik } from 'formik';
import { paymentSchema } from '@/lib/validationSchemas';
import { formatCardNumber, formatExpiry } from '@/utils/paymentUtils';

interface PaymentFormProps {
  handleProceed: (values: any) => void;
  isLoading: boolean;
  buttonTitle?: string;
}

export default function PaymentForm({
  handleProceed,
  isLoading,
  buttonTitle = 'Make a payment',
}: PaymentFormProps) {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 0 }}
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-offWhite"
    >
      <Formik
        initialValues={{
          name: '',
          cardNumber: formatCardNumber(''),
          expiry: '',
          cvv: '',
          isDefault: false,
        }}
        validationSchema={paymentSchema}
        onSubmit={(values) =>
          handleProceed({
            ...values,
            cardNumber: values.cardNumber.replace(/\s/g, ''),
          })
        }
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <View className="px-6 py-6 flex flex-col gap-4 flex-1">
            <View className="flex flex-col gap-2">
              <InputField
                iconSource={require('@/assets/icons/my-address/user.svg')}
                placeholder="Name on Card"
                value={values.name}
                onChangeText={handleChange('name')}
                backgroundColor="bg-white"
                autoCapitalize="words"
              />
              {touched.name && errors.name && (
                <Text className="text-destructive text-[12px] font-poppinsRegular">
                  {errors.name}
                </Text>
              )}
              <InputField
                iconSource={require('@/assets/icons/my-address/credit-card.svg')}
                placeholder="Card Number"
                value={values.cardNumber}
                onChangeText={(text) => {
                  const digits = text.replace(/\D/g, '').slice(0, 16);
                  const formatted = formatCardNumber(digits);
                  setFieldValue('cardNumber', formatted);
                }}
                backgroundColor="bg-white"
                maxLength={19}
                keyboardType="numeric"
                autoCapitalize="none"
              />
              {touched.cardNumber && errors.cardNumber && (
                <Text className="text-destructive text-[12px] font-poppinsRegular">
                  {errors.cardNumber}
                </Text>
              )}
              <View className="flex flex-row gap-2">
                <View className="flex-1">
                  <InputField
                    iconSource={require('@/assets/icons/my-address/calendar.svg')}
                    placeholder="MM/YY"
                    value={values.expiry}
                    onChangeText={(text) => {
                      const digits = text.replace(/\D/g, '').slice(0, 4);
                      const formatted = formatExpiry(digits);
                      setFieldValue('expiry', formatted);
                    }}
                    backgroundColor="bg-white"
                    maxLength={5}
                    keyboardType="numeric"
                    autoCapitalize="none"
                  />
                  {touched.expiry && errors.expiry && (
                    <Text className="text-destructive text-[12px] font-poppinsRegular">
                      {errors.expiry}
                    </Text>
                  )}
                </View>
                <View className="flex-1">
                  <InputField
                    iconSource={require('@/assets/icons/lock.svg')}
                    placeholder="CVV"
                    value={values.cvv}
                    onChangeText={(text) => {
                      const digits = text.replace(/\D/g, '').slice(0, 4);
                      setFieldValue('cvv', digits);
                    }}
                    backgroundColor="bg-white"
                    maxLength={4}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    secureTextEntry
                  />
                  {touched.cvv && errors.cvv && (
                    <Text className="text-destructive text-[12px] font-poppinsRegular">
                      {errors.cvv}
                    </Text>
                  )}
                </View>
              </View>
            </View>

            <View className="flex flex-row items-center gap-2">
              <CustomToggle
                onValueChange={(value) => setFieldValue('isDefault', value)}
                value={values.isDefault}
              />
              <Text className="font-poppinsMedium text-[12px]">
                Save this card
              </Text>
            </View>

            <View className="flex-1" />

            <View className="mt-auto bg-offWhite">
              <PrimaryBtn
                title={buttonTitle}
                onPress={() => handleSubmit()}
                isLoading={isLoading}
                loadingText={`Processing ${buttonTitle.toLowerCase()}...`}
                disabled={isLoading}
              />
            </View>
          </View>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
}

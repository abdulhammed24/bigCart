import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { InputField } from '@/components/InputField';
import { PrimaryBtn } from '@/components/PrimaryBtn';
import CustomToggle from '@/components/CustomToggle';
import { Header } from '@/components/Header';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ProgressSteps } from '@/components/ProgressSteps';
import { StatusBar } from 'react-native';
import { Formik } from 'formik';
import { addressSchema } from '@/lib/validationSchemas';
import { useAddressStore } from '@/store/addressStore';
import Toast from 'react-native-toast-message';

export default function ShippingAddress() {
  const router = useRouter();
  const { addAddress, fetchAddresses } = useAddressStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      await addAddress(values);
      Toast.show({
        type: 'success',
        text1: 'Address Added',
        text2: 'Your address has been successfully saved.',
      });
      router.push({
        pathname: '/(screens)/(main)/payment-method',
        params: {
          newAddress: JSON.stringify(values),
        },
      });
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to add address. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Header title="Shipping Address" />

      <ProgressSteps currentStep="Address" />

      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 0 }}
        showsVerticalScrollIndicator={false}
        className="flex-1 bg-offWhite"
      >
        <Formik
          initialValues={{
            name: '',
            email: '',
            address: '',
            city: '',
            zipCode: '',
            country: '',
            phone: '',
            isDefault: false,
          }}
          validationSchema={addressSchema}
          onSubmit={handleSubmit}
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
                  placeholder="Name"
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
                  iconSource={require('@/assets/icons/mail.svg')}
                  placeholder="Email Address"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  backgroundColor="bg-white"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {touched.email && errors.email && (
                  <Text className="text-destructive text-[12px] font-poppinsRegular">
                    {errors.email}
                  </Text>
                )}
                <InputField
                  iconSource={require('@/assets/icons/my-address/telephone.svg')}
                  placeholder="Phone Number"
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  backgroundColor="bg-white"
                  keyboardType="phone-pad"
                  autoCapitalize="none"
                />
                {touched.phone && errors.phone && (
                  <Text className="text-destructive text-[12px] font-poppinsRegular">
                    {errors.phone}
                  </Text>
                )}
                <InputField
                  iconSource={require('@/assets/icons/my-address/address.svg')}
                  placeholder="Address"
                  value={values.address}
                  onChangeText={handleChange('address')}
                  backgroundColor="bg-white"
                  autoCapitalize="words"
                />
                {touched.address && errors.address && (
                  <Text className="text-destructive text-[12px] font-poppinsRegular">
                    {errors.address}
                  </Text>
                )}
                <InputField
                  iconSource={require('@/assets/icons/my-address/zip.svg')}
                  placeholder="Zip code"
                  value={values.zipCode}
                  onChangeText={handleChange('zipCode')}
                  backgroundColor="bg-white"
                  keyboardType="numeric"
                  autoCapitalize="none"
                />
                {touched.zipCode && errors.zipCode && (
                  <Text className="text-destructive text-[12px] font-poppinsRegular">
                    {errors.zipCode}
                  </Text>
                )}
                <InputField
                  iconSource={require('@/assets/icons/my-address/city.svg')}
                  placeholder="City"
                  value={values.city}
                  onChangeText={handleChange('city')}
                  backgroundColor="bg-white"
                  autoCapitalize="words"
                />
                {touched.city && errors.city && (
                  <Text className="text-destructive text-[12px] font-poppinsRegular">
                    {errors.city}
                  </Text>
                )}
                <InputField
                  iconSource={require('@/assets/icons/my-address/globe.svg')}
                  placeholder="Country"
                  value={values.country}
                  onChangeText={handleChange('country')}
                  backgroundColor="bg-white"
                  autoCapitalize="words"
                />
                {touched.country && errors.country && (
                  <Text className="text-destructive text-[12px] font-poppinsRegular">
                    {errors.country}
                  </Text>
                )}
              </View>

              <View className="flex flex-row items-center gap-2">
                <CustomToggle
                  onValueChange={(value) => setFieldValue('isDefault', value)}
                  value={values.isDefault}
                />
                <Text className="font-poppinsMedium text-[12px]">
                  Save this address
                </Text>
              </View>

              <View className="mt-auto bg-offWhite">
                <PrimaryBtn
                  title="Add address"
                  onPress={() => handleSubmit()}
                  isLoading={isLoading}
                  loadingText="Adding address..."
                  disabled={isLoading}
                />
              </View>
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

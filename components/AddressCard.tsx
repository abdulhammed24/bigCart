import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { InputField } from '@/components/InputField';
import CustomToggle from '@/components/CustomToggle';
import { Image } from 'expo-image';
import Toast from 'react-native-toast-message';

interface Address {
  id: string;
  name: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

interface FormData {
  name: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  phone: string;
}

interface AddressCardProps {
  address: Address;
  onSave: (updatedAddress: Partial<Address>) => Promise<void>;
  onMakeDefault: () => Promise<void>;
}

const AddressCard: React.FC<AddressCardProps> = ({
  address,
  onSave,
  onMakeDefault,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: address.name,
    email: address.email,
    address: address.address,
    city: address.city,
    zipCode: address.zipCode,
    country: address.country,
    phone: address.phone,
  });
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave({ ...formData, isDefault: address.isDefault });
      Toast.show({
        type: 'success',
        text1: 'Address Updated',
        text2: 'Your address has been successfully updated.',
      });
      setIsExpanded(false);
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to update address. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="bg-white gap-5 p-6 rounded-lg shadow-sm">
      {address.isDefault && (
        <View className="absolute top-0 left-0 px-2 z-10 py-[2px] rounded-sm bg-[#EBFFD7]">
          <Text className="text-xs font-poppinsMedium text-primary">
            DEFAULT
          </Text>
        </View>
      )}

      <Pressable
        onPress={toggleExpand}
        accessibilityLabel={isExpanded ? 'Collapse form' : 'Expand form'}
        className="flex flex-row gap-5 items-center justify-between"
      >
        <View className="flex-[0.2] items-center">
          <Image
            source={require('@/assets/icons/my-address/location.png')}
            style={{ width: 66, height: 66 }}
            contentFit="contain"
          />
        </View>

        <View className="flex-[0.75] px-4 space-y-2">
          <Text className="font-poppinsBold text-[16px]">{address.name}</Text>
          <Text className="font-poppinsRegular text-[12px] text-gray">
            {`${address.address}, ${address.city}, ${address.country} ${address.zipCode}`}
          </Text>
          <Text className="font-poppinsRegular text-[12px] text-gray">
            {address.email}
          </Text>
          <Text className="font-poppinsBold text-[12px]">{address.phone}</Text>
        </View>

        <View className="flex-[0.05] items-center">
          <Image
            source={require('@/assets/icons/my-address/collapse.svg')}
            style={{
              width: 18,
              height: 18,
              transform: [{ rotate: isExpanded ? '0deg' : '180deg' }],
            }}
            contentFit="contain"
          />
        </View>
      </Pressable>

      {isExpanded && (
        <>
          <View className="h-[1px] w-full bg-[#EBEBEB]" />

          <View className="flex flex-col gap-2">
            <InputField
              iconSource={require('@/assets/icons/my-address/user.svg')}
              placeholder="Name"
              value={formData.name}
              onChangeText={(text) => handleInputChange('name', text)}
              backgroundColor="bg-offWhite"
            />
            <InputField
              iconSource={require('@/assets/icons/mail.svg')}
              placeholder="Email Address"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              backgroundColor="bg-offWhite"
              keyboardType="email-address"
            />
            <InputField
              iconSource={require('@/assets/icons/my-address/address.svg')}
              placeholder="Address"
              value={formData.address}
              onChangeText={(text) => handleInputChange('address', text)}
              backgroundColor="bg-offWhite"
            />
            <View className="flex flex-row gap-2 items-center">
              <View className="flex-[0.5]">
                <InputField
                  iconSource={require('@/assets/icons/my-address/city.svg')}
                  placeholder="City"
                  value={formData.city}
                  onChangeText={(text) => handleInputChange('city', text)}
                  backgroundColor="bg-offWhite"
                />
              </View>
              <View className="flex-[0.5]">
                <InputField
                  iconSource={require('@/assets/icons/my-address/zip.svg')}
                  placeholder="Zip Code"
                  value={formData.zipCode}
                  onChangeText={(text) => handleInputChange('zipCode', text)}
                  backgroundColor="bg-offWhite"
                  keyboardType="numeric"
                />
              </View>
            </View>
            <InputField
              iconSource={require('@/assets/icons/my-address/globe.svg')}
              placeholder="Country"
              value={formData.country}
              onChangeText={(text) => handleInputChange('country', text)}
              backgroundColor="bg-offWhite"
            />
            <InputField
              iconSource={require('@/assets/icons/my-address/telephone.svg')}
              placeholder="Phone number"
              value={formData.phone}
              onChangeText={(text) => handleInputChange('phone', text)}
              backgroundColor="bg-offWhite"
              keyboardType="phone-pad"
            />
          </View>

          <View className="flex flex-row gap-2">
            <CustomToggle
              onValueChange={onMakeDefault}
              value={address.isDefault || false}
            />
            <Text className="font-poppinsMedium text-[12px]">Make default</Text>
          </View>

          <Pressable
            onPress={handleSave}
            className={`bg-primary p-2 rounded-lg mt-2 ${
              isLoading ? 'opacity-50' : ''
            }`}
            disabled={isLoading}
          >
            <Text className="text-white text-center font-poppinsMedium">
              {isLoading ? 'Saving...' : 'Save'}
            </Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

export default AddressCard;

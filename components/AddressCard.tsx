import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { InputField } from '@/components/InputField';
import CustomToggle from '@/components/CustomToggle';
import { Image } from 'expo-image';

//
interface Address {
  name: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

//
interface FormData {
  name: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  phone: string;
}

// Props for the AddressCard component
interface AddressCardProps {
  address: Address;
  onSave: (updatedAddress: Address) => void; // Callback to save updated address
  onMakeDefault?: () => void; // Optional callback to set as default
}

const AddressCard: React.FC<AddressCardProps> = ({
  address,
  onSave,
  onMakeDefault,
}) => {
  // State for form data, initialized with the provided address
  const [formData, setFormData] = useState<FormData>({
    name: address.name,
    address: address.address,
    city: address.city,
    zipCode: address.zipCode,
    country: address.country,
    phone: address.phone,
  });

  // State to track whether the form is expanded or collapsed
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Type-safe handler for input changes
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Toggle the expanded/collapsed state
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  // Handle saving the updated address
  const handleSave = () => {
    onSave({ ...formData, isDefault: address.isDefault });
  };

  return (
    <View className="bg-white gap-5 p-6">
      {/* Default Label */}
      {address.isDefault && (
        <View className="absolute top-0 left-0 px-2 z-10 py-[2px] rounded-sm bg-[#EBFFD7]">
          <Text className="text-xs font-poppinsMedium text-primary">
            DEFAULT
          </Text>
        </View>
      )}

      {/* Address Summary (Always Visible) */}
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
          <Text className="font-poppinsBold text-[12px]">{address.phone}</Text>
        </View>

        {/* Collapse/Expand Toggle */}
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

      {/* Conditionally Render Form Fields */}
      {isExpanded && (
        <>
          <View className="h-[1px] w-full bg-[#EBEBEB]" />

          <View className="flex flex-col gap-2">
            {/* Name */}
            <InputField
              iconSource={require('@/assets/icons/my-address/user.svg')}
              placeholder="Name"
              value={formData.name}
              onChangeText={(text) => handleInputChange('name', text)}
            />

            {/* Address */}
            <InputField
              iconSource={require('@/assets/icons/my-address/address.svg')}
              placeholder="Address"
              value={formData.address}
              onChangeText={(text) => handleInputChange('address', text)}
            />

            {/* City and Zip Code (Row) */}
            <View className="flex flex-row gap-2 items-center">
              <View className="flex-[0.5]">
                <InputField
                  iconSource={require('@/assets/icons/my-address/city.svg')}
                  placeholder="City"
                  value={formData.city}
                  onChangeText={(text) => handleInputChange('city', text)}
                />
              </View>
              <View className="flex-[0.5]">
                <InputField
                  iconSource={require('@/assets/icons/my-address/zip.svg')}
                  placeholder="Zip Code"
                  value={formData.zipCode}
                  onChangeText={(text) => handleInputChange('zipCode', text)}
                  keyboardType="numeric"
                />
              </View>
            </View>

            {/* Country */}
            <InputField
              iconSource={require('@/assets/icons/my-address/globe.svg')}
              placeholder="Country"
              value={formData.country}
              onChangeText={(text) => handleInputChange('country', text)}
            />

            {/* Phone Number */}
            <InputField
              iconSource={require('@/assets/icons/my-address/telephone.svg')}
              placeholder="Phone number"
              value={formData.phone}
              onChangeText={(text) => handleInputChange('phone', text)}
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
        </>
      )}
    </View>
  );
};

export default AddressCard;

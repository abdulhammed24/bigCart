import React, { useState } from 'react';
import { View, TextInput, TextInputProps } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';

// Define the type for InputField props
interface InputFieldProps
  extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  iconSource?: any;
  // iconName?: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  iconSource,
  // iconName,
  placeholder,
  value,
  onChangeText,
  error,
  ...textInputProps
}) => {
  return (
    <View
      className={`bg-offWhite rounded-md px-5 py-3 flex flex-row items-center h-[45px] ${
        error ? 'border border-red-500' : ''
      }`}
    >
      {iconSource ? (
        <Image
          source={iconSource}
          style={{ width: 18, height: 18 }}
          contentFit="contain"
          className="absolute left-5 top-1/2"
          accessibilityElementsHidden={true}
        />
      ) : // : iconName ? (
      //   <Ionicons
      //     name={iconName}
      //     size={18}
      //     color="#868889"
      //     className="absolute left-5 top-1/2"
      //   />
      // )

      null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        className="flex-1 text-[12px] text-gray font-poppinsMedium px-3 h-[45px]"
        placeholderTextColor="#868889"
        accessibilityLabel={placeholder}
        {...textInputProps}
      />
    </View>
  );
};

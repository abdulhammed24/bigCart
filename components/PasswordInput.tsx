import React, { useState } from 'react';
import { View, TextInput, TextInputProps, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { TouchableRipple } from 'react-native-paper';

interface PasswordInputProps
  extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: boolean;
  backgroundColor?: string;
  iconSource?: any;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  placeholder,
  value,
  onChangeText,
  error,
  backgroundColor = 'bg-offWhite',
  iconSource,
  ...textInputProps
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <View
      className={`rounded-md px-5 py-3 flex flex-row items-center h-[50px] ${
        error ? 'border border-destructive' : ''
      } ${backgroundColor}`}
    >
      {iconSource ? (
        <Image
          source={iconSource}
          style={{ width: 18, height: 18 }}
          contentFit="contain"
          className="absolute left-5 top-1/2"
          accessibilityElementsHidden={true}
        />
      ) : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={!showPassword}
        className="flex-1 text-[14px] text-gray font-poppinsMedium px-3 h-[50px]"
        placeholderTextColor="#868889"
        autoCapitalize="none"
        accessibilityLabel={placeholder}
        {...textInputProps}
      />

      <TouchableRipple
        onPress={toggleShowPassword}
        className="absolute right-3 rounded-full p-2 top-1/3"
        accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
        rippleColor="rgba(0, 0, 0, 0.1)"
        borderless={true}
      >
        <Ionicons
          name={showPassword ? 'eye' : 'eye-off'}
          size={18}
          color="#868889"
        />
      </TouchableRipple>
    </View>
  );
};

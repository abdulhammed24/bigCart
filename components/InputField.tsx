import React from 'react';
import { View, TextInput, TextInputProps } from 'react-native';
import { Image } from 'expo-image';

interface InputFieldProps
  extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  iconSource?: any;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: boolean;
  backgroundColor?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  iconSource,
  placeholder,
  value,
  onChangeText,
  error,
  backgroundColor = 'bg-offWhite',
  ...textInputProps
}) => {
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
        className="flex-1 text-[14px] text-gray font-poppinsMedium px-3 h-[50px]"
        placeholderTextColor="#868889"
        accessibilityLabel={placeholder}
        {...textInputProps}
      />
    </View>
  );
};

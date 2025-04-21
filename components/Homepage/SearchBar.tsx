import { View, Text, TextInput, Pressable } from 'react-native';
import React from 'react';
import { Image } from 'expo-image';

export default function SearchBar() {
  return (
    <View className="flex-row items-center bg-offWhite h-[50px] rounded-lg px-4 py-3 mb-3">
      <Image
        source={require('@/assets/icons/search.svg')}
        style={{ width: 16, height: 16, marginRight: 12 }}
        contentFit="contain"
      />
      <TextInput
        placeholder="Search keywords..."
        placeholderTextColor="#868889"
        // placeholderClassName="text-[16px]"
        className="flex-1 font-poppinsMedium text-[16px] h-[50px] text-base"
      />
      <Pressable>
        <Image
          source={require('@/assets/icons/filter.svg')}
          style={{ width: 16, height: 16 }}
          contentFit="contain"
        />
      </Pressable>
    </View>
  );
}

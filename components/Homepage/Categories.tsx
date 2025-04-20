import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { categories } from '@/data/categories';

interface Category {
  id: string;
  name: string;
  icon: any;
  backgroundColor: string;
}

export default function Categories() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="py-2"
      // contentContainerStyle={{ paddingHorizontal: 24 }}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          className="items-center mx-2"
          onPress={() => console.log(`Tapped ${category.name}`)}
        >
          <View
            className="w-16 h-16 rounded-full justify-center items-center"
            style={{ backgroundColor: category.backgroundColor }}
          >
            <ExpoImage
              source={category.icon}
              style={{ width: 32, height: 32 }}
              contentFit="contain"
            />
          </View>
          <Text className="mt-5 text-[12px] font-poppinsMedium text-center text-gray">
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

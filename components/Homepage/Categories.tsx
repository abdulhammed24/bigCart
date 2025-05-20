import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { Image } from 'expo-image';
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
      // className="py-2"
      // contentContainerStyle={{ paddingHorizontal: 24 }}
    >
      {categories.map((category) => (
        <Pressable
          key={category.id}
          className="items-center px-2 py-2"
          android_ripple={{
            color: 'rgba(0, 0, 0, 0.1)',
          }}
          onPress={() => console.log(`Tapped ${category.name}`)}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
            },
          ]}
        >
          <View
            className="w-16 h-16 rounded-full justify-center items-center"
            style={{ backgroundColor: category.backgroundColor }}
          >
            <Image
              source={category.icon}
              style={{ width: 32, height: 32 }}
              contentFit="contain"
            />
          </View>
          <Text className="mt-3 text-[12px] font-poppinsMedium text-center text-gray">
            {category.name}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

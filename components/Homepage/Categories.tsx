import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Image as ExpoImage } from 'expo-image';

interface Category {
  id: string;
  name: string;
  icon: any;
  backgroundColor: string;
}

const categories: Category[] = [
  {
    id: '1',
    name: 'Vegetables',
    icon: require('@/assets/images/homepage/vegetables.svg'),
    backgroundColor: '#E6F2EA',
  },
  {
    id: '2',
    name: 'Fruits',
    icon: require('@/assets/images/homepage/fruits.svg'),
    backgroundColor: '#FFE9E5',
  },
  {
    id: '3',
    name: 'Beverages',
    icon: require('@/assets/images/homepage/beverages.svg'),
    backgroundColor: '#FFF7E0',
  },
  {
    id: '4',
    name: 'Grocery',
    icon: require('@/assets/images/homepage/grocery.svg'),
    backgroundColor: '#E8F5FF',
  },
  {
    id: '5',
    name: 'Edible oil',
    icon: require('@/assets/images/homepage/edible-oil.svg'),
    backgroundColor: '#E6F0FA',
  },
  {
    id: '6',
    name: 'Household',
    icon: require('@/assets/images/homepage/household.svg'),
    backgroundColor: '#F5E6F5',
  },
];

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

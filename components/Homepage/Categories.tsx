import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { TouchableRipple } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { categories } from '@/data/categories';

interface Category {
  id: number;
  name: string;
  icon: any;
  backgroundColor: string;
}

export default function Categories() {
  const router = useRouter();

  const handleCategoryPress = (category: Category) => {
    router.push({
      pathname: '/categories/[name]',
      params: {
        name: encodeURIComponent(category.name),
      },
    });
  };

  // console.log('Categories data:', categories);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {categories.map((category) => (
        <TouchableRipple
          key={category.id.toString()}
          onPress={() => handleCategoryPress(category)}
          rippleColor="rgba(0, 0, 0, 0.1)"
          className="p-2"
        >
          <View className="items-center">
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
          </View>
        </TouchableRipple>
      ))}
    </ScrollView>
  );
}

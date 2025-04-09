import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

export default function FeaturedProducts() {
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});

  const products = [
    {
      name: 'Fresh Peach',
      price: '$8.00',
      unit: '1 lb',
      image: require('@/assets/images/products/peach.png'),
      bgColor: '#FFDCE0',
    },
    {
      name: 'Avocado',
      price: '$3.00',
      unit: 'dozen',
      image: require('@/assets/images/products/avocado.png'),
      badge: 'NEW',
      bgColor: '#FFF5D1',
    },
    {
      name: 'Pineapple',
      price: '$8.00',
      unit: '1 lb',
      image: require('@/assets/images/products/pineapple.png'),
      bgColor: '#D1FADF',
    },
    {
      name: 'Black Grapes',
      price: '$8.00',
      unit: '1 lb',
      image: require('@/assets/images/products/grapes.png'),
      badge: '-16%',
      bgColor: '#E9D5FF',
    },
    {
      name: 'Pomegranate',
      price: '$3.00',
      unit: '1 lb',
      image: require('@/assets/images/products/pomegranate.png'),
      badge: 'NEW',
      bgColor: '#FEE2E2',
    },
    {
      name: 'Fresh Broccoli',
      price: '$8.00',
      unit: '1 lb',
      image: require('@/assets/images/products/broccoli.png'),
      bgColor: '#D1FAE5',
    },
  ];

  const toggleFavorite = (index: number) => {
    setFavorites((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <FlatList
      data={products}
      renderItem={({ item, index }) => (
        <View className="bg-white rounded-xl mb-4 w-[48%] p-3 shadow-sm relative">
          {/* Favorite (Heart) Icon */}
          <TouchableOpacity
            className="absolute top-3 right-3 z-10"
            onPress={() => toggleFavorite(index)}
          >
            <Ionicons
              name={favorites[index] ? 'heart' : 'heart-outline'}
              size={20}
              color={favorites[index] ? 'red' : 'gray'}
            />
          </TouchableOpacity>

          {/* Badge (New or Discount) */}
          {item.badge && (
            <View
              className={`absolute top-3 left-3 px-2 py-[2px] rounded-sm ${
                item.badge === 'NEW' ? 'bg-yellow-100' : 'bg-red-100'
              }`}
            >
              <Text
                className={`text-xs font-semibold ${
                  item.badge === 'NEW' ? 'text-yellow-600' : 'text-red-500'
                }`}
              >
                {item.badge}
              </Text>
            </View>
          )}

          {/* Image with Colored Background */}
          <View className="items-center justify-center mb-3">
            <View
              style={{ backgroundColor: item.bgColor }}
              className="w-24 h-24 rounded-full items-center justify-center"
            >
              <Image
                source={item.image}
                style={{ width: 60, height: 60 }}
                contentFit="contain"
              />
            </View>
          </View>

          {/* Product Info */}
          <View className="items-center justify-center">
            <Text className="text-green-600 font-poppinsMedium text-[14px]">
              {item.price}
            </Text>
            <Text className="font-poppinsBold text-[16px] mt-1">
              {item.name}
            </Text>
            <Text className="text-gray-500 text-[13px] font-poppinsRegular">
              {item.unit}
            </Text>
          </View>

          {/* Divider */}
          <View className="bg-[#EBEBEB] h-[1px] w-full my-3" />

          {/* Add to cart button */}
          <TouchableOpacity className="flex-row items-center justify-center border border-green-600 rounded-lg py-2">
            <Ionicons name="bag-outline" size={16} color="#16A34A" />
            <Text className="text-green-600 font-poppinsMedium ml-2">
              Add to cart
            </Text>
          </TouchableOpacity>
        </View>
      )}
      keyExtractor={(_, index) => index.toString()}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
}

import { View, Text, Pressable, FlatList } from 'react-native';
import { useState } from 'react';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { products } from '@/data/products';
type FeaturedProductsProps = {
  category?: string;
};

export default function FeaturedProducts({ category }: FeaturedProductsProps) {
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});

  // Filter products by category if provided
  const filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products;

  const toggleFavorite = (index: number) => {
    setFavorites((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <FlatList
      data={filteredProducts}
      renderItem={({ item, index }) => (
        <View className="bg-white rounded-xl mb-4 w-[48%] p-3 shadow-sm relative">
          {/* Favorite (Heart) Icon */}
          <Pressable
            className="absolute top-3 right-3 z-10"
            onPress={() => toggleFavorite(index)}
          >
            <Ionicons
              name={favorites[index] ? 'heart' : 'heart-outline'}
              size={20}
              color={favorites[index] ? 'red' : 'gray'}
            />
          </Pressable>

          {/* Badge (New or Discount) */}
          {(item.status === 'new' || item.discountPercentage) && (
            <View
              className={`absolute top-3 left-3 px-2 z-10 py-[2px] rounded-sm ${
                item.status === 'new' ? 'bg-yellow-100' : 'bg-red-100'
              }`}
            >
              <Text
                className={`text-xs font-semibold ${
                  item.status === 'new' ? 'text-yellow-600' : 'text-red-500'
                }`}
              >
                {item.status === 'new' ? 'NEW' : `-${item.discountPercentage}%`}
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
              ${item.price.toFixed(2)}
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
          <Pressable className="flex-row items-center justify-center border border-green-600 rounded-lg py-2">
            <Ionicons name="bag-outline" size={16} color="#16A34A" />
            <Text className="text-green-600 font-poppinsMedium ml-2">
              Add to cart
            </Text>
          </Pressable>
        </View>
      )}
      keyExtractor={(_, index) => index.toString()}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
}

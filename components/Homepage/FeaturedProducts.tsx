import { View, Text, FlatList } from 'react-native';
import { useState } from 'react';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { products } from '@/data/products';
import { TouchableRipple } from 'react-native-paper';
import { useRouter } from 'expo-router'; // Import useRouter for navigation

type FeaturedProductsProps = {
  category?: string;
  limit?: number;
};

export default function FeaturedProducts({
  category,
  limit,
}: FeaturedProductsProps) {
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});
  const [addedToCart, setAddedToCart] = useState<{ [key: number]: boolean }>(
    {},
  );
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const router = useRouter(); // Initialize router

  let filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products;

  if (limit) {
    filteredProducts = filteredProducts.slice(0, limit);
  }

  const toggleFavorite = (index: number) => {
    setFavorites((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const addToCart = (index: number) => {
    setAddedToCart((prev) => ({
      ...prev,
      [index]: true,
    }));
    setQuantities((prev) => ({
      ...prev,
      [index]: prev[index] || 1,
    }));
  };

  const incrementQuantity = (index: number) => {
    setQuantities((prev) => ({
      ...prev,
      [index]: (prev[index] || 1) + 1,
    }));
  };

  const decrementQuantity = (index: number) => {
    setQuantities((prev) => ({
      ...prev,
      [index]: prev[index] > 1 ? prev[index] - 1 : 1,
    }));
  };

  return (
    <FlatList
      data={filteredProducts}
      renderItem={({ item, index }) => (
        <TouchableRipple
          onPress={() => {
            router.push({
              pathname: '/(screens)/product-details/[id]',
              params: { id: item.id },
            });
          }}
          rippleColor="rgba(0, 0, 0, 0.1)"
          borderless={true}
          className="rounded-xl bg-white mb-4 w-[48%] p-3 shadow-sm relative"
        >
          <View>
            {/* Favorite (Heart) Icon */}
            <TouchableRipple
              onPress={() => toggleFavorite(index)}
              rippleColor="rgba(0, 0, 0, 0.1)"
              borderless={true}
              className="absolute rounded-full top-1 right-1 p-2"
              style={{ margin: -8 }}
            >
              <Ionicons
                name={favorites[index] ? 'heart' : 'heart-outline'}
                size={20}
                color={favorites[index] ? 'red' : 'gray'}
              />
            </TouchableRipple>

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
                  {item.status === 'new'
                    ? 'NEW'
                    : `-${item.discountPercentage}%`}
                </Text>
              </View>
            )}

            {/* Image with Colored Background */}
            <View className="items-center justify-center mb-3">
              <View className="w-24 h-24 rounded-full items-center justify-center">
                <Image
                  source={item.image}
                  style={{ width: 100, height: 80 }}
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

            {/* Add to Cart or Quantity Selector */}
            {!addedToCart[index] ? (
              <TouchableRipple
                className="flex-row items-center justify-center border border-green-600 rounded-lg py-2"
                onPress={() => addToCart(index)}
                rippleColor="rgba(0, 0, 0, 0.1)"
                borderless={true}
              >
                <View className="flex-row items-center">
                  <Ionicons name="bag-outline" size={16} color="#6CC51D" />
                  <Text className="text-green-600 font-poppinsMedium ml-2">
                    Add to cart
                  </Text>
                </View>
              </TouchableRipple>
            ) : (
              <View className="flex-row items-center justify-between rounded-lg h-[36px] overflow-hidden">
                <TouchableRipple
                  onPress={() => decrementQuantity(index)}
                  className="px-3 h-full justify-center"
                  rippleColor="rgba(0, 0, 0, 0.1)"
                >
                  <Ionicons name="remove" size={24} color="#6CC51D" />
                </TouchableRipple>
                <Text className="text-black text-[16px] w-[50px] text-center font-poppinsMedium">
                  {quantities[index] || 1}
                </Text>
                <TouchableRipple
                  onPress={() => incrementQuantity(index)}
                  className="px-3 h-full justify-center"
                  rippleColor="rgba(0, 0, 0, 0.1)"
                >
                  <Ionicons name="add" size={24} color="#6CC51D" />
                </TouchableRipple>
              </View>
            )}
          </View>
        </TouchableRipple>
      )}
      keyExtractor={(_, index) => index.toString()}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
}

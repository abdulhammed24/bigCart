import { View, Text, FlatList, RefreshControl } from 'react-native';
import { useState, useEffect } from 'react';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { TouchableRipple } from 'react-native-paper';
import { useRouter } from 'expo-router';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';
import { useFeaturedProductsStore } from '@/store/featuredProductsStore';
import FeaturedProductsSkeleton from './FeaturedProductsSkeleton';

interface Product {
  $id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  image?: string;
  status?: string;
  discountPercentage?: number;
}

interface FeaturedProductsProps {
  category?: string;
  limit?: number;
  refreshing: boolean;
  onRefresh: () => Promise<void>;
}

export default function FeaturedProducts({
  category,
  limit,
  refreshing,
  onRefresh,
}: FeaturedProductsProps) {
  const router = useRouter();
  const { products, loading, error, fetchProducts } =
    useFeaturedProductsStore();
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
  const [addedToCart, setAddedToCart] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    fetchProducts(category, limit);
  }, [fetchProducts, category, limit]);

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const addToCart = (productId: string) => {
    setAddedToCart((prev) => ({
      ...prev,
      [productId]: true,
    }));
    setQuantities((prev) => ({
      ...prev,
      [productId]: prev[productId] || 1,
    }));
  };

  const incrementQuantity = (productId: string) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1,
    }));
  };

  const decrementQuantity = (productId: string) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: prev[productId] > 1 ? prev[productId] - 1 : 1,
    }));
  };

  if (loading) {
    return <FeaturedProductsSkeleton limit={limit} />;
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-6">
        <Text className="text-red-500 text-center text-[16px] font-poppinsMedium">
          Something went wrong, please refresh to reconnect or try again.
        </Text>
        <TouchableRipple
          onPress={onRefresh}
          rippleColor="rgba(0, 0, 0, 0.1)"
          className="mt-4 px-6 py-2 bg-green-600 rounded-lg"
        >
          <Text className="text-white font-poppinsMedium text-[14px]">
            Try Again
          </Text>
        </TouchableRipple>
      </View>
    );
  }

  if (products.length === 0) {
    return (
      <Text className="text-gray-500 text-center">No products available</Text>
    );
  }

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <TouchableRipple
          onPress={() => {
            router.push({
              pathname: '/(screens)/(main)/product-details/[id]',
              params: { id: item.$id },
            });
          }}
          rippleColor="rgba(0, 0, 0, 0.1)"
          borderless={true}
          className="rounded-xl bg-white mb-4 w-[48%] p-3 shadow-sm relative"
        >
          <View>
            <TouchableRipple
              onPress={() => toggleFavorite(item.$id)}
              rippleColor="rgba(0, 0, 0, 0.1)"
              borderless={true}
              className="absolute rounded-full top-1 right-1 p-2"
              style={{ margin: -8 }}
            >
              <Ionicons
                name={favorites[item.$id] ? 'heart' : 'heart-outline'}
                size={20}
                color={favorites[item.$id] ? 'red' : 'gray'}
              />
            </TouchableRipple>

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

            <View className="items-center justify-center mb-3">
              <View className="w-24 h-24 rounded-full items-center justify-center">
                {item.image ? (
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: 100, height: 80 }}
                    contentFit="contain"
                  />
                ) : (
                  <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={{ width: 100, height: 80, borderRadius: 8 }}
                  />
                )}
              </View>
            </View>

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

            <View className="bg-[#EBEBEB] h-[1px] w-full my-3" />

            {!addedToCart[item.$id] ? (
              <TouchableRipple
                className="flex-row items-center justify-center border border-green-600 rounded-lg py-2"
                onPress={() => addToCart(item.$id)}
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
                  onPress={() => decrementQuantity(item.$id)}
                  className="px-3 h-full justify-center"
                  rippleColor="rgba(0, 0, 0, 0.1)"
                >
                  <Ionicons name="remove" size={24} color="#6CC51D" />
                </TouchableRipple>
                <Text className="text-black text-[16px] w-[50px] text-center font-poppinsMedium">
                  {quantities[item.$id] || 1}
                </Text>
                <TouchableRipple
                  onPress={() => incrementQuantity(item.$id)}
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
      keyExtractor={(item) => item.$id}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      contentContainerStyle={{ paddingBottom: 20 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#6CC51D']}
        />
      }
    />
  );
}

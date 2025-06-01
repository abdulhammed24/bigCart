import { View, Text, FlatList, RefreshControl } from 'react-native';
import { useEffect, useState } from 'react';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { TouchableRipple } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useProductStore } from '@/store/featuredProductsStore';
import { useFavoritesStore } from '@/store/favoritesStore';
import { useFavoriteToggle } from '@/hooks/useFavoriteToggle';
import FeaturedProductsSkeleton from './FeaturedProductsSkeleton';
import { ErrorState } from '../ErrorState';

type FeaturedProductsProps = {
  category?: string;
  limit?: number;
};

export default function FeaturedProducts({
  category,
  limit,
}: FeaturedProductsProps) {
  const router = useRouter();
  const {
    products,
    loading: productsLoading,
    error: productsError,
    fetchProducts,
    refreshProducts,
  } = useProductStore();
  const {
    isFavorite,
    loading: favoritesLoading,
    error: favoritesError,
  } = useFavoritesStore();
  const { handleFavoriteToggle } = useFavoriteToggle();
  const [addedToCart, setAddedToCart] = useState<{ [key: number]: boolean }>(
    {},
  );
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  let filteredProducts = category
    ? products.filter(
        (product) =>
          product.category?.trim().toLowerCase() ===
          category.trim().toLowerCase(),
      )
    : products;

  if (limit) {
    filteredProducts = filteredProducts.slice(0, limit);
  }

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

  if (productsLoading && products.length === 0) {
    return <FeaturedProductsSkeleton />;
  }

  if (productsError) {
    return <ErrorState message={productsError} onRetry={refreshProducts} />;
  }

  if (favoritesError) {
    return (
      <ErrorState
        message={favoritesError}
        onRetry={() => useFavoritesStore.getState().fetchFavorites()}
      />
    );
  }

  return (
    <FlatList
      data={filteredProducts}
      renderItem={({ item, index }) => (
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
            {/* Favorite (Heart) Icon */}
            <TouchableRipple
              onPress={() => handleFavoriteToggle(item.$id, item.name)}
              rippleColor="rgba(0, 0, 0, 0.1)"
              borderless={true}
              className="absolute rounded-full top-1 right-1 p-2"
              style={{ margin: -8 }}
            >
              <Ionicons
                name={isFavorite(item.$id) ? 'heart' : 'heart-outline'}
                size={20}
                color={isFavorite(item.$id) ? 'red' : 'gray'}
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
                    : item.discountPercentage
                    ? `-${item.discountPercentage}%`
                    : ''}
                </Text>
              </View>
            )}

            {/* Image with Colored Background */}
            <View className="items-center justify-center mb-3">
              <View className="w-24 h-24 rounded-full items-center justify-center">
                <Image
                  source={{
                    uri: item.image || 'https://via.placeholder.com/100x80',
                  }}
                  style={{ width: 80, height: 80, borderRadius: 100 }}
                  contentFit="cover"
                  cachePolicy="memory-disk"
                />
              </View>
            </View>

            {/* Product Info */}
            <View className="items-center justify-center">
              <Text className="text-green-600 font-poppinsMedium text-[14px]">
                ${item.price ? item.price.toFixed(2) : '0.00'}
              </Text>
              <Text className="font-poppinsBold text-[16px] mt-1">
                {item.name || 'Unnamed Product'}
              </Text>
              <Text className="text-gray-500 text-[13px] font-poppinsRegular">
                {item.unit || 'N/A'}
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
      keyExtractor={(item) => item.$id}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      contentContainerStyle={{ paddingBottom: 20 }}
      refreshControl={
        <RefreshControl
          refreshing={productsLoading || favoritesLoading}
          onRefresh={async () => {
            await Promise.all([
              refreshProducts(),
              useFavoritesStore.getState().fetchFavorites(),
            ]);
          }}
          colors={['#6CC51D']}
          tintColor="#6CC51D"
        />
      }
      ListEmptyComponent={
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500 text-center">
            No products available
          </Text>
        </View>
      }
    />
  );
}

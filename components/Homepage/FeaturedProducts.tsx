import { View, Text, FlatList, RefreshControl } from 'react-native';
import { useEffect } from 'react';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { TouchableRipple } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useProductStore } from '@/store/featuredProductsStore';
import { useFavoritesStore } from '@/store/favoritesStore';
import { useCartStore } from '@/store/cartStore';
import { useFavoriteToggle } from '@/hooks/useFavoriteToggle';
import { useCartToggle } from '@/hooks/useCartToggle';
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
  const { cartItems, error: cartError } = useCartStore();
  const { handleFavoriteToggle } = useFavoriteToggle();
  const { handleAddToCart, handleUpdateQuantity, isInCart } = useCartToggle();

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

  if (cartError) {
    return (
      <ErrorState
        message={cartError}
        onRetry={() => useCartStore.getState().fetchCart()}
      />
    );
  }

  return (
    <FlatList
      data={filteredProducts}
      renderItem={({ item, index }) => {
        const cartItem = cartItems.find((ci) => ci.productId === item.$id);
        const quantity = cartItem?.quantity || 1;

        return (
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
                      uri: item.image,
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
                <Text className="font-poppinsBold text-center text-[16px] mt-1">
                  {item.name || 'Unnamed Product'}
                </Text>
                <Text className="text-gray-500 text-[13px] font-poppinsRegular">
                  {item.unit}
                </Text>
              </View>

              {/* Divider */}
              <View className="bg-[#EBEBEB] h-[1px] w-full my-3" />

              {/* Add to Cart or Quantity Selector */}
              {!isInCart(item.$id) ? (
                <TouchableRipple
                  className="flex-row items-center justify-center border border-green-600 rounded-lg py-2"
                  onPress={() => handleAddToCart(item.$id, item.name)}
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
                    onPress={() => {
                      if (quantity > 1) {
                        handleUpdateQuantity(item.$id, item.name, quantity - 1);
                      }
                    }}
                    className="px-3 h-full justify-center"
                    rippleColor="rgba(0, 0, 0, 0.1)"
                  >
                    <Ionicons name="remove" size={24} color="#6CC51D" />
                  </TouchableRipple>
                  <Text className="text-black text-[16px] w-[50px] text-center font-poppinsMedium">
                    {quantity}
                  </Text>
                  <TouchableRipple
                    onPress={() =>
                      handleUpdateQuantity(item.$id, item.name, quantity + 1)
                    }
                    className="px-3 h-full justify-center"
                    rippleColor="rgba(0, 0, 0, 0.1)"
                  >
                    <Ionicons name="add" size={24} color="#6CC51D" />
                  </TouchableRipple>
                </View>
              )}
            </View>
          </TouchableRipple>
        );
      }}
      keyExtractor={(item) => item.$id}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      contentContainerStyle={{ paddingBottom: 20 }}
      refreshControl={
        <RefreshControl
          refreshing={productsLoading}
          onRefresh={async () => {
            await Promise.all([
              refreshProducts(),
              useFavoritesStore.getState().fetchFavorites(),
              useCartStore.getState().fetchCart(),
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

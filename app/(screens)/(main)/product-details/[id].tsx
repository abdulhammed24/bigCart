import { PrimaryBtn } from '@/components/PrimaryBtn';
import Rating from '@/components/Rating';
import { useProductStore } from '@/store/featuredProductsStore';
import { useFavoritesStore } from '@/store/favoritesStore';
import { useCartStore } from '@/store/cartStore';
import { useFavoriteToggle } from '@/hooks/useFavoriteToggle';
import { useCartToggle } from '@/hooks/useCartToggle';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StatusBar, ScrollView } from 'react-native';
import { ImageBackground, Text, View } from 'react-native';
import { IconButton, TouchableRipple } from 'react-native-paper';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { ErrorState } from '@/components/ErrorState';
import { LoadingState } from '@/components/LoadingState';

export default function SingleProductDetails() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const {
    products,
    loading: productsLoading,
    error: productsError,
    fetchProducts,
  } = useProductStore();
  const { isFavorite, error: favoritesError } = useFavoritesStore();
  const { cartItems, error: cartError } = useCartStore();
  const { handleFavoriteToggle } = useFavoriteToggle();
  const { handleAddToCart, handleUpdateQuantity, isInCart } = useCartToggle();

  // Local state for optimistic quantity updates
  const [localQuantity, setLocalQuantity] = useState(1);

  // Find the product by id from the store
  const product = products.find((p) => p.$id === id);
  const cartItem = cartItems.find((ci) => ci.productId === id);

  // Sync local quantity with cart state
  useEffect(() => {
    if (cartItem) {
      setLocalQuantity(cartItem.quantity);
    } else {
      setLocalQuantity(1);
    }
  }, [cartItem]);

  // Fetch products if not already loaded
  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [fetchProducts, products.length]);

  // Handle loading state
  if (productsLoading) {
    return <LoadingState message="Loading product..." />;
  }

  // Handle error or no product found
  if (productsError || !product) {
    return (
      <ErrorState
        message={productsError || `Product with ID ${id} not found`}
        onRetry={fetchProducts}
      />
    );
  }

  // Handle favorites error
  if (favoritesError) {
    return (
      <ErrorState
        message={favoritesError}
        onRetry={() => useFavoritesStore.getState().fetchFavorites()}
      />
    );
  }

  // Handle cart error
  if (cartError) {
    return (
      <ErrorState
        message={cartError}
        onRetry={() => useCartStore.getState().fetchCart()}
      />
    );
  }

  return (
    <View className="flex-1">
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent />
      <SafeAreaView
        style={{ flex: 1 }}
        edges={['bottom', 'left', 'right']}
        className="bg-white"
      >
        <ScrollView
          className="flex-1 bg-offWhite"
          contentContainerStyle={{ paddingBottom: 140 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Image Section */}
          <View className="h-[400px]">
            <ImageBackground
              source={{ uri: product.image }}
              resizeMode="cover"
              style={{ flex: 1, paddingTop: insets.top }}
              className="flex-1 justify-start p-6"
            >
              <View className="flex-row items-center mt-5 justify-between">
                <IconButton
                  onPress={() => router.back()}
                  icon={() => (
                    <Image
                      source={require('@/assets/icons/back-arrow-blk.svg')}
                      style={{ width: 24, height: 24 }}
                      contentFit="contain"
                    />
                  )}
                  size={24}
                  accessibilityLabel="Go back"
                  rippleColor="rgba(0, 0, 0, 0.1)"
                  style={{ margin: -8 }}
                  className="rounded-full"
                />
              </View>
            </ImageBackground>
          </View>

          {/* Content Section */}
          <View className="p-6 bg-offWhite rounded-t-[20px] mt-[-20px]">
            <View className="flex flex-row justify-between mb-2">
              <Text className="text-[20px] font-poppinsBold text-deepPrimary">
                ${product.price.toFixed(2)}
              </Text>

              <TouchableRipple
                onPress={() => handleFavoriteToggle(product.$id, product.name)}
                rippleColor="rgba(0, 0, 0, 0.1)"
                borderless={true}
                className="absolute rounded-full top-1 right-1 p-2"
                style={{ margin: -8 }}
              >
                <Ionicons
                  name={isFavorite(product.$id) ? 'heart' : 'heart-outline'}
                  size={24}
                  color={isFavorite(product.$id) ? 'red' : 'gray'}
                />
              </TouchableRipple>
            </View>

            <View className="mb-4">
              <Text className="text-[24px] font-poppinsBold text-black">
                {product.name}
              </Text>
              <Text className="text-gray font-poppinsRegular text-[14px]">
                {product.unit}
              </Text>
            </View>

            <View className="flex-row items-center flex gap-1 mb-4">
              <Text className="text-black font-poppinsBold mt-1 text-[14px]">
                {product.rating}
              </Text>
              <Rating rating={product.rating} />
              <Text className="text-gray font-poppinsMedium text-[14px]">
                ({product.reviews} reviews)
              </Text>
            </View>

            <View className="mb-6">
              <Text className="text-gray font-poppinsMedium text-[14px]">
                {product.description}
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Footer Section */}
        <View
          style={{
            position: 'absolute',
            bottom: insets.bottom,
            left: 0,
            right: 0,
            paddingHorizontal: 24,
            paddingVertical: 12,
            backgroundColor: '#F4F5F9',
          }}
        >
          <View className="mb-4 rounded-[10px] h-[50px] bg-white flex items-center justify-between flex-row">
            <View className="px-5">
              <Text className="text-gray font-poppinsMedium text-[14px]">
                Quantity
              </Text>
            </View>
            <View className="flex-row items-center justify-between rounded-[10px] h-full overflow-hidden">
              <TouchableRipple
                onPress={() => {
                  if (localQuantity > 1) {
                    setLocalQuantity(localQuantity - 1);
                    handleUpdateQuantity(
                      product.$id,
                      product.name,
                      localQuantity - 1,
                    );
                  }
                }}
                rippleColor="rgba(0, 0, 0, 0.1)"
                borderless={true}
                className="px-5 h-full justify-center"
              >
                <Ionicons name="remove" size={24} color="#6CC51D" />
              </TouchableRipple>
              <View className="h-full w-[1px] bg-[#EBEBEB]" />
              <Text className="text-black text-[20px] w-[50px] text-center font-poppinsBold">
                {localQuantity}
              </Text>
              <View className="h-full w-[1px] bg-[#EBEBEB]" />
              <TouchableRipple
                onPress={() => {
                  setLocalQuantity(localQuantity + 1);
                  handleUpdateQuantity(
                    product.$id,
                    product.name,
                    localQuantity + 1,
                  );
                }}
                rippleColor="rgba(0, 0, 0, 0.1)"
                borderless={true}
                className="px-5 h-full justify-center"
              >
                <Ionicons name="add" size={24} color="#6CC51D" />
              </TouchableRipple>
            </View>
          </View>

          <PrimaryBtn
            title={isInCart(product.$id) ? 'View Cart' : 'Add to Cart'}
            onPress={() => {
              if (!isInCart(product.$id)) {
                handleAddToCart(product.$id, product.name, localQuantity);
              }
              router.push('/(screens)/(main)/cart');
            }}
            rightIcon={require('@/assets/icons/cart.svg')}
            style={{ borderRadius: 10 }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

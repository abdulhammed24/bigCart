import { PrimaryBtn } from '@/components/PrimaryBtn';
import Rating from '@/components/Rating';
import { useProductStore } from '@/store/featuredProductsStore';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { StatusBar, ScrollView, RefreshControl } from 'react-native';
import { ImageBackground, Text, View } from 'react-native';
import { IconButton, TouchableRipple } from 'react-native-paper';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { ErrorState } from '@/components/ErrorState';
import { LoadingState } from '@/components/LoadingState';

export default function SingleProductDetails() {
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
  const [quantity, setQuantity] = useState(1);
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { products, loading, error, fetchProducts, refreshProducts } =
    useProductStore();

  // State for pull-to-refresh
  const [refreshing, setRefreshing] = useState(false);

  // Fetch products if not already loaded
  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [fetchProducts, products.length]);

  // Find the product by id from the store
  const product = products.find((p) => p.$id === id);

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Handle pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await refreshProducts();
    setRefreshing(false);
  };

  // Handle loading state
  if (loading) {
    return <LoadingState message="Loading product..." />;
  }

  // Handle error or no product found
  if (error || !product) {
    return (
      <ErrorState
        message={error || `Product with ID ${id} not found`}
        onRetry={fetchProducts}
      />
    );
  }

  return (
    <View className="flex-1">
      <StatusBar barStyle="default" backgroundColor="transparent" translucent />
      <SafeAreaView
        style={{ flex: 1 }}
        edges={['bottom', 'left', 'right']}
        className="bg-white"
      >
        {/*  */}
        <ScrollView
          className="flex-1 bg-offWhite"
          contentContainerStyle={{ paddingBottom: 140 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#6CC51D']}
              tintColor="#6CC51D"
              progressViewOffset={insets.top + 60}
            />
          }
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

          {/*  */}
          <View className="p-6 bg-offWhite rounded-t-[20px] mt-[-20px]">
            <View className="flex flex-row justify-between mb-2">
              <Text className="text-[20px] font-poppinsBold text-deepPrimary">
                ${product.price.toFixed(2)}
              </Text>

              <TouchableRipple
                onPress={() => toggleFavorite(product.$id)}
                rippleColor="rgba(0, 0, 0, 0.1)"
                borderless={true}
                className="absolute rounded-full top-1 right-1 p-2"
                style={{ margin: -8 }}
              >
                <Ionicons
                  name={favorites[product.$id] ? 'heart' : 'heart-outline'}
                  size={24}
                  color={favorites[product.$id] ? 'red' : 'gray'}
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
                ({product.reviews || 0} reviews)
              </Text>
            </View>

            <View className="mb-6">
              <Text className="text-gray font-poppinsMedium text-[14px]">
                {product.description}
              </Text>
            </View>
          </View>
        </ScrollView>

        {/*  */}
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
                onPress={decrementQuantity}
                rippleColor="rgba(0, 0, 0, 0.1)"
                borderless={true}
                className="px-5 h-full justify-center"
              >
                <Ionicons name="remove" size={24} color="#6CC51D" />
              </TouchableRipple>
              <View className="h-full w-[1px] bg-[#EBEBEB]" />
              <Text className="text-black text-[20px] w-[50px] text-center font-poppinsBold">
                {quantity}
              </Text>
              <View className="h-full w-[1px] bg-[#EBEBEB]" />
              <TouchableRipple
                onPress={incrementQuantity}
                rippleColor="rgba(0, 0, 0, 0.1)"
                borderless={true}
                className="px-5 h-full justify-center"
              >
                <Ionicons name="add" size={24} color="#6CC51D" />
              </TouchableRipple>
            </View>
          </View>

          <PrimaryBtn
            title="Add to Cart"
            onPress={() => {
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

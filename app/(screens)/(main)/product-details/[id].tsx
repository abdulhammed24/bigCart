import { PrimaryBtn } from '@/components/PrimaryBtn';
import Rating from '@/components/Rating';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { ImageBackground, Text, View } from 'react-native';
import { IconButton, TouchableRipple } from 'react-native-paper';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

const product = {
  id: 1,
  name: 'Organic Lemons',
  price: 2.22,
  weight: '1.50 lbs',
  rating: 4.5,
  reviews: 89,
  description:
    'Organic Mountain works as a seller for many organic growers of organic lemons. Organic lemons are easy to spot in your produce aisle. They are just like regular lemons, but they will usually have a few more scars on the outside of the lemon skin. Organic lemons are considered to be the world’s finest lemon for juicing.',
  image: require('@/assets/images/homepage/heroBg2.png'),
};

export default function SingleProductDetails() {
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});
  const [quantity, setQuantity] = useState(1);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <View className="flex-1">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View className="h-[400px]">
        <ImageBackground
          source={product.image}
          resizeMode="cover"
          style={{ flex: 0.8, paddingTop: insets.top }}
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

      <SafeAreaView
        style={{ flex: 1, marginTop: -20 }}
        edges={['bottom', 'left', 'right']}
        className="bg-offWhite rounded-t-[20px] p-6 shadow-lg"
      >
        <View>
          <View className="flex flex-row justify-between mb-2">
            <Text className="text-[20px] font-poppinsBold text-deepPrimary">
              ${product.price.toFixed(2)}
            </Text>

            <TouchableRipple
              onPress={() => toggleFavorite(product.id)}
              rippleColor="rgba(0, 0, 0, 0.1)"
              borderless={true}
              className="absolute rounded-full top-1 right-1 p-2"
              style={{ margin: -8 }}
            >
              <Ionicons
                name={favorites[product.id] ? 'heart' : 'heart-outline'}
                size={24}
                color={favorites[product.id] ? 'red' : 'gray'}
              />
            </TouchableRipple>
          </View>

          <View className="mb-4">
            <Text className="text-[24px] font-poppinsBold text-black">
              {product.name}
            </Text>
            <Text className="text-gray font-poppinsRegular text-[14px]">
              {product.weight}
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

          <View className="mb-6 rounded-[10px] h-[50px] bg-white flex items-center justify-between flex-row">
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

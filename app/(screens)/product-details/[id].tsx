import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';

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

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const router = useRouter();

  // Increment and decrement quantity
  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <View className="flex-1 bg-gray-100">
      {/* ImageBackground - Top Half */}
      <View style={{ flex: 0.8 }}>
        <ImageBackground
          source={product.image}
          resizeMode="cover"
          style={{ flex: 1 }}
          className="justify-start p-6"
        >
          <View className="flex-row items-center justify-between">
            <TouchableOpacity onPress={() => router.back()}>
              <Image
                source={require('@/assets/icons/back-arrow-blk.svg')}
                style={{ width: 24, height: 24 }}
                contentFit="contain"
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      {/* Content - Bottom Half */}
      <View className="flex-1 bg-offWhite rounded-t-[20px] p-6 -mt-5 shadow-lg">
        <View>
          <View className="flex flex-row justify-between mb-2">
            {/* Price */}
            <Text className="text-[20px] font-poppinsBold  text-deepPrimary">
              ${product.price.toFixed(2)}
            </Text>

            <TouchableOpacity onPress={() => toggleFavorite(product.id)}>
              <Ionicons
                name={favorites[product.id] ? 'heart' : 'heart-outline'}
                size={24}
                color={favorites[product.id] ? 'red' : 'gray'}
              />
            </TouchableOpacity>
          </View>

          {/* Title & Weight */}
          <View className="mb-4">
            <Text className="text-[24px] font-poppinsBold text-black">
              {product.name}
            </Text>
            <Text className="text-gray font-poppinsRegular text-[14px]">
              {product.weight}
            </Text>
          </View>

          {/* Rating */}
          <View className="flex-row items-center flex gap-1 mb-4">
            <Text className="text-black font-poppinsBold text-[14px]">
              {product.rating}
            </Text>
            <Text className="text-yellow-500">⭐ </Text>
            <Text className="text-gray font-poppinsMedium text-[14px]">
              ({product.reviews} reviews)
            </Text>
          </View>

          {/* Description */}
          <View className="mb-6">
            <Text className="text-gray font-poppinsMedium text-[14px]">
              {product.description}
            </Text>
          </View>

          {/* Quantity Selector */}
          <View className="mb-6 rounded-[10px] h-[50px] bg-white flex items-center justify-between flex-row">
            <View className="px-5">
              <Text className="text-gray font-poppinsMedium text-[14px]">
                Quantity
              </Text>
            </View>
            <View className="flex-row items-center justify-between bg-gray-100 rounded-full h-full overflow-hidden">
              <TouchableOpacity
                onPress={decrementQuantity}
                className="px-5 h-full justify-center"
              >
                <Ionicons name="remove" size={24} color="#6CC51D" />
              </TouchableOpacity>

              {/* Left line */}
              <View className="h-full w-[1px] bg-[#EBEBEB]" />

              <Text className="text-black text-[20px] w-[50px] text-center  font-poppinsBold">
                {quantity}
              </Text>

              {/* Right line */}
              <View className="h-full w-[1px] bg-[#EBEBEB]" />

              <TouchableOpacity
                onPress={incrementQuantity}
                className="px-5 h-full justify-center"
              >
                <Ionicons name="add" size={24} color="#6CC51D" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Add to Cart Button */}
          <TouchableOpacity>
            <LinearGradient
              colors={['#aedc81', '#6cc51d']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ borderRadius: 10 }}
              className="flex-row p-4 items-center h-[60px] shadow-md"
            >
              <Text className="text-white text-[16px] font-semibold flex-1 text-center">
                Add to Cart
              </Text>
              <Ionicons name="cart-outline" size={24} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

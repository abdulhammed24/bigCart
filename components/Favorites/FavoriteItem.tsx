import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { TouchableRipple } from 'react-native-paper';

interface FavoriteItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    weight: string;
    image: any;
  };
  onRemove: (id: string) => void;
  onAddToCart?: (item: {
    id: string;
    name: string;
    price: number;
    weight: string;
    image: any;
  }) => void;
}

export const FavoriteItem: React.FC<FavoriteItemProps> = ({
  item,
  onAddToCart,
}) => {
  return (
    <View className="flex flex-col gap-5 p-3 justify-between items-start bg-white rounded-lg">
      <View className="flex flex-row gap-5 items-center ">
        <View>
          <Image
            source={item.image}
            style={{ width: 50, height: 50 }}
            contentFit="contain"
          />
        </View>
        <View>
          <Text className="text-primary font-poppinsMedium text-[12px]">
            ${item.price.toFixed(2)}
          </Text>
          <Text className="text-black font-poppinsBold text-[16px]">
            {item.name}
          </Text>
          <Text className="text-gray font-poppinsRegular text-[12px]">
            {item.weight}
          </Text>
        </View>
      </View>
      <View className="flex justify-center self-end">
        <TouchableRipple
          className="flex-row items-center justify-center border border-green-600 rounded-lg py-2 px-2"
          onPress={() => onAddToCart?.(item)}
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
      </View>
    </View>
  );
};

export const HiddenFavoriteItem: React.FC<FavoriteItemProps> = ({
  item,
  onRemove,
}) => {
  return (
    <View className="flex flex-row gap-5 p-3 justify-end flex-1 items-center bg-[#FF3B30] rounded-lg">
      <Pressable
        onPress={() => onRemove(item.id)}
        className="w-12 h-full items-center justify-center"
      >
        <Ionicons name="trash" size={24} color="white" />
      </Pressable>
    </View>
  );
};

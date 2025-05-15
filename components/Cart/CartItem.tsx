import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    weight: string;
    image: any;
  };
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onDelete: (id: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onIncrement,
  onDecrement,
}) => {
  return (
    <View className="flex flex-row gap-5 p-3 justify-between items-center bg-white rounded-lg">
      <View className="flex flex-row gap-5 items-center flex-[0.7]">
        <View>
          <Image
            source={item.image}
            style={{ width: 50, height: 50 }}
            contentFit="contain"
          />
        </View>
        <View>
          <Text className="text-primary font-poppinsMedium text-[12px]">
            ${item.price.toFixed(2)} x {item.quantity}
          </Text>
          <Text className="text-black font-poppinsBold text-[16px]">
            {item.name}
          </Text>
          <Text className="text-gray font-poppinsRegular text-[12px]">
            {item.weight}
          </Text>
        </View>
      </View>
      <View className="flex-[0.3] flex items-end">
        <View className="flex-col items-center justify-between overflow-hidden">
          <Pressable
            onPress={() => onIncrement(item.id)}
            className="flex items-center justify-center"
            accessibilityLabel="Increase quantity"
          >
            <Ionicons name="add" size={24} color="#6CC51D" />
          </Pressable>
          <Text
            className="text-gray text-[20px] h-[40px] rounded-full font-poppinsBold text-center"
            style={{ lineHeight: 60 }}
          >
            {item.quantity}
          </Text>
          <Pressable
            onPress={() => onDecrement(item.id)}
            className="flex items-center justify-center"
            accessibilityLabel="Decrease quantity"
          >
            <Ionicons name="remove" size={24} color="#6CC51D" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export const HiddenCartItem: React.FC<
  Pick<CartItemProps, 'item' | 'onDelete'>
> = ({ item, onDelete }) => {
  return (
    <View className="flex flex-row gap-5 p-3 justify-end flex-1 items-center bg-[#FF3B30] rounded-lg">
      <Pressable
        className="w-12 h-full items-center justify-center"
        onPress={() => onDelete(item.id)}
      >
        <Ionicons name="trash" size={24} color="white" />
      </Pressable>
    </View>
  );
};

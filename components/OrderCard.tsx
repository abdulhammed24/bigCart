import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';

// Define the types for the order and tracking steps
interface TrackingStep {
  label: string;
  date: string;
  done: boolean;
}

interface Order {
  orderNumber: string;
  placedOn: string;
  items: number;
  amount: number;
  tracking: TrackingStep[];
}

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <View className="bg-white gap-5 p-6">
      <Pressable
        onPress={toggleExpand}
        accessibilityLabel={isExpanded ? 'Collapse form' : 'Expand form'}
        className="flex flex-row gap-5 items-center justify-between"
      >
        <View className="flex-[0.2] items-center">
          <Image
            source={require('@/assets/icons/order.svg')}
            style={{ width: 66, height: 66 }}
            contentFit="contain"
          />
        </View>

        <View className="flex-[0.75] px-4 space-y-2">
          <Text className="font-poppinsBold text-[16px]">
            Order {order.orderNumber}
          </Text>
          <Text className="font-poppinsRegular text-[12px] text-gray">
            Placed on {order.placedOn}
          </Text>
          <View className="flex-row justify-between">
            <Text className="font-poppinsBold text-[12px]">
              Items: <Text className="font-poppinsBold">{order.items}</Text>
            </Text>
            <Text className="font-poppinsBold text-[12px]">
              Amount:{' '}
              <Text className="font-poppinsBold">
                ${order.amount.toFixed(2)}
              </Text>
            </Text>
          </View>
        </View>

        <View className="flex-[0.05] items-center">
          <Image
            source={require('@/assets/icons/my-address/collapse.svg')}
            style={{
              width: 18,
              height: 18,
              transform: [{ rotate: isExpanded ? '0deg' : '180deg' }],
            }}
            contentFit="contain"
          />
        </View>
      </Pressable>

      {isExpanded && (
        <>
          <View className="h-[1px] w-full bg-[#EBEBEB]" />

          <View className="flex flex-col gap-1.5">
            {order.tracking.map((step, index, arr) => (
              <View key={index} className="flex-row items-center">
                {/* Timeline markers (circles and lines) */}
                <View className="items-center w-5 mr-3">
                  <View
                    className={`w-3 h-3 rounded-full ${
                      step.done ? 'bg-[#34C759]' : 'bg-gray'
                    }`}
                  />
                  {index < arr.length - 1 && (
                    <View className="w-[2px] h-6 bg-gray mt-1" />
                  )}
                </View>

                {/* Timeline text (label and date) */}
                <View className="flex flex-row flex-1 justify-between items-center">
                  <Text
                    className={`text-[14px] font-poppinsBold ${
                      step.done ? 'text-black' : 'text-gray'
                    }`}
                  >
                    {step.label}
                  </Text>
                  <Text
                    className={`text-[12px] font-poppinsRegular ${
                      step.done ? 'text-black' : 'text-gray'
                    }`}
                  >
                    {step.date}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </>
      )}
    </View>
  );
};

export default OrderCard;

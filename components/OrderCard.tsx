// import React, { useState } from 'react';
// import { View, Text, Pressable } from 'react-native';
// import { Image } from 'expo-image';

// // Define the types for the order and tracking steps
// interface TrackingStep {
//   label: string;
//   date: string;
//   done: boolean;
// }

// interface Order {
//   orderNumber: string;
//   placedOn: string;
//   items: number;
//   amount: number;
//   tracking: TrackingStep[];
// }

// interface OrderCardProps {
//   order: Order;
// }

// const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
//   const [isExpanded, setIsExpanded] = useState<boolean>(false);

//   const toggleExpand = () => {
//     setIsExpanded((prev) => !prev);
//   };

//   return (
//     <View className="bg-white gap-5 p-6">
//       <Pressable
//         onPress={toggleExpand}
//         accessibilityLabel={isExpanded ? 'Collapse form' : 'Expand form'}
//         className="flex flex-row gap-5 items-center justify-between"
//       >
//         <View className="flex-[0.2] items-center">
//           <Image
//             source={require('@/assets/icons/order.svg')}
//             style={{ width: 66, height: 66 }}
//             contentFit="contain"
//           />
//         </View>

//         <View className="flex-[0.75] px-4 space-y-2">
//           <Text className="font-poppinsBold text-[16px]">
//             Order {order.orderNumber}
//           </Text>
//           <Text className="font-poppinsRegular text-[12px] text-gray">
//             Placed on {order.placedOn}
//           </Text>
//           <View className="flex-row justify-between">
//             <Text className="font-poppinsBold text-[12px]">
//               Items: <Text className="font-poppinsBold">{order.items}</Text>
//             </Text>
//             <Text className="font-poppinsBold text-[12px]">
//               Amount:{' '}
//               <Text className="font-poppinsBold">
//                 ${order.amount.toFixed(2)}
//               </Text>
//             </Text>
//           </View>
//         </View>

//         <View className="flex-[0.05] items-center">
//           <Image
//             source={require('@/assets/icons/my-address/collapse.svg')}
//             style={{
//               width: 18,
//               height: 18,
//               transform: [{ rotate: isExpanded ? '0deg' : '180deg' }],
//             }}
//             contentFit="contain"
//           />
//         </View>
//       </Pressable>

//       {isExpanded && (
//         <>
//           <View className="h-[1px] w-full bg-[#EBEBEB]" />

//           <View className="flex flex-col gap-6 relative">
//             {order.tracking.map((step, index, arr) => (
//               <View key={index} className="flex-row items-center relative">
//                 {/* Line segment between this step and the next (except for the last step) */}
//                 {index < arr.length - 1 && (
//                   <View
//                     className={`absolute w-[1px] h-12 ${
//                       step.done && arr[index + 1].done
//                         ? 'bg-primary'
//                         : 'bg-offWhite'
//                     }`}
//                     style={{
//                       left: 8,
//                       top: 10,
//                     }}
//                   />
//                 )}

//                 {/* Dot column */}
//                 <View className="w-5 mr-3 items-center">
//                   <View
//                     className={`w-2.5 h-2.5 rounded-full z-10 ${
//                       step.done ? 'bg-primary' : 'bg-offWhite'
//                     }`}
//                   />
//                 </View>

//                 {/* Timeline text (label and date) */}
//                 <View className="flex flex-row flex-1 justify-between items-center">
//                   <Text
//                     className={`text-[14px] font-poppinsBold ${
//                       step.done ? 'text-black' : 'text-gray'
//                     }`}
//                   >
//                     {step.label}
//                   </Text>
//                   <Text
//                     className={`text-[12px] font-poppinsRegular ${
//                       step.done ? 'text-black' : 'text-gray'
//                     }`}
//                   >
//                     {step.date}
//                   </Text>
//                 </View>
//               </View>
//             ))}
//           </View>
//         </>
//       )}
//     </View>
//   );
// };

// export default OrderCard;

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
          <Text className="font-poppinsRegular text-[12px] text-black">
            {' '}
            {/* Changed to black for visibility */}
            Placed on {order.placedOn || 'N/A'}
          </Text>
          <View className="flex-row justify-between">
            <Text className="font-poppinsBold text-[12px] text-black">
              {' '}
              {/* Changed to black for visibility */}
              Items:{' '}
              <Text className="font-poppinsBold">{order.items || 'N/A'}</Text>
            </Text>
            <Text className="font-poppinsBold text-[12px] text-black">
              {' '}
              {/* Changed to black for visibility */}
              Amount:{' '}
              <Text className="font-poppinsBold">
                ${order.amount ? order.amount.toFixed(2) : 'N/A'}
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

          <View className="flex flex-col gap-6 relative">
            {order.tracking.map((step, index, arr) => (
              <View key={index} className="flex-row items-center relative">
                {index < arr.length - 1 && (
                  <View
                    className={`absolute w-[1px] h-12 ${
                      step.done && arr[index + 1].done
                        ? 'bg-primary'
                        : 'bg-offWhite'
                    }`}
                    style={{
                      left: 8,
                      top: 10,
                    }}
                  />
                )}

                <View className="w-5 mr-3 items-center">
                  <View
                    className={`w-2.5 h-2.5 rounded-full z-10 ${
                      step.done ? 'bg-primary' : 'bg-offWhite'
                    }`}
                  />
                </View>

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
                    {step.date || 'Pending'}
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

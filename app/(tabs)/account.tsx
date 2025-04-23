import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { View, Text, Pressable } from 'react-native';

const accountItems = [
  {
    icon: require('@/assets/icons/account/about-me.svg'),
    label: 'About me',
    href: '/account/about',
  },
  {
    icon: require('@/assets/icons/account/orders.svg'),
    label: 'My orders',
    href: '/account/orders',
  },
  {
    icon: require('@/assets/icons/account/favorites.svg'),
    label: 'My favorites',
    href: '/account/favorites',
  },
  {
    icon: require('@/assets/icons/account/address.svg'),
    label: 'My address',
    href: '/account/address',
  },
  {
    icon: require('@/assets/icons/account/credits-card.svg'),
    label: 'Credit cards',
    href: '/account/cards',
  },
  {
    icon: require('@/assets/icons/account/transactions.svg'),
    label: 'Transactions',
    href: '/account/transactions',
  },
  {
    icon: require('@/assets/icons/account/notifications.svg'),
    label: 'Notifications',
    href: '/account/notifications',
  },
  {
    icon: require('@/assets/icons/account/sign-out.svg'),
    label: 'Sign out',
    href: '/logout',
    noArrow: true,
  },
];

export default function Account() {
  return (
    <View className="flex-1">
      {/*  */}
      <View className="p-6 h-32 bg-white" />

      {/* Floating profile card */}
      <View className="absolute top-10 left-0 right-0 items-center z-10">
        {/* Profile Image Wrapper */}
        <View className="relative">
          <View className="w-[120px] h-[120px] rounded-full overflow-hidden">
            <Image
              source={require('@/assets/images/user-pp.png')}
              style={{ width: '100%', height: '100%' }}
              contentFit="contain"
            />
          </View>

          {/* Camera Icon Outside and Overlapping */}
          <View className="bg-deepPrimary size-6 rounded-full justify-center items-center absolute bottom-2 right-2 z-20">
            <Image
              source={require('@/assets/icons/camera.svg')}
              style={{ width: 13, height: 10 }}
              contentFit="contain"
            />
          </View>
        </View>

        {/* Name & Email */}
        <View className="items-center mt-4">
          <Text className="font-poppinsBold text-[18px]">Olivia Austin</Text>
          <Text className="text-[14px] font-poppinsRegular text-gray">
            oliviaaustin@gmail.com
          </Text>
        </View>
      </View>

      {/*  */}
      <View className="bg-offWhite pt-40 px-6 flex-1">
        <View className="flex flex-col gap-2">
          {accountItems.map((item, index) => (
            <Pressable
              key={index}
              className="flex-row justify-between items-center p-3 rounded-xl"
              // style={({ pressed }) => [
              //   {
              //     backgroundColor: pressed ? '#f0f0f0' : 'transparent',
              //     transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }],
              //   },
              // ]}
              onPress={() => console.log('Pressed')}
            >
              <View className="flex-row items-center gap-3">
                <Image
                  source={item.icon}
                  style={{ width: 20, height: 20 }}
                  contentFit="contain"
                />
                <Text className="font-poppinsBold text-[14px]">
                  {item.label}
                </Text>
              </View>

              {!item.noArrow && (
                <Image
                  source={require('@/assets/icons/view-all.svg')}
                  style={{ width: 10, height: 18 }}
                  contentFit="contain"
                />
              )}
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}

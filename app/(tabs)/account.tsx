import { Image } from 'expo-image';
import { LinkProps } from 'expo-router';
import { View, Text } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import Toast from 'react-native-toast-message';

interface AccountItem {
  icon: any;
  label: string;
  href?: LinkProps['href'];
  noArrow?: boolean;
  onPress?: () => void;
}

const accountItems: AccountItem[] = [
  {
    icon: require('@/assets/icons/account/about-me.svg'),
    label: 'About me',
    href: '/(screens)/(main)/about',
  },
  {
    icon: require('@/assets/icons/account/orders.svg'),
    label: 'My orders',
    href: '/(screens)/(main)/my-orders',
  },
  {
    icon: require('@/assets/icons/account/favorites.svg'),
    label: 'My favorites',
    href: '/(screens)/(main)/favorites',
  },
  {
    icon: require('@/assets/icons/account/address.svg'),
    label: 'My address',
    href: '/(screens)/(main)/my-address',
  },
  {
    icon: require('@/assets/icons/account/credits-card.svg'),
    label: 'Credit cards',
    href: '/(screens)/(main)/my-cards',
  },
  {
    icon: require('@/assets/icons/account/transactions.svg'),
    label: 'Transactions',
    href: '/(screens)/(main)/transactions',
  },
  {
    icon: require('@/assets/icons/account/notifications.svg'),
    label: 'Notifications',
    href: '/(screens)/(main)/notifications',
  },
  {
    icon: require('@/assets/icons/account/sign-out.svg'),
    label: 'Sign out',
    noArrow: true,
    onPress: () => {}, // Placeholder, will be overridden
  },
];

export default function Account() {
  const router = useRouter();
  const { logout } = useAuthStore();
  const handleItemPress = async (item: AccountItem) => {
    if (item.label === 'Sign out') {
      try {
        await logout();
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'You have been signed out.',
        });
        router.replace('/(screens)/(auth)/login');
      } catch (error: any) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to sign out. Please try again.',
        });
      }
    } else if (item.href) {
      router.push(item.href);
    }
  };

  //
  const { user } = useAuthStore();

  return (
    <View className="flex-1">
      {/* Header */}
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
          {/* <Text className="font-poppinsBold text-[18px]">
    {user?.name || 'User'}
  </Text> */}

          <Text className="font-poppinsBold text-[18px]">Olivia Austin</Text>
          <Text className="text-[14px] font-poppinsRegular text-gray">
            {user?.email || 'No email'}
          </Text>
        </View>
      </View>

      {/* Account Items */}
      <View className="bg-offWhite pt-40 flex-1">
        <View className="flex flex-col gap-2">
          {accountItems.map((item, index) => (
            <TouchableRipple
              key={index}
              onPress={() => handleItemPress(item)}
              rippleColor="rgba(0, 0, 0, 0.1)"
              className="p-3 px-6 rounded-xl"
            >
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center gap-3">
                  <Image
                    source={item.icon}
                    style={{ width: 20, height: 20 }}
                    contentFit="contain"
                  />
                  <Text className="font-poppinsBold text-[15px]">
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
              </View>
            </TouchableRipple>
          ))}
        </View>
      </View>
    </View>
  );
}

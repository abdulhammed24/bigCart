import { View, Text, ImageBackground, Dimensions } from 'react-native';
import { Image } from 'expo-image';

const { width, height } = Dimensions.get('window');

interface Slide {
  id: string;
  title: string;
  description: string;
  bg: any;
}

export const slides: Slide[] = [
  {
    id: '1',
    title: 'Welcome to ',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy',
    bg: require('@/assets/images/onboarding/bg1.png'),
  },
  {
    id: '2',
    title: 'Buy Quality\nDairy Products',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy',
    bg: require('@/assets/images/onboarding/bg2.png'),
  },
  {
    id: '3',
    title: 'Buy Premium\nQuality Fruits',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy',
    bg: require('@/assets/images/onboarding/bg3.png'),
  },
  {
    id: '4',
    title: 'Get Discounts\nOn All Products',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy',
    bg: require('@/assets/images/onboarding/bg4.png'),
  },
];

interface SlideItemProps {
  item: Slide;
  index: number;
}

export const OnboardingSlides = ({ item, index }: SlideItemProps) => (
  <ImageBackground
    source={item.bg}
    style={{ width, height }}
    resizeMode="cover"
  >
    <View className="flex-1 items-center max-w-[350px] mx-auto p-6">
      <Text className="text-[30px] font-poppinsBold font-semibold text-black text-center">
        {item.title}
      </Text>
      {index === 0 && (
        <Image
          source={require('@/assets/images/bigCart.svg')}
          style={{ width: 130, height: 50 }}
          contentFit="contain"
        />
      )}
      <Text className="text-gray text-center font-poppinsRegular text-[16px]">
        {item.description}
      </Text>
    </View>
  </ImageBackground>
);

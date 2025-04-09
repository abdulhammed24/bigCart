import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  ImageBackground,
} from 'react-native';
import { MotiView } from 'moti';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Slide {
  id: string;
  image: any;
  text: string;
}

const slides: Slide[] = [
  {
    id: '1',
    image: require('@/assets/images/homepage/heroBg1.png'),
    text: '20% off on your\nfirst purchase',
  },
  {
    id: '2',
    image: require('@/assets/images/homepage/heroBg2.png'),
    text: 'Explore Slide 2',
  },
  {
    id: '3',
    image: require('@/assets/images/homepage/heroBg3.png'),
    text: 'Discover Slide 3',
  },
  {
    id: '4',
    image: require('@/assets/images/homepage/heroBg1.png'),
    text: 'Enjoy Slide 4',
  },
];

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList>(null);

  const renderItem = ({ item }: { item: Slide }) => (
    <View style={{ width: SCREEN_WIDTH, height: 250 }}>
      <ImageBackground
        source={item.image}
        style={{ width: '100%', height: '100%', position: 'relative' }}
        imageStyle={{ width: '100%', height: '100%' }}
        resizeMode="contain"
      >
        <View className="flex-1 absolute bottom-20 justify-center items-start">
          <Text className="text-[18px] font-poppinsBold text-center px-4 py-2">
            {item.text}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setActiveIndex(index);
  };

  const PaginationDots = () => {
    return (
      <View className="flex-row justify-start absolute bottom-10 pl-5 w-full">
        {slides.map((_, index) => (
          <MotiView
            key={index}
            animate={{
              width: index === activeIndex ? 24 : 8,
            }}
            transition={{
              type: 'timing',
              duration: 300,
            }}
            className={`h-2 mx-1 rounded-full ${
              index === activeIndex ? 'bg-primary' : 'bg-white'
            }`}
          />
        ))}
      </View>
    );
  };

  return (
    <View className="h-[250px] mb-6">
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item: Slide) => item.id}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        snapToInterval={SCREEN_WIDTH}
        snapToAlignment="start"
        decelerationRate="fast"
      />
      <PaginationDots />
    </View>
  );
}

import { View, FlatList, Pressable, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OnboardingSlides, slides } from '@/components/OnboardingSlides';
import { PrimaryBtn } from '@/components/PrimaryBtn';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

interface Slide {
  id: string;
  title: string;
  description: string;
  bg: any;
}

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<Slide>>(null);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleFinish = async () => {
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
  };

  const handleDotPress = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
    setCurrentIndex(index);
  };

  return (
    <View className="flex-1">
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={({ item, index }) => (
          <OnboardingSlides item={item} index={index} />
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />

      <View className="absolute bottom-28 left-0 right-0 flex-row justify-center">
        {slides.map((_, index) => (
          <Pressable
            key={index}
            onPress={() => handleDotPress(index)}
            // activeOpacity={0.7}
          >
            <View
              className={`size-2 rounded-full mx-2 ${
                currentIndex === index ? 'bg-primary' : 'bg-gray_foreground'
              }`}
            />
          </Pressable>
        ))}
      </View>
      <View className="absolute bottom-6 left-6 right-6">
        {currentIndex === slides.length - 1 ? (
          <Link href="/(screens)/(auth)/welcome" asChild>
            <PrimaryBtn title="Get Started" onPress={handleFinish} />
          </Link>
        ) : (
          <PrimaryBtn title="Next" onPress={handleNext} />
        )}
      </View>
    </View>
  );
}

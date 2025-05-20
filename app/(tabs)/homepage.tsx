import { IconButton } from 'react-native-paper';
import { View, Text, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import Categories from '@/components/Homepage/Categories';
import FeaturedProducts from '@/components/Homepage/FeaturedProducts';
import HeroSlider from '@/components/Homepage/HeroSlider';
import SearchBar from '@/components/Homepage/SearchBar';
import { Image } from 'expo-image';

export default function Homepage() {
  const data = [1];

  return (
    <LinearGradient
      colors={['#FFFFFF', '#F4F5F9', '#F4F5F9']}
      locations={[0, 0.54, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      className="flex-1"
    >
      <View className="px-6 pt-6">
        <SearchBar />
      </View>
      <FlatList
        data={data}
        renderItem={() => null}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <View className="px-6">
            <HeroSlider />
            <View className="mb-8">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-[18px] font-poppinsBold">Categories</Text>
                <Link href="/categories" asChild>
                  <IconButton
                    icon={() => (
                      <Image
                        source={require('@/assets/icons/view-all.svg')}
                        style={{ width: 20, height: 12 }}
                        contentFit="contain"
                      />
                    )}
                    size={15}
                    style={{ backgroundColor: 'transparent' }}
                    rippleColor="rgba(0, 0, 0, 0.2)"
                    onPress={() => console.log('Categories View All pressed')}
                  />
                </Link>
              </View>
              <Categories />
            </View>
            <View className="mb-8">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-[18px] font-poppinsBold">
                  Featured products
                </Text>
                <Link href="/featured-products" asChild>
                  <IconButton
                    icon={() => (
                      <Image
                        source={require('@/assets/icons/view-all.svg')}
                        style={{ width: 20, height: 12 }}
                        contentFit="contain"
                      />
                    )}
                    size={15}
                    style={{ backgroundColor: 'transparent' }}
                    rippleColor="rgba(0, 0, 0, 0.2)"
                    onPress={() =>
                      console.log('Featured Products View All pressed')
                    }
                  />
                </Link>
              </View>
              <FeaturedProducts limit={4} />
            </View>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  );
}

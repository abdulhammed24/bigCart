import Categories from '@/components/Homepage/Categories';
import FeaturedProducts from '@/components/Homepage/FeaturedProducts';
import HeroSlider from '@/components/Homepage/HeroSlider';
import SearchBar from '@/components/Homepage/SearchBar';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

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
      {/* Fixed Search Bar */}
      <View className="px-6 pt-6">
        <SearchBar />
      </View>

      {/* Single FlatList for all content */}
      <FlatList
        data={data}
        renderItem={() => null}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <View className="px-6">
            {/* Promotional Banner */}
            <HeroSlider />

            {/* Categories Section */}
            <View className="mb-8">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-[18px] font-poppinsBold">Categories</Text>
                <Link href="/categories" asChild>
                  <TouchableOpacity className="flex-row items-center">
                    <Image
                      source={require('@/assets/icons/view-all.svg')}
                      style={{ width: 20, height: 12 }}
                      contentFit="contain"
                    />
                  </TouchableOpacity>
                </Link>
              </View>
              <Categories />
            </View>

            {/* Featured Products Section */}
            <View className="mb-8">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-[18px] font-poppinsBold">
                  Featured products
                </Text>
                <Link href="/product-details/id" asChild>
                  <TouchableOpacity className="flex-row items-center">
                    <Image
                      source={require('@/assets/icons/view-all.svg')}
                      style={{ width: 20, height: 12 }}
                      contentFit="contain"
                    />
                  </TouchableOpacity>
                </Link>
              </View>
              <FeaturedProducts />
            </View>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </LinearGradient>
  );
}

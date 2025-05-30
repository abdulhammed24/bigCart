import { View, Text, FlatList, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { TouchableRipple } from 'react-native-paper';
import { Image } from 'expo-image';
import Categories from '@/components/Homepage/Categories';
import FeaturedProducts from '@/components/Homepage/FeaturedProducts';
import HeroSlider from '@/components/Homepage/HeroSlider';
import SearchBar from '@/components/Homepage/SearchBar';
import { useState, useCallback } from 'react';
import { useCategoriesStore } from '@/store/categoriesStore';
import { useFeaturedProductsStore } from '@/store/featuredProductsStore';

export default function Homepage() {
  const data = [1]; // Dummy data for FlatList
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const { refreshCategories } = useCategoriesStore();
  const { refreshProducts } = useFeaturedProductsStore();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      refreshCategories();
      refreshProducts(undefined, 4);
    } catch (error) {
      console.error('Refresh error:', error);
    } finally {
      setTimeout(() => setRefreshing(false), 1000);
    }
  }, [refreshCategories, refreshProducts]);

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
                <TouchableRipple
                  onPress={() => {
                    router.push('/categories');
                  }}
                  rippleColor="rgba(0, 0, 0, 0.2)"
                  borderless={true}
                  className="p-3 rounded-full items-center justify-center"
                  style={{ width: 40, height: 40, margin: -8 }}
                >
                  <Image
                    source={require('@/assets/icons/view-all.svg')}
                    style={{ width: 20, height: 12 }}
                    contentFit="contain"
                  />
                </TouchableRipple>
              </View>
              <Categories />
            </View>
            <View className="mb-8">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-[18px] font-poppinsBold">
                  Featured products
                </Text>
                <TouchableRipple
                  onPress={() => {
                    router.push('/(screens)/(main)/product-details');
                  }}
                  rippleColor="rgba(0, 0, 0, 0.2)"
                  borderless={true}
                  className="p-3 rounded-full items-center justify-center"
                  style={{ width: 40, height: 40, margin: -8 }}
                >
                  <Image
                    source={require('@/assets/icons/view-all.svg')}
                    style={{ width: 20, height: 12 }}
                    contentFit="contain"
                  />
                </TouchableRipple>
              </View>
              <FeaturedProducts limit={4} />
            </View>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#6CC51D']}
          />
        }
      />
    </LinearGradient>
  );
}

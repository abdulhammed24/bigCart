import { View, Text, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { TouchableRipple } from 'react-native-paper';
import { Image } from 'expo-image';
import Categories from '@/components/Homepage/Categories';
import FeaturedProducts from '@/components/Homepage/FeaturedProducts';
import HeroSlider from '@/components/Homepage/HeroSlider';
import SearchBar from '@/components/Homepage/SearchBar';

export default function Homepage() {
  const data = [1];
  const router = useRouter();

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
                    console.log('Categories View All pressed');
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
                    console.log('Featured Products View All pressed');
                    router.push('/featured-products');
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
      />
    </LinearGradient>
  );
}

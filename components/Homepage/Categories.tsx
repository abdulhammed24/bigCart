import { View, Text, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { TouchableRipple } from 'react-native-paper';
import { useRouter } from 'expo-router';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';
import { useCategoriesStore } from '@/store/categoriesStore';
import HorizontalCategoriesSkeleton from './HorizontalCategoriesSkeleton';

export default function Categories() {
  const router = useRouter();
  const { categories, loading, error } = useCategoriesStore();

  const handleCategoryPress = (category: { $id: string; name: string }) => {
    router.push({
      pathname: '/categories/[id]',
      params: {
        id: category.$id,
      },
    });
  };

  if (loading) {
    return <HorizontalCategoriesSkeleton />;
  }

  if (error) {
    return <Text className="text-destructive text-center">{error}</Text>;
  }

  if (categories.length === 0) {
    return (
      <Text className="text-gray text-center">No categories available</Text>
    );
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {categories.map((category) => (
        <TouchableRipple
          key={category.$id}
          onPress={() => handleCategoryPress(category)}
          rippleColor="rgba(0, 0, 0, 0.1)"
          className="p-2"
        >
          <View className="items-center">
            <View className="w-16 h-16 rounded-full justify-center items-center">
              {category.icon ? (
                <Image
                  source={{ uri: category.icon }}
                  style={{ width: 32, height: 32 }}
                  contentFit="contain"
                />
              ) : (
                <ShimmerPlaceholder
                  LinearGradient={LinearGradient}
                  style={{ width: 32, height: 32, borderRadius: 16 }}
                />
              )}
            </View>
            <Text className="mt-3 text-[12px] font-poppinsMedium text-center text-gray">
              {category.name}
            </Text>
          </View>
        </TouchableRipple>
      ))}
    </ScrollView>
  );
}

import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import FeaturedProducts from '@/components/Homepage/FeaturedProducts';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';
import { StatusBar } from 'react-native';
import { useCategoriesStore } from '@/store/categoriesStore';

type CategoryParams = {
  id: string;
};

export default function CategoryDetail() {
  const { id } = useLocalSearchParams<CategoryParams>();
  const { categories } = useCategoriesStore();

  const category = categories.find((cat) => cat.$id === id);
  const categoryName = category ? category.name : 'Category';
  console.log('Category Name:', categoryName);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Header title={categoryName} />
      <View className="flex-1 p-6 bg-offWhite">
        <FeaturedProducts category={categoryName} />
      </View>
    </SafeAreaView>
  );
}

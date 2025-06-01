import {
  View,
  Text,
  Pressable,
  FlatList,
  RefreshControl,
  StatusBar,
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';
import { useCategoriesStore } from '@/store/categoriesStore';
import { useState, useCallback } from 'react';
import GridCategoriesSkeleton from '@/components/Homepage/GridCategoriesSkeleton';

export default function CategoryList() {
  const router = useRouter();
  const { categories, loading, error, refreshCategories } =
    useCategoriesStore();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refreshCategories();
    } finally {
      setRefreshing(false);
    }
  }, [refreshCategories]);

  const handleCategoryPress = (category: { $id: string; name: string }) => {
    router.push({
      pathname: '/categories/[id]',
      params: {
        id: category.$id,
      },
    });
  };

  const renderContent = () => {
    if (loading) {
      return <GridCategoriesSkeleton />;
    }

    if (error) {
      return <Text className="text-destructive text-center">{error}</Text>;
    }

    if (categories.length === 0) {
      return (
        <Text className="text-gray-600 text-center">
          No categories available
        </Text>
      );
    }

    return (
      <FlatList
        data={categories}
        numColumns={3}
        keyExtractor={(item) => item.$id}
        contentContainerStyle={{ paddingBottom: 20 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <Pressable
            className="mb-4 w-[30%]"
            onPress={() => handleCategoryPress(item)}
          >
            <View className="bg-white p-3 rounded-lg items-center">
              <View
                className="w-16 h-16 rounded-full justify-center items-center"
                style={{ backgroundColor: '#E0E0E0' }}
              >
                {item.icon ? (
                  <Image
                    source={{ uri: item.icon }}
                    style={{ width: 32, height: 32 }}
                    contentFit="cover"
                  />
                ) : (
                  <Text className="text-gray text-center">No Image</Text>
                )}
              </View>
              <Text className="mt-3 text-[12px] font-poppinsMedium text-center text-gray">
                {item.name}
              </Text>
            </View>
          </Pressable>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#6CC51D']}
          />
        }
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <StatusBar backgroundColor="#fff" barStyle="default" />
      <Header title="Categories" />
      <View className="flex-1 px-6 bg-offWhite py-6">{renderContent()}</View>
    </SafeAreaView>
  );
}

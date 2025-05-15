import { View, Text, Pressable, FlatList } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { categories } from '@/data/categories';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';

type Category = {
  id: number;
  name: string;
  icon: any;
  backgroundColor: string;
};

export default function CategoryList() {
  const router = useRouter();

  const handleCategoryPress = (category: Category) => {
    router.push({
      pathname: '/categories/[name]',
      params: {
        name: category.name,
      },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      {/* Header */}
      <Header title="  Categories" />

      {/* Category Grid */}
      <View className="flex-1 px-6 bg-offWhite py-6">
        <FlatList
          data={categories}
          numColumns={3}
          keyExtractor={(item) => item.id.toString()}
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
                  style={{ backgroundColor: item.backgroundColor }}
                >
                  <Image
                    source={item.icon}
                    style={{ width: 32, height: 32 }}
                    contentFit="contain"
                  />
                </View>
                <Text className="mt-3 text-[12px] font-poppinsMedium text-center text-gray-500">
                  {item.name}
                </Text>
              </View>
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { categories } from '@/data/categories';

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
    <View className="flex-1">
      {/* Header */}
      <View className="p-6 bg-white">
        <View className="flex flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <Image
              source={require('@/assets/icons/back-arrow-blk.svg')}
              style={{ width: 24, height: 24 }}
              contentFit="contain"
            />
          </TouchableOpacity>
          <Text className="font- text-center font-poppinsBold text-[24px]">
            Categories
          </Text>

          <View style={{ width: 24 }} />
        </View>
      </View>

      {/* Category Grid */}
      <View className="flex-1 px-6 bg-offWhite pt-6">
        <FlatList
          data={categories}
          numColumns={3}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          renderItem={({ item }) => (
            <TouchableOpacity
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
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

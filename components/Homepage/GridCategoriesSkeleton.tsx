import { View, FlatList } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';

export default function GridCategoriesSkeleton() {
  const placeholderData = Array.from({ length: 6 });

  return (
    <FlatList
      data={placeholderData}
      numColumns={3}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 6 }}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      renderItem={() => (
        <View className="mb-4 w-[30%]">
          <View className="bg-white p-3 rounded-lg items-center">
            <ShimmerPlaceholder
              LinearGradient={LinearGradient}
              style={{ width: 64, height: 64, borderRadius: 32 }}
            />
            <ShimmerPlaceholder
              LinearGradient={LinearGradient}
              style={{ width: 60, height: 12, borderRadius: 4, marginTop: 12 }}
            />
          </View>
        </View>
      )}
    />
  );
}

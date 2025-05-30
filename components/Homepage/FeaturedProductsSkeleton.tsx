import { FlatList, View } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';

interface FeaturedProductsSkeletonProps {
  limit?: number;
}

export default function FeaturedProductsSkeleton({
  limit,
}: FeaturedProductsSkeletonProps) {
  const placeholderCount = limit !== undefined ? limit : 8;

  return (
    <FlatList
      data={Array(placeholderCount).fill(0)}
      renderItem={({ index }) => (
        <View className="w-[48%] p-3 mb-4">
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={{ width: '100%', height: 120, borderRadius: 12 }}
          />
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={{
              width: 60,
              height: 14,
              borderRadius: 4,
              marginTop: 8,
              alignSelf: 'center',
            }}
          />
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={{
              width: 100,
              height: 16,
              borderRadius: 4,
              marginTop: 4,
              alignSelf: 'center',
            }}
          />
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={{
              width: 50,
              height: 12,
              borderRadius: 4,
              marginTop: 4,
              alignSelf: 'center',
            }}
          />
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={{
              width: '100%',
              height: 36,
              borderRadius: 8,
              marginTop: 12,
            }}
          />
        </View>
      )}
      keyExtractor={(_, index) => index.toString()}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
}

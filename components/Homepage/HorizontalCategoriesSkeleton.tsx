import { View, ScrollView } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';

export default function HorizontalCategoriesSkeleton() {
  const placeholderData = Array.from({ length: 6 }); // 6 placeholders for horizontal scroll

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {placeholderData.map((_, index) => (
        <View key={index} className="p-2 items-center">
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={{ width: 64, height: 64, borderRadius: 32 }}
          />
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={{ width: 60, height: 12, borderRadius: 4, marginTop: 12 }}
          />
        </View>
      ))}
    </ScrollView>
  );
}

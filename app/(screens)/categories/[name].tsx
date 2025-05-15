// app/categories/[name].tsx
import { View, Text, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import FeaturedProducts from '@/components/Homepage/FeaturedProducts';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';

type CategoryParams = {
  name: string;
};

export default function CategoryDetail() {
  const router = useRouter();
  const { name } = useLocalSearchParams<CategoryParams>();

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      {/* Header */}
      <Header title={name} />

      {/* Category Content */}
      <View className="flex-1 p-6 bg-offWhite">
        <FeaturedProducts category={name} />
      </View>
    </SafeAreaView>
  );
}

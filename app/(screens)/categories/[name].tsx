// app/categories/[name].tsx
import { View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import FeaturedProducts from '@/components/Homepage/FeaturedProducts';

type CategoryParams = {
  name: string;
};

export default function CategoryDetail() {
  const router = useRouter();
  const { name } = useLocalSearchParams<CategoryParams>();

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
            {name}
          </Text>

          <View style={{ width: 24 }} />
        </View>
      </View>

      {/* Category Content */}
      <View className="flex-1 p-6 bg-offWhite">
        <FeaturedProducts category={name} />
      </View>
    </View>
  );
}

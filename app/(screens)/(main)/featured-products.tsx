import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { Header } from '@/components/Header';
import FeaturedProducts from '@/components/Homepage/FeaturedProducts';

export default function FeaturedProductsPage() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <Header title="Featured Products" />
      <View className="flex-1 px-6 bg-offWhite py-6">
        <FeaturedProducts />
      </View>
    </SafeAreaView>
  );
}

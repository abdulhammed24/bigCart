import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar, View } from 'react-native';
import { Header } from '@/components/Header';
import FeaturedProducts from '@/components/Homepage/FeaturedProducts';

export default function FeaturedProductsPage() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Header title="Featured Products" />
      <View className="flex-1 px-6 bg-offWhite py-6">
        <FeaturedProducts />
      </View>
    </SafeAreaView>
  );
}

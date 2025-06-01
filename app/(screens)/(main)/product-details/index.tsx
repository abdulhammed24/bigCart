import { Header } from '@/components/Header';
import FeaturedProducts from '@/components/Homepage/FeaturedProducts';
import { View } from 'react-native';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FeaturedProductsPage() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <StatusBar backgroundColor="#fff" barStyle="default" />
      <Header title="Featured Products" />
      <View className="flex-1 px-6 bg-offWhite py-6">
        <FeaturedProducts />
      </View>
    </SafeAreaView>
  );
}

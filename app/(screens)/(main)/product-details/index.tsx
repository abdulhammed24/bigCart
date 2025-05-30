import { StatusBar, View } from 'react-native';
import { useState, useCallback } from 'react';
import { Header } from '@/components/Header';
import FeaturedProducts from '@/components/Homepage/FeaturedProducts';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFeaturedProductsStore } from '@/store/featuredProductsStore';

export default function FeaturedProductsPage() {
  const [refreshing, setRefreshing] = useState(false);
  const { refreshProducts } = useFeaturedProductsStore();

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refreshProducts();
    } finally {
      setRefreshing(false);
    }
  }, [refreshProducts]);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Header title="Featured Products" />
      <View className="flex-1 px-6 bg-offWhite py-6">
        <FeaturedProducts refreshing={refreshing} onRefresh={handleRefresh} />
      </View>
    </SafeAreaView>
  );
}

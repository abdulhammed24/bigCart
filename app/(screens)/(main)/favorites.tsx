import { Header } from '@/components/Header';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SwipeListView } from 'react-native-swipe-list-view';
import {
  FavoriteItem,
  HiddenFavoriteItem,
} from '@/components/Favorites/FavoriteItem';
import { EmptyFavorites } from '@/components/Favorites/EmptyFavorites';
import { useFavoritesStore } from '@/store/favoritesStore';
import { useProductStore } from '@/store/featuredProductsStore';
import { useCartToggle } from '@/hooks/useCartToggle';
import { useFavoriteToggle } from '@/hooks/useFavoriteToggle';
import { ErrorState } from '@/components/ErrorState';
import { LoadingState } from '@/components/LoadingState';

interface FavoriteItemDisplay {
  id: string;
  name: string;
  price: number;
  weight: string;
  image: string;
}

export default function Favorites() {
  const router = useRouter();
  const {
    favorites,
    loading: favoritesLoading,
    error: favoritesError,
    fetchFavorites,
  } = useFavoritesStore();
  const {
    products,
    loading: productsLoading,
    error: productsError,
    fetchProducts,
  } = useProductStore();
  const { handleAddToCart } = useCartToggle();
  const { handleFavoriteToggle } = useFavoriteToggle();

  // Track whether initial fetch has been attempted
  const [favoritesFetched, setFavoritesFetched] = useState(false);
  const [productsFetched, setProductsFetched] = useState(false);

  // Fetch data on mount if needed
  useEffect(() => {
    if (!favoritesFetched && !favoritesLoading && !favoritesError) {
      fetchFavorites().then(() => setFavoritesFetched(true));
    }
    if (!productsFetched && !productsLoading && !productsError) {
      fetchProducts().then(() => setProductsFetched(true));
    }
  }, [
    favoritesFetched,
    favoritesLoading,
    favoritesError,
    productsFetched,
    productsLoading,
    productsError,
    fetchFavorites,
    fetchProducts,
  ]);

  const displayItems: FavoriteItemDisplay[] = favorites
    .map((productId) => {
      const product = products.find((p) => p.$id === productId);
      if (!product) return null;
      return {
        id: product.$id,
        name: product.name,
        price: product.price,
        weight: product.unit,
        image: product.image,
      };
    })
    .filter((item): item is FavoriteItemDisplay => item !== null);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Header title="Favorites" onBackPress={() => router.back()} />

      {favoritesLoading || productsLoading ? (
        <LoadingState message="Loading favorites..." />
      ) : favoritesError ? (
        <ErrorState message={favoritesError} onRetry={fetchFavorites} />
      ) : productsError ? (
        <ErrorState message={productsError} onRetry={fetchProducts} />
      ) : displayItems.length === 0 ? (
        <EmptyFavorites />
      ) : (
        <SwipeListView
          data={displayItems}
          renderItem={({ item }) => (
            <FavoriteItem
              item={item}
              onRemove={() => handleFavoriteToggle(item.id, item.name)}
              onAddToCart={() => handleAddToCart(item.id, item.name)}
            />
          )}
          renderHiddenItem={({ item }) => (
            <HiddenFavoriteItem
              item={item}
              onRemove={() => handleFavoriteToggle(item.id, item.name)}
            />
          )}
          rightOpenValue={-75}
          disableRightSwipe
          friction={9}
          tension={40}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingBottom: 50,
            paddingHorizontal: 24,
            paddingTop: 24,
          }}
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: '#F5F5F5' }}
          ItemSeparatorComponent={() => <View className="h-3" />}
        />
      )}
    </SafeAreaView>
  );
}

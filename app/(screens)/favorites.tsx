// screens/Favorites.tsx
import { Header } from '@/components/Header';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SwipeListView } from 'react-native-swipe-list-view';
import {
  FavoriteItem,
  HiddenFavoriteItem,
} from '@/components/Favorites/FavoriteItem';
import { EmptyFavorites } from '@/components/Favorites/EmptyFavorites';

// Define the FavoriteItem interface
interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  weight: string;
  image: any;
}

// Dummy data array for favorites
const favoriteItems: FavoriteItem[] = [
  {
    id: '1',
    name: 'Fresh Broccoli',
    price: 2.22,
    weight: '1.50 lbs',
    image: require('@/assets/images/products/broccoli.png'),
  },
  {
    id: '2',
    name: 'Organic Apples',
    price: 3.15,
    weight: '2.00 lbs',
    image: require('@/assets/images/products/broccoli.png'),
  },
  {
    id: '3',
    name: 'Carrots',
    price: 1.99,
    weight: '1.00 lbs',
    image: require('@/assets/images/products/broccoli.png'),
  },
];

export default function Favorites() {
  const router = useRouter();
  const [items, setItems] = useState<FavoriteItem[]>(favoriteItems);

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const addToCart = (item: FavoriteItem) => {
    // Simulate adding to cart (replace with actual cart logic)
    console.log(`Added to cart: ${item.name}`, item);
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <Header title="Favorites" onBackPress={() => router.back()} />
      {items.length === 0 ? (
        <EmptyFavorites />
      ) : (
        <SwipeListView
          data={items}
          renderItem={({ item }) => (
            <FavoriteItem
              item={item}
              onRemove={removeItem}
              onAddToCart={addToCart}
            />
          )}
          renderHiddenItem={({ item }) => (
            <HiddenFavoriteItem item={item} onRemove={removeItem} />
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

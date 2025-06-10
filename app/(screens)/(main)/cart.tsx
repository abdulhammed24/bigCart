import { Header } from '@/components/Header';
import { useRouter } from 'expo-router';
import { StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SwipeListView } from 'react-native-swipe-list-view';
import { CartItem, HiddenCartItem } from '@/components/Cart/CartItem';
import { CartSummary } from '@/components/Cart/CartSummary';
import { EmptyCart } from '@/components/Cart/EmptyCart';
import { useCartStore } from '@/store/cartStore';
import { useProductStore } from '@/store/featuredProductsStore';
import { useCartToggle } from '@/hooks/useCartToggle';
import { ErrorState } from '@/components/ErrorState';
import { LoadingState } from '@/components/LoadingState';
import { useEffect, useState } from 'react';

interface CartItemDisplay {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  weight: string;
  image: string;
}

export default function Cart() {
  const router = useRouter();
  const {
    cartItems,
    loading: cartLoading,
    updating: cartUpdating,
    error: cartError,
    fetchCart,
  } = useCartStore();
  const {
    products,
    loading: productsLoading,
    error: productsError,
    fetchProducts,
  } = useProductStore();
  const { handleIncrementQuantity, handleDecrementQuantity, handleDeleteItem } =
    useCartToggle();

  // Track whether initial fetch has been attempted
  const [cartFetched, setCartFetched] = useState(false);
  const [productsFetched, setProductsFetched] = useState(false);

  // Fetch data on mount if needed
  useEffect(() => {
    if (!cartFetched && !cartLoading && !cartError) {
      fetchCart().then(() => setCartFetched(true));
    }
    if (!productsFetched && !productsLoading && !productsError) {
      fetchProducts().then(() => setProductsFetched(true));
    }
  }, [
    cartFetched,
    cartLoading,
    cartError,
    productsFetched,
    productsLoading,
    productsError,
    fetchCart,
    fetchProducts,
  ]);

  // Combine cart items with product details
  const displayItems: CartItemDisplay[] = cartItems
    .map((cartItem) => {
      const product = products.find((p) => p.$id === cartItem.productId);
      if (!product) return null;
      return {
        id: cartItem.id,
        productId: cartItem.productId,
        name: product.name,
        price: product.price,
        quantity: cartItem.quantity,
        weight: product.unit,
        image: product.image,
      };
    })
    .filter((item): item is CartItemDisplay => item !== null);

  // Calculate subtotal (no shipping fee)
  const subtotal: number = displayItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const total: number = subtotal;

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <Header title="Shopping Cart" />
      {cartLoading || productsLoading ? (
        <LoadingState message="Loading cart..." />
      ) : cartError ? (
        <ErrorState message={cartError} onRetry={fetchCart} />
      ) : productsError ? (
        <ErrorState message={productsError} onRetry={fetchProducts} />
      ) : displayItems.length === 0 && cartFetched ? (
        <EmptyCart />
      ) : (
        <>
          <SwipeListView
            data={displayItems}
            renderItem={({ item }) => (
              <CartItem
                item={item}
                onIncrement={() =>
                  handleIncrementQuantity(item.productId, item.name)
                }
                onDecrement={() =>
                  handleDecrementQuantity(item.productId, item.name)
                }
                onDelete={() => handleDeleteItem(item.productId, item.name)}
              />
            )}
            renderHiddenItem={({ item }) => (
              <HiddenCartItem
                item={item}
                onDelete={() => handleDeleteItem(item.productId, item.name)}
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
          <CartSummary subtotal={subtotal} total={total} />
        </>
      )}
    </SafeAreaView>
  );
}

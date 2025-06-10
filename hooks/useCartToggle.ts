import { useCartStore } from '@/store/cartStore';
import Toast from 'react-native-toast-message';

export const useCartToggle = () => {
  const { addToCart, updateQuantity, removeFromCart, isInCart, cartItems } =
    useCartStore();

  const handleAddToCart = async (
    productId: string,
    productName: string,
    quantity: number = 1,
  ) => {
    try {
      await addToCart(productId, quantity);
      Toast.show({
        type: 'success',
        text1: 'Added to Cart',
        text2: `${productName} has been added to your cart!`,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to add to cart. Please try again.',
      });
    }
  };

  const handleUpdateQuantity = async (
    productId: string,
    productName: string,
    quantity: number,
  ) => {
    try {
      await updateQuantity(productId, quantity);
      // Toast.show({
      //   type: 'success',
      //   text1: 'Cart Updated',
      //   text2: `Quantity for ${productName} updated to ${quantity}.`,
      // });
    } catch (error) {
      // Toast.show({
      //   type: 'error',
      //   text1: 'Error',
      //   text2: 'Failed to update cart quantity. Please try again.',
      // });
    }
  };

  const handleIncrementQuantity = async (
    productId: string,
    productName: string,
  ) => {
    const item = cartItems.find((i) => i.productId === productId);
    if (item) {
      try {
        await updateQuantity(productId, item.quantity + 1);
        // Toast.show({
        //   type: 'success',
        //   text1: 'Quantity Updated',
        //   text2: `Increased ${productName} quantity to ${item.quantity + 1}.`,
        // });
      } catch (error) {
        // Toast.show({
        //   type: 'error',
        //   text1: 'Error',
        //   text2: 'Failed to update quantity. Please try again.',
        // });
      }
    }
  };

  const handleDecrementQuantity = async (
    productId: string,
    productName: string,
  ) => {
    const item = cartItems.find((i) => i.productId === productId);
    if (item) {
      if (item.quantity === 1) {
        await handleDeleteItem(productId, productName);
      } else {
        try {
          await updateQuantity(productId, item.quantity - 1);
          // Toast.show({
          //   type: 'success',
          //   text1: 'Quantity Updated',
          //   text2: `Decreased ${productName} quantity to ${item.quantity - 1}.`,
          // });
        } catch (error) {
          // Toast.show({
          //   type: 'error',
          //   text1: 'Error',
          //   text2: 'Failed to update quantity. Please try again.',
          // });
        }
      }
    }
  };

  const handleDeleteItem = async (productId: string, productName: string) => {
    try {
      await removeFromCart(productId);
      Toast.show({
        type: 'success',
        text1: 'Item Removed',
        text2: `${productName} has been removed from your cart.`,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to remove item from cart. Please try again.',
      });
    }
  };

  return {
    handleAddToCart,
    handleUpdateQuantity,
    handleIncrementQuantity,
    handleDecrementQuantity,
    handleDeleteItem,
    isInCart,
  };
};

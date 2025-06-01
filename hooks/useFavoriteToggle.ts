import { useFavoritesStore } from '@/store/favoritesStore';
import Toast from 'react-native-toast-message';

export const useFavoriteToggle = () => {
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();

  const handleFavoriteToggle = async (
    productId: string,
    productName: string,
  ) => {
    try {
      if (isFavorite(productId)) {
        await removeFavorite(productId);
        Toast.show({
          type: 'success',
          text1: 'Removed from Favorites',
          text2: `${productName} has been removed from your favorites.`,
        });
      } else {
        await addFavorite(productId);
        Toast.show({
          type: 'success',
          text1: 'Added to Favorites',
          text2: `${productName} has been added to your favorites!`,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to update favorites. Please try again.',
      });
    }
  };

  return { handleFavoriteToggle };
};

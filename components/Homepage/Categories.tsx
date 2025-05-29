import { View, Text, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { TouchableRipple } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { databases } from '@/lib/appwriteconfig';
import { Models } from 'react-native-appwrite';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

interface Category {
  $id: string;
  name: string;
  icon?: string;
}

interface CategoriesProps {
  refreshKey: number;
}

export default function Categories({ refreshKey }: CategoriesProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await databases.listDocuments(
          process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.EXPO_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID!,
        );
        const mappedCategories: Category[] = response.documents.map(
          (doc: Models.Document) => ({
            $id: doc.$id,
            name: doc.name as string,
            icon: doc.icon as string | undefined,
          }),
        );
        setCategories(mappedCategories);
      } catch (error: any) {
        console.error('Error fetching categories:', error);
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [refreshKey]);

  const handleCategoryPress = (category: Category) => {
    router.push({
      pathname: '/categories/[id]',
      params: {
        id: category.$id,
      },
    });
  };

  if (loading) {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {/* Render 5 skeleton placeholders to mimic categories */}
        {[...Array(5)].map((_, index) => (
          <SkeletonPlaceholder
            key={index}
            backgroundColor="#E0E0E0"
            highlightColor="#F5F5F5"
          >
            <View style={{ alignItems: 'center', marginHorizontal: 8 }}>
              <View style={{ width: 64, height: 64, borderRadius: 32 }} />
              <View
                style={{
                  width: 60,
                  height: 12,
                  borderRadius: 4,
                  marginTop: 12,
                }}
              />
            </View>
          </SkeletonPlaceholder>
        ))}
      </ScrollView>
    );
  }

  if (error) {
    return <Text className="text-red-500 text-center">{error}</Text>;
  }

  if (categories.length === 0) {
    return (
      <Text className="text-gray-500 text-center">No categories available</Text>
    );
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {categories.map((category) => (
        <TouchableRipple
          key={category.$id}
          onPress={() => handleCategoryPress(category)}
          rippleColor="rgba(0, 0, 0, 0.1)"
          className="p-2"
        >
          <View className="items-center">
            <View className="w-16 h-16 rounded-full justify-center items-center">
              {category.icon ? (
                <Image
                  source={{ uri: category.icon }} // Cloudinary URL
                  style={{ width: 32, height: 32 }}
                  contentFit="contain"
                  placeholder={require('@/assets/images/cart.png')}
                />
              ) : (
                <Text className="text-gray-500 text-xs">No Icon</Text>
              )}
            </View>
            <Text className="mt-3 text-[12px] font-poppinsMedium text-center text-gray">
              {category.name}
            </Text>
          </View>
        </TouchableRipple>
      ))}
    </ScrollView>
  );
}

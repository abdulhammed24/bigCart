import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text } from 'react-native';

interface RatingProps {
  rating: number;
  reviews?: number;
  starColor?: string;
  textStyle?: string;
}

const Rating: React.FC<RatingProps> = ({
  rating,
  reviews,
  starColor = '#FFD700',
  textStyle = 'text-gray font-poppinsMedium text-[14px]',
}) => {
  // Calculate full, half, and empty stars
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <View className="flex-row items-center gap-1">
      {/* Stars */}
      <View className="flex flex-row">
        {/* Full Stars */}
        {[...Array(fullStars)].map((_, index) => (
          <Ionicons
            key={`full-${index}`}
            name="star"
            size={14}
            color={starColor}
          />
        ))}
        {/* Half Star */}
        {hasHalfStar && (
          <Ionicons name="star-half" size={14} color={starColor} />
        )}
        {/* Empty Stars */}
        {[...Array(emptyStars)].map((_, index) => (
          <Ionicons
            key={`empty-${index}`}
            name="star-outline"
            size={14}
            color={starColor}
          />
        ))}
      </View>

      {/* Rating Number */}
      {/* <Text className={`text-black font-poppinsBold text-[${14}px]`}>
        {rating.toFixed(1)}
      </Text> */}

      {/* Reviews Count */}
      {/* {reviews && <Text className={textStyle}>({reviews} reviews)</Text>} */}
    </View>
  );
};

export default Rating;

import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';

export default function SingleProductDetails() {
  const router = useRouter();
  return (
    <View>
      <View>
        <ImageBackground
          source={require('@/assets/images/onboarding/welcome.png')}
          resizeMode="cover"
          className="flex-1 justify-start p-6"
        >
          <View className="flex flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => router.push('/(screens)/(auth)/welcome')}
            >
              <Image
                source={require('@/assets/icons/back-arrow.svg')}
                style={{ width: 24, height: 24 }}
                contentFit="contain"
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
      <View className="flex-1 h-[400px] bg-gray rounded-t-[10px] -mt-8 p-6">
        <View>
          <View>
            <Text>$2.22</Text> <Text>LoveIcon</Text>
          </View>
          <View>
            <Text>Organic Lemons</Text>
            <Text>1.50 lbs</Text>
          </View>
          <View>
            <Text>4.5</Text>
            <Text>Stars</Text>
            <Text>(89 reviews)</Text>
          </View>
          <View>
            <Text>
              Organic Mountain works as a seller for many organic growers of
              organic lemons. Organic lemons are easy to spot in your produce
              aisle. They are just like regular lemons, but they will usually
              have a few more scars on the outside of the lemon skin. Organic
              lemons are considered to be the world's finest lemon for juicing
              more
            </Text>
          </View>

          <View>
            <Text>Quantity</Text>
          </View>

          <TouchableOpacity>
            <LinearGradient
              colors={['#aedc81', '#6cc51d']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ borderRadius: 6 }}
              className="flex w-full flex-row p-4  items-center h-[60px]"
            >
              <View className="flex-1 items-center">
                <Text className="text-white text-center text-[16px] font-poppinsMedium">
                  Add to cart
                </Text>

                <Text className="text-white text-center text-[16px] font-poppinsMedium">
                  Bag Icon
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

import { Tabs, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function TabLayout() {
  const router = useRouter();
  return (
    <ProtectedRoute>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />

        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#6CC51D',
            tabBarInactiveTintColor: '#868889',
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: '#fff',
              paddingBottom: 5,
              paddingTop: 5,
              height: 60,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontFamily: 'Poppins-Medium',
            },
          }}
        >
          <Tabs.Screen
            name="homepage"
            options={{
              title: 'Home',
              tabBarIcon: ({
                color,
                size,
              }: {
                color: string;
                size: number;
              }) => <Ionicons name="home-outline" size={size} color={color} />,
            }}
          />
          <Tabs.Screen
            name="account"
            options={{
              title: 'Account',
              tabBarIcon: ({
                color,
                size,
              }: {
                color: string;
                size: number;
              }) => (
                <Ionicons name="person-outline" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="favorites"
            options={{
              title: 'Favorites',
              tabBarIcon: ({
                color,
                size,
              }: {
                color: string;
                size: number;
              }) => (
                <Pressable
                  onPress={() => router.push('/(screens)/(main)/favorites')}
                >
                  <Ionicons name="heart-outline" size={size} color={color} />
                </Pressable>
              ),
            }}
          />

          {/* Custom Cart Tab Button */}
          <Tabs.Screen
            name="cart"
            options={{
              title: 'Cart',
              tabBarIcon: ({ size }) => (
                <Pressable
                  onPress={() => router.push('/(screens)/(main)/cart')}
                  style={{
                    backgroundColor: '#6CC51D',
                    borderRadius: 50,
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowOpacity: 0.3,
                    shadowRadius: 3,
                    borderWidth: 4,
                    borderColor: '#fff',
                    position: 'absolute',
                    top: -30,
                  }}
                  className="size-16"
                >
                  <Ionicons name="cart-outline" size={size} color="#fff" />
                  <View
                    style={{
                      position: 'absolute',
                      right: -1,
                      top: -6,
                      backgroundColor: 'red',
                      borderRadius: 10,
                      width: 20,
                      height: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ color: 'white', fontSize: 12 }}>3</Text>
                  </View>
                </Pressable>
              ),
            }}
          />
        </Tabs>
      </SafeAreaView>
    </ProtectedRoute>
  );
}

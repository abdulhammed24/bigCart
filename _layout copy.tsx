import { Tabs, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

export default function TabLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <StatusBar style="dark" backgroundColor="#fff" />
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
        tabBar={(props: any) => <CustomTabBar {...props} />}
      >
        <Tabs.Screen name="homepage" options={{ title: 'Home' }} />
        <Tabs.Screen name="account" options={{ title: 'Account' }} />
        <Tabs.Screen name="favorites" options={{ title: 'Favorites' }} />
      </Tabs>
    </SafeAreaView>
  );
}

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingBottom: 5,
        paddingTop: 5,
        height: 60,
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const iconName =
          route.name === 'homepage'
            ? 'home-outline'
            : route.name === 'account'
            ? 'person-outline'
            : 'heart-outline';

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={{ flex: 1, alignItems: 'center' }}
          >
            <Ionicons
              name={iconName}
              size={24}
              color={isFocused ? '#6CC51D' : '#868889'}
            />
          </TouchableOpacity>
        );
      })}
      {/* Cart Button */}
      <TouchableOpacity
        onPress={() => {
          router.replace('/(screens)/cart');
        }}
        style={{ flex: 1, alignItems: 'center' }}
      >
        <View
          style={{
            backgroundColor: '#6CC51D',
            borderRadius: 50,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 4,
            borderColor: '#fff',
            position: 'absolute',
            top: -30,
          }}
        >
          <Ionicons name="cart-outline" size={24} color="#fff" />
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
        </View>
      </TouchableOpacity>
    </View>
  );
}

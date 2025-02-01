import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
export default function TabLayout() {


  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#000',
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            // position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <Ionicons name={focused ? "home-outline" : "home-sharp"} size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="Friends"
        options={{
          title: 'Friends',
          tabBarIcon: ({ focused }) => <Ionicons name={focused ? "people-circle-outline" : "people-circle-sharp"} size={32} color="black" />,

        }}
      />
      <Tabs.Screen
        name="Empty"
        options={{
          title: '',
          tabBarIcon: ({ focused }) =>
            <View className='absolute '>
              <Ionicons className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' name={focused ? "close-circle" : "add-circle"} size={80} color="black" />
            </View>,

        }}

        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('Camera');
          },
        })}
      />
      <Tabs.Screen
        name="Inbox"
        options={{
          title: 'Inbox',
          tabBarIcon: ({ focused }) => <Ionicons name={focused ? "chatbox-ellipses-outline" : "chatbox"} size={28} color="black" />,

        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <Ionicons name={focused ? "person-outline" : "person-sharp"} size={28} color="black" />,

        }}
      />

    </Tabs>
  );
}

import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
            paddingTop: 10,
            height: 80,
          },
          default: {},
        }),
        tabBarShowLabel: false,
      }}>
        <Tabs.Screen
        name="naybrs"
        options={{
          title: 'Naybrs',
          tabBarIcon: ({ color }) => <IconSymbol size={37} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Likes',
          tabBarIcon: ({ color }) => <IconSymbol size={37} name="heart.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color }) => <IconSymbol size={37} name="bubble.left.and.bubble.right.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Me',
          tabBarIcon: ({ color }) => <IconSymbol size={37} name="person.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="signup"
        options={{
          title: 'Add User',
          tabBarIcon: ({ color }) => <IconSymbol size={37} name="hammer.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
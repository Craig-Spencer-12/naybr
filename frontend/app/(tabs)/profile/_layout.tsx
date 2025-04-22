import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Slot } from 'expo-router';
import React from 'react';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EditScreen from './edit';
import ViewScreen from './view';

const TopTabs = createMaterialTopTabNavigator();

export default function ProfileTopTabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <TopTabs.Navigator
      screenOptions={{
        tabBarStyle: { paddingTop: insets.top },
        tabBarIndicatorStyle: { backgroundColor: 'white' },
      }}>
      <TopTabs.Screen name="Edit" component={EditScreen} />
      <TopTabs.Screen name="View" component={ViewScreen} />
    </TopTabs.Navigator>
  );
}
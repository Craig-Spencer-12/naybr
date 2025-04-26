import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EditScreen from './edit';
import ViewScreen from './view';
import BoroughScreen from './borough';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';

const TopTabs = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default function ProfileTopTabsLayout() {
  const insets = useSafeAreaInsets();

  const navigation = useNavigation();

  return (

    <Stack.Navigator>
      {/* Tab Navigator */}
      <Stack.Screen name="MainTabs" options={{ headerShown: false }}>
        {() => (
          <TopTabs.Navigator
            screenOptions={{
              tabBarStyle: { paddingTop: insets.top },
              tabBarIndicatorStyle: { backgroundColor: 'white' },
            }}>
            <TopTabs.Screen name="Edit" component={EditScreen} />
            <TopTabs.Screen name="View" component={ViewScreen} />
          </TopTabs.Navigator>
        )}
      </Stack.Screen>

      {/* Borough Screen */}
      <Stack.Screen
        name="Borough"
        component={BoroughScreen}
        options={{
          title: 'Select Borough',
          headerBackTitle: 'Done',
        }}
      />
    </Stack.Navigator>




    // <TopTabs.Navigator
    //   screenOptions={{
    //     tabBarStyle: { paddingTop: insets.top },
    //     tabBarIndicatorStyle: { backgroundColor: 'white' },
    //   }}>
    //   <TopTabs.Screen name="Edit" component={EditScreen} />
    //   <TopTabs.Screen name="View" component={ViewScreen} />
    //   <TopTabs.Screen name="Borough" component={BoroughScreen} />

    // </TopTabs.Navigator>
  );
}
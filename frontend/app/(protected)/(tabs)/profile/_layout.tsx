import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import { useSafeAreaInsets } from 'react-native-safe-area-context'
import EditScreen from './edit'
import ViewScreen from './view'
import BoroughScreen from './borough'
import NewActivityScreen from './newActivity'
import GenderScreen from './gender'
import BioScreen from './bio'

const TopTabs = createMaterialTopTabNavigator()
const Stack = createStackNavigator()

export default function ProfileTopTabsLayout() {
  const insets = useSafeAreaInsets()

  return (
    <Stack.Navigator>
      <Stack.Screen name='MainTabs' options={{ headerShown: false }}>
        {() => (
          <TopTabs.Navigator
            screenOptions={{
              tabBarStyle: { paddingTop: insets.top },
              tabBarIndicatorStyle: { backgroundColor: 'white' },
            }}>
            <TopTabs.Screen name='Edit' component={EditScreen} />
            <TopTabs.Screen name='View' component={ViewScreen} />
          </TopTabs.Navigator>
        )}
      </Stack.Screen>
      <Stack.Screen
        name='Borough'
        component={BoroughScreen}
        options={{
          title: 'Select Borough',
          headerBackTitle: 'Done',
        }}
      /><Stack.Screen
        name='Gender'
        component={GenderScreen}
        options={{
          title: 'Change Gender',
          headerBackTitle: 'Done',
        }}
      /><Stack.Screen
        name='Bio'
        component={BioScreen}
        options={{
          title: 'Edit Bio',
          headerBackTitle: 'Done',
        }}
      /><Stack.Screen
        name='NewActivity'
        component={NewActivityScreen}
        options={{
          title: 'Create Activity',
          headerBackTitle: 'Done',
        }}
      />
    </Stack.Navigator>
  )
}
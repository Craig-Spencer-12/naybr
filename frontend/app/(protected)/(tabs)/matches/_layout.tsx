import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import React from 'react'

import { useSafeAreaInsets } from 'react-native-safe-area-context'
import MatchesScreen from './matches'
import ViewMatchProfileScreen from './viewMatchProfile' 
import ChatScreen from './chat'


const TopTabs = createMaterialTopTabNavigator()
const Stack = createStackNavigator()

export default function ProfileTopTabsLayout() {
  const insets = useSafeAreaInsets()

  const bink: StackNavigationOptions = { headerTitle: '',
    headerBackTitle: "Ava"
   }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Matches'
        component={MatchesScreen}
        options={{
          title: 'Matches',
          headerBackTitle: 'Done',
        }}
      />

      <Stack.Screen name='ViewMatch' options={bink}>
        {() => (
          <TopTabs.Navigator
            tabBarPosition='top'
            screenOptions={{
              tabBarIndicatorStyle: { backgroundColor: 'white' },
            }}>
            <TopTabs.Screen name='Chat' component={ChatScreen} />
            <TopTabs.Screen name='View' component={ViewMatchProfileScreen} />
          </TopTabs.Navigator>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  )
}


// options={{
//   title: 'View Like',
//   // headerShown: false,
//   // headerTitleStyle: false,
// }}
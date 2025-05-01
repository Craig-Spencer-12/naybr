import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import LikesScreen from './likes';
import ViewLikeScreen from './viewLike';

const Stack = createStackNavigator();

export default function ProfileTopTabsLayout() {

  return (

    <Stack.Navigator>
      <Stack.Screen
        name="Likes"
        component={LikesScreen}
        options={{
          title: 'Likes',
          headerBackTitle: 'Done',
        }}
      />
     <Stack.Screen
        name="ViewLike"
        component={ViewLikeScreen}
        options={{
          title: 'View Like',
          // headerShown: false,
          // headerTitleStyle: false,
        }}
      />
    </Stack.Navigator>
  );
}
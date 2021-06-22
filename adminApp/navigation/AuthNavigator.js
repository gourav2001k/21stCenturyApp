import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';

import Login from '../screens/Login';
import TabNavigator from './MealsNavigator';

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
    <FlashMessage position="bottom" />
  </NavigationContainer>
);

export default AuthNavigator;

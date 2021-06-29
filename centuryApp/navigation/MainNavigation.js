import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MealsNavigator from './MealsNavigator';
import Login from '../screens/Login';
import Cart from '../screens/Cart';

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="MealsNavigator"
        component={MealsNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Cart" component={Cart} />
    </Stack.Navigator>
  );
};

export default MainNavigation;

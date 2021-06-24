import React from 'react';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Meals from '../screens/Meals';
import Orders from '../screens/Orders';
import OrderDetails from '../screens/OrderDetails';
import Profile from '../screens/Profile';
import AddMeal from '../screens/AddMeal';
import UpdateMeal from '../screens/UpdateMeal';

const Stack = createStackNavigator();

const MealsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Meals" component={Meals} />
      <Stack.Screen name="UpdateMeal" component={UpdateMeal} />
      <Stack.Screen name="Add Meal" component={AddMeal} />
    </Stack.Navigator>
  );
};

const OrderStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};
const BottomTab = createMaterialBottomTabNavigator();

const MealsTab = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Meals"
        component={MealsStack}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons size={23} color="white" name="fast-food-outline" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Orders"
        component={OrderStack}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons size={23} color="white" name="ios-restaurant" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome size={23} color="white" name="user" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default MealsTab;

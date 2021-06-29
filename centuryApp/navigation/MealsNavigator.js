import React from 'react';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import HeaderButtonss from '../components/HeaderButtonss';
import Meals from '../screens/Meals';
import MealDetails from '../screens/MealDetails';
import Orders from '../screens/Orders';
import OrderDetails from '../screens/OrderDetails';
import Profile from '../screens/Profile';

import Colors from '../constants/Colors';

const Stack = createStackNavigator();

const MealsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({navigation, route}) => ({
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButtonss}>
            <Item
              title="Menu"
              iconName="ios-menu"
              onPress={() => {
                navigation.toggleDrawer();
              }}
              color="white"
            />
          </HeaderButtons>
        ),
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButtonss}>
            <Item
              title="Cart"
              iconName="ios-cart-outline"
              onPress={() => {
                navigation.navigate('Cart');
              }}
              color="white"
            />
          </HeaderButtons>
        ),
        headerStyle: {backgroundColor: Colors['Star Command Blue']},
        headerTitleStyle: {color: 'white'},
      })}>
      <Stack.Screen name="Meals" component={Meals} />
      <Stack.Screen name="MealDetails" component={MealDetails} />
    </Stack.Navigator>
  );
};

const OrderStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({navigation, route}) => ({
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButtonss}>
            <Item
              title="Menu"
              iconName="ios-menu"
              onPress={() => {
                navigation.toggleDrawer();
              }}
              color="white"
            />
          </HeaderButtons>
        ),
        headerStyle: {backgroundColor: 'hsla(200, 100%, 43%, 1)'},
        headerTitleStyle: {color: 'white'},
      })}>
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({navigation, route}) => ({
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButtonss}>
            <Item
              title="Menu"
              iconName="ios-menu"
              onPress={() => {
                navigation.toggleDrawer();
              }}
              color={Colors.vividSkyBlue}
            />
          </HeaderButtons>
        ),
      })}>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};
const BottomTab = createMaterialBottomTabNavigator();

const MealsTab = () => {
  return (
    <BottomTab.Navigator
      shifting={true}
      // activeColor={Colors.tuftsBlue}
      inactiveColor="rgba(0,0,0,0.5)">
      <BottomTab.Screen
        name="Meals"
        component={MealsStack}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons size={23} color={color} name="fast-food-outline" />
          ),
          // tabBarColor: 'hsla(35, 90%, 45%, 1)',
          tabBarColor: Colors['Star Command Blue'],
        }}
      />
      <BottomTab.Screen
        name="Orders"
        component={OrderStack}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons size={23} color={color} name="ios-restaurant" />
          ),
          tabBarColor: 'hsla(200, 100%, 43%, 1)',
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome size={23} color={color} name="user" />
          ),
          tabBarColor: '#006400',
        }}
      />
    </BottomTab.Navigator>
  );
};

export default MealsTab;

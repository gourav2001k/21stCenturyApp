import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButtonss from '../components/HeaderButtonss';

import MealsNavigator from './MealsNavigator';
import Login from '../screens/Login';
import Cart from '../screens/Cart';
import Colors from '../constants/Colors';
import AboutUs from '../screens/AboutUs';
import Rule from '../screens/Rule';

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="MealsNavigator"
        component={MealsNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          headerStyle: {backgroundColor: Colors['Star Command Blue']},
          headerTitleStyle: {color: '#ffffff'},
          headerTintColor: '#ffffff',
        }}
      />
      <Stack.Screen
        name="About Us"
        component={AboutUs}
        options={({navigation, route}) => ({
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
          headerStyle: {backgroundColor: Colors['Star Command Blue']},
          headerTitleStyle: {color: 'white'},
        })}
      />
      <Stack.Screen
        name="Rule"
        component={Rule}
        options={({navigation, route}) => ({
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
          headerStyle: {backgroundColor: Colors['Star Command Blue']},
          headerTitleStyle: {color: 'white'},
        })}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;

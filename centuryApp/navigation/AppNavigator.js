import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import FlashMessage from 'react-native-flash-message';

import MainNavigation from './MainNavigation';
// import Filters from '../screens/Filters';
// import TC from '../screens/T&C';
import AboutUs from '../screens/AboutUs';
import DrawerContent from './DrawerContent';

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="DashBoard" component={MainNavigation} />
      </Drawer.Navigator>
      <FlashMessage position="bottom" style={{elevation: 10}} />
    </NavigationContainer>
  );
};

export default AppNavigator;

import React from 'react';
import {View, StyleSheet} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Logo from '../assets/logo.png';
import auth from '@react-native-firebase/auth';

const logOut = async () => {
  await auth()
    .signOut()
    .then(() => console.log('User signed out!'));
};
const DrawerContent = props => {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.logo}>
          <Avatar.Image
            source={Logo}
            size={150}
            style={{backgroundColor: 'white'}}
          />
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="home-outline" color={color} size={size} />
            )}
            label="Home"
            onPress={() => {
              props.navigation.navigate('MealsNavigator');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="account-outline" color={color} size={size} />
            )}
            label="About Us"
            onPress={() => {
              props.navigation.navigate('About Us');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="format-list-checkbox" color={color} size={size} />
            )}
            label="Rules and T&C"
            onPress={() => {
              props.navigation.navigate('Rule');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="share-variant" color={color} size={size} />
            )}
            label="Share Us"
            onPress={() => {
              console.log('Share');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="star-outline" color={color} size={size} />
            )}
            label="Rate Us"
            onPress={() => {
              console.log('Rate');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="human-greeting" color={color} size={size} />
            )}
            label="Contact / Support"
            onPress={() => {
              console.log('Contact');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="bug" color={color} size={size} />
            )}
            label="Report Bug"
            onPress={() => {
              console.log('Bug');
            }}
          />
        </Drawer.Section>
      </DrawerContentScrollView>

      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Log Out"
          onPress={() => {
            logOut();
            props.navigation.navigate('Login');
          }}
        />
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  logo: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default DrawerContent;

import React from 'react';
import {View, StyleSheet} from 'react-native';

import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Avatar, Drawer} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Logo from '../assets/logo.png';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import onShare from '../components/Share';
import Rate from '../components/Rate';
import ReportBug from '../components/ReportBug';
import Support from '../components/Support';

const logOut = async () => {
  try {
    if (auth().currentUser) {
      await firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .update({token: ''});
      await auth().signOut();
    }
  } catch (err) {
    showMessage({
      message: 'Error',
      description: err.message,
      type: 'danger',
    });
  }
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
            labelStyle={{fontSize: 16}}
            icon={({color, size}) => (
              <Icon name="home-outline" color={color} size={size} />
            )}
            label="Home"
            onPress={() => {
              props.navigation.navigate('MealsNavigator');
            }}
          />
          <DrawerItem
            labelStyle={{fontSize: 16}}
            icon={({color, size}) => (
              <Icon name="account-outline" color={color} size={size} />
            )}
            label="About Us"
            onPress={() => {
              props.navigation.navigate('About Us');
            }}
          />
          <DrawerItem
            labelStyle={{fontSize: 16}}
            icon={({color, size}) => (
              <Icon name="format-list-checkbox" color={color} size={size} />
            )}
            label="Rules and T&C"
            onPress={() => {
              props.navigation.navigate('Rule');
            }}
          />
          <DrawerItem
            labelStyle={{fontSize: 16}}
            icon={({color, size}) => (
              <Icon name="share-variant" color={color} size={size} />
            )}
            label="Share Us"
            onPress={onShare}
          />
          <DrawerItem
            labelStyle={{fontSize: 16}}
            icon={({color, size}) => (
              <Icon name="star-outline" color={color} size={size} />
            )}
            label="Rate Us"
            onPress={Rate}
          />
          <DrawerItem
            labelStyle={{fontSize: 16}}
            icon={({color, size}) => (
              <Icon name="human-greeting" color={color} size={size} />
            )}
            label="Contact / Support"
            onPress={Support}
          />
          <DrawerItem
            labelStyle={{fontSize: 16}}
            icon={({color, size}) => (
              <Icon name="bug" color={color} size={size} />
            )}
            label="Report Bug"
            onPress={ReportBug}
          />
        </Drawer.Section>
      </DrawerContentScrollView>

      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          labelStyle={{fontSize: 16}}
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Log Out"
          onPress={() => {
            logOut();
            props.navigation.navigate('Login');
          }}
        />
        {/* <DrawerItem
          icon={({color, size}) => (
            <Icon name="copyright" color={color} size={size} />
          )}
          disabled={true}
          label="GH Tek"
        /> */}
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
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
});

export default DrawerContent;

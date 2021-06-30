import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import {Button, Icon, Overlay, ListItem} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import Colors from '../constants/Colors';
import Address from '../components/profile/Address';
import Logo from '../assets/logo.png';

const Profile = props => {
  const [isLoading, setIsLoading] = useState(true);
  const [oldAddress, setAddress] = useState({});
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  useEffect(() => {
    if (!auth().currentUser) {
      props.navigation.navigate('Login');
    } else {
      const fetch = async () => {
        var userData = await firestore()
          .collection('users')
          .doc(auth().currentUser.uid)
          .get();
        userData = userData.data();
        setAddress(userData.address);
        setIsLoading(false);
      };
      fetch();
      const onResult = () => setIsLoading(true);
      const unsubscribe = firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .onSnapshot(onResult, console.warn);
      return () => unsubscribe();
    }
  });
  if (!auth().currentUser || isLoading) {
    return (
      <View>
        <Text>Redirecting...</Text>
      </View>
    );
  }
  const renderList = [
    {
      name: auth().currentUser.displayName
        ? auth().currentUser.displayName
        : '(No Name)',
      title: 'Name',
      type: 'fontAwesome',
      icon: 'account-box',
    },
    {
      name: oldAddress.address ? oldAddress.address : '(Not present)',
      title: 'Address',
      type: 'entypo',
      icon: 'location-pin',
    },
    {
      name: oldAddress.locality ? oldAddress.locality : '(Not present)',
      title: 'Locality',
      type: 'Entypo',
      icon: 'local-attraction',
    },
    {
      name: 'Jodhpur',
      title: 'City',
      type: 'Entypo',
      icon: 'location-city',
    },
    {
      name: auth().currentUser.phoneNumber,
      title: 'Phone No.',
      type: 'ionicons',
      icon: 'call',
    },
  ];
  return (
    <View style={styles.screen}>
      <Image source={Logo} style={styles.image} />
      {renderList.map((dat, idx) => (
        <ListItem key={idx} bottomDivider style={{width: '95%'}}>
          <ListItem.Content
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}>
            <Icon name={dat.icon} type={dat.type} />
            <ListItem.Title style={{marginLeft: 20}}>
              {dat.title}
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Content>
            <ListItem.Subtitle>{dat.name}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
      <View style={styles.buttonContainer}>
        <Button
          title="Update Profile"
          onPress={toggleOverlay}
          buttonStyle={styles.button}
          titleStyle={styles.titleButton}
        />
      </View>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.overlayContainer}>
        <View style={styles.crossIcon}>
          <Icon name="cross" type="entypo" raised onPress={toggleOverlay} />
        </View>
        <Address toggleOverlay={toggleOverlay} />
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  buttonContainer: {
    overflow: 'hidden',
    borderWidth: 1,
    borderRadius: 30,
    width: '75%',
    marginTop: 20,
  },
  button: {
    backgroundColor: Colors['Star Command Blue'],
  },
  titleButton: {
    color: 'white',
    marginLeft: 20,
    fontSize: 22,
    fontFamily: 'robotoRegular',
  },
  overlayContainer: {
    width: '105%',
    height: '105%',
    position: 'absolute',
    bottom: -10,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  crossIcon: {
    height: '20%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default Profile;

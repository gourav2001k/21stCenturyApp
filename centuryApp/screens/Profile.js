import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Address from '../components/profile/Address';
import {Button, Icon, Overlay} from 'react-native-elements';

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
  return (
    <View style={styles.screen}>
      <Text>
        Name :{' '}
        {auth().currentUser.displayName
          ? auth().currentUser.displayName
          : '(No Name)'}
      </Text>
      <Text>
        Address : {oldAddress.address ? oldAddress.address : '(Not present)'}
      </Text>
      <Text>
        Locality : {oldAddress.locality ? oldAddress.locality : '(Not present)'}
      </Text>
      <Text>Phone : {auth().currentUser.phoneNumber}</Text>
      <Button title="Update Profile" onPress={toggleOverlay} />
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
    justifyContent: 'center',
    alignItems: 'center',
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

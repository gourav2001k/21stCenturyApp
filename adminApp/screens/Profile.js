import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import RNRestart from 'react-native-restart';
import {showMessage} from 'react-native-flash-message';
import {Button, Icon, Overlay} from 'react-native-elements';

import Notification from '../components/notification/Notification';

const Profile = props => {
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const logOut = async () => {
    try {
      await firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .update({token: ''});
      await auth().signOut();
      RNRestart.Restart();
    } catch (err) {
      showMessage({
        message: 'Error',
        description: err.message,
        type: 'danger',
      });
    }
  };
  return (
    <View style={styles.screen}>
      <Button
        title="Send Notifications"
        onPress={toggleOverlay}
        buttonStyle={styles.button}
        titleStyle={styles.titleButton}
      />
      <Button title="LogOut" onPress={logOut} />
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.overlayContainer}>
        <View style={styles.crossIcon}>
          <Icon name="cross" type="entypo" raised onPress={toggleOverlay} />
        </View>
        <Notification toggleOverlay={toggleOverlay} />
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
  button: {margin: 20},
  overlayContainer: {
    width: '105%',
    height: '75%',
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

import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Button, Dimensions, Alert} from 'react-native';

import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const ForeGroundNotify = props => {
  // const noti = useNotification({
  //   type: 'orderPlaced',
  //   admin: false,
  //   adminType: '',
  // });

  useEffect(() => {
    const local = message => {
      PushNotification.localNotification({
        channelId: auth().currentUser.uid,
        bigText: message.data.message,
        title: message.data.title,
        message: '',
        color: 'red',
        vibrate: true,
        vibration: 100,
        playSound: true,
        soundName: 'default',
      });
    };

    const unsubscribe = messaging().onMessage(mess => local(mess));
    return unsubscribe;
  }, []);

  return null;
};

const styles = StyleSheet.create({
  container: {},
});

export default ForeGroundNotify;

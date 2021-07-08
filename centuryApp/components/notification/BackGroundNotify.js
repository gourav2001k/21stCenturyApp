import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Button, Dimensions, Alert} from 'react-native';

import messaging from '@react-native-firebase/messaging';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const BackGroundNotify = props => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('New Notification', remoteMessage.data.message);
    });
    return unsubscribe;
  }, []);

  return null;
};

const styles = StyleSheet.create({
  container: {},
});

export default BackGroundNotify;

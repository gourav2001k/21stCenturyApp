import React, {useEffect} from 'react';
import axios from 'axios';
import {View, Text, StyleSheet, Button, Dimensions, Alert} from 'react-native';

import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import useNotification from '../../hooks/useNotification';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const Notification = props => {
  const noti = useNotification({
    type: 'orderPlaced',
    admin: false,
    adminType: '',
  });

  useEffect(async () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title="test"
        onPress={() => {
          noti();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Notification;

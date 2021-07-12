import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {showMessage} from 'react-native-flash-message';

const Profile = props => {
  const logOut = async () => {
    try {
      await firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .update({token: ''});
      await auth().signOut();
      props.navigation.replace('Login');
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
      <Text>This is Profile Screen!!!</Text>
      <Button title="LogOut" onPress={logOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Profile;

import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

import auth from '@react-native-firebase/auth';
const Profile = props => {
  useEffect(() => {
    if (!auth().currentUser) {
      props.navigation.navigate('Login');
    }
  });
  if (!auth().currentUser) {
    return (
      <View>
        <Text>Redirecting...</Text>
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      <Text>This is Profile Screen!!!</Text>
      <Button
        title="Login Page"
        onPress={() => {
          props.navigation.navigate('Login');
        }}
      />
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

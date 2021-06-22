import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const Profile = props => {
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

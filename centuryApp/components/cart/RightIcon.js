import React from 'react';
import {View, Text, StyleSheet, Button, Dimensions} from 'react-native';
import {Icon} from 'react-native-elements';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const RightIcon = () => (
  <View
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    }}>
    <Icon
      raised
      name="trash"
      type="font-awesome"
      color="#f50"
      onPress={() => {
        console.log('hi');
      }}
    />
  </View>
);
const styles = StyleSheet.create({
  container: {},
});

export default RightIcon;

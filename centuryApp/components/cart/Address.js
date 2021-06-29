import React from 'react';
import {View, Text, StyleSheet, Button, Dimensions} from 'react-native';

import {Input} from 'react-native-elements';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const ModifiedInput = ({label, placeholder, setText, value}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontFamily: 'robotoRegular',
          color: 'rgba(0,0,0,0.7)',
          fontSize: 20,
        }}>
        {label}
      </Text>
      <Input
        placeholder={placeholder}
        onChangeText={val => {
          setText(val);
        }}
      />
    </View>
  );
};

const Address = props => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 25, fontFamily: 'robotoRegular'}}>
        Delievery Address
      </Text>
      <ModifiedInput label="Line2" placeholder="House" />
      <Input
        placeholder="Comment"
        label="Line1"
        // onChangeText={value => this.setState({comment: value})}
      />
      <Input
        placeholder="Comment"
        label="Line1"
        // onChangeText={value => this.setState({comment: value})}
      />
      <Input placeholder="Comment" label="Line1" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingLeft: 10,
  },
});

export default Address;

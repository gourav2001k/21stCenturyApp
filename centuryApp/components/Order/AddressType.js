import React from 'react';
import {View, Text, StyleSheet, Button, Dimensions} from 'react-native';

import {Icon, SocialIcon} from 'react-native-elements';
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const AddressType = ({type}) => {
  return (
    <View style={styles.container}>
      <Icon
        raised
        name="money-bill-wave"
        size={17}
        color="green"
        type="font-awesome-5"
        onPress={() => {
          console.log('Transaction Id');
        }}
      />
      <Text style={styles.text}>
        {type === 'takeAway' ? 'Take Away' : 'Delievery'}
      </Text>
      <Icon
        raised
        name="ios-location"
        size={17}
        type="ionicon"
        onPress={() => {
          console.log('Address');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontFamily: 'robotoRegular',
    paddingHorizontal: 20,
  },
});

export default AddressType;

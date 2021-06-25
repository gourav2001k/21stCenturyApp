import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import {Icon} from 'react-native-elements';

import Colors from '../../constants/Colors';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const DetailCounter = ({quantity}) => {
  return (
    <View style={styles.container}>
      <View style={styles.addContainer}>
        <Icon
          name="add-outline"
          type="ionicon"
          size={18}
          color="white"
          onPress={() => {
            console.log('add');
          }}
        />
      </View>
      <View style={{justifyContent: 'center'}}>
        <Text style={{fontFamily: 'roboto-light', fontSize: 18}}>
          {quantity}
        </Text>
      </View>
      <View style={styles.subContainer}>
        <Icon
          name="remove-outline"
          type="ionicon"
          size={18}
          onPress={() => {
            console.log('sub');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // borderRadius: 50,
    width: 100,
    justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor: 'black',
    overflow: 'hidden',
  },
  addContainer: {
    backgroundColor: Colors['Orange Pantone'],
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DetailCounter;

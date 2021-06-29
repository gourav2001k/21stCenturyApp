import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import {Icon} from 'react-native-elements';

import Colors from '../../constants/Colors';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const DetailCounter = ({quantity, details, setCartItems, cartMealID}) => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Icon
          name="remove-outline"
          type="ionicon"
          size={27}
          onPress={() => {
            var newCartItems = {};
            newCartItems[cartMealID] = {
              ...details,
              quantity: quantity === 0 ? 0 : (quantity -= 1),
            };
            setCartItems(prev => ({
              ...prev,
              ...newCartItems,
            }));
          }}
        />
      </View>
      <View style={{justifyContent: 'center'}}>
        <Text style={{fontSize: 18}}>{quantity}</Text>
      </View>
      <View style={styles.addContainer}>
        <Icon
          name="add-outline"
          type="ionicon"
          size={27}
          color="white"
          onPress={() => {
            var newCartItems = {};
            newCartItems[cartMealID] = {
              ...details,
              quantity: (quantity += 1),
            };
            setCartItems(prev => ({
              ...prev,
              ...newCartItems,
            }));
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 85,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0,25,255,0.1)',
    overflow: 'hidden',
  },
  addContainer: {
    backgroundColor: Colors['Star Command Blue'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DetailCounter;

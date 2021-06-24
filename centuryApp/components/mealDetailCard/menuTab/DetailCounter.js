import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import {Icon} from 'react-native-elements';

import Colors from '../../../constants/Colors';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const DetailCounter = ({finalOrder, setFinalOrder, index}) => {
  return (
    <View style={styles.container}>
      <Icon
        raised
        name="add-outline"
        type="ionicon"
        size={18}
        onPress={() => {
          setFinalOrder(prev => ({
            ...prev,
            [index]: {...prev[index], quantity: (prev[index].quantity += 1)},
          }));
        }}
      />
      <View style={{justifyContent: 'center'}}>
        <Text style={{fontFamily: 'roboto-light', fontSize: 18}}>
          {finalOrder[index].quantity}
        </Text>
      </View>
      <Icon
        raised
        name="remove-outline"
        type="ionicon"
        size={18}
        onPress={() => {
          setFinalOrder(prev => ({
            ...prev,
            [index]: {
              ...prev[index],
              quantity:
                prev[index].quantity === 0 ? 0 : (prev[index].quantity -= 1),
            },
          }));
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: width / 3.5,
    height: height / 17,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.counterBackground,
    borderRadius: 50,
    marginBottom: 20,
    marginTop: -10,
  },
});

export default DetailCounter;

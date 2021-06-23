import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import {Icon} from 'react-native-elements';

import Colors from '../../../constants/Colors';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const DetailCounter = ({quantity, setQuantity}) => {
  return (
    <View style={styles.container}>
      <Icon
        raised
        name="add-outline"
        type="ionicon"
        size={18}
        onPress={() => {
          quantity + 1 >= 0 ? setQuantity(quantity + 1) : setQuantity(0);
        }}
      />
      <View style={{justifyContent: 'center'}}>
        <Text style={{fontFamily: 'roboto-light', fontSize: 18}}>
          {quantity}
        </Text>
      </View>
      <Icon
        raised
        name="remove-outline"
        type="ionicon"
        size={18}
        onPress={() => {
          quantity - 1 >= 0 ? setQuantity(quantity - 1) : setQuantity(0);
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

import React from 'react';
import {View, Text, StyleSheet, Button, Dimensions} from 'react-native';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const RenderList = ({mealData}) => {
  const {name, price, quantity} = mealData;
  return (
    <View style={styles.container}>
      <View style={{width: '25%'}}>
        <Text numberOfLines={1}>{name}</Text>
      </View>
      <View style={{width: '25%'}}>
        <Text>₹ {price}</Text>
      </View>
      <View
        style={{
          width: '10%',
        }}>
        <Text numberOfLines={1}>{quantity}x</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 1,
  },
});

export default RenderList;

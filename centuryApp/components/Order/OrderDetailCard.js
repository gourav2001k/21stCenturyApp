import React from 'react';
import {View, Text, StyleSheet, Button, Dimensions} from 'react-native';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const OrderDetailCard = ({orderData}) => {
  const {status, meals, amount, createdAt} = orderData;
  console.log(meals);
  return (
    <View style={styles.container}>
      <Text>
        {amount} {status ? 'done' : 'pending'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default OrderDetailCard;

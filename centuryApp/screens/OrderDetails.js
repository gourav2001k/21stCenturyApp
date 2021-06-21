import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const OrderDetails = props => {
  return (
    <View style={styles.screen}>
      <Text>This is OrderDetails Screen!!!</Text>
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

export default OrderDetails;

import React from 'react';
import {View, Text, StyleSheet, Button, Dimensions, Alert} from 'react-native';

import CategoryTile from './../CategoryTile';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const AcceptReject = ({
  isAccept,
  isCancel,
  status,
  acceptOrder,
  cancelOrder,
}) => {
  return (
    <View style={styles.container}>
      <CategoryTile
        button
        text="Accept"
        buttonStyle={{paddingVertical: 0}}
        containerStyle={styles.acceptContainer}
        textStyle={styles.acceptText}
        onPress={acceptOrder}
      />
      <CategoryTile
        text="Reject"
        button
        buttonStyle={{paddingVertical: 0}}
        containerStyle={styles.rejectContainer}
        textStyle={styles.rejectText}
        onPress={cancelOrder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '50%',
  },

  acceptContainer: {
    marginHorizontal: 5,
    borderColor: 'green',
    backgroundColor: 'rgba(0,210,0,0.1)',
  },
  acceptText: {
    paddingHorizontal: 10,
    color: 'green',
    fontSize: 14,
  },
  rejectContainer: {
    marginHorizontal: 5,
    borderColor: 'red',
    backgroundColor: 'rgba(255,0,0,0.1)',
  },
  rejectText: {
    color: 'red',
    paddingHorizontal: 10,
    fontSize: 14, // color: Colors['Orange Pantone'],
  },
});

export default AcceptReject;

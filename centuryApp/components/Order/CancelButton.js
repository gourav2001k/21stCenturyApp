import React from 'react';
import {View, Text, StyleSheet, Button, Dimensions, Alert} from 'react-native';

import CategoryTile from './../CategoryTile';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const CancelButton = ({isAccept, isCancel, status, cancelOrder}) => {
  const alertCancel = () => {
    Alert.alert(
      'Confirm Cancel ',
      'Are you sure you want to cancel your Order?',
      [
        {
          text: 'Yes',
          onPress: cancelOrder,
          style: 'cancel',
        },
        {
          text: 'No',
          style: 'cancel',
        },
      ],
    );
  };

  return (
    <View>
      {!(isAccept || isCancel) ? (
        <CategoryTile
          button
          text="Cancel"
          buttonStyle={{paddingVertical: 0}}
          containerStyle={styles.cancelContainer}
          textStyle={styles.cancelText}
          onPress={alertCancel}
        />
      ) : (
        <CategoryTile
          text={isCancel ? 'Cancelled' : status ? 'Completed' : 'Accepted'}
          containerStyle={{
            marginHorizontal: 5,
            borderColor: !isCancel ? 'green' : 'red',
            backgroundColor: !isCancel
              ? 'rgba(0,210,0,0.1)'
              : 'rgba(255,0,0,0.1)',
          }}
          textStyle={{
            paddingHorizontal: 10,
            color: !isCancel ? 'green' : 'red',
            fontSize: 16,
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  cancelContainer: {
    marginHorizontal: 5,
    borderColor: 'red',
    backgroundColor: 'rgba(255,0,0,0.1)',
  },
  cancelText: {
    color: 'red',
    paddingHorizontal: 10,
    fontSize: 16, // color: Colors['Orange Pantone'],
  },
});

export default CancelButton;

import React from 'react';
import {View, Text, StyleSheet, Button, Dimensions, Alert} from 'react-native';

import CategoryTile from './../CategoryTile';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const AcceptReject = ({isAccept, isCancel, status, cancelOrder}) => {
  // make sure copy this style in totaltext
  //   totalTextContainer: {
  // width: '50%',
  //   },
  //   bottomText: {
  //     fontFamily: 'robotoLight',
  //     fontSize: 15,
  //   },
  //   rupeeText: {
  //     fontFamily: 'robotoRegular',
  //     fontSize: 20,
  //   },
  const acceptOrder = () => {
    console.log('accept');
  };
  const rejectOrder = () => {
    console.log('reject');
  };
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
        onPress={rejectOrder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },

  acceptContainer: {
    marginHorizontal: 5,
    borderColor: 'green',
    backgroundColor: 'rgba(0,210,0,0.1)',
  },
  acceptText: {
    paddingHorizontal: 10,
    color: 'green',
    fontSize: 22,
  },
  rejectContainer: {
    marginHorizontal: 5,
    borderColor: 'red',
    backgroundColor: 'rgba(255,0,0,0.1)',
  },
  rejectText: {
    color: 'red',
    paddingHorizontal: 10,
    fontSize: 22, // color: Colors['Orange Pantone'],
  },
});

export default AcceptReject;

import React from 'react';
import {View, Text, StyleSheet, Button, Dimensions, Alert} from 'react-native';

import CategoryTile from './../CategoryTile';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const CompletedButton = ({isAccept, isCancel, status, cancelOrder}) => {
  // make sure copy this style in totaltext
  // totalTextContainer: {
  //     width: '50%',
  //   },
  //   bottomText: {
  //     fontFamily: 'robotoLight',
  //     fontSize: 20,
  //   },
  //   rupeeText: {
  //     fontFamily: 'robotoRegular',
  //     fontSize: 25,
  //   },
  const completeOrder = () => {
    console.log('ready');
  };
  return (
    <View style={styles.container}>
      {!status ? (
        <CategoryTile
          button
          text="Ready"
          buttonStyle={{paddingVertical: 0}}
          containerStyle={styles.completeContainer}
          textStyle={styles.completeText}
          onPress={completeOrder}
        />
      ) : (
        <CategoryTile text="Completed" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },

  completeContainer: {
    marginHorizontal: 5,
    borderColor: 'green',
    backgroundColor: 'rgba(0,210,0,0.1)',
  },
  completeText: {
    paddingHorizontal: 10,
    color: 'green',
    fontSize: 22,
  },
});

export default CompletedButton;

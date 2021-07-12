import React from 'react';
import {View, Text, StyleSheet, Button, Dimensions, Alert} from 'react-native';

import CategoryTile from './../CategoryTile';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const CompletedButton = ({isAccept, isCancel, status, completeOrder}) => {
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
    fontSize: 14,
  },
});

export default CompletedButton;

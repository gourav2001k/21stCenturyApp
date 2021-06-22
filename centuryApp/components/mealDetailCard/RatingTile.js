import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import {Rating} from 'react-native-elements';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const RatingTile = props => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20}}>Rating : </Text>
      <Rating
        type="star"
        count={2}
        ratingCount={5}
        imageSize={24}
        ratingTextColor="rgb(0, 0, 0)"
        startingValue={props.value}
        fractions={1}
        readonly
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 20,
  },
});

export default RatingTile;

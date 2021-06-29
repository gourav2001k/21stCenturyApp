import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import {Rating, AirbnbRating} from 'react-native-ratings';
import greenTick from '../../assets/greenTick.jpg';
import Colors from '../../constants/Colors';
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const RatingTile = props => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20}}>Rating : </Text>
      <Rating
        type="custom"
        count={5}
        ratingCount={5}
        imageSize={30}
        startingValue={props.value}
        showRating={false}
        style={{borderColor: 'black'}}
        readonly
        // ratingColor={Colors['Star Command Blue']}
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

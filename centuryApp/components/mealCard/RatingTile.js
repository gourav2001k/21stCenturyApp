import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const RatingTile = props => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{props.value}</Text>
      </View>
      <FontAwesome name="star" size={15} color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 3,
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  textContainer: {
    marginHorizontal: 5,
  },
  text: {
    marginRight: 4,
    fontSize: 15,
    color: 'white',
  },
});

export default RatingTile;

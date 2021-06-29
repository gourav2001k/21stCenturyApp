import React from 'react';
import {View, Text, StyleSheet, Button, Dimensions} from 'react-native';

import CategoryTile from '../CategoryTile';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const TimePatch = props => {
  return (
    <CategoryTile
      text={`${props.time} min`}
      containerStyle={{
        width: 85,
        height: 25,
        marginRight: 18,
        borderColor: 'black',
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}
      textStyle={{
        color: 'white',
        fontSize: 15,
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default TimePatch;

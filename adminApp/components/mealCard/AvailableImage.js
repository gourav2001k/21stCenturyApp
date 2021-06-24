import React from 'react';
import {View, Text, StyleSheet, Button, Dimensions, Image} from 'react-native';

import soldOut from '../../assets/soldOut.jpg';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const AvailableImage = props => {
  return (
    <View style={styles.container}>
      <Image source={soldOut} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.4)',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width / 4,
    height: height / 11,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});

export default AvailableImage;

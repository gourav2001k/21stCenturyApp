import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ImageBackground,
  Dimensions,
} from 'react-native';

import AvailableImage from './AvailableImage';
import DiscountImage from './DiscountImage';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const MealImage = props => {
  return (
    <ImageBackground source={{uri: props.imageURL}} style={styles.bgImage}>
      {props.available ? (
        <View style={styles.discountContainer}>
          <DiscountImage value={props.discount} />
        </View>
      ) : null}
      {props.available ? null : <AvailableImage />}
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {props.name}
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    width: width / 1.05,
    height: height / 5,
    justifyContent: 'space-between',
  },
  discountContainer: {
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end',
  },
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
  },
  title: {
    fontFamily: 'roboto-light',
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});

export default MealImage;

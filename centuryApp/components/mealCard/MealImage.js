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
import RatingTile from './RatingTile';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const MealImage = props => {
  return (
    <ImageBackground
      source={{uri: props.imageURL}}
      style={{
        ...styles.bgImage,
        justifyContent: props.discount === 0 ? 'flex-end' : 'space-between',
      }}>
      {props.available ? (
        props.discount === 0 ? null : (
          <DiscountImage value={props.discount} />
        )
      ) : null}
      {props.available ? null : <AvailableImage />}
      <View style={styles.titleContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {props.name}
          </Text>
        </View>
        <View style={styles.ratingContainer}>
          <RatingTile value={props.rating} />
        </View>
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
  ratingContainer: {
    alignItems: 'flex-end',
  },
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    width: '85%',
  },
  title: {
    fontFamily: 'roboto-light',
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});

export default MealImage;

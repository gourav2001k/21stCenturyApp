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
import RatingTile from './RatingTile';
import TimePatch from './TimePatch';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const MealImage = props => {
  return (
    <ImageBackground
      source={{uri: props.imageURL}}
      style={{
        ...styles.bgImage,
      }}>
      {props.available ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: 5,
          }}>
          <TimePatch time={props.time} />
        </View>
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
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    width: '78%',
  },
  title: {
    fontFamily: 'robotoLight',
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});

export default MealImage;

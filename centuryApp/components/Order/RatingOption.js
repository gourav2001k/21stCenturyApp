import React from 'react';
import {View, Text, StyleSheet, Button, Dimensions} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import {Rating} from 'react-native-elements';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const RatingOption = ({intialRating, mealID, orderID}) => {
  const handleRating = async ratingValue => {
    var db = firestore().collection('meals').doc(mealID);
    var fetchedRating = await db.get();
    var ratingData = fetchedRating.data().ratings;

    var updatedRating = {
      ...ratingData,
      [orderID]: ratingValue,
    };

    var finalValue = 0;
    var tot = 0;
    Object.keys(updatedRating).map(dat => {
      (finalValue += updatedRating[dat]), (tot += 1);
    });
    const rating = (finalValue / tot).toFixed(2);

    await db.update({
      ratings: updatedRating,
      rating: rating,
    });
  };

  return (
    <View style={styles.ratingContainer}>
      <Text style={{fontFamily: 'robotoRegular', fontSize: 20}}>
        Rating :{'  '}
      </Text>
      <Rating
        type="custom"
        imageSize={25}
        startingValue={intialRating}
        onFinishRating={rating => handleRating(rating)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  ratingContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RatingOption;

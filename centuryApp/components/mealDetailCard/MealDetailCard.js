import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, Dimensions} from 'react-native';

import AboutMeal from './AboutMeal';
import DetailImage from './DetailImage';
import CategoryTile from '../CategoryTile';
import RatingTile from './RatingTile';
import CartButton from './CartButton';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const MealDetailCard = props => {
  const {
    available,
    discount,
    category,
    rating,
    name,
    imageURL,
    variants,
    description,
    mealID,
  } = props.mealDetail;
  const [finalOrder, setFinalOrder] = useState({
    quantity: 0,
    price: 100,
  });

  return (
    <View style={styles.container}>
      <DetailImage imageURL={imageURL} />
      <View style={{height: height / 9}}>
        <AboutMeal name={name} description={description} />
      </View>
      <View style={styles.categoryContainer}>
        <CategoryTile text={category} />
      </View>
      <RatingTile value={rating} />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <CartButton
          navigation={props.navigation}
          mealID={mealID}
          finalOrder={finalOrder}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    // height: height,
    width: width,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginHorizontal: 10,
  },
});

export default MealDetailCard;

import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, Dimensions} from 'react-native';

import AboutMeal from './AboutMeal';
import DetailImage from './DetailImage';
import PriceMenu from './menuTab/PriceMenu';
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

  Object.keys(variants).map(dat => {
    variants[dat]['quantity'] = 0;
  });

  const [check, setCheck] = useState(false);
  const [finalOrder, setFinalOrder] = useState({
    ...variants,
  });

  console.log(finalOrder);
  return (
    <View style={styles.container}>
      <DetailImage imageURL={imageURL} />
      <View style={{height: height / 9}}>
        <AboutMeal name={name} description={description} />
      </View>
      <View
        style={{
          alignItems: 'center',
        }}>
        <PriceMenu
          setFinalOrder={setFinalOrder}
          finalOrder={finalOrder}
          check={check}
          setCheck={setCheck}
        />
      </View>
      <View style={styles.categoryContainer}>
        <CategoryTile text={category} />
      </View>
      <RatingTile value={rating} />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <CartButton mealID={mealID} finalOrder={finalOrder} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'white',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginHorizontal: 10,
  },
});

export default MealDetailCard;

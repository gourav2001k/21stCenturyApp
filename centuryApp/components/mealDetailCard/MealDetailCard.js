import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, ScrollView} from 'react-native';

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
    variants[dat]['mealName'] = name;
  });

  const [finalOrder, setFinalOrder] = useState({
    ...variants,
  });
  const [currentCounter, setCurrentCounter] = useState(0);

  return (
    <View style={styles.container}>
      <DetailImage imageURL={imageURL} />
      <ScrollView>
        <View style={{height: height / 9, marginTop: 5}}>
          <AboutMeal name={name} description={description} />
        </View>
        <View
          style={{
            height: height / 5,
          }}>
          <PriceMenu
            setFinalOrder={setFinalOrder}
            finalOrder={finalOrder}
            currentCounter={currentCounter}
            setCurrentCounter={setCurrentCounter}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: height / 12,
          }}>
          <CartButton
            mealID={mealID}
            finalOrder={finalOrder}
            navigation={props.navigation}
            currentCounter={currentCounter}
          />
        </View>
        <View style={{marginTop: 5}}>
          <RatingTile value={rating} />
        </View>
      </ScrollView>
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
    marginTop: 20,
    marginHorizontal: 10,
  },
});

export default MealDetailCard;

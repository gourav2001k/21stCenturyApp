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
    variants[dat]['category'] = category;
  });

  const [finalOrder, setFinalOrder] = useState({
    ...variants,
  });
  const [currentCounter, setCurrentCounter] = useState(0);

  return (
    <View style={styles.container}>
      <DetailImage imageURL={imageURL} />
      <ScrollView>
        <View style={styles.itemContainer}>
          <AboutMeal name={name} description={description} />
          <PriceMenu
            setFinalOrder={setFinalOrder}
            finalOrder={finalOrder}
            currentCounter={currentCounter}
            setCurrentCounter={setCurrentCounter}
          />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              // height: height / 13,
            }}>
            <CartButton
              mealID={mealID}
              finalOrder={finalOrder}
              navigation={props.navigation}
              currentCounter={currentCounter}
            />
          </View>
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
  itemContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    paddingTop: 5,
  },
});

export default MealDetailCard;

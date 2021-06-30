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
    variants[dat]['mealName'] = name;
  });

  const [check, setCheck] = useState(false);
  const [finalOrder, setFinalOrder] = useState({
    ...variants,
  });

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
            check={check}
            setCheck={setCheck}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: height / 11,
          }}>
          <CartButton
            mealID={mealID}
            finalOrder={finalOrder}
            navigation={props.navigation}
          />
        </View>
        <View style={{marginTop: 10}}>
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

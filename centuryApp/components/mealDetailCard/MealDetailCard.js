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
        <View style={{height: height / 9, marginTop: 10}}>
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
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            // marginBottom: 10,
            // backgroundColor: 'rgba(0,165,255,0.1)',
            // paddingBottom: 20,
            marginTop: 30,
          }}>
          <CartButton mealID={mealID} finalOrder={finalOrder} />
        </View>
        {/* <View style={styles.categoryContainer}>
          <CategoryTile text={category} />
        </View> */}

        <View style={{marginTop: 30}}>
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

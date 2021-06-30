import React from 'react';
import {View, Text, StyleSheet, Button, Dimensions} from 'react-native';
import Touchable from 'react-native-touchable-scale';

import MealImage from './MealImage';
import Colors from '../../constants/Colors';
import CategoryTile from '../CategoryTile';
import {showMessage} from 'react-native-flash-message';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const MealCard = props => {
  const {
    available,
    category,
    rating,
    name,
    imageURL,
    variants,
    time,
    mealID,
  } = props.meal;

  var renderPrice = Infinity;
  Object.keys(variants).map(dat => {
    renderPrice = Math.min(renderPrice, variants[dat].price);
  });

  const Openable = () => {
    available
      ? props.navigation.navigate('MealDetails', {mealID: mealID})
      : showMessage({
          message: 'SOLD OUT !!!!!',
          description: 'Meal not available',
          type: 'danger',
        });
  };

  return (
    <Touchable onPress={Openable} activeScale={0.93} friction={4}>
      <View style={styles.mainContainer}>
        <MealImage
          imageURL={imageURL}
          name={name}
          available={available}
          rating={rating}
          time={time}
        />
        <View style={styles.textContainer}>
          <CategoryTile
            text={category}
            containerStyle={{
              marginHorizontal: 10,
              borderColor: Colors.blueJeans,
              backgroundColor: Colors['Star Command Blue'],
            }}
            textStyle={{
              fontSize: 18,
              color: 'white',
            }}
          />
          <CategoryTile
            text={`₹ ${renderPrice}`}
            containerStyle={{
              marginHorizontal: 10,
              borderColor: Colors.blueJeans,
              backgroundColor: Colors['Star Command Blue'],
            }}
            textStyle={{
              fontSize: 18,
              color: 'white',
            }}
          />
        </View>
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 10,
    borderTopStartRadius: 35,
    borderTopEndRadius: 35,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    overflow: 'hidden',
    borderWidth: 0.001,
    elevation: 2,
    backgroundColor: 'rgba(0,165,255,0.1)',
  },
  textContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default MealCard;

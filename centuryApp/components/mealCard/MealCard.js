import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableNativeFeedback,
  Dimensions,
} from 'react-native';

import MealImage from './MealImage';
import Colors from '../../constants/Colors';
import CategoryTile from '../CategoryTile';
import {showMessage} from 'react-native-flash-message';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const MealCard = props => {
  const {
    available,
    discount,
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
    <View style={styles.mainContainer}>
      <TouchableNativeFeedback onPress={Openable}>
        <View style={styles.container}>
          <MealImage
            imageURL={imageURL}
            name={name}
            discount={discount}
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
                backgroundColor: 'rgba(0,65,255,0.1)',
              }}
              textStyle={{
                fontSize: 18,
                color: Colors.blueJeans,
              }}
            />
            <CategoryTile
              text={`Rs ${renderPrice}`}
              containerStyle={{
                marginHorizontal: 10,
                borderColor: Colors.blueJeans,
                backgroundColor: 'rgba(0,65,255,0.1)',
              }}
              textStyle={{
                fontSize: 18,
                color: Colors.blueJeans,
              }}
            />
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 10,
    padding: 2,
    borderTopStartRadius: 35,
    borderTopEndRadius: 35,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    overflow: 'hidden',
    borderWidth: 0.001,
    elevation: 2,
  },
  container: {},
  textContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default MealCard;

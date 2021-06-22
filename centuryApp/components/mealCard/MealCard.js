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
import AntDesign from 'react-native-vector-icons/AntDesign';
import CategoryTile from '../CategoryTile';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const MealCard = props => {
  const {available, discount, category, rating, name, imageURL, variants} =
    props.meal;
  const Openable = () => {
    props.navigation.navigate('MealDetails');
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
          />
          <View style={styles.textContainer}>
            <CategoryTile text="Veg" />
            <CategoryTile
              text={category}
              containerStyle={{
                borderColor: Colors.frenchViolet,
                backgroundColor: 'rgba(127,0,255,0.1)',
              }}
              textStyle={{color: Colors.frenchViolet}}
            />
            <CategoryTile
              text="Rs123"
              containerStyle={{
                borderColor: Colors.frenchViolet,
                backgroundColor: 'rgba(127,0,255,0.1)',
              }}
              textStyle={{color: Colors.frenchViolet}}
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

import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import DetailCounter from './DetailCounter';
import MenuOption from './MenuOption';

import Colors from '../../../constants/Colors';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const PriceMenu = props => {
  const [index, setIndex] = useState(0);
  const [quantityFullMeal, setQuantityFullMeal] = useState(0);
  const [quantityHalfMeal, setQuantityHalfMeal] = useState(0);

  var x = props.finalOrder;

  const setQuantityFull = q => {
    setQuantityFullMeal(q);
    x['1 lbs'].quantity = q;
    props.setFinalOrder(x);
  };
  const setQuantityHalf = q => {
    setQuantityHalfMeal(q);
    x['2 lbs'].quantity = q;
    props.setFinalOrder(x);
  };

  const menuItem = [
    {
      type: '1 Pound',
      price: props.finalOrder['1 lbs'].price,
      quantity: quantityFullMeal,
      setQuantity: setQuantityFull,
      show: true,
    },
    {
      type: '2 Pound',
      price: props.finalOrder['2 lbs'].price,
      quantity: quantityHalfMeal,
      setQuantity: setQuantityHalf,
      show: props.is2pound,
    },
  ];

  return (
    <View style={styles.container}>
      {menuItem[index].show ? (
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>{menuItem[index].type}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>
              Price : ₹ {menuItem[index].price}
            </Text>
            <DetailCounter
              quantity={menuItem[index].quantity}
              setQuantity={menuItem[index].setQuantity}
            />
          </View>
        </View>
      ) : (
        <View style={styles.textUnavilableContainer}>
          <Text style={styles.titleText}>Currently Not Available</Text>
        </View>
      )}
      <MenuOption index={index} setIndex={setIndex} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 10,
    elevation: 2,
    borderWidth: 0.001,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  textContainer: {
    marginBottom: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textUnavilableContainer: {
    height: height / 6.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.darkBackground,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  priceText: {
    fontSize: 20,
    color: Colors.lightBackground,
  },
  border: {
    borderTopWidth: 1,
    marginTop: 3,
    marginBottom: 1,
  },
});

export default PriceMenu;

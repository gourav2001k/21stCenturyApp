import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import DetailCounter from './DetailCounter';
import MenuOption from './MenuOption';

import Colors from '../../../constants/Colors';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const PriceMenu = ({finalOrder, setFinalOrder, check, setCheck}) => {
  var tempIndex = '';
  Object.keys(finalOrder).every(dat => {
    tempIndex === '' ? (tempIndex = dat) : false;
  });

  const [index, setIndex] = useState(tempIndex);

  return (
    <View style={styles.container}>
      <MenuOption index={index} setIndex={setIndex} finalOrder={finalOrder} />
      {finalOrder[index].available ? (
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>{finalOrder[index].name}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>
              Price : ₹ {finalOrder[index].price}
            </Text>
            <DetailCounter
              index={index}
              finalOrder={finalOrder}
              setFinalOrder={setFinalOrder}
            />
          </View>
        </View>
      ) : (
        <View style={styles.textUnavilableContainer}>
          <Text style={styles.titleText}>Currently Not Available</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
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

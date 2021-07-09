import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import DetailCounter from './DetailCounter';
import MenuOption from './MenuOption';

import Colors from '../../../constants/Colors';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const PriceMenu = ({finalOrder, setFinalOrder, setCurrentCounter}) => {
  var tempIndex = '';
  Object.keys(finalOrder).every(dat => {
    tempIndex === '' ? (tempIndex = dat) : false;
  });

  const [index, setIndex] = useState(tempIndex);
  useEffect(() => {
    setCurrentCounter(finalOrder[index].quantity);
  }, [finalOrder, index]);
  return (
    <View style={styles.container}>
      <MenuOption index={index} setIndex={setIndex} finalOrder={finalOrder} />
      {finalOrder[index].available ? (
        <View style={styles.priceContainer}>
          <View style={styles.priceTextContainer}>
            <Text style={styles.priceText}>
              Price : ₹ {finalOrder[index].price}
            </Text>
          </View>
          <View style={styles.detailCounterContainer}>
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
    width: '100%',
    // backgroundColor: 'rgba(0,165,255,0.1)',
  },
  textUnavilableContainer: {
    // height: height / 6.5,
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
    alignItems: 'center',
    marginBottom: 20,
  },
  priceTextContainer: {
    width: '60%',
    paddingLeft: '10%',
  },
  priceText: {
    fontSize: 25,
    color: Colors.lightBackground,
  },
});

export default PriceMenu;

import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, Dimensions, Image} from 'react-native';

import {Avatar} from 'react-native-elements';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AppLoading from '../../hooks/AppLoading';
import RenderList from './RenderList';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const OrderDetailCard = ({orderData, orderID, mealID, status}) => {
  const {mealName, imageURL} = orderData;
  var totalValue = 0;

  Object.keys(orderData).map(dat => {
    dat === 'mealName' || dat === 'imageURL' || dat === 'rating'
      ? null
      : (totalValue += orderData[dat].quantity * orderData[dat].price);
  });
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Avatar rounded source={{uri: imageURL}} style={styles.avatar} />
        <View style={styles.mealNameContainer}>
          <Text style={styles.mealName} numberOfLines={2}>
            {mealName}
          </Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={{}}>Total</Text>
          <Text style={{fontSize: 18}}>₹ {totalValue}</Text>
        </View>
      </View>
      <View style={styles.borderContainer}>
        <Text numberOfLines={1} ellipsizeMode="clip" style={styles.borderStyle}>
          - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
          - - - -
        </Text>
      </View>
      {Object.keys(orderData).map(dat =>
        dat === 'mealName' || dat === 'imageURL' || dat === 'rating' ? null : (
          <RenderList mealData={orderData[dat]} key={dat} />
        ),
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 30,
    borderTopLeftRadius: 29,
    overflow: 'hidden',
    marginHorizontal: 10,
    marginTop: 10,
    elevation: 2,
    padding: 10,
  },
  mainContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  avatar: {
    height: height / 9,
    width: '30%',
  },
  mealNameContainer: {
    marginTop: 20,
    width: '50%',
    alignItems: 'center',
  },
  mealName: {
    fontSize: 20,
    fontFamily: 'robotoRegular',
  },
  totalContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  borderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderStyle: {
    color: 'rgba(0,0,0,0.4)',
  },
  listContainer: {
    flexDirection: 'row',
  },
  ratingContainer: {
    backgroundColor: 'white',
    marginBottom: -10,
    marginHorizontal: -10,
    padding: 5,
    marginTop: 5,
  },
});

export default OrderDetailCard;

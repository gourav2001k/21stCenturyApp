import React from 'react';
import {View, Text, StyleSheet, Button, Dimensions} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const OrderButton = ({cartItems, totalAmount}) => {
  var finalCart = {};

  Object.keys(cartItems).map(dat => {
    var x = dat.split('_');
    var y = {};
    y[x[1]] = {
      ...cartItems[dat],
    };
    y[x[1]].available;
    delete y[x[1]].mealID;
    finalCart[x[0]] = {...finalCart[x[0]], ...y};
  });

  const makeID = length => {
    var result = [];
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result.push(
        characters.charAt(Math.floor(Math.random() * charactersLength)),
      );
    }
    return result.join('');
  };

  const updateOrders = async () => {
    var doc = {
      amount: totalAmount,
      meals: finalCart,
      userID: auth().currentUser.uid,
      createdAt: firestore.Timestamp.now(),
    };
    console.log(doc);

    await firestore().collection('orders').doc(makeID(16)).set(doc);
  };

  return (
    <View style={styles.container}>
      <Button
        title="Proceed to Checkout"
        onPress={() => {
          updateOrders();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default OrderButton;

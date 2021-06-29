import React from 'react';
import {View, Text, StyleSheet, Button, Dimensions} from 'react-native';

import {showMessage} from 'react-native-flash-message';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const OrderButton = ({cartItems, totalAmount, setIsLoading}) => {
  const userID = auth().currentUser.uid;
  var finalCart = {};

  Object.keys(cartItems).map(dat => {
    var x = dat.split('_');
    var y = {};
    y[x[1]] = {
      ...cartItems[dat],
    };
    delete y[x[1]].mealName;
    delete y[x[1]].available;
    delete y[x[1]].mealID;
    finalCart[x[0]] = {...finalCart[x[0]], ...y};
  });

  const updateOrders = async () => {
    try {
      Object.keys(finalCart).map(dat => {
        Object.keys(finalCart[dat]).map(data => {
          finalCart[dat][data].quantity === 0
            ? delete finalCart[dat][data]
            : null;
        });
        Object.keys(finalCart[dat]).length === 0 ? delete finalCart[dat] : null;
      });
      var doc = {
        amount: totalAmount,
        meals: finalCart,
        userID: userID,
        createdAt: firestore.Timestamp.now(),
        status: false,
      };
      if (Object.keys(finalCart).length === 0) {
        showMessage({
          message: 'ERROR !!!!!!!',
          description: 'Please Add meals to Order..',
          type: 'danger',
        });
      } else {
        await firestore().collection('orders').doc(makeID(16)).set(doc);
        await firestore().collection('users').doc(userID).update({
          cart: {},
        });
        setIsLoading(false);
        showMessage({
          message: 'Order Done',
          description: 'Order Placed successfully!!!!',
          type: 'success',
        });
      }
    } catch (err) {
      showMessage({
        message: 'ERROR !!!!!!!',
        description: err.message,
        type: 'danger',
      });
    }
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

const makeID = () => {
  const d = new Date();
  return (
    String(d.getDate()).padStart(2, '0') +
    String(d.getMonth() + 1).padStart(2, '0') +
    String(d.getFullYear()).padStart(4, '0') +
    String(d.getHours()).padStart(2, '0') +
    String(d.getMinutes()).padStart(2, '0') +
    String(d.getSeconds()).padStart(2, '0') +
    String(d.getMilliseconds()).padStart(3, '0')
  );
};

export default OrderButton;

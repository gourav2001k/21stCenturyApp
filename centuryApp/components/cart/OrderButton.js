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
      var doc = {
        amount: totalAmount,
        meals: finalCart,
        userID: userID,
        createdAt: firestore.Timestamp.now(),
        status: false,
      };
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

export default OrderButton;

import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import {showMessage} from 'react-native-flash-message';
import {Button, Icon} from 'react-native-elements';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const CartButton = ({mealID, finalOrder}) => {
  var orderForCart = {};
  var tempName;

  Object.keys(finalOrder).map(dat => {
    tempName = `${mealID}_${dat}`;
    orderForCart[tempName] = {...finalOrder[dat], mealID: mealID};
  });

  const userID = auth().currentUser.uid;
  const addToCart = async () => {
    try {
      const cart = await firestore().collection('users').doc(userID).get();
      var cartItems = cart.data().cart;

      Object.keys(orderForCart).map(dat => {
        cartItems.hasOwnProperty(dat)
          ? (cartItems[dat].quantity += orderForCart[dat].quantity)
          : (cartItems[dat] = orderForCart[dat]);
      });

      Object.keys(cartItems).map(dat => {
        cartItems[dat].quantity === 0 ? delete cartItems[dat] : cartItems[dat];
      });

      await firestore().collection('users').doc(userID).update({
        cart: cartItems,
      });
      showMessage({
        message: 'Added To Cart',
        description: 'Item added to cart successfully!!!!',
        type: 'success',
      });
    } catch (err) {
      showMessage({
        message: 'ERROR',
        description: err.message,
        type: 'danger',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Add to Cart"
        onPress={() => {
          addToCart();
        }}
        icon={<Icon name="cart" type="ionicon" size={20} color="red" />}
        buttonStyle={styles.button}
        titleStyle={{color: 'red', marginLeft: 10}}
        raised
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    overflow: 'hidden',
    width: '45%',
    elevation: 2,
  },
  button: {
    width: '120%',
    paddingLeft: 30,
    paddingRight: 50,
    backgroundColor: 'rgba(255,0,0,0.2)',
  },
});

export default CartButton;

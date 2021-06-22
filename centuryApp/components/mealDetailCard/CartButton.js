import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import {showMessage} from 'react-native-flash-message';
import {Button, Icon} from 'react-native-elements';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const CartButton = props => {
  const userID = auth().currentUser.uid;
  const addToCart = async mealID => {
    try {
      const cart = await firestore().collection('users').doc(userID).get();
      const cartItems = cart.data().cart;
      cartItems[mealID] = props.finalOrder;
      console.log(cart.data());
      //   await firestore().collection('users').doc(userID).update({
      //     cart: cartItems,
      //   });
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
          addToCart(props.mealID);
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

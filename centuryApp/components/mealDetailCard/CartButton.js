import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import {showMessage} from 'react-native-flash-message';
import {Button, Icon} from 'react-native-elements';

import Colors from '../../constants/Colors';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const CartButton = ({mealID, finalOrder, navigation, currentCounter}) => {
  var orderForCart = {};
  var tempName;

  Object.keys(finalOrder).map(dat => {
    tempName = `${mealID}_${dat}`;
    orderForCart[tempName] = {...finalOrder[dat], mealID: mealID};
  });

  const addToCart = async () => {
    const userID = auth().currentUser.uid;

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
          if (!auth().currentUser) {
            setTimeout(() => {
              navigation.navigate('Login');
            }, 2500);
            return showMessage({
              message: 'Login Required',
              description: 'Redericting You too Login....',
              type: 'danger',
            });
          }
          if (currentCounter === 0) {
            return showMessage({
              message: 'Quantity Added is 0 !!! ',
              description: 'Please Add Atleast 1 meal',
              type: 'danger',
              duration: 3000,
            });
          }
          addToCart();
        }}
        icon={<Icon name="cart" type="ionicon" size={25} color="white" />}
        buttonStyle={styles.button}
        titleStyle={{
          color: 'white',
          marginLeft: 10,
          fontSize: 20,
          fontFamily: 'robotoRegular',
        }}
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
    marginTop: 10,
  },
  button: {
    paddingLeft: 30,
    paddingRight: 50,
    backgroundColor: 'hsl(200,90%,30%)',
  },
});

export default CartButton;

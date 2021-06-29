import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import {Button, Icon} from 'react-native-elements';
import {showMessage} from 'react-native-flash-message';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Colors from '../../constants/Colors';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const OrderButton = ({cartItems, totalAmount, setIsLoading}) => {
  const userID = auth().currentUser.uid;
  var finalCart = {};

  // console.log('-=-=-=-=', cartItems);
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
      // to delete if the item in cart has 0 quantity.
      Object.keys(finalCart).map(dat => {
        Object.keys(finalCart[dat]).map(data => {
          finalCart[dat][data].quantity === 0
            ? delete finalCart[dat][data]
            : null;
        });
        // to delete if the meal has no variant ordered
        Object.keys(finalCart[dat]).length === 0 ? delete finalCart[dat] : null;
      });
      //making document to set in the databse
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
        iconRight
        icon={<Icon name="arrow-right" size={30} color="white" />}
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
    borderRadius: 30,
    overflow: 'hidden',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: Colors['Star Command Blue'],
  },
});

const makeID = () => {
  const d = new Date();
  return (
    String(d.getDate()).padStart(2, '0') +
    String(d.getMonth() + 1).padStart(2, '0') +
    String(d.getFullYear() - 2000).padStart(2, '0') +
    String(d.getHours()).padStart(2, '0') +
    String(d.getMinutes()).padStart(2, '0') +
    String(d.getMilliseconds()).padStart(3, '0')
  );
};

export default OrderButton;

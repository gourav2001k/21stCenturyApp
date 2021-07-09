import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import axios from 'axios';
import AllInOneSDKManager from 'paytm_allinone_react-native';

import {Button, Icon} from 'react-native-elements';
import {showMessage} from 'react-native-flash-message';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Colors from '../../constants/Colors';
import useNotification from '../../hooks/useNotification';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const OrderButton = ({
  cartItems,
  totalAmount,
  type,
  address,
  setIsLoading,
  disabled,
  toggleOverlay,
  setIndicator,
}) => {
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
    toggleOverlay();
    setIndicator(true);
    try {
      var token = await auth().currentUser.getIdToken();
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
        type: type === 'takeAway' ? 'takeAway' : 'delivery',
        isAccept: false,
        isCancel: false,
        address: address ? address : {},
      };
      if (Object.keys(finalCart).length === 0) {
        showMessage({
          message: 'ERROR !!!!!!!',
          description: 'Please Add meals to Order..',
          type: 'danger',
        });
      } else {
        // Payment Starts
        const orderID = makeID();
        const resp = await axios.get(
          `http://127.0.0.1:4000/startTransaction?orderID=${orderID}&token=${token}`,
        );
        const result = await AllInOneSDKManager.startTransaction(
          orderID,
          process.env.MID,
          resp.data.body.txnToken,
          totalAmount.toString(),
          `https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=${orderID}`,
          true,
          true,
        );
        if (result.STATUS !== 'TXN_SUCCESS')
          throw new Error('Transaction Failed');
        token = await auth().currentUser.getIdToken();
        const serResp = await axios.get(
          `http://127.0.0.1:4000/verifyTransaction?orderID=${orderID}&token=${token}&txnAmount=${totalAmount}`,
        );
        console.log(serResp.data);
        if (serResp.data.valid !== true) throw new Error('Transaction Failed');
        // Add Payment Info to Order
        doc['payment'] = result;
        // Update DB
        await firestore().collection('orders').doc(orderID).set(doc);
        if (address && type !== 'takeAway') {
          await firestore().collection('users').doc(userID).update({
            cart: {},
            address: address,
          });
        } else {
          await firestore().collection('users').doc(userID).update({
            cart: {},
          });
        }
        setIndicator(false);
        showMessage({
          message: 'Order Done',
          description: 'Order Placed successfully!!!!',
          type: 'success',
        });
        const noti = useNotification({
          type: 'orderPlaced',
          admin: false,
          adminType: '',
        });
        noti();
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIndicator(false);
      showMessage({
        message: 'ERROR !!!!!!!',
        description: err.message,
        type: 'danger',
      });
    }
  };

  return (
    <Button
      disabled={disabled ? true : false}
      title="Place Order"
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
  );
};

const styles = StyleSheet.create({
  container: {},
  button: {
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

import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import AppLoading from '../hooks/AppLoading';
import CartCard from '../components/cart/CartCard';

const Cart = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState();

  const userId = auth().currentUser.uid;
  const fetchItems = async () => {
    const userDetails = await firestore().collection('users').doc(userId).get();
    setCartItems(userDetails.data().cart);
  };

  if (!isLoading) {
    return (
      <AppLoading
        fetchItems={fetchItems}
        onFinish={() => {
          setIsLoading(true);
        }}
        onError={console.warn}
      />
    );
  }
  console.log(cartItems);
  return (
    <View style={styles.screen}>
      {/* {Object.keys(cartItems).map(dat => (
        <CartCard key={dat} mealID={dat} details={cartItems[dat]} />
      ))} */}
      <Text>ASD</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Cart;

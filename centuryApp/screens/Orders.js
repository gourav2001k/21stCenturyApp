import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AppLoading from '../hooks/AppLoading';

import OrdersTile from '../components/Order/OrderTile';

const Orders = props => {
  const [userOrders, setUserOrders] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const userID = auth().currentUser.uid;

  const fetchItems = async () => {
    const onResult = () => setIsLoading(false);
    firestore().collection('orders').onSnapshot(onResult, console.warn);

    const orders = await firestore().collection('orders').get();
    const fetchedUserOrder = {};
    orders.docs.map(doc => {
      doc.data().userID === userID
        ? (fetchedUserOrder[doc.id] = doc.data())
        : null;
    });
    setUserOrders(fetchedUserOrder);
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
  return (
    <View style={styles.screen}>
      {Object.keys(userOrders).map(dat => (
        <OrdersTile
          key={dat}
          orderData={userOrders[dat]}
          orderID={dat}
          navigation={props.navigation}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default Orders;

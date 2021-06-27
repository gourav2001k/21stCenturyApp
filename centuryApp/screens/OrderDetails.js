import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AppLoading from '../hooks/AppLoading';

import OrderDetailCard from '../components/Order/OrderDetailCard';

const OrderDetails = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState();
  const orderID = props.route.params.orderID;

  const fetchItems = async () => {
    const order = await firestore().collection('orders').doc(orderID).get();
    setOrderData(order.data());
  };

  useEffect(() => {
    const onResult = () => {
      setIsLoading(false);
    };
    const unsubscribe = firestore().collection('orders').onSnapshot(onResult);

    return () => unsubscribe();
  }, []);

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
      <OrderDetailCard orderData={orderData} />
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

export default OrderDetails;

import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, ScrollView} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AppLoading from '../hooks/AppLoading';

import OrdersTile from '../components/Order/OrderTile';

const Orders = props => {
  const [userOrders, setUserOrders] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const userID = auth().currentUser.uid;

  const fetchItems = async () => {
    const orders = await firestore().collection('orders').get();
    const fetchedUserOrder = {};
    orders.docs.map(doc => {
      fetchedUserOrder[doc.id] = doc.data();
    });
    setUserOrders(fetchedUserOrder);
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
      <ScrollView style={styles.scrollContainer}>
        {Object.keys(userOrders).map(dat => (
          <OrdersTile
            key={dat}
            orderData={userOrders[dat]}
            orderID={dat}
            navigation={props.navigation}
          />
        ))}
        <View style={{marginBottom: 10}}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollContainer: {},
});

export default Orders;

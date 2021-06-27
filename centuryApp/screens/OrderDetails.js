import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, ScrollView} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import AppLoading from '../hooks/AppLoading';

import OrderDetailCard from '../components/Order/OrderDetailCard';

const OrderDetails = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState();

  const orderID = props.route.params.orderID;

  const fetchItems = async () => {
    const order = await firestore().collection('orders').doc(orderID).get();
    const fetchedOrderData = order.data();

    await Promise.all(
      Object.keys(fetchedOrderData['meals']).map(async dat => {
        const meal = await firestore().collection('meals').doc(dat).get();
        const mealData = meal.data();
        const newURL = await storage()
          .ref()
          .child(mealData.imageURL)
          .getDownloadURL();
        fetchedOrderData['meals'][dat]['mealName'] = mealData.name;
        fetchedOrderData['meals'][dat]['imageURL'] = newURL;
      }),
    );
    setOrderData(fetchedOrderData);
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
      <ScrollView>
        {Object.keys(orderData['meals']).map((dat, idx) => {
          console.log(orderData['meals'][dat]);
          return (
            <OrderDetailCard orderData={orderData['meals'][dat]} key={idx} />
          );
        })}
        <View style={{marginBottom: 10}}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default OrderDetails;

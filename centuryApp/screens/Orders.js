import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, ScrollView} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AppLoading from '../hooks/AppLoading';

import OrdersTile from '../components/Order/OrderTile';

const Orders = props => {
  const [userOrders, setUserOrders] = useState();
  const [sequence, setSequence] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchItems = async () => {
    const orders = await firestore()
      .collection('orders')
      .where('userID', '==', auth().currentUser.uid)
      .get();
    const fetchedUserOrder = {};
    var arr = [];
    orders.docs.map(doc => {
      fetchedUserOrder[doc.id] = doc.data();
      arr.push([doc.data().createdAt, doc.id]);
    });
    arr.sort((a, b) => a[0] < b[0]);
    setSequence(arr);
    setUserOrders(fetchedUserOrder);
  };

  useEffect(() => {
    if (!auth().currentUser) {
      props.navigation.navigate('Login');
    } else {
      const onResult = () => {
        setIsLoading(false);
      };
      const unsubscribe = firestore()
        .collection('orders')
        .where('userID', '==', auth().currentUser.uid)
        .onSnapshot(onResult);

      return () => unsubscribe();
    }
  }, []);
  if (!auth().currentUser) {
    return (
      <View>
        <Text>Redirecting</Text>
      </View>
    );
  }
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
        {sequence.map(xy => (
          <OrdersTile
            key={xy[1]}
            orderData={userOrders[xy[1]]}
            orderID={xy[1]}
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

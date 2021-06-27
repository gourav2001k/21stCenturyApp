import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, ScrollView, Image} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import AppLoading from '../hooks/AppLoading';

import OrderDetailCard from '../components/Order/OrderDetailCard';
import greenTick from '../assets/greenTick.jpg';
import yellowTick from '../assets/yellowTick.jpg';

const OrderDetails = props => {
  const {orderID, total} = props.route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState();
  const [date, setDate] = useState();
  const [status, setStatus] = useState();

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
    setDate(fetchedOrderData.createdAt);
    setStatus(fetchedOrderData.status);
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
          return (
            <OrderDetailCard orderData={orderData['meals'][dat]} key={idx} />
          );
        })}
        <View style={{marginBottom: 10}}></View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <View>
          <Text style={styles.bottomText}>
            Total :
            <Text
              style={{
                fontFamily: 'robotoRegular',
                fontSize: 20,
              }}>
              ₹ {total}
            </Text>
          </Text>
          <View style={styles.date}>
            <Text style={{fontSize: 15, fontFamily: 'robotoLight'}}>
              Date/Time :
            </Text>
            <Text style={styles.dateText}>{date.toDate().toDateString()}</Text>
            <Text style={styles.dateText}>
              {date.toDate().toLocaleTimeString()}
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Final Status </Text>
          <Image
            source={status ? greenTick : yellowTick}
            style={{width: 40, height: 40, margin: 5}}
          />
          <Text style={{fontFamily: 'roboto-regular', fontWeight: 'bold'}}>
            {status ? 'Completed' : 'Processing'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  bottomContainer: {
    height: '20%',
    width: '105%',
    borderRadius: 5,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  bottomText: {
    margin: 15,
    textAlign: 'left',
    fontSize: 18,
  },
  date: {
    marginTop: -10,
    marginLeft: 15,
  },
  dateText: {
    fontSize: 16,
    fontFamily: 'roboto-regular',
  },
});

export default OrderDetails;

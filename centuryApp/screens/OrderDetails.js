import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  Image,
  Alert,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import AppLoading from '../hooks/AppLoading';

import OrderDetailCard from '../components/Order/OrderDetailCard';
import greenTick from '../assets/greenTick.jpg';
import yellowTick from '../assets/yellowTick.jpg';
import ProgressBar from '../components/Order/ProgressBar';
import CategoryTile from '../components/CategoryTile';
import SummaryDetails from '../components/Order/SummaryDetails';

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
        fetchedOrderData['meals'][dat]['rating'] = mealData.rating;
      }),
    );
    // Updating Refund Status
    if (fetchedOrderData.isCancel) {
      const token = await auth().currentUser.getIdToken();
      const serResponse = await axios.get(
        `http://127.0.0.1:4000/transactionStatus?orderID=${orderID}&token=${token}&refund=true`,
      );
      // console.log(serResponse.data);
    }
    setOrderData(fetchedOrderData);
    setDate(fetchedOrderData.createdAt);
    setStatus(fetchedOrderData.status);
  };

  const cancelOrder = async () => {
    try {
      const token = await auth().currentUser.getIdToken();
      const serResponse = await axios.get(
        `http://127.0.0.1:4000/refundTransaction?orderID=${orderID}&token=${token}`,
      );
      // console.log(serResponse.data);
    } catch (err) {
      console.log(err);
      showMessage({
        message: 'Order Cancelled',
        description: 'Order Cancel successfully!!!!',
        type: 'success',
      });
    }
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
            <OrderDetailCard
              orderData={orderData['meals'][dat]}
              key={idx}
              orderID={orderID}
              mealID={dat}
              status={status}
            />
          );
        })}
        <View style={{marginBottom: 10}}></View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <View style={{width: '100%', height: '25%', margin: 5, marginTop: 5}}>
          <ProgressBar
            isAccept={orderData.isAccept}
            isCancel={orderData.isCancel}
            status={status}
            refund={
              orderData.isCancel
                ? orderData.refund.resultInfo.resultStatus
                : false
            }
          />
        </View>
        <View
          style={{
            height: '45%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <SummaryDetails totalValue={total / 1.05} />
        </View>
        <View style={{flexDirection: 'row', height: '20%', marginTop: -5}}>
          <View
            style={{
              width: '60%',
              marginLeft: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.bottomText}>
              Total :{'  '}
              <Text
                style={{
                  fontFamily: 'robotoRegular',
                  fontSize: 25,
                }}>
                ₹ {total}
              </Text>
            </Text>
          </View>

          {!(orderData.isAccept || orderData.isCancel) ? (
            <CategoryTile
              button
              text="Cancel"
              containerStyle={{
                marginHorizontal: 10,
                borderColor: 'red',
                backgroundColor: 'rgba(255,0,0,0.1)',
              }}
              textStyle={{
                color: 'red',
                paddingHorizontal: 10,
                fontSize: 15, // color: Colors['Orange Pantone'],
              }}
              onPress={() => {
                Alert.alert(
                  'Confirm Cancel ',
                  'Are yoy sure Your want to Cancel?',
                  [
                    {
                      text: 'Yes',
                      onPress: () => cancelOrder(),
                      style: 'cancel',
                    },
                    {
                      text: 'No',
                      style: 'cancel',
                    },
                  ],
                );
              }}
            />
          ) : (
            <CategoryTile
              text={
                orderData.isCancel
                  ? 'Cancelled'
                  : status
                  ? 'Completed'
                  : 'Accepted'
              }
              containerStyle={{
                marginHorizontal: 10,
                borderColor: !orderData.isCancel ? 'green' : 'red',
                backgroundColor: !orderData.isCancel
                  ? 'rgba(0,210,0,0.1)'
                  : 'rgba(255,0,0,0.1)',
              }}
              textStyle={{
                paddingHorizontal: 10,
                color: !orderData.isCancel ? 'green' : 'red',
                fontSize: 15,
              }}
            />
          )}
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
    height: '30%',
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  bottomText: {
    textAlign: 'left',
    fontSize: 20,
    fontFamily: 'robotoLight',
  },
});

export default OrderDetails;

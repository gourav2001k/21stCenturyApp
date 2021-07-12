import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
  Image,
} from 'react-native';
import Touchable from 'react-native-touchable-scale';

import Colors from '../../constants/Colors';
import CategoryTile from '../CategoryTile';
import greenTick from '../../assets/greenTick.jpg';
import yellowTick from '../../assets/yellowTick.jpg';

const screenWidth = Dimensions.get('window').width;

const OrdersTile = ({orderData, navigation, orderID}) => {
  const {amount, status, createdAt, isAccept, isCancel, type} = orderData;
  const Openable = () => {
    navigation.navigate('OrderDetails', {
      orderID: orderID,
      total: amount,
      date: createdAt,
      status: status,
    });
  };

  const decisionMake = (isAccept, isCancel, status, type) => {
    var renderText;
    var renderColor;
    if (isCancel) {
      renderText = 'Cancelled';
      renderColor = 'red';
    } else {
      if (!isAccept) {
        renderText = 'Confirming';
        renderColor = '#ffa500';
      } else {
        if (!status) {
          renderText = 'Processing';
          renderColor = '#ffa500';
        } else {
          renderText = type === 'takeAway' ? 'Take Away' : 'Delivered';
          renderColor = 'rgba(0,150,0,1)';
        }
      }
    }
    return {renderText, renderColor};
  };

  const {renderText, renderColor} = decisionMake(
    isAccept,
    isCancel,
    status,
    type,
  );
  return (
    <Touchable
      onPress={Openable}
      activeScale={0.9}
      friction={8}
      style={styles.container}>
      <View style={{width: '90%', marginLeft: 10}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.tag}>{renderText}</Text>
        </View>
        <View
          style={{
            borderTopWidth: 1,
            marginVertical: 5,
            borderTopColor: renderColor,
          }}></View>
        <View style={styles.order}>
          <View style={{width: '75%'}}>
            <Text style={{fontSize: 18, fontFamily: 'robotoLight'}}>
              OrderID:
            </Text>
            <Text style={styles.orderText}>{orderID}</Text>
          </View>
          <View>
            <Text style={{fontSize: 18, fontFamily: 'robotoLight'}}>
              Total:
            </Text>
            <Text
              style={{
                fontFamily: 'robotoRegular',
                fontSize: 22,
              }}>
              ₹ {amount}
            </Text>
          </View>
        </View>
        <View
          style={{
            borderTopWidth: 1,
            marginVertical: 5,
            borderTopColor: renderColor,
          }}></View>
        <View style={styles.date}>
          <Text style={styles.dateText}>
            {createdAt.toDate().toDateString()}
          </Text>
          <Text style={styles.dateText}>
            {createdAt.toDate().toLocaleTimeString()}
          </Text>
        </View>
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    // width: screenWidth - 20,
    borderWidth: 0.001,
    elevation: 2,
    // alignItems: 'center',
  },
  tag: {
    fontSize: 20,
    fontFamily: 'robotoRegular',
    textAlign: 'center',
  },
  order: {
    flexDirection: 'row',
  },
  orderText: {
    fontSize: 18,
    fontFamily: 'robotoRegular',
  },
  date: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
  },
  dateText: {
    fontSize: 18,
    fontFamily: 'robotoLight',
  },
});

export default OrdersTile;

import React from 'react';
import {View, Text, StyleSheet, Button, Dimensions} from 'react-native';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const SummaryDetails = ({totalValue}) => {
  var grandTotal = totalValue + (totalValue * 5) / 100 + 40;

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={{fontFamily: 'robotoRegular', fontSize: 20}}>
          Item Total
        </Text>
        <View style={{width: '35%'}}>
          <Text style={{fontFamily: 'robotoLight', fontSize: 20}}>
            ₹ {totalValue}
          </Text>
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text
          style={{
            fontFamily: 'robotoRegular',
            fontSize: 17,
            color: 'rgba(0,0,0,0.6)',
          }}>
          Delivery Charge
        </Text>
        <View style={{width: '35%'}}>
          <Text
            style={{
              fontFamily: 'robotoLight',
              fontSize: 17,
              color: 'rgba(0,0,0,0.6)',
            }}>
            ₹ 40
          </Text>
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text
          style={{
            fontFamily: 'robotoRegular',
            fontSize: 15,
            color: 'rgba(0,0,0,0.6)',
          }}>
          Taxes
        </Text>
        <View style={{width: '35%'}}>
          <Text
            style={{
              fontFamily: 'robotoLight',
              fontSize: 17,
              color: 'rgba(0,0,0,0.6)',
            }}>
            ₹ {(totalValue * 5) / 100}
          </Text>
        </View>
      </View>

      <Text
        numberOfLines={1}
        ellipsizeMode="clip"
        style={{
          color: 'rgba(0,0,0,0.4)',
        }}>
        - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        - - - - - -
      </Text>

      <View style={styles.textContainer}>
        <Text
          style={{
            fontFamily: 'robotoRegular',
            fontSize: 20,
            color: 'rgba(0,0,0,1)',
          }}>
          Grand Total
        </Text>
        <View style={{width: '35%'}}>
          <Text
            style={{
              fontFamily: 'robotRegular',
              fontSize: 20,
              color: 'rgba(0,0,0,1)',
            }}>
            ₹ {grandTotal}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  totalContainer: {},
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  text: {},
});

export default SummaryDetails;

import React from 'react';
import {View, Text, StyleSheet, Button, Dimensions} from 'react-native';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const SummaryDetails = ({totalValue}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={{fontFamily: 'robotoRegular', fontSize: 15}}>
          Item Total
        </Text>
        <View style={{width: '25%'}}>
          <Text style={{fontFamily: 'robotoLight', fontSize: 17}}>
            ₹ {totalValue.toFixed(2)}
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
        <View style={{width: '25%'}}>
          <Text
            style={{
              fontFamily: 'robotoLight',
              fontSize: 17,
              color: 'rgba(0,0,0,0.6)',
            }}>
            ₹ {((totalValue * 5) / 100).toFixed(2)}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
  textContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 2,
  },
  text: {},
});

export default SummaryDetails;

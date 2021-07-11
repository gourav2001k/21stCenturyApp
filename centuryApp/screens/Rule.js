import React from 'react';
import {ScrollView} from 'react-native';
import {View, Text, StyleSheet, Button, Dimensions} from 'react-native';
import {ListItem} from 'react-native-elements';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const Rule = props => {
  const listTerms = [
    '1) Our application service permits you to purchase our products from this application . These purchases can be made and are permitted strictly pursuant to the terms and conditions set out below .',
    '2) Your order constitutes an offer to us to buy a product. After placing an order , you will receive a notification from us . Your order is delivered by our marketing person ( Delivery person ) and you will accept your order. ',
    '3) If you notice an error in the order confirmation you must notify us by mobile number before the order is due to be collected or delivered. ',
    '4) If you wish to cancel your order for any reason , you must notify before the order is due to collected or delivered. A refund will only be made to the same payment method though which your order was placed. ',
    '5) Your purchase order cannot be accepted until payment in full for the products ordered has been received by us at which time a legally binding agreement on the terms set our here in will become effective. ',
    '6) the time for ordering will be before 5pm',
  ];
  return (
    <View style={styles.screen}>
      <View
        style={{
          paddingVertical: 15,
          backgroundColor: 'white',
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 28,
            fontFamily: 'robotoRegular',
          }}>
          Terms & Conditions
        </Text>
      </View>
      <ScrollView>
        {listTerms.map((dat, idx) => (
          <ListItem key={idx} bottomDivider>
            <ListItem.Content>
              <ListItem.Subtitle style={{fontSize: 15}}>
                {dat}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default Rule;

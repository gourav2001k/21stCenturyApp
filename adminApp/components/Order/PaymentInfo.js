import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {Input, Button} from 'react-native-elements';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const PaymentInfo = ({order}) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text
          style={{
            fontSize: 25,
            textAlign: 'center',
            fontFamily: 'robotoRegular',
            marginTop: 20,
            marginBottom: 40,
          }}>
          Payment Information
        </Text>
        <Input
          label="TransactionID"
          value={order.payment.TXNID}
          inputStyle={{fontSize: 14}}
          disabled={true}
        />
        <Input
          label="Bank TransactionID"
          value={order.payment.BANKTXNID}
          disabled={true}
        />
        {order.refund ? (
          <Input label="Refund ID" value={order.refund.refId} disabled={true} />
        ) : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    elevation: 1,
  },
  contain: {
    paddingTop: 10,
    paddingLeft: 10,
  },
  button: {paddingHorizontal: '20%', marginTop: 10, borderRadius: 10},
});

export default PaymentInfo;

import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {Input, Button} from 'react-native-elements';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const DeliveryAddress = ({order}) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text
          style={{
            fontSize: 25,
            textAlign: 'center',
            fontFamily: 'robotoRegular',
            marginTop: 20,
            marginBottom: 30,
          }}>
          {order.type === 'takeAway'
            ? 'Take Away Location'
            : 'Delivery Address'}
        </Text>
        <Input
          label="Address"
          value={order.address.address}
          disabled={true}
          leftIcon={{type: 'Entypo', name: 'location-pin'}}
        />
        {order.type !== 'takeAway' ? (
          <Input
            label="Locality"
            value={order.address.locality}
            disabled={true}
            leftIcon={{type: 'Entypo', name: 'local-attraction'}}
          />
        ) : null}
        <Input
          label="City"
          value={order.address.city}
          disabled={true}
          leftIcon={{type: 'Entypo', name: 'location-city'}}
        />
        <Input
          label="Phone"
          value={order.address.phone}
          disabled={true}
          leftIcon={{type: 'Ionicons', name: 'call'}}
        />
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
  },
  contain: {
    paddingTop: 10,
    paddingLeft: 10,
  },
  button: {
    paddingHorizontal: '20%',
    marginTop: 10,
    borderRadius: 10,
  },
});

export default DeliveryAddress;

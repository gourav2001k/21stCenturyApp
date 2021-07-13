import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, Dimensions} from 'react-native';

import {Icon, Overlay, SocialIcon} from 'react-native-elements';
import DeliveryAddress from './DeliveryAddress';
import PaymentInfo from './PaymentInfo';
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const AddressType = ({order}) => {
  const [visible1, setVisible1] = useState(false);
  const toggleOverlay1 = () => {
    setVisible1(!visible1);
  };
  const [visible2, setVisible2] = useState(false);
  const toggleOverlay2 = () => {
    setVisible2(!visible2);
  };
  return (
    <View style={styles.container}>
      <Icon
        raised
        name="money-bill-wave"
        size={17}
        color="green"
        type="font-awesome-5"
        onPress={toggleOverlay1}
      />
      <Overlay
        isVisible={visible1}
        onBackdropPress={toggleOverlay1}
        overlayStyle={{
          ...styles.overlayContainer,
          height: order.refund ? '80%' : '60%',
        }}>
        <View style={styles.crossIcon}>
          <Icon name="cross" type="entypo" raised onPress={toggleOverlay1} />
        </View>
        <PaymentInfo order={order} />
      </Overlay>
      <Text style={styles.text}>
        {order.type === 'takeAway' ? 'Take Away' : 'Delivery'}
      </Text>
      <Icon
        raised
        name="ios-location"
        size={17}
        type="ionicon"
        onPress={toggleOverlay2}
      />
      <Overlay
        isVisible={visible2}
        onBackdropPress={toggleOverlay2}
        overlayStyle={{
          ...styles.overlayContainer,
          height: order.type === 'takeAway' ? '75%' : '100%',
        }}>
        <View style={styles.crossIcon}>
          <Icon name="cross" type="entypo" raised onPress={toggleOverlay2} />
        </View>
        <DeliveryAddress order={order} />
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontFamily: 'robotoRegular',
    paddingHorizontal: 20,
  },
  overlayContainer: {
    width: '105%',
    height: '75%',
    position: 'absolute',
    bottom: -10,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  crossIcon: {
    height: '20%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default AddressType;

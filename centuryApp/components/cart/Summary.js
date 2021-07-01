import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import {Button, Icon, Overlay} from 'react-native-elements';
import Colors from '../../constants/Colors';

import SummaryDetails from './SummaryDetails';
import ChooseType from './ChooseType';
import OrderButton from './OrderButton';
import Address from './Address';
import ModeButton from './ModeButton';
import {showMessage} from 'react-native-flash-message';
import StoreChoose from './storeChoose';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const Summary = ({totalValue, cartItems, setIsLoading}) => {
  const [type, setType] = useState('delivery');

  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const toggleOverlay1 = () => {
    setVisible1(!visible1);
  };

  const toggleOverlay2 = () => {
    setVisible2(!visible2);
  };

  const checkTotal = () => {
    if (totalValue >= 300) {
      toggleOverlay();
    } else {
      showMessage({
        message: '!!! ERROR !!!',
        description: 'Minimum order value must be 300 for Free Delivery',
        type: 'danger',
      });
    }
  };

  return (
    <View style={styles.container}>
      <SummaryDetails totalValue={totalValue} type={type} />
      <View style={styles.buttonContainer}>
        <ModeButton toggleOverlay1={toggleOverlay1} type={type} />
        <View style={styles.finalButtonContainer}>
          {type === 'takeAway' ? (
            <Button
              title="Checkout"
              onPress={toggleOverlay2}
              iconRight
              icon={<Icon name="arrow-right" size={30} color="white" />}
              buttonStyle={styles.button}
              titleStyle={styles.titleButton}
            />
          ) : (
            <Button
              title="Checkout"
              onPress={checkTotal}
              iconRight
              icon={<Icon name="arrow-right" size={30} color="white" />}
              buttonStyle={styles.button}
              titleStyle={styles.titleButton}
            />
          )}
        </View>
      </View>
      <Overlay
        isVisible={visible1}
        onBackdropPress={toggleOverlay1}
        overlayStyle={styles.overlayContainer1}>
        <View style={styles.crossIcon}>
          <Icon name="cross" type="entypo" raised onPress={toggleOverlay1} />
        </View>
        <ChooseType type={type} setType={setType} />
      </Overlay>
      <Overlay
        isVisible={visible2}
        onBackdropPress={toggleOverlay2}
        overlayStyle={styles.overlayContainer2}>
        <View style={styles.crossIcon}>
          <Icon name="cross" type="entypo" raised onPress={toggleOverlay2} />
        </View>
        <StoreChoose
          cartItems={cartItems}
          totalAmount={totalValue}
          type={type}
          setIsLoading={setIsLoading}
        />
      </Overlay>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.overlayContainer}>
        <View style={styles.crossIcon}>
          <Icon name="cross" type="entypo" raised onPress={toggleOverlay} />
        </View>
        <Address
          cartItems={cartItems}
          totalAmount={totalValue}
          type={type}
          setIsLoading={setIsLoading}
        />
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingLeft: 10,
    borderWidth: 0.001,
    // elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,195,255,0.1)',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    width: '95%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  finalButtonContainer: {
    borderRadius: 30,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: Colors['Star Command Blue'],
  },

  titleButton: {
    color: 'white',
    marginLeft: 20,
    fontSize: 22,
    fontFamily: 'robotoRegular',
  },
  overlayContainer: {
    width: '105%',
    height: '105%',
    position: 'absolute',
    bottom: -10,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  overlayContainer1: {
    width: '105%',
    height: '55%',
    position: 'absolute',
    bottom: -10,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  overlayContainer2: {
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

export default Summary;

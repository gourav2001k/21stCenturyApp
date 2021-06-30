import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import {Button, Icon, Overlay} from 'react-native-elements';
import Colors from '../../constants/Colors';

import SummaryDetails from './SummaryDetails';
import ChooseType from './ChooseType';
import OrderButton from './OrderButton';
import Address from './Address';
import ModeButton from './ModeButton';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const Summary = ({totalValue, cartItems, setIsLoading}) => {
  const [type, setType] = useState('delivery');

  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const toggleOverlay1 = () => {
    setVisible1(!visible1);
  };

  return (
    <View style={styles.container}>
      <SummaryDetails totalValue={totalValue} type={type} />
      <View style={styles.buttonContainer}>
        <ModeButton toggleOverlay1={toggleOverlay1} type={type} />
        <View style={styles.finalButtonContainer}>
          {type === 'takeAway' ? (
            <OrderButton
              cartItems={cartItems}
              totalAmount={totalValue * 1.05}
              setIsLoading={setIsLoading}
              type={type}
            />
          ) : (
            <Button
              title="Place Order"
              onPress={toggleOverlay}
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
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.overlayContainer}>
        <View style={styles.crossIcon}>
          <Icon name="cross" type="entypo" raised onPress={toggleOverlay} />
        </View>
        <Address
          cartItems={cartItems}
          totalAmount={totalValue * 1.05}
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
  crossIcon: {
    height: '20%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default Summary;

import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import {Button, Icon, Overlay} from 'react-native-elements';

import Colors from '../../constants/Colors';
import ConfirmationOrder from './ConfirmationOrder';
import SummaryDetails from './SummaryDetails';
import ChooseType from './ChooseType';
import OrderButton from './OrderButton';

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
        <View style={styles.modeContainer}>
          <Button
            title="Mode"
            onPress={toggleOverlay1}
            buttonStyle={styles.button}
            titleStyle={styles.titleButton}
            raised
          />
        </View>
        <View style={styles.finalButtonContainer}>
          {type === 'takeAway' ? (
            <OrderButton
              cartItems={cartItems}
              totalAmount={totalValue}
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
              raised
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
        <ConfirmationOrder />
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
  modeContainer: {
    borderTopStartRadius: 30,
    borderBottomStartRadius: 30,
    overflow: 'hidden',
  },
  finalButtonContainer: {
    width: '65%',
    borderTopEndRadius: 30,
    borderBottomEndRadius: 30,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: Colors['Star Command Blue'],
  },

  titleButton: {
    color: 'white',
    marginLeft: 10,
    fontSize: 20,
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

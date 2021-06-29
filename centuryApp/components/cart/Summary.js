import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import {Button, Icon, Overlay} from 'react-native-elements';

import Colors from '../../constants/Colors';
import ConfirmationOrder from './ConfirmationOrder';
import SummaryDetails from './SummaryDetails';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const Summary = ({totalValue, cartItems, setIsLoading}) => {
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  return (
    <View style={styles.container}>
      <SummaryDetails totalValue={totalValue} />
      <View style={styles.buttonContainer}>
        <Button
          title="Proceed to Checkout"
          onPress={toggleOverlay}
          iconRight
          icon={<Icon name="arrow-right" size={30} color="white" />}
          buttonStyle={styles.button}
          titleStyle={styles.titleButton}
          raised
        />
      </View>
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
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginVertical: 10,
    borderRadius: 50,
    overflow: 'hidden',
    width: '75%',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: Colors['Star Command Blue'],
    borderRadius: 50,
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
  crossIcon: {
    height: '20%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default Summary;

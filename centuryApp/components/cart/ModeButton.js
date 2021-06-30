import React from 'react';
import {View, Text, StyleSheet, Button, Dimensions} from 'react-native';

import Touchable from 'react-native-touchable-scale';
import Colors from '../../constants/Colors';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const ModeButton = ({toggleOverlay1, type}) => {
  return (
    <Touchable
      onPress={toggleOverlay1}
      activeScale={0.93}
      friction={4}
      style={styles.modeContainer}>
      <View>
        <Text style={styles.textMode}>Mode ▼</Text>
      </View>
      <View>
        <Text style={styles.textType}>
          {type === 'takeAway' ? 'Take Away' : 'Delivery'}
        </Text>
      </View>
    </Touchable>
  );
};
const styles = StyleSheet.create({
  modeContainer: {
    width: '32%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors['Star Command Blue'],
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  textMode: {
    fontSize: 14,
    fontFamily: 'robotoLight',
    color: 'white',
  },
  textType: {
    fontSize: 18,
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'robotoRegular',
    color: 'white',
  },
});

export default ModeButton;

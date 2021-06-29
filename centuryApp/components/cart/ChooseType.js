import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, Dimensions} from 'react-native';

import {CheckBox} from 'react-native-elements';
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const ChooseType = ({type, setType}) => {
  const [check, setCheck] = useState(type === 'takeAway');
  return (
    <View style={styles.container}>
      <CheckBox
        center
        title="Take Away"
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={check}
        onPress={() => {
          check ? null : setCheck(!check);
          setType('takeAway');
        }}
      />
      <CheckBox
        center
        title="Delivery"
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={!check}
        onPress={() => {
          !check ? null : setCheck(!check);
          setType('delivery');
        }}
      />
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
});

export default ChooseType;

import React from 'react';
import {View, Text, StyleSheet, Button, Dimensions} from 'react-native';

import {ButtonGroup} from 'react-native-elements/dist/buttons/ButtonGroup';

import Colors from '../../../constants/Colors';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const MenuOption = props => {
  const buttons = ['1 Pound', '2 Pound'];

  return (
    <ButtonGroup
      buttons={buttons}
      onPress={val => {
        props.setIndex(val);
      }}
      selectedIndex={props.index}
      containerStyle={styles.container}
      selectedButtonStyle={{
        backgroundColor: 'white',
      }}
      textStyle={styles.text}
      selectedTextStyle={styles.selectedText}
      innerBorderStyle={{
        color: Colors.counterBackground,
        width: 2,
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: -1,
    marginLeft: -1,
    marginRight: -1,
    backgroundColor: Colors.menuBackground,
  },
  text: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
  selectedText: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'normal',
  },
});

export default MenuOption;

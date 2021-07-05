import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, Dimensions} from 'react-native';

import {CheckBox, ListItem} from 'react-native-elements';
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const ChooseType = ({type, setType, toggleOverlay}) => {
  const [check, setCheck] = useState(type === 'takeAway');
  return (
    <View style={styles.container}>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>Delivery</ListItem.Title>
          <ListItem.Subtitle>
            Hope You will enjoy our fast and safe Delivery
          </ListItem.Subtitle>
        </ListItem.Content>
        <CheckBox
          center
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={!check}
          onPress={() => {
            !check ? null : setCheck(!check);
            setType('delivery');
            toggleOverlay();
          }}
        />
      </ListItem>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>Take Away</ListItem.Title>
          <ListItem.Subtitle>
            We will be waiting.. with your order Ready.
          </ListItem.Subtitle>
        </ListItem.Content>
        <CheckBox
          center
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={check}
          onPress={() => {
            check ? null : setCheck(!check);
            setType('takeAway');
            toggleOverlay();
          }}
        />
      </ListItem>
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

import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import {CheckBox, ListItem} from 'react-native-elements';

import OrderButton from './OrderButton';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const StoreChoose = ({
  cartItems,
  totalAmount,
  type,
  setIsLoading,
  toggleOverlay,
  setIndicator,
}) => {
  const [check, setCheck] = useState(type === 'takeAway');
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 25,
          textAlign: 'center',
          fontFamily: 'robotoRegular',
          marginTop: 20,
          marginBottom: 40,
        }}>
        Choose Store
      </Text>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>New Jaljog Circle, Sardarpura</ListItem.Title>
          <ListItem.Subtitle>8114485947</ListItem.Subtitle>
        </ListItem.Content>
        <CheckBox
          center
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={check}
          onPress={() => setCheck(!check)}
        />
      </ListItem>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>BJS Colony, Jodhpur</ListItem.Title>
          <ListItem.Subtitle>7413075925</ListItem.Subtitle>
        </ListItem.Content>
        <CheckBox
          center
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={!check}
          onPress={() => setCheck(!check)}
        />
      </ListItem>
      <View style={styles.button}>
        <OrderButton
          cartItems={cartItems}
          totalAmount={totalAmount * 1.05}
          toggleOverlay={toggleOverlay}
          type={type}
          setIsLoading={setIsLoading}
          setIndicator={setIndicator}
          address={{
            address: check ? 'New Jaljog Circle, Sardarpura' : 'BJS Colony',
            phone: check ? '8114485947' : '7413075925',
            city: 'Jodhpur',
          }}
        />
      </View>
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
  button: {paddingHorizontal: '20%', marginTop: 30, borderRadius: 10},
});

export default StoreChoose;

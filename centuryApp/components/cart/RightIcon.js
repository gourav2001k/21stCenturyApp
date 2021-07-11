import React from 'react';
import {View, Text, StyleSheet, Button, Dimensions} from 'react-native';
import {Icon} from 'react-native-elements';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const RightIcon = ({quantity, details, setCartItems, cartMealID}) => (
  <View style={{}}>
    <Icon
      raised
      name="trash"
      type="font-awesome"
      color="rgba(0,65,200,1)"
      size={18.5}
      containerStyle={{marginLeft: 1}}
      onPress={() => {
        setCartItems(prev => {
          var newCartItem = {...prev};
          delete newCartItem[cartMealID];
          return {
            ...newCartItem,
          };
        });
      }}
    />
  </View>
);
const styles = StyleSheet.create({
  container: {},
});

export default RightIcon;

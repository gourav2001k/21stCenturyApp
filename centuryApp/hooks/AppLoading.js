import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {Icon} from 'react-native-elements';
const AppLoading = ({fetchItems, onFinish, onError, cart, edit}) => {
  const startAscync = async () => {
    try {
      await fetchItems();
      onFinish();
    } catch (err) {
      onError(err);
    }
  };
  useEffect(() => {
    startAscync();
  }, []);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {cart || edit ? (
        <Icon
          size={25}
          title={cart ? 'Cart' : 'edit'}
          type={cart ? 'ionicon' : 'font-awesome'}
          name={cart ? 'ios-cart-outline' : 'edit'}
          color="white"
          containerStyle={{marginRight: 20}}
        />
      ) : (
        <ActivityIndicator animating={true} size="large" color="blue" />
      )}
    </View>
  );
};

export default AppLoading;

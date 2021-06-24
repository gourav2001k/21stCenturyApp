import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

const AppLoading = ({fetchItems, onFinish, onError}) => {
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
      <ActivityIndicator animating={true} size="large" color="blue" />
    </View>
  );
};

export default AppLoading;


import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

const AppLoading = ({fetchItems, onFinish, onError}) => {
  const startAsync = async () => {
    try {
      await fetchItems();
      onFinish();
    } catch (err) {
      onError(err);
    }
  };
  useEffect(() => {
    startAsync();
  }, []);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 25}}>Loading ....</Text>
    </View>
  );
};

export default AppLoading;

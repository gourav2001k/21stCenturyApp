import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import AppNavigator from './navigation/AppNavigator';

const App = () => {
  return <AppNavigator />;
};

const styles = StyleSheet.create({
  screen: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default App;

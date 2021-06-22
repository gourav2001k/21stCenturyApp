import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import AuthNavigator from './navigation/AuthNavigator';

const App = () => {
  return <AuthNavigator />;
};

const styles = StyleSheet.create({
  screen: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default App;

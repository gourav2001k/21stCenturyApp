import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import MainNavigation from './navigation/MainNavigation';

const App = () => {
  return <MainNavigation />;
};

const styles = StyleSheet.create({
  screen: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default App;

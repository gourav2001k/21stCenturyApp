import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

import AppNavigator from './navigation/AppNavigator';

const App = () => {
  useEffect(() => {
    const init = async () => {
      console.log('Initialized');
    };

    init().finally(async () => {
      await RNBootSplash.hide({fade: true});
      console.log('Bootsplash has been hidden successfully');
    });
  }, []);
  return <AppNavigator />;
};

const styles = StyleSheet.create({
  screen: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default App;

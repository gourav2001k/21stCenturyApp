import React from 'react';
import {View, Text, StyleSheet, Button, Dimensions} from 'react-native';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const Rule = props => {
  return (
    <View style={styles.screen}>
      <Text>This is Rule Screen!!!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Rule;

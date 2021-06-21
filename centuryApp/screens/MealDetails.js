import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const MealDetails = props => {
  return (
    <View style={styles.screen}>
      <Text>This is MealDetails Screen!!!</Text>
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

export default MealDetails;

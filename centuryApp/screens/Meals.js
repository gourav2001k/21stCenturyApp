import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const Meals = props => {
  return (
    <View style={styles.screen}>
      <Text>This is Meals Screen!!!</Text>
      <Button
        title="ToMealDetail"
        onPress={() => {
          props.navigation.navigate('MealDetails');
        }}
      />
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

export default Meals;

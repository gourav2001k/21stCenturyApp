import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {FAB, Colors} from 'react-native-paper';

const Meals = props => {
  return (
    <View style={styles.screen}>
      <Text>This is Meals Screen!!!</Text>
      <Button
        title="Update Meal"
        onPress={() => {
          props.navigation.navigate('UpdateMeal', {mealId: 'qDYcva0HlnaBJf64'});
        }}
      />
      <FAB
        large
        icon="plus"
        color="white"
        style={styles.fab}
        onPress={() => props.navigation.navigate('Add Meal')}
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
  fab: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: Colors.blue600,
  },
});

export default Meals;

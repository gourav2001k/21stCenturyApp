import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

import MealDetailCard from '../components/mealDetailCard/MealDetailCard';

const MealDetails = props => {
  const {mealDetail} = props.route.params;

  return (
    <View style={styles.screen}>
      <MealDetailCard mealDetail={mealDetail} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default MealDetails;

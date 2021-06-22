import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const AboutMeal = props => {
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{props.name}</Text>
      </View>
      <Text style={styles.descriptionText} numberOfLines={3}>
        {props.description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: -10,
  },
  nameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    marginBottom: 2,
  },
  descriptionTextContainer: {},
  descriptionText: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default AboutMeal;

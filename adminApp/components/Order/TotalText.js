import React from 'react';
import {View, Text, StyleSheet, Button, Dimensions} from 'react-native';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const TotalText = ({total}) => {
  return (
    <View style={styles.totalTextContainer}>
      <Text style={styles.bottomText}>
        Total :{'  '}
        <Text style={styles.rupeeText}>₹ {total}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  totalTextContainer: {
    width: '30%',
  },
  bottomText: {
    fontFamily: 'robotoLight',
    fontSize: 16,
  },
  rupeeText: {
    fontFamily: 'robotoRegular',
    fontSize: 18,
  },
});

export default TotalText;

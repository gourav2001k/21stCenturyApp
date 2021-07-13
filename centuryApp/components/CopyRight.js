import React from 'react';
import {View, Text, StyleSheet, Button, Dimensions} from 'react-native';

import {Icon} from 'react-native-elements';
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const CopyRight = props => {
  return (
    <View style={styles.container}>
      <Icon name="copyright" color="grey" size={20} />

      <Text
        style={{
          fontFamily: 'robotoLight',
          fontSize: 15,
          color: 'grey',
        }}>
        {' '}
        Harshit Gupta & Gourav Kumar
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 5,
    flexDirection: 'row',
  },
});

export default CopyRight;

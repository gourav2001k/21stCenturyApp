import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  ScrollView,
} from 'react-native';

import Address from './Address';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const ConfirmationOrder = props => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Address />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    elevation: 1,
  },
});

export default ConfirmationOrder;

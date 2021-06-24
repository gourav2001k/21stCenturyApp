import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import {Button} from 'react-native-elements';
import Colors from '../constants/Colors';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const CategoryTile = props => {
  return (
    <View
      style={{
        ...styles.container,
        ...props.containerStyle,
      }}>
      {props.button ? (
        <Button
          title={props.text}
          onPress={props.onPress}
          type="clear"
          titleStyle={{...styles.textContainer, ...props.textStyle}}
        />
      ) : (
        <Text style={{...styles.textContainer, ...props.textStyle}}>
          {props.text}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: 'rgba(0,210,0,0.1)',
    borderRadius: 10,
    borderColor: 'green',
    overflow: 'hidden',
  },
  textContainer: {
    paddingHorizontal: 15,
    color: 'green',
    fontSize: 18,
  },
});

export default CategoryTile;

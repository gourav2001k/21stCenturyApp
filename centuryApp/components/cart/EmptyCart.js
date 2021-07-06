import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Icon, Button} from 'react-native-elements';

import Colors from '../../constants/Colors';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const EmptyCart = props => {
  return (
    <View style={styles.emptyScreen}>
      <Icon
        name="remove-shopping-cart"
        size={Math.min(width / 1.2, height / 2.2)}
        color="rgba(0,0,0,0.3)"
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Go to Meals"
          onPress={() => {
            props.navigation.navigate('Meals');
          }}
          buttonStyle={styles.button}
          titleStyle={{
            color: 'white',
            marginLeft: 10,
            fontSize: 20,
            fontFamily: 'robotoRegular',
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyScreen: {
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 60,

    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    overflow: 'hidden',
    width: '55%',
    elevation: 2,
  },
  button: {
    width: '120%',
    paddingLeft: 30,
    paddingRight: 50,
    backgroundColor: Colors['Star Command Blue'],
  },
});

export default EmptyCart;

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  ImageBackground,
} from 'react-native';

import Discount from '../../assets/discount.jpg';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const DiscountImage = props => {
  return (
    <View style={styles.container}>
      <ImageBackground source={Discount} style={styles.image}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{props.value}%</Text>
          {/* <View
            style={{
              marginTop: 10,
              paddingLeft: 2,
            }}>
            <Text style={{fontSize: 12, color: 'white'}}>Off</Text>
          </View> */}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 55,
    width: 88,
    marginTop: -5,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '110%',
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default DiscountImage;

import React from 'react';
import {View, Text, StyleSheet, Button, Dimensions, Image} from 'react-native';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const AboutUsCard = ({line1, phone, image}) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={{width: '100%', height: height / 3}} />
      <View style={{padding: 15}}>
        <Text style={styles.title}>Address</Text>
        <Text style={styles.subtitle}>{line1}</Text>
        <Text style={styles.title}>Phone Number</Text>
        <Text style={styles.subtitle}>{phone}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    marginTop: 10,
    overflow: 'hidden',
    borderWidth: 0.001,
    borderRadius: 25,
    elevation: 1,
  },
  title: {
    fontFamily: 'robotoLight',
    fontSize: 20,
    color: 'grey',
  },
  subtitle: {
    fontFamily: 'robotRegular',
    fontSize: 17,
    marginBottom: 10,
  },
});

export default AboutUsCard;

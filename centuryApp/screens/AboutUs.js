import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {createStackNavigator} from '@react-navigation/stack';

import HeaderButtonss from '../components/HeaderButtonss';
import AboutUsCard from '../components/aboutUs/AboutUsCard';
import {ScrollView} from 'react-native';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const AboutUs = props => {
  const renderList = [
    {
      line1: 'New jaljog circle, sardarpura, jodhpur',
      phone: '+91 8114 485947',
      image: require('../assets/store1.jpeg'),
    },
    {
      line1: 'Bjs colony, jodhpur',
      phone: '+91 7413 075925',
      image: require('../assets/store2.jpeg'),
    },
  ];
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.screen}>
        {renderList.map(({line1, phone, image}, idx) => (
          <AboutUsCard key={idx} line1={line1} phone={phone} image={image} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default AboutUs;

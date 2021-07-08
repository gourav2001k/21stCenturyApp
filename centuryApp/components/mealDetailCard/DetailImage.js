import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const DetailImage = props => {
  return (
    <View style={styles.container}>
      <ImageBackground source={{uri: props.imageURL}} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height / 4,
  },
  image: {
    height: height / 3.5,
  },
});

export default DetailImage;

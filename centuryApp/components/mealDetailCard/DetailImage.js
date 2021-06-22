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
      <ImageBackground source={{uri: props.imageURL}} style={styles.image}>
        <Text
          style={
            styles.textPatch
          }>{`                                                                
          `}</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
  },
  image: {
    height: height / 4,
  },
  textPatch: {
    backgroundColor: 'white',
    top: '88%',
    borderTopRightRadius: 200,
    borderTopLeftRadius: 200,
  },
});

export default DetailImage;

import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, Dimensions} from 'react-native';

import {Icon, Overlay, ListItem} from 'react-native-elements';
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const DisplayMessage = ({displayName}) => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View style={styles.container}>
      <Icon
        name="edit"
        type="font-awesome"
        raised
        color="rgba(0,65,200,1)"
        size={18.5}
        containerStyle={{marginLeft: 1}}
        onPress={toggleOverlay}
      />
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.overlayContainer}>
        <Text style={styles.title}> Words BY User For This Cake</Text>
        {displayName.map((dat, idx) => (
          <ListItem key={idx} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{dat}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  overlayContainer: {
    width: '90%',
    paddingVertical: 20,
  },

  title: {
    marginLeft: 20,
    fontSize: 20,
    fontFamily: 'robotoRegular',
    color: 'rgba(0,100,200,0.8)',
    textAlign: 'center',
  },
});

export default DisplayMessage;

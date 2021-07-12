import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {Input, Button} from 'react-native-elements';

import auth from '@react-native-firebase/auth';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const Notification = ({toggleOverlay}) => {
  const [title, setTitle] = useState();
  const [message, setMessage] = useState();
  const send = async () => {
    toggleOverlay();
    try {
      const token = await auth().currentUser.getIdToken();
      await axios.post(`${process.env.SERVER_URL}/notifyAll`, {
        token: token,
        title: title,
        message: message,
      });
    } catch (err) {
      showMessage({
        message: 'Error',
        description: err.message,
        type: 'danger',
      });
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text
          style={{
            fontSize: 25,
            textAlign: 'center',
            fontFamily: 'robotoRegular',
            marginTop: 20,
            marginBottom: 40,
          }}>
          BroadCast Notification
        </Text>
        <Input
          label="Title*"
          value={title}
          placeholder="Notification Title"
          leftIcon={{type: 'FontAwesome', name: 'title'}}
          onChangeText={tit => setTitle(tit)}
        />
        <Input
          label="Message*"
          value={message}
          placeholder="Notification Message"
          leftIcon={{type: 'Entypo', name: 'message'}}
          onChangeText={msg => setMessage(msg)}
        />
        <View style={styles.button}>
          <Button title="Send" onPress={send} />
        </View>
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
  contain: {
    paddingTop: 10,
    paddingLeft: 10,
  },
  button: {paddingHorizontal: '20%', marginTop: 10, borderRadius: 10},
});

export default Notification;

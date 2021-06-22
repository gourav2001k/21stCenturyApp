/* eslint-disable */
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {showMessage} from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Login = props => {
  const [phone, setPhone] = useState();
  const [OTP, setOTP] = useState();
  const [confirmed, setConfirmed] = useState();
  const [isOTP, setIsOTP] = useState(false);

  const numParser = inputText => {
    setPhone(inputText.replace(/[^0-9]/g, ''));
  };
  const OTPParser = inputText => {
    setOTP(inputText.replace(/[^0-9]/g, ''));
  };
  const reset = () => {
    setIsOTP(false);
    setPhone(null);
    setConfirmed(null);
    setOTP(null);
  };
  const sendOTP = async () => {
    if (phone.length < 10) {
      showMessage({
        message: 'Invalid Phone',
        description: 'Phone Number must be 10 digits in length',
        type: 'danger',
      });
      return;
    }
    try {
      if (!process.env.ADMIN_PHONES.includes(phone))
        throw new Error('Not an Admin Email');
      const confirmation = await auth().signInWithPhoneNumber('+91 ' + phone);
      setConfirmed(confirmation);
      setIsOTP(true);
      showMessage({
        message: 'OTP Sent',
        description: 'Verification code sent successfully',
        type: 'success',
      });
    } catch (error) {
      showMessage({
        message: 'Error',
        description: error.message,
        type: 'danger',
      });
      reset();
    }
  };

  const verifyOTP = async () => {
    if (OTP.length < 6) {
      showMessage({
        message: 'Invalid Code',
        description: 'OTP must be 6 digits in length',
        type: 'danger',
      });
      return;
    }
    try {
      await confirmed.confirm(OTP);
      var user = auth().currentUser;
      var userDB = await firestore().collection('users').doc(user.uid).get();
      userDB = userDB.data();
      if (!userDB) {
        await auth().currentUser.updateProfile({
          photoURL: 'images/blankProfile.png',
        });
        await firestore().collection('users').doc(user.uid).set({
          cart: {},
          token: '',
          isComplete: false,
        });
        console.log('Data Writen successfully');
      }
      props.navigation.replace('Home');
    } catch (error) {
      console.log(error);
      showMessage({
        message: 'Invalid Code',
        description: 'Entered OTP is incorrect',
        type: 'danger',
      });
      reset();
    }
  };

  return (
    <View style={styles.screen}>
      <Input
        placeholder="10 digit number"
        keyboardType="phone-pad"
        maxLength={10}
        onChangeText={numParser}
        value={phone}
        editable={!confirmed}
        leftIcon={{type: 'Ionicons', name: 'call'}}
      />
      {isOTP ? (
        <Input
          placeholder="Enter OTP"
          keyboardType="phone-pad"
          maxLength={6}
          onChangeText={OTPParser}
          value={OTP}
          leftIcon={{type: 'FontAwesome', name: 'lock'}}
        />
      ) : null}
      <View style={styles.button}>
        {!isOTP ? (
          <Button
            raised={true}
            title="Send OTP"
            onPress={sendOTP}
            buttonStyle={{width: 130}}
          />
        ) : (
          <Button
            raised={true}
            title="Verify OTP"
            onPress={verifyOTP}
            buttonStyle={{width: 130}}
          />
        )}
        <Button
          raised={true}
          title="Reset"
          onPress={reset}
          buttonStyle={{width: 130}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10%',
  },
  button: {
    width: 330,
    marginTop: 30,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default Login;

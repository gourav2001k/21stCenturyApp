/* eslint-disable */
import React, {useState, useEffect} from 'react';
import {View, ImageBackground, Dimensions, StyleSheet} from 'react-native';
import {Colors, ActivityIndicator} from 'react-native-paper';
import {Input, Button} from 'react-native-elements';
import {showMessage} from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';
import RNBootSplash from 'react-native-bootsplash';

import Logo from '../assets/logo.png';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const Login = props => {
  useEffect(() => {
    const init = async () => {
      auth().onAuthStateChanged(user => {
        if (user) console.log('Looged In');
      });
    };
    init().finally(async () => {
      await RNBootSplash.hide({fade: true});
      if (auth().currentUser) props.navigation.replace('Home');
      console.log('Bootsplash has been hidden successfully');
    });

    return () => init();
  }, []);

  const [isClicked, setIsClicked] = useState(false);
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
    setIsClicked(false);
    setIsOTP(false);
    setPhone(null);
    setConfirmed(null);
    setOTP(null);
  };
  const sendOTP = async () => {
    setIsClicked(true);
    if (phone.length < 10) {
      showMessage({
        message: 'Invalid Phone',
        description: 'Phone Number must be 10 digits in length',
        type: 'danger',
      });
      setIsClicked(false);
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
    setIsClicked(false);
  };

  const verifyOTP = async () => {
    setIsClicked(true);
    if (OTP.length < 6) {
      showMessage({
        message: 'Invalid Code',
        description: 'OTP must be 6 digits in length',
        type: 'danger',
      });
      setIsClicked(false);
      return;
    }
    try {
      await confirmed.confirm(OTP);
      var user = auth().currentUser;
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
      <ImageBackground
        source={Logo}
        style={{
          width: (2 * width) / 3,
          height: (2 * width) / 3,
          marginBottom: 50,
        }}
      />
      <Input
        placeholder="10 digit number"
        keyboardType="phone-pad"
        maxLength={10}
        onChangeText={numParser}
        value={phone}
        editable={!isOTP}
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
      <ActivityIndicator animating={isClicked} size="large" color="blue" />
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
    marginTop: 10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default Login;

/* eslint-disable */
import React, {useState, useEffect} from 'react';
import {View, ImageBackground, Dimensions, StyleSheet} from 'react-native';
import {Colors, ActivityIndicator} from 'react-native-paper';
import {Input, Button} from 'react-native-elements';
import {showMessage} from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import RNBootSplash from 'react-native-bootsplash';
import VersionCheck from 'react-native-version-check';

import Logo from '../assets/logo.png';
import CategoryTile from '../components/CategoryTile';
import Update from '../components/ForcedUpdate';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const Login = props => {
  useEffect(() => {
    const init = async () => {
      let appV = await firestore().collection('others').doc('appVersion').get();
      appV = appV.data();
      if (appV.version === VersionCheck.getCurrentVersion()) {
        auth().onAuthStateChanged(user => {
          if (user) props.navigation.navigate('MealsNavigator');
        });
      } else {
        Update();
      }
    };
    init().finally(async () => {
      await RNBootSplash.hide({fade: true});
      console.log('Bootsplash has been hidden successfully');
    });

    return () => init();
  }, []);
  const [isClicked, setIsClicked] = useState(false);
  const [phone, setPhone] = useState();
  const [OTP, setOTP] = useState();
  const [confirmed, setConfirmed] = useState();
  const [isOTP, setIsOTP] = useState(false);

  const onSkip = () => {
    props.navigation.navigate('MealsNavigator');
  };

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
      reset();
      var user = auth().currentUser;
      var userDB = await firestore().collection('users').doc(user.uid).get();
      userDB = userDB.data();
      if (!userDB) {
        // await auth().currentUser.updateProfile({
        //   photoURL: 'images/blankProfile.png',
        // });
        await firestore()
          .collection('users')
          .doc(user.uid)
          .set({
            cart: {},
            token: '',
            isComplete: false,
            address: {locality: 'JJC'},
          });
        console.log('Data Writen successfully');
      }
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
      <View style={styles.skip}>
        <CategoryTile
          text="Skip"
          button
          containerStyle={{
            width: 80,
            height: 40,
            marginRight: 18,
            borderColor: 'black',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
          textStyle={{
            color: 'white',
            fontSize: 16,
          }}
          onPress={onSkip}
        />
      </View>
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
        label="Phone No."
        maxLength={10}
        onChangeText={numParser}
        value={phone}
        editable={!confirmed}
        leftIcon={{type: 'Ionicons', name: 'call'}}
      />
      {isOTP ? (
        <Input
          placeholder="Enter OTP"
          label="OTP"
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
  skip: {position: 'absolute', top: 10, right: -10},
});

export default Login;

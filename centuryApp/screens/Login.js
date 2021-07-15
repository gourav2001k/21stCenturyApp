/* eslint-disable */
import React, {useState, useEffect} from 'react';
import {
  View,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Text,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {Overlay, Button} from 'react-native-elements';
import Input from 'react-native-input-style';

import {showMessage} from 'react-native-flash-message';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import RNBootSplash from 'react-native-bootsplash';
import VersionCheck from 'react-native-version-check';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import Logo from '../assets/logo.png';
import CategoryTile from '../components/CategoryTile';

import Update from '../components/ForcedUpdate';
import {useKeyboard} from '../hooks/useKeyboardHeight';
import Colors from '../constants/Colors';
import {Image} from 'react-native';
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const Login = props => {
  useEffect(() => {
    const listener = auth().onAuthStateChanged(user => {
      if (user) props.navigation.replace('MealsNavigator');
    });
    return () => listener();
  }, []);

  const [isClicked, setIsClicked] = useState(false);
  const [phone, setPhone] = useState();
  const [OTP, setOTP] = useState();
  const [confirmed, setConfirmed] = useState();
  const [isOTP, setIsOTP] = useState(false);
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const onSkip = () => {
    props.navigation.replace('MealsNavigator');
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
    setConfirmed(null);
    setOTP(null);
    setVisible(false);
  };
  const sendOTP = async () => {
    setIsClicked(true);
    setVisible(true);
    if (phone.length < 10) {
      showMessage({
        message: 'Invalid Phone',
        description: 'Phone Number must be 10 digits in length',
        type: 'danger',
      });
      setIsClicked(false);
      setVisible(false);

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
    setVisible(false);
  };

  const verifyOTP = async () => {
    setVisible(true);
    setIsClicked(true);
    if (OTP.length < 6) {
      showMessage({
        message: 'Invalid Code',
        description: 'OTP must be 6 digits in length',
        type: 'danger',
      });
      setVisible(false);
      setIsClicked(false);

      return;
    }
    try {
      await confirmed.confirm(OTP);
      reset();
      var user = auth().currentUser;
      var userDB = await firestore().collection('users').doc(user.uid).get();
      const tokenDat = await messaging().getToken();
      userDB = userDB.data();
      if (!userDB) {
        await firestore()
          .collection('users')
          .doc(user.uid)
          .set({
            cart: {},
            token: tokenDat,
            isComplete: false,
            address: {locality: 'JJC'},
          });
        console.log('Data Writen successfully');
      } else {
        await firestore().collection('users').doc(user.uid).update({
          token: tokenDat,
        });
        console.log('TOken Updated');
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
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <ImageBackground
          source={require('../assets/logoStart.jpg')}
          style={styles.logoStartImage}>
          <View style={{height: '100%', justifyContent: 'space-between'}}>
            <CategoryTile
              text="Skip"
              button
              containerStyle={styles.skipContainer}
              textStyle={{color: 'black', fontSize: 16}}
              onPress={onSkip}
            />
            <Image source={Logo} style={styles.logoImage} />
          </View>
        </ImageBackground>
      </View>
      <View style={{marginVertical: 30, marginHorizontal: 20}}>
        <Text style={{fontSize: 30, fontFamily: 'robotoLight'}}>Login</Text>
      </View>
      <View>
        <Input
          autoFocus
          clearButtonMode="always"
          id="Phone"
          keyboardType="phone-pad"
          outlined
          label="Phone Number"
          initialValue={phone}
          onInputChange={(s, e, t) => {
            numParser(e);
          }}
          borderColor={Colors['Star Command Blue']}
          fontSize={12}
          editable={!confirmed}
          fontFamily={!confirmed ? 'robotoLight' : 'robotoRegular'}
        />
        {isOTP ? (
          <Input
            id="OTP"
            label="OTP"
            outlined
            keyboardType="phone-pad"
            initialValue=""
            maxLength={6}
            onInputChange={(s, e) => {
              OTPParser(e);
            }}
            borderColor={Colors['Star Command Blue']}
            fontSize={11}
            fontFamily="robotoLight"
          />
        ) : null}
      </View>
      <View style={styles.buttonContainer}>
        <View
          style={{
            ...styles.specificButtonContainer,
            width: !isOTP ? '50%' : '40%',
          }}>
          {!isOTP ? (
            <Button raised={true} title="Send OTP" onPress={sendOTP} />
          ) : (
            <Button raised={true} title="Verify OTP" onPress={verifyOTP} />
          )}
        </View>
        {!isOTP ? null : (
          <View style={{width: '40%', elevation: 10}}>
            <Button
              raised={true}
              type="outline"
              title="Reset"
              onPress={reset}
            />
          </View>
        )}
      </View>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.overlayContainer}>
        <ActivityIndicator animating={visible} size="large" color="blue" />
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  logoStartImage: {
    width: width,
    height: height / 3,
    alignItems: 'flex-end',
  },
  logoImage: {
    width: '35%',
    height: '45%',
    position: 'absolute',
    bottom: -50,
    right: 15,
  },
  buttonContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  specificButtonContainer: {
    width: '40%',
    borderRadius: 100,
    overflow: 'hidden',
    elevation: 10,
  },
  skipContainer: {
    width: 80,
    height: 40,
    marginRight: 15,
    marginTop: 10,
    borderColor: 'black',
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  skip: {
    position: 'absolute',
    top: 10,
    right: -10,
  },
  overlayContainer: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});

export default Login;

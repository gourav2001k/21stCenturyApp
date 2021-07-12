import {Linking, Alert, BackHandler} from 'react-native';
import RNExitApp from 'react-native-exit-app';

const Update = () =>
  Alert.alert(
    'App Update available',
    'Please Update your app from before continuing further.',
    [{text: 'Update', onPress: () => redirect()}],
  );

const GOOGLE_PACKAGE_NAME = 'com.century';

const redirect = () => {
  //This is the main trick
  Linking.openURL(
    `https://play.google.com/store/apps/details?id=${GOOGLE_PACKAGE_NAME}`,
  )
    .then(res => {
      RNExitApp.exitApp();
    })
    .catch(err => alert('Please check for Google Play Store'));
};

export default Update;

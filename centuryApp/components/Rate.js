// import all the components we are going to use
import {Linking} from 'react-native';

const GOOGLE_PACKAGE_NAME = 'com.century';

const Rate = () => {
  //This is the main trick
  Linking.openURL(
    `https://play.google.com/store/apps/details?id=${GOOGLE_PACKAGE_NAME}`,
  ).catch(err => alert('Please check for Google Play Store'));
};

export default Rate;

import {Linking} from 'react-native';
const Support = () =>
  Linking.openURL(
    'mailto:21stcenturyb8@gmail.com?subject=Support Request&body=Your Issue Here',
  );
export default Support;

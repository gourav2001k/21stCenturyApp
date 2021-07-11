import {Linking} from 'react-native';
const ReportBug = () =>
  Linking.openURL(
    'mailto:21stcenturyb8@gmail.com?subject=BugReport&body=Your Report Here',
  );
export default ReportBug;

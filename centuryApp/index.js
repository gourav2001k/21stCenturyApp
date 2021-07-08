/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import messaging from '@react-native-firebase/messaging';
import {name as appName} from './app.json';

// for notification when in background state, for foreground a component(ForegrounfNotify) is made
messaging().setBackgroundMessageHandler(async mess => {});

AppRegistry.registerComponent(appName, () => App);

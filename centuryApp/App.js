import React, {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import RNBootSplash from 'react-native-bootsplash';
import VersionCheck from 'react-native-version-check';
import AppNavigator from './navigation/AppNavigator';
import Update from './components/ForcedUpdate';
import Push from './Push';

const App = () => {
  useEffect(() => {
    const init = async () => {
      let appV = await firestore().collection('others').doc('appVersion').get();
      appV = appV.data();
      if (appV.version !== VersionCheck.getCurrentVersion()) {
        Update();
      }
    };
    init().finally(async () => {
      await RNBootSplash.hide({fade: true});
      console.log('Bootsplash has been hidden successfully');
    });

    return () => init();
  }, []);
  return <AppNavigator />;
};

export default App;

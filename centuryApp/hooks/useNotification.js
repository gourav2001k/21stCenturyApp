import React, {useEffect} from 'react';
import axios from 'axios';
import auth from '@react-native-firebase/auth';

const useNotification = ({type, admin, adminType}) => {
  const notifyServer = async () => {
    const token1 = await auth().currentUser.getIdToken();

    await axios.post('http://127.0.0.1:4000/notification', {
      token: token1,
      type: type,
      admin: admin,
      adminType: adminType,
    });
  };
  return notifyServer;
};

export default useNotification;

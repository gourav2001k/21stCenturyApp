import React, {useEffect} from 'react';
import axios from 'axios';
import auth from '@react-native-firebase/auth';

const useNotification = ({type, admin, adminType}) => {
  const notifyServer = async () => {
    try {
      const token1 = await auth().currentUser.getIdToken();
      await axios.post(`${process.env.SERVER_URL}/notification`, {
        token: token1,
        type: type,
        admin: admin,
        adminType: adminType,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return notifyServer;
};

export default useNotification;

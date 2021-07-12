import axios from 'axios';
import auth from '@react-native-firebase/auth';

const useNotification = ({title, message, to}) => {
  const notifyServer = async () => {
    try {
      const token = await auth().currentUser.getIdToken();
      await axios.post(`${process.env.SERVER_URL}/notification`, {
        token: token,
        title: title,
        message: message,
        to: to,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return notifyServer;
};

export default useNotification;

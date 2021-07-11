import {Share} from 'react-native';

const onShare = async () => {
  try {
    const result = await Share.share({
      message:
        "Hi, there I am using this amazing app which helps me order from 21st Century Bakery with ease. Here's the link https://play.google.com/store/apps/details?id=com.century Try it out",
      url: 'https://play.google.com/store/apps/details?id=com.century',
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
        console.log('Shareit');
      } else {
        // shared
        console.log('Shared');
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
      console.log('Dismiss');
    }
  } catch (error) {
    alert(error.message);
  }
};

export default onShare;

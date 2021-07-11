import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Icon, Overlay, Input, Button} from 'react-native-elements';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AppLoading from '../../hooks/AppLoading';

import {showMessage} from 'react-native-flash-message';
import Tags from 'react-native-tags';
import CategoryTile from '../CategoryTile';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const EditButton = ({cartMealID}) => {
  const [visible, setVisible] = useState(false);
  const [serverData, setServerData] = useState();
  const [overlayText, setOverlayText] = useState('');
  const [quantity, setQuantity] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const fetchItems = async () => {
    const currentData = await firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .get();
    setServerData(currentData.data().cart[cartMealID]);
    setOverlayText(
      currentData.data().cart[cartMealID].displayName
        ? currentData.data().cart[cartMealID].displayName
        : '',
    );
    setQuantity(currentData.data().cart[cartMealID].quantity);
  };

  const updateName = async () => {
    const displayName = overlayText;
    if (quantity < displayName.length) {
      return showMessage(
        {
          message: 'Many Names !!!',
          description: 'Names are entered more than quantity',
          type: 'danger',
        },
        3500,
      );
    }
    try {
      await firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .update({
          [`cart.${cartMealID}`]: {...serverData, displayName: displayName},
        });
      toggleOverlay();
      showMessage({
        message: 'Names Updated!!',
        description: 'Names have been successfully updated.',
        type: 'success',
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  if (!isLoading) {
    return (
      <AppLoading
        fetchItems={fetchItems}
        onFinish={() => {
          setIsLoading(true);
        }}
        onError={console.warn}
        edit
      />
    );
  }
  return (
    <View>
      <Icon
        name="edit"
        type="font-awesome"
        raised
        color="rgba(0,65,200,1)"
        size={18.5}
        containerStyle={{marginLeft: 1}}
        onPress={toggleOverlay}
      />
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.overlayContainer}>
        <Text style={styles.title}>Add Name</Text>
        <Text style={{...styles.subtitle, fontWeight: 'bold'}}>#names</Text>
        <Tags
          initialText="Name"
          initialTags={[]}
          onChangeTags={tags => setOverlayText(tags)}
          containerStyle={{justifyContent: 'center'}}
          inputStyle={{color: 'black'}}
          renderTag={({tag, index, onPress, deleteTagOnPress, readonly}) => (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={{paddingHorizontal: 5, paddingVertical: 2}}>
              <CategoryTile
                text={tag}
                containerStyle={{
                  borderColor: 'rgba(0,165,255,1)',
                  backgroundColor: 'rgba(0,165,255,0.2)',
                }}
                textStyle={{
                  color: 'rgba(0,100,200,0.8)',
                }}
              />
            </TouchableOpacity>
          )}
        />

        <Text style={styles.subtitle}>➢ To add multiple names use space.</Text>
        <Text style={styles.subtitle}>➢ To remove , Click the name !!</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="DONE"
            onPress={() => {
              updateName();
            }}
            type="outline"
            raised
            titleStyle={{paddingHorizontal: 15}}
          />
        </View>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  overlayContainer: {
    width: '90%',
    paddingVertical: 20,
  },
  title: {
    marginLeft: 20,
    fontSize: 20,
    fontFamily: 'robotoRegular',
    color: 'rgba(0,100,200,0.8)',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'robotoLight',
    fontSize: 15,
    paddingHorizontal: 10,
    color: 'rgba(0,0,0,0.6)',
    paddingVertical: 5,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default EditButton;

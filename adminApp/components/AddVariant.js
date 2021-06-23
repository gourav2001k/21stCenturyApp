import React, {useState} from 'react';
import {View, Dimensions} from 'react-native';
import {Input, Button} from 'react-native-elements';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const OverlayComp = ({setVariants, toggleOverlay}) => {
  const [variantName, setVariantName] = useState();
  const [variantPrice, setVariantPrice] = useState();
  const priceHandler = txt => {
    setVariantPrice(txt.replace(/[^0-9]/g, ''));
  };
  const Save = () => {
    var id = makeID(6);
    var newEntry = {};
    newEntry[id] = {name: variantName, price: variantPrice, available: true};
    setVariants(variants => ({...variants, ...newEntry}));
    toggleOverlay();
  };
  return (
    <View style={{width: (2 * width) / 3}}>
      <Input
        value={variantName}
        onChangeText={txt => {
          setVariantName(txt);
        }}
        placeholder="Enter Variant Name"
        label="Name"
      />
      <Input
        value={variantPrice}
        placeholder="Enter Price"
        onChangeText={priceHandler}
        keyboardType="phone-pad"
        label="Price"
      />
      <Button raised={true} title="Add Variant" onPress={Save} />
    </View>
  );
};

const makeID = length => {
  var result = [];
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength)),
    );
  }
  return result.join('');
};

export default OverlayComp;

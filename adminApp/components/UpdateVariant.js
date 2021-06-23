import React, {useState} from 'react';
import {View, Dimensions} from 'react-native';
import {Input, Button, CheckBox} from 'react-native-elements';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const UpdateComp = ({setVariants, variants, toggleUpdate, idx}) => {
  const [variantName, setVariantName] = useState(variants[idx].name);
  const [variantPrice, setVariantPrice] = useState(variants[idx].price);
  const [available, setAvailable] = useState(variants[idx].available);
  const priceHandler = txt => {
    setVariantPrice(txt.replace(/[^0-9]/g, ''));
  };
  const Save = () => {
    var newEntry = {};
    newEntry[idx] = {
      name: variantName,
      price: variantPrice,
      available: available,
    };
    setVariants({...variants, ...newEntry});
    toggleUpdate();
  };
  return (
    <View style={{width: (2 * width) / 3}}>
      <CheckBox
        center
        iconRight={true}
        title="Availablity"
        checked={available}
        onPress={() => {
          setAvailable(old => !old);
        }}
      />
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
      <Button raised={true} title="Update" onPress={Save} />
    </View>
  );
};

export default UpdateComp;

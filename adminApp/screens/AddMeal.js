import React, {useState, Fragment} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import {
  Input,
  Button,
  Overlay,
  ListItem,
  CheckBox,
} from 'react-native-elements';
import {FAB, Colors} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {launchImageLibrary} from 'react-native-image-picker';
import {ActivityIndicator} from 'react-native-paper';
import {Formik} from 'formik';
import MealValidator from '../validators/MealValidator';
import {showMessage} from 'react-native-flash-message';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const AddMeal = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [filePath, setFilePath] = useState('');

  // Dropdown Menu
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Cake');
  const [items, setItems] = useState([
    {label: 'CAKE', value: 'Cake'},
    {label: 'BISCUITS', value: 'Biscuits'},
    {label: 'PASTRIES', value: 'Pastries'},
    {label: 'BREADS', value: 'Breads'},
    {label: 'CHOCOLATES', value: 'Chocolates'},
    {label: 'SNACKS', value: 'Snacks'},
  ]);

  // Overlay (Add New)
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const OverlayComp = () => {
    const [variantName, setVariantName] = useState();
    const [variantPrice, setVariantPrice] = useState();
    const priceHandler = txt => {
      setVariantPrice(txt.replace(/[^0-9]/g, ''));
    };
    const Save = () => {
      var id = makeID(6);
      var newEntry = {};
      newEntry[id] = {name: variantName, price: variantPrice, available: true};
      setVariants({...variants, ...newEntry});
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

  const [update, setUpdate] = useState(false);
  const [idx, setIDX] = useState();

  const toggleUpdate = () => {
    setUpdate(!update);
  };

  const UpdateComp = () => {
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

  // Variants
  const [variants, setVariants] = useState();

  const varTile = (item, obj) => {
    return (
      <ListItem.Swipeable
        leftContent={
          obj[item].available ? (
            <Button
              title=" Available"
              icon={<Feather name="check" size={24} color="white" />}
              buttonStyle={{minHeight: '100%'}}
            />
          ) : (
            <Button
              title=" Not Available"
              icon={<Entypo name="cross" size={24} color="white" />}
              buttonStyle={{minHeight: '100%'}}
            />
          )
        }
        rightContent={
          <Button
            title=" Update"
            icon={<FontAwesome name="gear" size={24} color="white" />}
            buttonStyle={{minHeight: '100%'}}
            onPress={() => {
              setIDX(item);
              toggleUpdate();
            }}
          />
        }>
        <ListItem.Title style={{paddingRight: 80}}>
          {obj[item].name}
        </ListItem.Title>
        <ListItem.Subtitle style={{paddingLeft: 80}}>
          ₹ {obj[item].price}
        </ListItem.Subtitle>
      </ListItem.Swipeable>
    );
  };

  var db = firestore();

  const filePicker = async () => {
    launchImageLibrary({}, data => {
      if (data.didCancel) return;
      setFilePath(data.assets[0].uri);
    });
  };

  const addMeal = async (name, description, discount, time) => {
    setIsLoading(true);
    try {
      if (!variants) throw new Error("Variants can't be empty");
      // Create the file metadata
      var loc = 'meals/' + makeID(8) + '-' + Date.now().toString() + '.jpg';
      const imageStore = storage().ref(loc);
      await imageStore.putFile(filePath);
      // create doc to be inserted
      var avail = false;
      var vrnts = {};
      for (const key in variants) {
        vrnts[key] = variants[key];
        vrnts[key].price = parseInt(vrnts[key].price);
        avail |= vrnts[key].available;
      }
      var doc = {
        imageURL: loc,
        name: name,
        category: value,
        description: description,
        time: time,
        variants: vrnts,
        discount: parseInt(discount),
        available: Boolean(avail),
        rating: 0,
        ratings: {},
      };
      // Writing the doc to FireStore
      db.collection('meals')
        .doc(makeID(16))
        .set(doc)
        .then(() => {
          console.log('Document successfully written!');
          props.navigation.replace('Meals');
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error writing document: ', error);
          setIsLoading(false);
        });
    } catch (err) {
      showMessage({
        message: 'Error',
        description: err.message,
        type: 'danger',
      });
      setIsLoading(false);
    }
  };
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Category</Text>
      <DropDownPicker
        containerStyle={{...styles.picker, paddingBottom: open ? 200 : 10}}
        textStyle={styles.picker}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
      <Text style={styles.text}>Variants</Text>
      {variants ? (
        <FlatList
          keyExtractor={item => item.item}
          data={Object.keys(variants)}
          renderItem={item => varTile(item.item, variants)}
        />
      ) : (
        <Text
          style={{
            ...styles.text,
            paddingHorizontal: '10%',
            paddingVertical: 10,
            fontWeight: 'normal',
          }}>
          Please add atleast one Variant
        </Text>
      )}

      <ScrollView>
        <Formik
          initialValues={{
            name: '',
            time: '',
            discount: '',
            filePath: '',
            description: '',
          }}
          validationSchema={MealValidator}
          onSubmit={values => {
            addMeal(
              values.name,
              values.description,
              values.discount,
              values.time,
            );
          }}>
          {({
            values,
            errors,
            handleChange,
            touched,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
            <Fragment>
              <Input
                placeholder="Enter meal name"
                onChangeText={handleChange('name')}
                value={values.name}
                label="Meal Name"
                onBlur={handleBlur('name')}
                errorStyle={{color: 'red'}}
                errorMessage={touched.name && errors.name}
              />
              <Input
                placeholder="Short Description"
                onChangeText={handleChange('description')}
                value={values.description}
                label="Description"
                onBlur={handleBlur('description')}
                errorStyle={{color: 'red'}}
                errorMessage={touched.description && errors.description}
              />
              <Input
                placeholder="Discount Value in %"
                label="Dicount"
                maxLength={2}
                value={values.discount}
                keyboardType="number-pad"
                onChangeText={handleChange('discount')}
                onBlur={handleBlur('discount')}
                errorStyle={{color: 'red'}}
                errorMessage={touched.discount && errors.discount}
              />
              <Input
                placeholder="Time"
                label="Preparation Time"
                maxLength={3}
                value={values.time}
                keyboardType="number-pad"
                onChangeText={handleChange('time')}
                onBlur={handleBlur('time')}
                errorStyle={{color: 'red'}}
                errorMessage={touched.time && errors.time}
              />
              <View style={styles.picker}>
                <Button
                  icon={<Entypo name="image" size={25} color="white" />}
                  raised={true}
                  title="     Choose Image"
                  onPress={async () => {
                    await filePicker();
                    handleBlur('filePath');
                    setFieldValue('filePath', filePath);
                  }}
                />
              </View>
              <Text style={{color: 'red', paddingLeft: 90}}>
                {filePath === '' && touched.filePath ? errors.filePath : ''}
              </Text>
              {filePath !== '' ? (
                <View style={styles.image}>
                  <Image
                    source={{uri: filePath}}
                    style={{
                      width: '100%',
                      height: 200,
                      borderRadius: 5,
                      overflow: 'hidden',
                    }}
                  />
                </View>
              ) : null}

              <View style={styles.submit}>
                <Button raised={true} title="Add Meal" onPress={handleSubmit} />
              </View>
              <ActivityIndicator
                animating={isLoading}
                size="large"
                color="blue"
              />
            </Fragment>
          )}
        </Formik>
      </ScrollView>
      <FAB
        large
        icon="plus"
        color="white"
        style={styles.fab}
        onPress={toggleOverlay}
      />
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <OverlayComp />
      </Overlay>
      <Overlay isVisible={update} onBackdropPress={toggleUpdate}>
        <UpdateComp />
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    position: 'relative',
  },
  text: {
    paddingHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#474747',
  },
  image: {
    paddingHorizontal: '10%',
    paddingVertical: 10,
  },
  picker: {
    paddingVertical: 10,
    paddingHorizontal: '3%',
    fontSize: 17,
    textAlign: 'center',
    color: '#474747',
  },
  submit: {
    paddingHorizontal: '30%',
    paddingVertical: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: Colors.blue600,
  },
});

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

export default AddMeal;

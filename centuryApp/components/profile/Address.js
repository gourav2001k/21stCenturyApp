import React, {useEffect, useState, Fragment} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {ActivityIndicator} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {showMessage} from 'react-native-flash-message';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const AddressValidator = Yup.object().shape({
  name: Yup.string()
    .label('Name')
    .required('You need to provide an Name')
    .min(3, 'Name must contain atleast 3 characters'),
  address: Yup.string()
    .label('Address')
    .required('You need to provide an address')
    .min(15, 'Address must contain atleast 15 characters'),
  locality: Yup.string().label('locality'),
});

const Address = ({toggleOverlay}) => {
  const userID = auth().currentUser.uid;
  const [oldAddress, setAddress] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetch = async () => {
      var userData = await firestore().collection('users').doc(userID).get();
      userData = userData.data();
      setAddress(userData.address);
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading)
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator animating={loading} size="large" color="blue" />
      </View>
    );

  const updateAddress = async (name, address, locality) => {
    try {
      toggleOverlay();
      await auth().currentUser.updateProfile({displayName: name});
      await firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .update({
          address: {address: address, locality: locality, city: 'Jodhpur'},
          isComplete: true,
        });
      showMessage({
        message: 'Updated',
        description: 'Details were updated successfully!!',
        type: 'success',
      });
    } catch (err) {
      console.log(err);
      showMessage({
        message: 'ERROR !!!!!!!',
        description: err.message,
        type: 'danger',
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.contain}>
          <Formik
            initialValues={{
              name: auth().currentUser.displayName
                ? auth().currentUser.displayName
                : '',
              address: oldAddress.address ? oldAddress.address : '',
              locality: oldAddress.locality ? oldAddress.locality : '',
            }}
            validationSchema={AddressValidator}
            onSubmit={values => {
              updateAddress(values.name, values.address, values.locality);
            }}>
            {({
              values,
              errors,
              handleChange,
              touched,
              handleBlur,
              handleSubmit,
            }) => (
              <Fragment>
                <Text
                  style={{
                    fontSize: 25,
                    textAlign: 'center',
                    fontFamily: 'robotoRegular',
                    marginTop: 20,
                    marginBottom: 40,
                  }}>
                  Update Profile
                </Text>
                <Input
                  label="Name*"
                  value={values.name}
                  placeholder="Your Name"
                  leftIcon={{type: 'FontAwesome', name: 'account-box'}}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  errorStyle={{color: 'red'}}
                  errorMessage={touched.name && errors.name}
                />
                <Input
                  label="Address*"
                  value={values.address}
                  placeholder="House/Colony"
                  leftIcon={{type: 'Entypo', name: 'location-pin'}}
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  errorStyle={{color: 'red'}}
                  errorMessage={touched.address && errors.address}
                />
                <Input
                  placeholder="Street/Landmark"
                  label="Locality"
                  value={values.locality}
                  leftIcon={{type: 'Entypo', name: 'local-attraction'}}
                  onChangeText={handleChange('locality')}
                  onBlur={handleBlur('locality')}
                  errorStyle={{color: 'red'}}
                  errorMessage={touched.locality && errors.locality}
                />
                <Input
                  value="Jodhpur"
                  label="City"
                  disabled={true}
                  leftIcon={{type: 'Entypo', name: 'location-city'}}
                />
                <View style={styles.button}>
                  <Button title="Update" onPress={handleSubmit} />
                </View>
              </Fragment>
            )}
          </Formik>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    elevation: 1,
  },
  contain: {
    paddingTop: 10,
    paddingLeft: 10,
  },
  button: {paddingHorizontal: '20%', marginTop: 10, borderRadius: 10},
});

export default Address;

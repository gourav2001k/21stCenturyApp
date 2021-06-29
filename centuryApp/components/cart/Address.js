import React, {useEffect, useState, Fragment} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {Input} from 'react-native-elements';
import {ActivityIndicator} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import OrderButton from './OrderButton';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const AddressValidator = Yup.object().shape({
  address: Yup.string()
    .label('Address')
    .required('You need to provide an address')
    .min(15, 'Address must contain atleast 15 characters'),
  locality: Yup.string().label('locality'),
  phone: Yup.number()
    .label('Phone Number')
    .required('Phone number is required for delivery')
    .min(1000000000, 'Not a valid Phone Number')
    .max(99999999999, 'Not a valid Phone Number'),
});

const Address = ({cartItems, totalAmount, type, setIsLoading}) => {
  const userID = auth().currentUser.uid;
  const deliveryCharge = 40;
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

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.contain}>
          <Formik
            initialValues={{
              address: oldAddress.address ? oldAddress.address : '',
              locality: oldAddress.locality ? oldAddress.locality : '',
              phone: oldAddress.phone ? oldAddress.phone : '',
            }}
            validationSchema={AddressValidator}>
            {({values, errors, handleChange, touched, handleBlur}) => (
              <Fragment>
                <Text
                  style={{
                    fontSize: 25,
                    textAlign: 'center',
                    fontFamily: 'robotoRegular',
                    marginTop: 20,
                    marginBottom: 40,
                  }}>
                  Delivery Address
                </Text>

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
                <Input
                  placeholder="10 digit number"
                  keyboardType="phone-pad"
                  value={values.phone}
                  label="Phone No.*"
                  maxLength={10}
                  leftIcon={{type: 'Ionicons', name: 'call'}}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  errorStyle={{color: 'red'}}
                  errorMessage={touched.phone && errors.phone}
                />
                <View style={styles.button}>
                  <OrderButton
                    cartItems={cartItems}
                    disabled={Boolean(
                      (Object.keys(errors).length > 0) |
                        (Object.keys(touched).length === 0),
                    )}
                    totalAmount={totalAmount + deliveryCharge}
                    type={type}
                    setIsLoading={setIsLoading}
                    address={{
                      address: values.address,
                      locality: values.locality,
                      phone: values.phone,
                      city: 'Jodhpur',
                    }}
                  />
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

import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, ScrollView} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import AppLoading from '../hooks/AppLoading';
import CartCard from '../components/cart/CartCard';

const Cart = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState();
  const [images, setImages] = useState();
  const userId = auth().currentUser.uid;

  const fetchItems = async () => {
    const userDetails = await firestore().collection('users').doc(userId).get();
    const imageStore = storage().ref();

    var fetchedUserCart = userDetails.data().cart;
    Object.keys(fetchedUserCart).map(dat => {
      fetchedUserCart[dat].quantity === 0 ? delete fetchedUserCart[dat] : null;
    });

    var imagesObject = {};

    await Promise.all(
      Object.keys(fetchedUserCart).map(async dat => {
        const mealImageURL = await firestore()
          .collection('meals')
          .doc(fetchedUserCart[dat].mealID)
          .get();
        imagesObject[fetchedUserCart[dat].mealID] =
          mealImageURL.data().imageURL;
      }),
    );

    await Promise.all(
      Object.keys(imagesObject).map(async dat => {
        const newURL = await imageStore
          .child(imagesObject[dat])
          .getDownloadURL();
        imagesObject[dat] = newURL;
      }),
    );
    setCartItems(fetchedUserCart);
    setImages(imagesObject);
  };

  if (!isLoading) {
    return (
      <AppLoading
        fetchItems={fetchItems}
        onFinish={() => {
          setIsLoading(true);
        }}
        onError={console.warn}
      />
    );
  }
  console.log(cartItems);
  return (
    <View style={styles.screen}>
      <View style={styles.cardContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {Object.keys(cartItems).map(dat => (
            <CartCard
              key={dat}
              details={cartItems[dat]}
              imageURL={images[cartItems[dat].mealID]}
              setCartItems={setCartItems}
              cartMealID={dat}
            />
          ))}
        </ScrollView>
      </View>
      <View
        style={{
          borderWidth: 1,
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '20%',
        }}>
        <View
          style={{
            width: '50%',
            marginLeft: '25%',
            marginTop: '2%',
          }}>
          <Text>ASD</Text>
          <Text>ASD</Text>
          <Text>ASD</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  cardContainer: {
    height: '80%',
    overflow: 'hidden',
  },
});

export default Cart;

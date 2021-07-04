import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, Dimensions} from 'react-native';

import {Icon, Badge} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AppLoading from '../hooks/AppLoading';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const CartIcon = ({navigation}) => {
  const [currentNum, setCurrentNum] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const fetchItems = async () => {
    if (auth().currentUser) {
      const fetchedCart = await firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .get();
      setCurrentNum(Object.keys(fetchedCart.data().cart).length);
    }
  };

  useEffect(async () => {
    const onResult = () => {
      setIsLoading(false);
    };
    const unsubscribe = firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .onSnapshot(onResult);

    return () => unsubscribe();
  }, []);

  if (!isLoading) {
    return (
      <AppLoading
        fetchItems={fetchItems}
        onFinish={() => {
          setIsLoading(true);
        }}
        onError={console.warn}
        cart
      />
    );
  }

  return (
    <View style={styles.container}>
      <Icon
        size={25}
        title="Cart"
        type="ionicon"
        name="ios-cart-outline"
        onPress={() => {
          auth().currentUser
            ? navigation.navigate('Cart')
            : navigation.navigate('Login');
        }}
        color="white"
      />
      {auth().currentUser ? (
        <Badge
          value={currentNum}
          badgeStyle={{backgroundColor: 'rgba(255,255,255,1)'}}
          textStyle={{color: 'black'}}
          containerStyle={{position: 'absolute', top: -5, right: -10}}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 20,
    // marginTop: 15,
    // width: '95%',
    // alignItems: 'flex-end',
    // justifyContent: 'center',
  },
});

export default CartIcon;

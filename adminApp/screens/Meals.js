import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, Dimensions} from 'react-native';
import {FAB, Colors} from 'react-native-paper';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import messaging from '@react-native-firebase/messaging';
import AppLoading from '../hooks/AppLoading';

import CategoryList from '../components/categoryList/CategoryList';
import MealCard from '../components/mealCard/MealCard';
import ForeGroundNotify from '../components/notification/ForeGroundNotify';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const Meals = props => {
  const [allMeal, setAllMeal] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('Cake');

  // const token1 = async () => {
  //   const t = await auth().currentUser.getIdToken();
  //   console.log(t);
  // };
  // token1();
  const updateTokenOnfirestore = async () => {
    const tokenDat = await messaging().getToken();
    await firestore().collection('users').doc(auth().currentUser.uid).update({
      token: tokenDat,
    });
  };

  const fetchItems = async () => {
    if (auth().currentUser) {
      updateTokenOnfirestore();
    }
    try {
      const onResult = () => setIsLoading(false);
      firestore().collection('meals').onSnapshot(onResult, console.warn);
      const fetchMeals = await firestore().collection('meals').get();
      // fetchMeals.forEach(doc => {
      //   console.log(doc.data());
      // });
      const imageStore = storage().ref();
      const tempAllMeal = [];

      await Promise.all(
        fetchMeals.docs.map(async doc => {
          const mealData = doc.data();
          mealData['mealID'] = doc.id;
          const newURL = await imageStore
            .child(mealData.imageURL)
            .getDownloadURL();
          mealData['imageURL'] = newURL;
          tempAllMeal.push(mealData);
        }),
      );

      setAllMeal(tempAllMeal);
      setIsLoading(true);
    } catch (err) {
      console.log(err);
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
      />
    );
  }

  var currentMeal = 0;
  return (
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      <View style={styles.screen}>
        <CategoryList
          setCurrentCategory={setCurrentCategory}
          currentCategory={currentCategory}
        />
        {allMeal.map((dat, idx) => {
          currentCategory === 'All Meal' || dat.category === currentCategory
            ? (currentMeal += 1)
            : (currentMeal += 0);
          return currentCategory === 'All Meal' ||
            dat.category === currentCategory ? (
            <MealCard navigation={props.navigation} meal={dat} key={idx} />
          ) : null;
        })}
        {currentMeal === 0 ? (
          <View
            style={{
              marginTop: height / 3,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Currently No Meal is available for {currentCategory}!!!</Text>
          </View>
        ) : null}
      </View>
      <FAB
        large
        icon="plus"
        color="white"
        style={styles.fab}
        onPress={() => props.navigation.navigate('Add Meal')}
      />
      {auth().currentUser ? <ForeGroundNotify /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: Colors.blue600,
  },
});

export default Meals;

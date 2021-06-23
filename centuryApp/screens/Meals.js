import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, Dimensions} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AppLoading from '../hooks/AppLoading';

import CategoryList from '../components/categoryList/CategoryList';
import MealCard from '../components/mealCard/MealCard';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const Meals = props => {
  const [allMeal, setAllMeal] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('All Meal');

  const fetchItems = async () => {
    try {
      const fetchMeals = await firestore().collection('meals').get();
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
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Meals;

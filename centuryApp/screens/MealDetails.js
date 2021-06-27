import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import MealDetailCard from '../components/mealDetailCard/MealDetailCard';

import AppLoading from '../hooks/AppLoading';

const MealDetails = props => {
  const {mealID} = props.route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [mealDetail, setMealDetail] = useState();
  const fetchItems = async () => {
    try {
      const fetchMeals = await firestore()
        .collection('meals')
        .doc(mealID)
        .get();
      var fetchMealData = fetchMeals.data();
      const imageStore = storage().ref();
      fetchMealData['mealID'] = mealID;
      const newURL = await imageStore
        .child(fetchMealData.imageURL)
        .getDownloadURL();
      fetchMealData['imageURL'] = newURL;

      setMealDetail(fetchMealData);
      setIsLoading(true);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const onResult = () => {
      setIsLoading(false);
    };
    const unsubscribe = firestore().collection('meals').onSnapshot(onResult);

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
      />
    );
  }

  return (
    <View style={styles.screen}>
      <MealDetailCard mealDetail={mealDetail} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default MealDetails;

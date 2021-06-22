import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  FlatList,
} from 'react-native';

import CategoryTile from '../CategoryTile';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const CategoryList = props => {
  const List = [
    {id: 0, name: 'All Meal'},
    {id: 1, name: 'Cake'},
    {id: 2, name: 'Biscuits'},
    {id: 3, name: 'Pastries'},
  ];
  return (
    <View style={styles.container}>
      <FlatList
        horizontal={true}
        data={List}
        renderItem={({item}) => {
          return (
            <CategoryTile
              text={item.name}
              button
              containerStyle={{marginHorizontal: 10}}
              textStyle={{fontSize: 15}}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    width: width,
    overflow: 'scroll',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
});

export default CategoryList;

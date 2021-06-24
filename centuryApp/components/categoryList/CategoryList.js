import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  FlatList,
} from 'react-native';
import Colors from '../../constants/Colors';

import CategoryTile from '../CategoryTile';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const CategoryList = props => {
  const List = [
    {id: 0, name: 'Cake'},
    {id: 1, name: 'Biscuits'},
    {id: 2, name: 'Pastries'},
    {id: 3, name: 'Snacks'},
    {id: 4, name: 'Chocolates'},
    {id: 5, name: 'Breads'},
  ];
  return (
    <View style={styles.container}>
      <FlatList
        horizontal={true}
        data={List}
        renderItem={({item}) => {
          return item.name === props.currentCategory ? (
            <CategoryTile
              text={item.name}
              button
              containerStyle={styles.categoryContainer}
              textStyle={{
                fontSize: 15,
              }}
              onPress={() => props.setCurrentCategory(item.name)}
            />
          ) : (
            <CategoryTile
              text={item.name}
              button
              containerStyle={{
                marginHorizontal: 10,
                borderColor: Colors.blueJeans,
                backgroundColor: 'rgba(0,65,255,0.1)',
              }}
              textStyle={{
                fontSize: 15,
                color: Colors['Orange Pantone'],
              }}
              onPress={() => props.setCurrentCategory(item.name)}
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
  categoryContainer: {
    marginHorizontal: 10,
    borderColor: Colors.blueJeans,
    backgroundColor: Colors.blueJeans,
  },
});

export default CategoryList;

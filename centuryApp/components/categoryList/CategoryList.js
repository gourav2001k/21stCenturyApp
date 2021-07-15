import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  FlatList,
  Pressable,
} from 'react-native';
import {Icon} from 'react-native-elements';
import Colors from '../../constants/Colors';

import CategoryTile from '../CategoryTile';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const CategoryList = props => {
  const flatlistRef = useRef();
  const [refresh, setRefresh] = useState(false);
  const List = [
    {id: 0, name: 'Cake'},
    {id: 1, name: 'Biscuits'},
    {id: 2, name: 'Pastries'},
    {id: 3, name: 'Snacks'},
    {id: 4, name: 'Chocolates'},
    {id: 5, name: 'Breads'},
  ];
  const listToEnd = () => {
    flatlistRef.current.scrollToEnd({animating: true});
  };
  return (
    <View style={styles.container}>
      <View style={{width: '90%'}}>
        <FlatList
          horizontal={true}
          data={List}
          ref={flatlistRef}
          renderItem={({item}) => {
            return item.name === props.currentCategory ? (
              <CategoryTile
                text={item.name}
                button
                buttonStyle={{paddingVertical: 8}}
                containerStyle={styles.activeCategoryContainer}
                textStyle={{
                  fontSize: 18,
                  color: 'white',
                }}
                onPress={() => props.setCurrentCategory(item.name)}
              />
            ) : (
              <CategoryTile
                text={item.name}
                button
                buttonStyle={{paddingVertical: 10}}
                containerStyle={styles.inactiveCategoryContainer}
                textStyle={{
                  fontSize: 16,
                  color: Colors['Blue Green'],
                }}
                onPress={() => props.setCurrentCategory(item.name)}
              />
            );
          }}
        />
      </View>
      <View>
        <Icon
          name="chevron-right"
          type="entypo"
          color={Colors['Star Command Blue']}
          onPress={() => {
            listToEnd();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: width,
    // overflow: 'scroll',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  activeCategoryContainer: {
    marginHorizontal: 10,
    borderColor: Colors['Star Command Blue'],
    backgroundColor: Colors['Star Command Blue'],
    borderWidth: 1.5,
  },
  inactiveCategoryContainer: {
    marginHorizontal: 10,
    borderColor: 'white',
    backgroundColor: 'rgba(0,165,255,0.1)',
  },
});

export default CategoryList;

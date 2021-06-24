import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  FlatList,
} from 'react-native';

import CategoryTile from '../../CategoryTile';
import Colors from '../../../constants/Colors';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const MenuOption = ({finalOrder, index, setIndex}) => {
  const List = [];

  var tempObject = {};
  Object.keys(finalOrder).map(dat => {
    tempObject = {...finalOrder[dat]};
    tempObject['id'] = dat;
    List.push(tempObject);
  });

  return (
    <View style={styles.container}>
      <FlatList
        horizontal={true}
        data={List}
        renderItem={({item}) => (
          <CategoryTile
            text="sadaadssadsssssaa"
            containerStyle={
              index === item.id
                ? styles.activeCategoryContainer
                : styles.inactiveCategoryContainer
            }
            textStyle={
              index === item.id
                ? styles.activeTextContainer
                : styles.inactiveTextContainer
            }
            button
            onPress={() => {
              setIndex(item.id);
            }}
          />
        )}
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
    overflow: 'scroll',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  activeCategoryContainer: {
    marginHorizontal: 10,
    borderColor: 'white',
    backgroundColor: 'green',
  },
  inactiveCategoryContainer: {
    marginHorizontal: 10,
    backgroundColor: Colors.blueJeans,
  },
  activeTextContainer: {
    color: 'white',
  },

  text: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
  selectedText: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'normal',
  },
});

export default MenuOption;

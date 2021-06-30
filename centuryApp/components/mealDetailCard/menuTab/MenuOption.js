import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  FlatList,
} from 'react-native';

import {Icon} from 'react-native-elements';
import CategoryTile from '../../CategoryTile';
import Colors from '../../../constants/Colors';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const MenuOption = ({finalOrder, index, setIndex}) => {
  const List = [];
  const flatlistRef = useRef();
  const [refresh, setRefresh] = useState(false);

  var tempObject = {};
  Object.keys(finalOrder).map(dat => {
    tempObject = {...finalOrder[dat]};
    tempObject['id'] = dat;
    List.push(tempObject);
  });

  useEffect(() => {
    setTimeout(() => {
      setRefresh(true);
    }, 100);

    flatlistRef.current.scrollToEnd({animating: true});
    setTimeout(
      () => flatlistRef.current.scrollToIndex({animating: true, index: 0}),
      500,
    );
  }, [refresh]);

  return (
    <View style={styles.container}>
      <View style={styles.flatlistContainer}>
        <FlatList
          horizontal={true}
          data={List}
          ref={flatlistRef}
          renderItem={({item}) => (
            <CategoryTile
              text={item.name}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0)',
    marginBottom: 20,
    marginLeft: 10,
  },
  flatlistContainer: {
    width: '92%',
    paddingVertical: 2,
  },
  arrowContainer: {
    width: '8%',
    borderWidth: 0.001,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCategoryContainer: {
    marginHorizontal: 10,
    borderColor: Colors['Star Command Blue'],
    backgroundColor: Colors['Star Command Blue'],
  },
  inactiveCategoryContainer: {
    marginHorizontal: 10,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderColor: Colors['Star Command Blue'],
  },
  activeTextContainer: {
    color: 'white',
  },
  inactiveTextContainer: {
    borderColor: 'blue',
    color: Colors['Star Command Blue'],
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

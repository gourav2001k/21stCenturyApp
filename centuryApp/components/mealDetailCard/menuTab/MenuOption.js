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
              buttonStyle={{paddingVertical: 4}}
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
    marginTop: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0)',
    marginBottom: 15,
    marginLeft: 10,
  },
  flatlistContainer: {
    width: '92%',
    paddingVertical: 2,
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
    paddingHorizontal: 10,
    paddingRight: 25,
    fontSize: 20,
  },
  inactiveTextContainer: {
    borderColor: 'blue',
    color: Colors['Star Command Blue'],
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
});

export default MenuOption;

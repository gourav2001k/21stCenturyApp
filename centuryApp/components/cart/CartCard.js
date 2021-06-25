import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';

import {ListItem, Avatar, Icon} from 'react-native-elements';

import RightIcon from './RightIcon';
import DetailCounter from './DetailCounter';
import CategoryTile from '../CategoryTile';
import Colors from '../../constants/Colors';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const CartCard = ({cartMealID, details, imageURL}) => {
  const {available, mealID, name, price, quantity, setCartItems} = details;

  return (
    <ListItem.Swipeable rightContent={<RightIcon />} style={styles.container}>
      <Avatar
        rounded
        source={{uri: imageURL}}
        style={{height: height / 10, width: '25%'}}
      />
      <ListItem.Content style={{alignItems: 'center'}}>
        <ListItem.Title
          style={{fontSize: 18, fontWeight: 'bold'}}
          numberOfLines={2}>
          {name}
        </ListItem.Title>
        <View style={{marginTop: 10}}>
          <CategoryTile
            text={`Rs ${price}`}
            containerStyle={{
              backgroundColor: 'rgba(0,65,255,0.2)',
              borderColor: Colors['Navy Blue'],
            }}
            textStyle={{color: Colors['Navy Blue']}}
          />
        </View>
      </ListItem.Content>
      {/* <ListItem.Content
          style={{
            // backgroundColor: 'black',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
            paddingVertical: 10,
          }}>
          <ListItem.Subtitle
            style={{
              fontSize: 18,
              backgroundColor: 'rgba(0,0,0,0.2)',
              paddingHorizontal: 10,
              paddingVertical: 2,
              borderRadius: 10,
              marginLeft: 10,
            }}>
            x {quantity}
          </ListItem.Subtitle> */}
      <ListItem.Content
        style={{
          alignItems: 'flex-end',
          justifyContent: 'space-around',
        }}>
        <DetailCounter quantity={quantity} />
        <Icon
          name="arrow-right"
          type="font-awesome"
          style={{marginTop: 10}}
          size={15}
        />
      </ListItem.Content>
    </ListItem.Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.001,
    borderRadius: 30,
    overflow: 'hidden',
    marginHorizontal: 10,
    marginTop: 10,
    elevation: 2,
  },
});

export default CartCard;

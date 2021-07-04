import React from 'react';
import {View} from 'react-native';
import {Button, ListItem} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const varTile = (item, obj, setIDX, toggleUpdate) => {
  return (
    <View style={{marginVertical: 5}}>
      <ListItem.Swipeable
        leftContent={
          obj[item].available ? (
            <Button
              title=" Available"
              icon={<Feather name="check" size={24} color="white" />}
              buttonStyle={{minHeight: '100%'}}
            />
          ) : (
            <Button
              title=" Not Available"
              icon={<Entypo name="cross" size={24} color="white" />}
              buttonStyle={{minHeight: '100%'}}
            />
          )
        }
        rightContent={
          <Button
            title=" Update"
            icon={<FontAwesome name="gear" size={24} color="white" />}
            buttonStyle={{minHeight: '100%'}}
            onPress={() => {
              setIDX(item);
              toggleUpdate();
            }}
          />
        }>
        <ListItem.Content
          style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <ListItem.Title style={{}}>{obj[item].name}</ListItem.Title>
          <ListItem.Subtitle style={{}}>₹ {obj[item].price}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem.Swipeable>
    </View>
  );
};

export default varTile;

import React from 'react';
import {Button, ListItem} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const varTile = (item, obj, setIDX, toggleUpdate) => {
  return (
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
      <ListItem.Title style={{paddingRight: 80}}>
        {obj[item].name}
      </ListItem.Title>
      <ListItem.Subtitle style={{paddingLeft: 80}}>
        ₹ {obj[item].price}
      </ListItem.Subtitle>
    </ListItem.Swipeable>
  );
};

export default varTile;

import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {createStackNavigator} from '@react-navigation/stack';

import HeaderButtonss from '../components/HeaderButtonss';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const AboutUs = props => {
  return (
    <View style={styles.screen}>
      <Text>This is AboutUs Screen!!!</Text>
    </View>
  );
};

// const Stack = createStackNavigator();

// const AboutNav = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="About Us"
//         component={AboutUs}
//         options={({navigation, route}) => ({
//           headerLeft: () => (
//             <HeaderButtons HeaderButtonComponent={HeaderButtonss}>
//               <Item
//                 title="Menu"
//                 iconName="ios-menu"
//                 onPress={() => {
//                   navigation.toggleDrawer();
//                 }}
//               />
//             </HeaderButtons>
//           ),
//         })}
//       />
//     </Stack.Navigator>
//   );
// };

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AboutUs;

import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, ScrollView} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AppLoading from '../hooks/AppLoading';

import OrdersTile from '../components/Order/OrderTile';
import {List} from 'react-native-paper';

const Orders = props => {
  const [userOrders, setUserOrders] = useState();
  const [sequence, setSequence] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // for accordicon start
  const [expanded0, setExpanded0] = useState(false);
  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(false);
  const [expanded4, setExpanded4] = useState(false);
  // for accordicon end

  const fetchItems = async () => {
    const orders = await firestore()
      .collection('orders')
      .where('userID', '==', auth().currentUser.uid)
      .get();
    const fetchedUserOrder = {};
    var arr = [];
    orders.docs.map(doc => {
      fetchedUserOrder[doc.id] = doc.data();
      arr.push([doc.data().createdAt, doc.id]);
    });
    arr.sort((a, b) => a[0] < b[0]);
    setSequence(arr);
    setUserOrders(fetchedUserOrder);
  };

  useEffect(() => {
    if (!auth().currentUser) {
      props.navigation.navigate('Login');
    } else {
      const onResult = () => {
        setIsLoading(false);
      };
      const unsubscribe = firestore()
        .collection('orders')
        .where('userID', '==', auth().currentUser.uid)
        .onSnapshot(onResult);

      return () => unsubscribe();
    }
  }, []);
  if (!auth().currentUser) {
    return (
      <View>
        <Text>Redirecting</Text>
      </View>
    );
  }
  if (!isLoading) {
    return (
      <AppLoading
        fetchItems={fetchItems}
        onFinish={() => {
          setIsLoading(true);
        }}
        onError={console.warn}
      />
    );
  }

  // for accordicon start
  const group = {today: [], yesterday: [], week: [], month: [], older: []};

  let today = new Date();

  sequence.map(dat => {
    if (today.getDate() - dat[0].toDate().getDate() === 0) {
      group.today.push(dat[1]);
    } else if (today.getDate() - dat[0].toDate().getDate() === 1) {
      group.yesterday.push(dat[1]);
    } else if (today.getDate() - dat[0].toDate().getDate() < 7) {
      group.week.push(dat[1]);
    } else if (today.getDate() - dat[0].toDate().getDate() < 30) {
      group.month.push(dat[1]);
    } else {
      group.older.push(dat[1]);
    }

    // addlogic for week/month/older
  });

  const timeList = [
    {
      name: 'today',
      title: 'Today',
      open: expanded0,
      setOpen: () => {
        setExpanded0(!expanded0);
      },
    },
    {
      name: 'yesterday',
      title: 'Yesterday',
      open: expanded1,
      setOpen: () => {
        setExpanded1(!expanded1);
      },
    },
    {
      name: 'week',
      title: 'Week',
      open: expanded2,
      setOpen: () => {
        setExpanded2(!expanded2);
      },
    },
    {
      name: 'month',
      title: 'Month',
      open: expanded3,
      setOpen: () => {
        setExpanded3(!expanded3);
      },
    },
    {
      name: 'older',
      title: 'Older',
      open: expanded4,
      setOpen: () => {
        setExpanded4(!expanded4);
      },
    },
  ];
  // for accordicon end

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.scrollContainer}>
        {}
        {timeList.map((dat, idx) => {
          return (
            <List.Accordion
              key={idx}
              title={dat.title}
              expanded={dat.open}
              onPress={dat.setOpen}>
              {group[dat.name].map(xy => (
                <OrdersTile
                  key={xy}
                  orderData={userOrders[xy]}
                  orderID={xy}
                  navigation={props.navigation}
                />
              ))}
            </List.Accordion>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollContainer: {},
});

export default Orders;

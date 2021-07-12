import React, {useState, useCallback} from 'react';
import {Icon} from 'react-native-elements';
import {DatePickerModal} from 'react-native-paper-dates';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';
const ChooseDate = ({date, setDate}) => {
  const [open, setOpen] = useState(false);

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = useCallback(
    params => {
      updateDate(params.date);
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate],
  );

  const updateDate = async newDate => {
    try {
      await firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .update({DOB: firestore.Timestamp.fromDate(newDate)});
      showMessage({
        message: 'DOB Updated',
        description: 'Date of Birth was updated successfully!!',
        type: 'success',
      });
    } catch (err) {
      console.log(err);
      showMessage({
        message: 'ERROR !!!!!!!',
        description: err.message,
        type: 'danger',
      });
    }
  };
  return (
    <>
      <Icon name="edit" type="font-awesome" onPress={() => setOpen(true)} />

      <DatePickerModal
        mode="single"
        visible={open}
        onDismiss={onDismissSingle}
        date={date}
        onConfirm={onConfirmSingle}
        validRange={{
          startDate: new Date(1950, 1, 2), // optional
          endDate: new Date(), // optional
        }}
      />
    </>
  );
};

export default ChooseDate;

import React from 'react';
import {View, Text, StyleSheet, Button, Dimensions} from 'react-native';
import StepIndicator from 'react-native-step-indicator';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const ProgressBar = ({isAccept, isCancel, status, refund}) => {
  const labels = [
    'Order Placed',
    isCancel ? 'Cancelled' : isAccept ? 'Accepted' : 'Confirming',
    isCancel
      ? refund === 'PENDING'
        ? 'Refund Initiated'
        : 'Refunded'
      : isAccept
      ? status
        ? 'Completed'
        : 'Preparing'
      : '',
  ];
  const currentPosition = isCancel
    ? refund === 'PENDING'
      ? 2
      : 3
    : isAccept
    ? status
      ? 3
      : 2
    : 1;
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: isCancel ? 'red' : '#fe7013',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#3BB143',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#3BB143',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#3BB143',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: isCancel ? 'red' : '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: isCancel ? 'red' : '#fe7013',
  };

  return (
    <View style={{width: '100%'}}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={currentPosition}
        labels={labels}
        stepCount={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ProgressBar;

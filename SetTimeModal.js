import React, { useState } from 'react';
import styled from 'styled-components';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { time, toggleModal } from './Store';

import DateTimePicker from '@react-native-community/datetimepicker';

function SetTimeModal({store, setTime, toggleModal}){
  const date =new Date();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setTime(currentDate.getHours(), currentDate.getMinutes());
  };

  return(
    <DateTimePicker
      testID="dateTimePicker"
      value= {date}
      mode= 'time'
      is24Hour= {false}
      display= "spinner"
      onChange= {onChange}
    />
  );
}

// const SetTimeBox = styled.View`
//   width: 90%;
//   height: 80%;
//   position: absolute;
//   background: #fff;
//   border-radius: 10px;
//   overflow: hidden;
// `;

function mapStateToProps(state){
  return {store: state};
}

function mapDispatchToProps(dispatch){
  return{
    setTime: (hour, minute) => dispatch(time({hour, minute})),
    toggleModal: (boolModal) => dispatch(toggleModal(boolModal))
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(SetTimeModal);
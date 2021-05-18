import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setStartTime, setEndTime } from './Store';

import DateTimePicker from '@react-native-community/datetimepicker';

function SetTimeModal({navigation, store, setStartTime, setEndTime}){
  const date =new Date();
  console.log("aa");
  useEffect(()=>{
  },[]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    if(store.switchStartEnd === "start")
      setStartTime(currentDate.getHours(), currentDate.getMinutes());
    else
      setEndTime(currentDate.getHours(), currentDate.getMinutes());

    console.log("aaaaa");

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
    setStartTime: (hour, minute) => dispatch(setStartTime({hour, minute})),
    setEndTime : (hour, minute) => dispatch(setEndTime({hour, minute})),
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(SetTimeModal);

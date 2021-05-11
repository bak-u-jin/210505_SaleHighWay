import React, { useState } from 'react';
import styled from 'styled-components';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';


function getTime(plusDay=0){
  const daysOfWeek = ["일","월","화","수","목","금","토","일","월"];
  const now = new Date();
  const setTime = new Date(now.setDate(now.getDate()+plusDay));

  let today = {
    month: setTime.getMonth()+1,
    date: setTime.getDate(),
    day: daysOfWeek[setTime.getDay()]
  }

  return today;
}

function SetTimeModal({store}){
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    alert(selectedDate);
    setDate(currentDate);
  };

  return(
    <SetTimeBox>
      <DateTimePicker
          testID="dateTimePicker"
          value= {date}
          mode= 'time'
          is24Hour= {false}
          display= "spinner"
          onChange= {onChange}
        />
    </SetTimeBox>
  );
}


const styles = StyleSheet.create({
  topGradient: {
    width: "100%",
    height: "40%",
    position: "absolute",
    top: 0,
  },

  bottomGradient: {
    width: "100%",
    height: "40%",
    position: "absolute",
    bottom: 0,
  },

  scrollContainerStyle:{
    // flex: 1,
    minHeight: "100%",
    alignItems: "center",
    justifyContent: "center"
  }
});

const SetTimeBox = styled.View`
  width: 90%;
  height: 80%;
  position: absolute;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
`;

const TimeScroll = styled.ScrollView`
  width: ${(props) => props.width || "20%"};
  height: 200%;
  background:yellow;
`;

const ScrollText = styled.Text`
  font-size: 24px;
`;

function mapStateToProps(state){
  return {store: state};
}

export default connect(mapStateToProps,null)(SetTimeModal);
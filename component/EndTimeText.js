import React from 'react';
import { connect } from "react-redux";
import styled from 'styled-components';


function StartTimeText({store}){
  return(
    <>
      {store.endHour === undefined ? (
        <>
          <TimeTitle>도착시간을 </TimeTitle>
          <TextStrong>정해주세요</TextStrong>
        </>
      ):(
        (store.endHour<13)? (
          store.endHour === 0 ? (
            <>
              <TimeTitle>도착시간</TimeTitle>
              <DevineLine/>
              <TextStrong>오전 {store.endHour+12}시 {store.endMinute}분</TextStrong>
            </>
          ):(
            <>
              <TimeTitle>도착시간</TimeTitle>
              <DevineLine/>
              <TextStrong>오전 {store.endHour}시 {store.endMinute}분</TextStrong>
            </>
          )
        ) : (
          <>
            <TimeTitle>도착시간</TimeTitle>
            <DevineLine/>
            <TextStrong>오후 {store.endHour-12}시 {store.endMinute}분</TextStrong>
          </>
      ))}
    </>
  )
}

const TimeTitle = styled.Text`
`;

const DevineLine = styled.View`
  height: 26px;
  width: 1.4px;
  background: #fff;
  margin: 0 10px;
`;

const TextStrong = styled.Text`
  font-weight: bold;
`;

function mapStateToProps(state){
  return {store: state};
}

export default connect(mapStateToProps, null) (StartTimeText);
import React from 'react';
import { connect } from "react-redux";
import styled from 'styled-components';

function StartTimeText({store}){
  return(
    <>
      {store.startHour === undefined ? (
        <>
          <TimeTitle>출발시간을 </TimeTitle>
          <TextStrong>정해주세요</TextStrong>
        </>
      ):(
        (store.startHour<13)? (
          store.startHour === 0 ? (
            <>
              <TimeTitle>출발시간</TimeTitle>
              <DevineLine/>
              <TextStrong>오전 {store.startHour+12}시 {store.startMinute}분</TextStrong>
            </>
            ):(
              <>
              <TimeTitle>출발시간</TimeTitle>
              <DevineLine/>
              <TextStrong>오전 {store.startHour}시 {store.startMinute}분</TextStrong>
            </>
          )
        ) : (
          <>
            <TimeTitle>출발시간</TimeTitle>
            <DevineLine/>
            <TextStrong>오후 {store.startHour-12}시 {store.startMinute}분</TextStrong>
          </>
        )
      )}
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
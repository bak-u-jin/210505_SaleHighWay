import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { setStartBtn, setEndBtn, setResultBtn, toggleTimeModal} from './Store';
import SetTimeModal from './SetTimeModal';

function Home({store, StartBtnPress, EndBtnPress, ResultBtnPress, ToggleTimeModal}) {
  const statusBarColor = "#e3e3e3";
  const resultBtnBgColor = "#2978b5";
  const resultBtnPressBgColor = "#0061a8";

  function StartTimeOnPressIn(){
    StartBtnPress(0.98, "#71c9ce");
    ToggleTimeModal("start");
  }
  
  function StartTimeOnPressOut(){
    StartBtnPress(1, "#a6e3e9");
  }
  
  function EndTimeOnPressIn(){
    EndBtnPress(0.98, "#71c9ce");
    ToggleTimeModal("end");
  }
  
  function EndTimeOnPressOut(){
    EndBtnPress(1, "#a6e3e9");
  }

  function resultOnPressIn(){
    ResultBtnPress(0.98, resultBtnPressBgColor);
  }

  function resultOnPressOut(){
    ResultBtnPress(1, resultBtnBgColor);
  }

  return (
    <Container>
      <StatusBar backgroundColor= {statusBarColor}/>
      <SetViewBox>
        <TimeButtonBox onPressIn= {StartTimeOnPressIn} onPressOut= {StartTimeOnPressOut}>
          <TimeButton size= {store.startBtnSize} bgColor={store.startBtnColor}>
            {(store.startHour<13)? (
              <Text>출발시간 오전 {store.startHour}시 {store.startMinute}분</Text>
              ) : (
              <Text>출발시간 오후 {store.startHour-12}시 {store.startMinute}분</Text>
            )}
          </TimeButton>
        </TimeButtonBox>
        <TimeButtonBox onPressIn= {EndTimeOnPressIn} onPressOut= {EndTimeOnPressOut}>
          <TimeButton size= {store.endBtnSize} bgColor={store.endBtnColor}>
            {store.endHour ? (
              (store.endHour<13)? (
                <Text>도착시간 오전 {store.endHour}시 {store.endMinute}분</Text>
                ) : (
                <Text>도착시간 오후 {store.endHour-12}시 {store.endMinute}분</Text>
              )
            ):(
              <Text>예아</Text>
            )}  
          </TimeButton>
        </TimeButtonBox>
          {store.endHour ? (
            <ResultButtonBox onPressIn={resultOnPressIn} onPressOut= {resultOnPressOut}>
              <ResultButton bgColor={store.resultBtnColor} size={store.resultBtnSize}>
                <Text>결과보기</Text>
              </ResultButton>
            </ResultButtonBox>
          ):(
            <ResultButton>
              <Text>시간을 설정해주세요</Text>
            </ResultButton>
          )}
      </SetViewBox>
      {console.log("Aa")} 
      {/* console 넣지 않음 피커가 2번뜸 */}
      {store.displayTimeModal && <SetTimeModal/>}
    </Container>
  );
}

const Container = styled.SafeAreaView`
  background: #e3e3e3;
  flex:1;
  justify-content: center;
  align-items: center;
`;

const SetViewBox = styled.View`
  background: #fff;
  width: 90%;
  height: 40%;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

const TimeButtonBox = styled.TouchableWithoutFeedback`
`;

const ResultButtonBox = styled.TouchableWithoutFeedback`
`;

const TimeButton = styled.View`
  margin:5px 0;
  width: 90%;
  height:40px;
  border-radius:10px;
  background: ${(props) => props.bgColor || "#fff"};
  justify-content: center;
  align-items: center;
  transform: scale(${(props) => props.size || 1});
`;

const ResultButton = styled.View`
  margin:5px 0;
  width: 90%;
  height:40px;
  border-radius:10px;
  background: ${(props) => props.bgColor || "#ddd"};
  justify-content: center;
  align-items: center;
  transform: scale(${(props) => props.size || 1});
`;

function mapStateToProps(state){
  return {store: state};
}

function mapDispatchToProps(dispatch){
  return{
    StartBtnPress: (size, color) => dispatch(setStartBtn({size, color})),
    EndBtnPress: (size, color) => dispatch(setEndBtn({size, color})),
    ResultBtnPress: (size, color) => dispatch(setResultBtn({size, color})),
    ToggleTimeModal: (toggleStartEnd) => dispatch(toggleTimeModal(toggleStartEnd)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (Home);
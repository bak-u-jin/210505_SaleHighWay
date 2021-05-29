import React, { useRef, useState } from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { setStartBtn, setEndBtn, setResultBtn, toggleTimeModal} from '../Store';
import HelpButton from './HelpButton.js';
import SetTimeModal from '../SetTimeModal';
import StartTimeText from './StartTimeText';
import EndTimeText from './EndTimeText';
import HelpModal from './HelpModal';
import EndTimeWarningModal from './EndTimeWarningModal';

function Home({navigation, store, StartBtnPress, EndBtnPress, ResultBtnPress, ToggleTimeModal}) {
  const statusBarColor = "#22195E";

  const timeBtnColor = "#71c9ce";
  const timeBtnPressColor = "#a6e3e9";
  const resultBtnBgColor = "#2978b5";
  const resultBtnPressBgColor = "#0061a8";

  function StartTimeOnPressIn(){
    StartBtnPress(0.98, timeBtnColor);
    ToggleTimeModal("start");
  }
  
  function StartTimeOnPressOut(){
    StartBtnPress(1, timeBtnPressColor);
  }
  
  function EndTimeOnPressIn(){
    EndBtnPress(0.98, timeBtnColor);
    ToggleTimeModal("end");
  }
  
  function EndTimeOnPressOut(){
    EndBtnPress(1, timeBtnPressColor);
  }

  function resultOnPressIn(){
    ResultBtnPress(0.98, resultBtnPressBgColor);
    navigation.navigate('Result');
  }

  function resultOnPressOut(){
    ResultBtnPress(1, resultBtnBgColor);
  }

  const [styleStatusBar, setStyleStatusBar] = useState('light-content');


  return (
    <Container>
      <StatusBar backgroundColor= {statusBarColor} barStyle={styleStatusBar}/>
      <SetViewBox>
        <HelpButton/>
        <TimeButtonBox onPressIn= {StartTimeOnPressIn} onPressOut= {StartTimeOnPressOut}>
          <TimeButton size= {store.startBtnSize} bgColor={store.startBtnColor}>
            <StartTimeText/>
          </TimeButton>
        </TimeButtonBox>
        <TimeButtonBox onPressIn= {EndTimeOnPressIn} onPressOut= {EndTimeOnPressOut}>
          <TimeButton size= {store.endBtnSize} bgColor={store.endBtnColor}>
            <EndTimeText/>
          </TimeButton>
        </TimeButtonBox>
        <EndTimeWarningModal/>
          { (store.startHour === undefined || store.endHour === undefined) ? (
            <ResultButton>
              <TextMustTime>시간을 설정해주세요</TextMustTime>
            </ResultButton>
          ):(
            <ResultButtonBox onPressIn={resultOnPressIn} onPressOut= {resultOnPressOut}>
              <ResultButton bgColor={store.resultBtnColor} size={store.resultBtnSize}>
                <TextGetResult>결과보기</TextGetResult>
              </ResultButton>
            </ResultButtonBox>
          )}
      </SetViewBox>
      {store.displayTimeModal && <SetTimeModal/>}
      <HelpModal/>
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
  width: 370px;
  height: 330px;
  max-width: 90%;
  max-height: 40%;
  border-radius: 10px;
  align-items: center;
  padding-top: 70px;
  `;

const TimeButtonBox = styled.TouchableWithoutFeedback`
`;

const ResultButtonBox = styled.TouchableWithoutFeedback`
`;

const TimeButton = styled.View`
  margin: 5px 0;
  width: 330px;
  height:40px;
  border-radius:10px;
  background: ${(props) => props.bgColor || "#fff"};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transform: scale(${(props) => props.size || 1});
`;

const ResultButton = styled.View`
  margin: 14px 0 20px 0;
  width: 90%;
  height:40px;
  border-radius:10px;
  background: ${(props) => props.bgColor || "#ddd"};
  justify-content: center;
  align-items: center;
  transform: scale(${(props) => props.size || 1});
`;

const TextMustTime = styled.Text`
  color: #666;
`;

const TextGetResult = styled.Text`
  color: #fff;
  font-weight: bold;
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
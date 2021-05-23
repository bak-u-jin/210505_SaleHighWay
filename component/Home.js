import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { setStartBtn, setEndBtn, setResultBtn, toggleTimeModal} from '../Store';
import SetTimeModal from '../SetTimeModal';
import StartTimeText from './StartTimeText';
import EndTimeButton from './EndTimeButton';
import EndTimeText from './EndTimeText';
import { Easing } from 'react-native-reanimated';

function Home({navigation, store, StartBtnPress, EndBtnPress, ResultBtnPress, ToggleTimeModal}) {
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
    navigation.navigate('Result');
  }

  function resultOnPressOut(){
    ResultBtnPress(1, resultBtnBgColor);
  }

  const resultAnim = useRef(new Animated.Value(0)).current;

  Animated.loop(
    Animated.timing(
      resultAnim,
        {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }
    )
  ).start();

  return (
    <Container>
      <StatusBar backgroundColor= {statusBarColor}/>
      <SetViewBox>
        <Animated.View
          style={[
            styles.fadingContainer,
            {
              opacity: resultAnim, // Bind opacity to animated value
            },
          ]}/>
        <TimeButtonBox onPressIn= {StartTimeOnPressIn} onPressOut= {StartTimeOnPressOut}>
          <TimeButton size= {store.startBtnSize} bgColor={store.startBtnColor}>
            <StartTimeText/>
          </TimeButton>
        </TimeButtonBox>
        <TimeButtonBox onPressIn= {EndTimeOnPressIn} onPressOut= {EndTimeOnPressOut}>
          <TimeButton size= {store.endBtnSize} bgColor={store.endBtnColor}>
            <EndTimeText/>
            <EndTimeButton/>
          </TimeButton>
        </TimeButtonBox>
          {store.endHour === undefined ? (
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
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fadingContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'powderblue',
  },
  fadingText: {
    fontSize: 28,
    textAlign: 'center',
    margin: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    marginVertical: 16,
  },
});

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
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transform: scale(${(props) => props.size || 1});
`;

const ResultButton = styled.View`
  margin: 40px 0 20px 0;
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
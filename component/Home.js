import React from 'react';
import { StatusBar, View, StyleSheet, SafeAreaView, Dimensions, TouchableWithoutFeedback, Text } from 'react-native';
import { connect } from 'react-redux';
import { setStartBtn, setEndBtn, setResultBtn, toggleTimeModal} from '../Store';
import { LinearGradient } from 'expo-linear-gradient';

import HelpButton from './HelpButton.js';
import SetTimeModal from '../SetTimeModal';
import StartTimeText from './StartTimeText';
import EndTimeText from './EndTimeText';
import HelpModal from './HelpModal';
import EndTimeWarningModal from './EndTimeWarningModal';
import TruckBg from './design/svgTruckBg';

const windowWidth = Dimensions.get('window').width;
const cantResultButtonBg = "#3A396E";

function Home({navigation, store, StartBtnPress, EndBtnPress, ResultBtnPress, ToggleTimeModal}) {
  
  const statusBarColor = "#22195E";

  const timeBtnColor = "#4D428D";
  const timeBtnPressColor = "#312A59";

  const resultBtnBgColor = "#7675E0";
  const resultBtnPressBgColor = "#5D5BB0";

  function StartTimeOnPressIn(){
    StartBtnPress(0.98, timeBtnPressColor);
    ToggleTimeModal("start");
  }
  
  function StartTimeOnPressOut(){
    StartBtnPress(1, timeBtnColor);
  }
  
  function EndTimeOnPressIn(){
    EndBtnPress(0.98, timeBtnPressColor);
    ToggleTimeModal("end");
  }
  
  function EndTimeOnPressOut(){
    EndBtnPress(1, timeBtnColor);
  }

  function resultOnPressIn(){
    ResultBtnPress(0.98, resultBtnPressBgColor);
    navigation.navigate('Result');
  }

  function resultOnPressOut(){
    ResultBtnPress(1, resultBtnBgColor);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={statusBarColor} barStyle={'light-content'}/>
        <View style={styles.bgView}>
          <LinearGradient style={styles.bgLinearGradient} colors={['#22195E', '#382F78']}/>
          <TruckBg/>
          <HelpButton/>
        </View>

      <View style={styles.contentBox}>
        <View style={styles.timeButtonArea}>
          <TouchableWithoutFeedback onPressIn= {StartTimeOnPressIn} onPressOut= {StartTimeOnPressOut}>
            <View style={[styles.timeButton,{
              backgroundColor: store.startBtnColor,
              transform: [{scale: store.startBtnSize}]
            }]}>
              <View style={[styles.buttonBgCircle, {backgroundColor: 'rgba(120,110,200,0.4)', right: -windowWidth*0.08, top: 0}]}></View>
              <View style={[styles.buttonBgCircle, {backgroundColor: 'rgba(119,102,217,0.2)', right: 0, top: -windowWidth*0.08}]}></View>
              <View style={[styles.buttonBgCircle, {backgroundColor: 'rgba(144,130,202,0.5)', right: -windowWidth*0.1, top: -windowWidth*0.1}]}></View>
              <StartTimeText/>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPressIn= {EndTimeOnPressIn} onPressOut= {EndTimeOnPressOut}>
            <View style={[styles.timeButton,{
              backgroundColor: store.endBtnColor,
              transform: [{scale: store.endBtnSize}],
              }]}>
              <View style={[styles.buttonBgCircle, {backgroundColor: 'rgba(120,110,200,0.4)', right: -windowWidth*0.08, top: 0}]}></View>
              <View style={[styles.buttonBgCircle, {backgroundColor: 'rgba(119,102,217,0.2)', right: 0, top: -windowWidth*0.08}]}></View>
              <View style={[styles.buttonBgCircle, {backgroundColor: 'rgba(144,130,202,0.5)', right: -windowWidth*0.1, top: -windowWidth*0.1}]}></View>
              <EndTimeText/>
            </View>
          </TouchableWithoutFeedback>
        </View>
        {/* <EndTimeWarningModal/> */}
          {(store.startHour === undefined || store.endHour === undefined) ? (
            <View style={styles.resultButton}>
              <Text style={styles.cantResultText}>시간을 설정해주세요</Text>
            </View>
          ):(
            <TouchableWithoutFeedback onPressIn={resultOnPressIn} onPressOut= {resultOnPressOut}>
              <View style={[styles.resultButton,{
                backgroundColor: store.resultBtnColor,
                transform:[{scale: store.resultBtnSize}]
              }]}>
                <Text style={styles.resultText}>결과보기</Text>
              </View>
            </TouchableWithoutFeedback>
          )}
      </View>
      {store.displayTimeModal && <SetTimeModal/>}
      <HelpModal/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#22195E",
    flex: 1
  },
  
  bgView: {
    flex: 2,
  },

  bgLinearGradient:{
    ...StyleSheet.absoluteFillObject
  },

  contentBox:{
    flex: 3,
    backgroundColor: "#0f143a",
    alignItems: 'center',
    padding: '5%'
  },

  timeButtonArea:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  timeButton:{
    overflow: 'hidden',
    width: windowWidth*0.42,
    height: windowWidth*0.42,
    borderRadius: windowWidth*0.04,
    padding: '4%',
  },

  buttonBgCircle: {
    width: windowWidth*0.32,
    height: windowWidth*0.32,
    borderRadius: windowWidth*0.16, 
    position: 'absolute',
  },

  resultButton: {
    width: '100%',
    height: 70,
    borderRadius: 10,
    marginTop:40,
    backgroundColor: cantResultButtonBg,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cantResultText: {
    color: '#bbb',
    fontWeight: 'bold',
    fontSize: 28
  },

  resultText:{
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 32
  }
})

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
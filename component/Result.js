import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { setSaleResultPercent, setSaleTimePercent } from '../Store';
import { FontAwesome5 } from '@expo/vector-icons';
import { Easing } from 'react-native-reanimated';

function Result({navigation, store, SetSaleTimePercent, SetSaleResultPercent}){
  let startTime = store.startHour * 60 + store.startMinute;
  let endTime = store.endHour * 60 + store.endMinute;
  let fullTime = endTime - startTime;
  let saleTime = false;
  let saleTimePercent = false;

  function CalcTime(){
    if(fullTime < 0)
      EndSmallThanStart();

    if(startTime > 360 && startTime < 1260 && endTime > 360 && endTime < 1260)
      saleTime = 0;
    else{
      if(startTime > 360 && startTime < 1260)
        SetStartToSale();
      if(endTime > 360 && endTime < 1260)
        endTime = 360;
      else if(endTime > 1800 && endTime < 2700)
        endTime = 1800;
      console.log("calc",startTime, endTime, fullTime);
      ClacSaleTime();
    }
    CalcSaleTimePercent();
    console.log("sale",saleTimePercent,"% ", fullTime, saleTime);
    SetSaleResult();
  }

  function SetSaleResult(){
    if(saleTimePercent >= 70)
      SetSaleResultPercent(50);
    else if(saleTimePercent >= 20)
      SetSaleResultPercent(30);
    else
      SetSaleResultPercent(0);
  }

  function CalcSaleTimePercent(){
    saleTimePercent = saleTime / fullTime * 100;
    saleTimePercent = Math.floor(saleTimePercent);
    SetSaleTimePercent(saleTimePercent);
  }
  
  function ClacSaleTime(){
    if(startTime > endTime)
      endTime += 1440;
    saleTime = endTime - startTime;
  }

  function EndSmallThanStart(){
    endTime += 1440;
    fullTime = endTime - startTime;
  }

  function SetStartToSale(){
    startTime = 1260;
  }

  useEffect(() => {CalcTime()},[]);

  function OnPressIn(){
    navigation.navigate('Home');
  }

  const fadeAnim = useRef(new Animated.Value(0)).current;

  Animated.timing(
      fadeAnim,
      {
        toValue: 100,
        duration: 1000,
        easing: Easing.linear
      }
    ).start();
  
  // {
  //   // Will change fadeAnim value to 1 in 5 seconds
  //   Animated.timing(fadeAnim, {
  //     toValue: 1,
  //     duration: 5000,
  //   }).start();
  // };

  return(
    <Container>
      <ResultViewBox>
        <BackArrowBox onPressIn={OnPressIn}>
          <FontAwesome5 name="angle-double-left" size={20} color="black" style={styles.arrow}/>
        </BackArrowBox>
        <ResultText>{store.saleResultPercent}% 세일</ResultText>
        <GageBar>
          <GagePartBox>
            <GagePart bgColor="#be0000" flex={2}></GagePart>
            <GagePart bgColor="#f7ea00" flex={5}></GagePart>
            <GagePart bgColor="#9ede73" flex={3}></GagePart>
          </GagePartBox>
          <Animated.View style={[styles.gage, {width: fadeAnim.interpolate({
            inputRange: [0,100],
            outputRange: [`0%`, `${store.saleTimePercent}%`],
          })}]}/>
            <GageFloat/>
        </GageBar>
        <GageSectionBox>
          <GageSection flex={2}>
            <Text>0%~19%</Text>
            <SaleText>0%</SaleText>
          </GageSection>
          <GageSection flex={5}>
            <Text>20%~69%</Text>
            <SaleText>30%</SaleText>
          </GageSection>
          <GageSection flex={3}>
            <Text>70%~100%</Text>
            <SaleText>50%</SaleText>
          </GageSection>
        </GageSectionBox>
      </ResultViewBox>
    </Container>
  );
}

const styles = StyleSheet.create({
  arrow: {
    position: 'absolute',
    left: 20,
    top: 20
  },
  gage: {
    height: '100%',
    backgroundColor: '#3490de',
    alignItems: 'flex-end',
  }
})

const Container = styled.SafeAreaView`
  background: #e3e3e3;
  flex:1;
  justify-content: center;
  align-items: center;
`;

const ResultViewBox = styled.View`
  padding: 5%;
  background: #fff;
  width: 90%;
  height: 40%;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

const BackArrowBox = styled.TouchableWithoutFeedback`

`;

const ResultText = styled.Text`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const GageBar = styled.View`
  width: 100%;
  height: 10px;
  background: #eee;
  border: 1px rgba(50, 50, 93, 0.25) solid;
  borderBottomWidth: 0px;
  borderRightWidth: 0px;
  border-radius: 10px;
  flex-direction: row;
  overflow: hidden;
`;

const GagePartBox = styled.View`
  width: 100%;
  height: 100%;
  flex-direction: row;
  position: absolute;
`;

const GagePart = styled.View`
  flex: ${(props) => props.flex || 2};
  height: 100%;
  background: ${(props) => props.bgColor || "#eee"};
  align-items: flex-end;
`;

const Gage = styled.View`
  
`;

const GageFloat = styled.View`
  width: 10px;
  height: 10px;
  background: #fff;
  border-radius: 5px;
  margin-left: -5px;
`;

const GageSectionBox = styled.View`
  width:100%;
  height:20%;
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const GageSection = styled.View`
  flex: ${(props) => props.flex || 2};
  height: 100%;
  margin: 0 2px;
  border-radius: 10px;
  background: #ddd;
  align-items: center;
`;

const SaleText = styled.Text`
  font-size: 22px;
  font-weight: bold;
`;


function mapStateToProps(state){
  return {store: state};
}

function mapDispatchToProps(dispatch){
  return{
    SetSaleTimePercent: (saleTimePercent) => dispatch(setSaleTimePercent(saleTimePercent)),
    SetSaleResultPercent: (saleResultPercent) => dispatch(setSaleResultPercent(saleResultPercent)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (Result);
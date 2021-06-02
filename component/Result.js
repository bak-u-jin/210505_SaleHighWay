import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, SafeAreaView, Text, View, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import { setSaleResultPercent, setSaleTimePercent } from '../Store';
import { FontAwesome5 } from '@expo/vector-icons';
import { Easing } from 'react-native-reanimated';

import TruckBg from './design/svgTruckBg';

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

  const resultAnim = useRef(new Animated.Value(0)).current;

  Animated.timing(
    resultAnim,
      {
        toValue: 100,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }
    ).start();

  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.bgView}>
        <LinearGradient style={styles.bgLinearGradient} colors={['#22195E', '#382F78']}/>
        <TruckBg/>
      </View>

      <View style={styles.contentBox}>
        <View style={styles.backIconBox}>
          <TouchableWithoutFeedback onPressIn={OnPressIn}>
            <FontAwesome5 name="angle-double-left" size={24} color="#fff" style={styles.arrow}/>
          </TouchableWithoutFeedback>
        </View>

        <ScrollView style={styles.scrollArea}>
          <View style={styles.resultArea}>
            <Text style={styles.resultText}>{store.saleResultPercent}% 할인</Text>
            <View style={styles.gageBar}>
              <View style={styles.gagePartBox}>
                <View style={[styles.gagePart, {backgroundColor:'#be0000'}]} flex={2}></View>
                <View style={[styles.gagePart, {backgroundColor:'#f7ea00'}]} flex={5}></View>
                <View style={[styles.gagePart, {backgroundColor:'#9ede73'}]} flex={3}></View>
                </View>
              <Animated.View style={[styles.gage, {
                width: resultAnim.interpolate({
                inputRange: [0,100],
                outputRange: [`0%`, `${store.saleTimePercent}%`]
                })
              }]}/>
              <View style={styles.gageFloat}/>
            </View>

            <View style={styles.gageSectionBox}>
              <View style={styles.gageSection} flex={2}>
                <Text style={styles.gageSectionText}>0%~19%</Text>
                <Text style={[styles.gageSectionText, styles.saleText]}>0%</Text>
              </View>
              <View style={styles.gageSection} flex={5}>
                <Text style={styles.gageSectionText}>20%~69%</Text>
                <Text style={[styles.gageSectionText, styles.saleText]}>30%</Text>
              </View>
              <View style={styles.gageSection} flex={3}>
                <Text style={styles.gageSectionText}>70%~100%</Text>
                <Text style={[styles.gageSectionText, styles.saleText]}>50%</Text>
              </View>
            </View>
          </View>
          <View style={[styles.resultArea, {height:400}]}></View>
        </ScrollView>
      </View>
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
  
  backIconBox:{
    width: '100%',
  },

  scrollArea:{
    width: '100%'
  },

  resultArea:{
    width: '100%',
    padding: '5%',
    marginTop: 24,
    backgroundColor: '#4D428D',
    borderRadius: 10,
  },

  resultText:{
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },

  gageBar:{
    width: '100%',
    height: 10,
    borderRadius: 10,
    flexDirection: 'row',
    overflow: 'hidden',
  },

  gagePartBox:{
    width: '100%',
    height: '100%',
    position: 'absolute',
    flexDirection: 'row'
  },
  
  gagePart:{
    height: '100%'
  },

  gage: {
    height: '100%',
    backgroundColor: '#3490de',
    alignItems: 'flex-end',
  },

  gageFloat: {
    width: 10,
    height: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginLeft: -5
  },

  gageSectionBox:{
    width: '100%',
    height: 64,
    flexDirection: 'row',
    marginTop: 14
  },

  gageSection:{
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#7667CA',
    borderRadius: 10,
    marginHorizontal: 2,
  },
  
  gageSectionText:{
    color: '#fff',
    fontWeight: 'bold'
  },

  saleText:{
    fontSize: 22
  }
})

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
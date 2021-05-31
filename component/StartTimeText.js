import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from "react-redux";

import PutZero from './PutZero';

function StartTimeText({store}){
  return(
    <>
      {store.startHour === undefined ? (
        <>
          <View style={styles.textBox}>
            <Text style={[styles.commonFontStyle,styles.title]}>출발시간</Text>
            <View>
            <Text style={[styles.commonFontStyle,styles.ampm]}>을</Text>
            <Text style={[styles.commonFontStyle,styles.textSet]}>정해주세요</Text>
            </View>
          </View>
        </>
      ):(
        (store.startHour<13)? (
          store.startHour === 0 ? (
            <View style={styles.textBox}>
              <Text style={[styles.commonFontStyle,styles.title]}>출발시간</Text>
              <View>
                <Text style={[styles.commonFontStyle,styles.ampm]}>오전</Text>
                <Text style={[styles.commonFontStyle,styles.time]}>{store.startHour+12}:{PutZero(store.startMinute)}</Text>
              </View>
            </View>
            ):(
            <View style={styles.textBox}>
              <Text style={[styles.commonFontStyle,styles.title]}>출발시간</Text>
              <View>
                <Text style={[styles.commonFontStyle,styles.ampm]}>오전</Text>
                <Text style={[styles.commonFontStyle,styles.time]}>{PutZero(store.startHour)}:{PutZero(store.startMinute)}</Text>
              </View>
            </View>
          )
        ) : (
          <View style={styles.textBox}>
            <Text style={[styles.commonFontStyle,styles.title]}>출발시간</Text>
            <View>
              <Text style={[styles.commonFontStyle,styles.ampm]}>오후</Text>
              <Text style={[styles.commonFontStyle,styles.time]}>{PutZero(store.startHour-12)}:{PutZero(store.startMinute)}</Text>
            </View>
          </View>
        )
      )}
    </>
  )
}

const styles = StyleSheet.create({
  textBox:{
    height:'100%',
    justifyContent: 'space-between',
  },
  
  commonFontStyle:{
    color: '#dbd9e8',
    fontWeight: 'bold',
  },

  title:{
    fontSize: 24,
  },

  textSet:{
    fontSize: 30
  },

  ampm:{
    fontSize: 24,
  },
  
  time:{
    fontSize: 50,
    lineHeight: 50,
  }
})



function mapStateToProps(state){
  return {store: state};
}

export default connect(mapStateToProps, null) (StartTimeText);
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from "react-redux";

function StartTimeText({store}){
  return(
    <>
      {store.endHour === undefined ? (
        <View style={styles.textBox}>
          <Text style={[styles.commonFontStyle,styles.title]}>도착시간</Text>
          <View>
            <Text style={[styles.commonFontStyle,styles.ampm]}>을</Text>
            <Text style={[styles.commonFontStyle,styles.textSet]}>정해주세요</Text>
          </View>
        </View>
      ):(
        (store.endHour<13)? (
          store.endHour === 0 ? (
            <View style={styles.textBox}>
              <Text style={[styles.commonFontStyle,styles.title]}>도착시간</Text>
              <View>
                <Text style={[styles.commonFontStyle,styles.ampm]}>오전</Text>
                <Text style={[styles.commonFontStyle,styles.time]}>{store.endHour+12}:{store.endMinute}</Text>
              </View>
            </View>
          ):(
            <View style={styles.textBox}>
              <Text style={[styles.commonFontStyle,styles.title]}>도착시간</Text>
              <View>
                <Text style={[styles.commonFontStyle,styles.ampm]}>오전</Text>
                <Text style={[styles.commonFontStyle,styles.time]}>{store.endHour}:{store.endMinute}</Text>
              </View>
            </View>
          )
        ) : (
          <View style={styles.textBox}>
            <Text style={[styles.commonFontStyle,styles.title]}>도착시간</Text>
            <View>
              <Text style={[styles.commonFontStyle,styles.ampm]}>오후</Text>
              <Text style={[styles.commonFontStyle,styles.time]}>{store.endHour}:{store.endMinute}</Text>
            </View>
          </View>
      ))}
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
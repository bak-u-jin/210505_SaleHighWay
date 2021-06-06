import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';

function EndTimeWarningModal({ store }){

  return(
    <>
      {store.endtimeWarningModal ? (
        <View style={styles.warningBox}>
          <Text style={styles.warningStrongText}>출발시간</Text>
          <Text style={styles.WarningText}>과 </Text>
          <Text style={styles.warningStrongText}>도착시간</Text>
          <Text style={styles.WarningText}>을 </Text>
          <Text style={styles.warningStrongText}>다르게</Text>
          <Text style={styles.WarningText}> 해주세요</Text>
        </View>
      ): (
        <View style={styles.warningBox}/>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  warningBox:{
    width:'100%',
    height:40,
    marginTop: 10,
    borderRadius: 10,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  WarningText:{
    color: '#eee',
    fontSize: 18
  },
  
  warningStrongText:{
    color: '#dF3B70',
    fontWeight: 'bold',
    fontSize: 24
  }
});

function mapStateToProps(state){
  return {store: state};
}

export default connect(mapStateToProps, null) (EndTimeWarningModal);
import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import {setHelpModal} from '../Store';

function HelpButton({store, HelpButtonPress}){
  function HelpOnPressIn(){
    HelpButtonPress(true);
  }

  return(
    <>
    <TouchableWithoutFeedback onPressIn= {HelpOnPressIn}>
      <EvilIcons name="question" size={40} color="#fff" style={styles.questionIcon}/>
    </TouchableWithoutFeedback>
    
    </>
  )
}

const styles = StyleSheet.create({
  questionIcon: {
    position: 'absolute',
    top: 20,
    right: 20
  }
});

function mapStateToProps(state){
  return {store: state};
}

function mapDispatchToProps(dispatch){
  return{
    HelpButtonPress: (helpModalBool) => dispatch(setHelpModal(helpModalBool)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (HelpButton);
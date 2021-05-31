import React from 'react';
import { StyleSheet, Text } from 'react-native';
import styled from 'styled-components';
import { EvilIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import {setHelpModal} from '../Store';

function HelpButton({store, HelpButtonPress}){
  function HelpOnPressIn(){
    HelpButtonPress(true);
  }

  return(
    <>
    <HelpIconBox onPressIn= {HelpOnPressIn}>
      <EvilIcons name="question" size={40} color="#fff" style={styles.questionIcon}/>
    </HelpIconBox>
    
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

const HelpIconBox = styled.TouchableWithoutFeedback`
`;

function mapStateToProps(state){
  return {store: state};
}

function mapDispatchToProps(dispatch){
  return{
    HelpButtonPress: (helpModalBool) => dispatch(setHelpModal(helpModalBool)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (HelpButton);
import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import {setHelpModal} from '../Store';

function HelpModal({store, HelpButtonPress}){
  function CloseHelpModal(){
    HelpButtonPress(false);
  }

  return(
    <>
      {store.setHelpModal && (
        <TouchableWithoutFeedback onPressIn= {CloseHelpModal}>
          <View style={styles.modalBg}>
            <HelpModalView>

            </HelpModalView>
          </View>
        </TouchableWithoutFeedback>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  modalBg:{
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  helpModalView:{
    width:'80%',
    height: '60%',
    backgroundColor: '#0f143a',
    borderRadius: 10
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

export default connect(mapStateToProps, mapDispatchToProps) (HelpModal);


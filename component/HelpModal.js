import React from 'react';
import { StyleSheet, Text } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {setHelpModal} from '../Store';

function HelpModal({store, HelpButtonPress}){
  function CloseHelpModal(){
    HelpButtonPress(false);
  }

  return(
    <>
      {store.setHelpModal && (
        <HelpModalTouch onPressIn= {CloseHelpModal}>
          <ModalBg>
            <HelpModalView>

            </HelpModalView>
          </ModalBg>
        </HelpModalTouch>
      )}
    </>
  )
}

const HelpModalTouch = styled.TouchableWithoutFeedback`
`;

const ModalBg = styled.View`
  position:absolute;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.3);
  justify-content: center;
  align-items: center;
`;

const HelpModalView = styled.View`
  width: 80%;
  height: 60%;
  background: #fff;
  border-radius: 10px;
`;

function mapStateToProps(state){
  return {store: state};
}

function mapDispatchToProps(dispatch){
  return{
    HelpButtonPress: (helpModalBool) => dispatch(setHelpModal(helpModalBool)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (HelpModal);


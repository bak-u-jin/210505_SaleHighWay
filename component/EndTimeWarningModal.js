import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {closeEndTimeWarningModal} from '../Store';

function EndTimeWarningModal({store, CloseEndTimeWarningModal}){
  function CloseWarningModal(){
    CloseEndTimeWarningModal();
  }

  return(
    <>
      {store.endtimeWarningModal ? (
        <WarningTextBox>
          <WarningStrongText>출발시간과 도착시간을 다르게 해주세요</WarningStrongText>
        </WarningTextBox>
      ): (
        <WarningTextBox/>
      )}
    </>
  )
}

const WarningTextBox = styled.View`
  width: 100%;
  height: 30px;
  flex-direction: row;
  background: #fff;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

const WarningText = styled.Text`
  color: #333;
`;

const WarningStrongText = styled.Text`
  color: #f00;
  font-weight: bold;
`;

function mapStateToProps(state){
  return {store: state};
}

function mapDispatchToProps(dispatch){
  return{
    CloseEndTimeWarningModal: () => dispatch(closeEndTimeWarningModal()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (EndTimeWarningModal);
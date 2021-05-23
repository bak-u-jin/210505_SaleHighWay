import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import EndTimeText from './EndTimeText';

function EndTimeButton({store}){
  return(
    <TimeButton size= {store.endBtnSize} bgColor={store.endBtnColor}>
      <EndTimeText/>
    </TimeButton>
  )
}

const TimeButton = styled.View`
  margin:5px 0;
  width: 90%;
  height:40px;
  border-radius:10px;
  background: ${(props) => props.bgColor || "#fff"};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transform: scale(${(props) => props.size || 1});
`;

function mapStateToProps(state){
  return {store: state};
}

function mapDispatchToProps(dispatch){
  return{
    StartBtnPress: (size, color) => dispatch(setStartBtn({size, color})),
    EndBtnPress: (size, color) => dispatch(setEndBtn({size, color})),
    ResultBtnPress: (size, color) => dispatch(setResultBtn({size, color})),
    ToggleTimeModal: (toggleStartEnd) => dispatch(toggleTimeModal(toggleStartEnd)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (EndTimeButton);
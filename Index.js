import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { time, toggleModal } from './Store';
import SetTimeModal from './SetTimeModal';



function Index({store, setTime, toggleModal}) {
  const [startBtnSize, setStartBtnSize] = useState(1);
  const [startBtnColor, setStartBtnColor] = useState("#a6e3e9");
  const [utoggleModal, setToggleModal] = useState(false);

  function StartTimeOnPressIn(){
    setStartBtnSize(0.98);
    setStartBtnColor("#71c9ce");
    toggleModal(true);
  }

  function StartTimeOnPressOut(){
    setStartBtnSize(1);
    setStartBtnColor("#a6e3e9");
  }

  return (
    <Container>
      <StatusBar backgroundColor="#e3e3e3"/>
      <SetViewBox>
        <TimeButtonBox size= {startBtnSize} onPressIn= {StartTimeOnPressIn} onPressOut= {StartTimeOnPressOut}>
          <TimeButton size= {startBtnSize} bgcolor={startBtnColor}>
            <Text>{store.date}</Text>
          </TimeButton>
        </TimeButtonBox>
        <TimeButtonBox size= {startBtnSize} onPressIn= {StartTimeOnPressIn} onPressOut= {StartTimeOnPressOut}>
          <TimeButton size= {startBtnSize} bgcolor={startBtnColor}>
            <Text>{store.minute}</Text>
          </TimeButton>
        </TimeButtonBox>
      </SetViewBox>
      {store.displayModal && <SetTimeModal/>}
    </Container>
  );
}

const Container = styled.SafeAreaView`
  background: #e3e3e3;
  flex:1;
  justify-content: center;
  align-items: center;
`;

const SetViewBox = styled.View`
  background: #fff;
  width: 90%;
  height: 40%;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

const TimeButtonBox = styled.TouchableWithoutFeedback`
`;

const TimeButton = styled.View`
  margin:5px 0;
  width: 90%;
  height:40px;
  border-radius:10px;
  background: ${(props) => props.bgcolor || "#fff"};
  justify-content: center;
  align-items: center;
  transform: scale(${(props) => props.size || 1});
`;

function mapStateToProps(state){
  return {store: state};
}

function mapDispatchToProps(dispatch){
  return{
    setTime: (hour, minute) => dispatch(time({hour, minute})),
    toggleModal: (boolModal) => dispatch(toggleModal(boolModal))
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (Index);
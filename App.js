import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import styled from 'styled-components';
import { LinearGradient } from 'expo-linear-gradient';



export default function App() {
  const [startBtnSize, setStartBtnSize] = useState(1);
  const [startBtnColor, setStartBtnColor] = useState("#a6e3e9");
  const [startModal, setStartModal] = useState(false);
  
  let date = new Date().getDate();

  function StartTimeOnPressIn(){
    setStartBtnSize(0.98);
    setStartBtnColor("#71c9ce");
    setStartModal(true);
  }

  function StartTimeOnPressOut(){
    setStartBtnSize(1);
    setStartBtnColor("#a6e3e9");
  }

  function DisplayModal(){
    setStartModal(false);
  }

  return (
    <Container>
      <StatusBar backgroundColor="#e3e3e3"/>
      <SetViewBox>
        <TimeButtonBox size= {startBtnSize} onPressIn= {StartTimeOnPressIn} onPressOut= {StartTimeOnPressOut}>
          <TimeButton size= {startBtnSize} bgcolor={startBtnColor}>
            <Text>{date}</Text>
          </TimeButton>
        </TimeButtonBox>
        <TimeButtonBox size= {startBtnSize} onPressIn= {StartTimeOnPressIn} onPressOut= {StartTimeOnPressOut}>
          <TimeButton size= {startBtnSize} bgcolor={startBtnColor}>
            <Text>출발시간</Text>
          </TimeButton>
        </TimeButtonBox>
      </SetViewBox>
      {startModal ? (
        <SetTimeModal displayModal = {startModal}>
        <LinearGradient
            colors={['rgba(255,255,255,0.8)', 'transparent']}
            style={styles.topGradient}
          />
        <LinearGradient
          colors={['transparent', 'rgba(255,255,255,0.8)']}
          style={styles.bottomGradient}
        />
        <TimeButtonBox size= {startBtnSize} onPressIn= {StartTimeOnPressIn} onPressOut= {DisplayModal}>
          <TimeButton size= {startBtnSize} bgcolor={startBtnColor}>
            <Text>출발시간</Text>
          </TimeButton>
        </TimeButtonBox>
      </SetTimeModal>
      ):(<></>)}
      
    </Container>
  );
}

const styles = StyleSheet.create({
  topGradient: {
    width: "100%",
    height: "40%",
    position: "absolute",
    top: 0,
  },

  bottomGradient: {
    width: "100%",
    height: "40%",
    position: "absolute",
    bottom: 0,
  }
});

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

const SetTimeModal = styled.View`
  width: 90%;
  height: 80%;
  position: absolute;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
`;
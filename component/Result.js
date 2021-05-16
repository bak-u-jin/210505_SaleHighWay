import React from 'react';
import styled from 'styled-components';
import { StyleSheet, Text, View } from 'react-native';

function Result(){

  return(
    <Container>
      <ResultViewBox>
        <GageBar>
          <Gage>
          </Gage>
            <GageFloat/>
        </GageBar>
        <GageSectionBox>
          <GageSection></GageSection>
          <GageSection></GageSection>
          <GageSection></GageSection>
        </GageSectionBox>
      </ResultViewBox>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  background: #e3e3e3;
  flex:1;
  justify-content: center;
  align-items: center;
`;

const ResultViewBox = styled.View`
  padding: 5%;
  background: #fff;
  width: 90%;
  height: 40%;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

const GageBar = styled.View`
  width: 100%;
  height: 10px;
  background: #eee;
  border: 1px rgba(50, 50, 93, 0.25) solid;
  borderBottomWidth: 0px;
  borderRightWidth: 0px;
  border-radius: 10px;
  flex-direction: row;
  overflow: hidden;
`;

const Gage = styled.View`
  width: 80%;
  height: 100%;
  background: #3490de;
  align-items: flex-end;
`;

const GageFloat = styled.View`
  width: 10px;
  height: 10px;
  background: #fff;
  border-radius: 5px;
  margin-left: -5px;
`;

const GageSectionBox = styled.View`
  width:100%;
  height:20%;
  margin: 10px 0;
  background:#eee;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const GageSection = styled.View`
  width:30%;
  height: 100%;
  background: #aaa;
`;


export default Result;
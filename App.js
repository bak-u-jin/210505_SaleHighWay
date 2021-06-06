import React from 'react';

import { Provider } from 'react-redux';

import store from './Store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';

import Home from './component/Home';
import SetTimeModal from './SetTimeModal';
import Result from './component/Result';
import { Text } from 'react-native';

const Stack = createStackNavigator();
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

function sleep (ms) {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}
 
async function delay_splash() {
    await SplashScreen.preventAutoHideAsync();
    await sleep(2000);
    await SplashScreen.hideAsync();    
};

export default function App() {
  delay_splash();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="SetTimeModal" component={SetTimeModal}/>
          <Stack.Screen name="Result" component={Result}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
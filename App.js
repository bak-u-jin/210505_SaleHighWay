import React from 'react';

import { Provider } from 'react-redux';

import store from './Store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './component/Home';
import SetTimeModal from './SetTimeModal';
import Result from './component/Result';
import { Text } from 'react-native';

const Stack = createStackNavigator();
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

export default function App() {

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
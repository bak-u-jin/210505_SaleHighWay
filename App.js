import React from 'react';

import { Provider } from 'react-redux';

import Home from './component/Home';
import Result from './component/Result';
import store from './Store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="Result" component={Result}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}